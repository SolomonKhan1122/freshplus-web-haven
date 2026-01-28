import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ServiceCards } from "./ServiceCards";
import { PropertyDetails } from "./PropertyDetails";
import { EOLGuidance } from "./EOLGuidance";
import { ContactSchedule } from "./ContactSchedule";
import { PriceSummary } from "./PriceSummary";
import { TrustBadges } from "./TrustBadges";
import { ConfirmationScreen } from "./ConfirmationScreen";
import {
  initialFormState,
  serviceCategories,
  calculateTotalPrice,
  bedroomOptions,
  extraServices,
  bondBackBundle,
  type InstantQuoteFormState,
  type ServiceType,
} from "@/lib/pricing-data";

interface AccordionSection {
  id: number;
  title: string;
  subtitle: string;
  isComplete: (state: InstantQuoteFormState) => boolean;
}

const sections: AccordionSection[] = [
  {
    id: 0,
    title: "Select Your Service",
    subtitle: "Choose what you need",
    isComplete: (state) => state.selectedService !== null,
  },
  {
    id: 1,
    title: "Property Details",
    subtitle: "Tell us about your property",
    isComplete: (state) => 
      state.propertyType !== "" && 
      state.bedrooms > 0 &&
      (state.selectedService !== "end-of-lease" || state.furnished !== null),
  },
  {
    id: 2,
    title: "Add Extras",
    subtitle: "Customize your clean",
    isComplete: (state) => true, // Optional section
  },
  {
    id: 3,
    title: "Schedule & Contact",
    subtitle: "When should we come?",
    isComplete: (state) =>
      state.firstName.trim() !== "" &&
      state.lastName.trim() !== "" &&
      state.email.includes("@") &&
      state.phone.length >= 8 &&
      state.address.trim() !== "" &&
      state.suburb.trim() !== "" &&
      state.postcode.length === 4 &&
      (state.preferredDate !== null || state.sameDayBooking) &&
      state.preferredTime !== "",
  },
];

interface AccordionFormProps {
  onSubmit: (state: InstantQuoteFormState) => Promise<string>;
}

export function AccordionForm({ onSubmit }: AccordionFormProps) {
  const [formState, setFormState] = useState<InstantQuoteFormState>(initialFormState);
  const [bookingId, setBookingId] = useState<string>("");
  const [pendingService, setPendingService] = useState<ServiceType | null>(null);
  const [showResetDialog, setShowResetDialog] = useState(false);
  
  const updateFormState = (updates: Partial<InstantQuoteFormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  };

  // Check if user has filled any meaningful data beyond service selection
  const hasFormData = (): boolean => {
    return (
      formState.propertyType !== "" ||
      formState.bedrooms > 0 ||
      formState.bathrooms > 0 ||
      formState.furnished !== null ||
      Object.keys(formState.selectedExtras).length > 0 ||
      formState.bundleSelected ||
      formState.firstName.trim() !== "" ||
      formState.lastName.trim() !== "" ||
      formState.email.trim() !== "" ||
      formState.phone.trim() !== "" ||
      formState.address.trim() !== "" ||
      formState.preferredDate !== null
    );
  };

  const handleServiceSelect = (serviceId: ServiceType) => {
    // If same service, just proceed
    if (serviceId === formState.selectedService) {
      return;
    }
    
    // If user already has data filled in, show confirmation dialog
    if (formState.selectedService !== null && hasFormData()) {
      setPendingService(serviceId);
      setShowResetDialog(true);
      return;
    }
    
    // Otherwise, just update the service
    updateFormState({ selectedService: serviceId });
    // Auto-expand next section
    setTimeout(() => {
      updateFormState({ currentSection: 1 });
    }, 300);
  };

  const handleConfirmServiceChange = () => {
    if (pendingService) {
      // Reset form to initial state but keep the new service
      setFormState({
        ...initialFormState,
        selectedService: pendingService,
        currentSection: 1,
      });
      setPendingService(null);
    }
    setShowResetDialog(false);
  };

  const handleCancelServiceChange = () => {
    setPendingService(null);
    setShowResetDialog(false);
  };

  const handleSectionToggle = (sectionId: number) => {
    // Can only open sections if previous ones are complete
    if (sectionId > 0 && !sections[sectionId - 1].isComplete(formState)) {
      return;
    }
    updateFormState({
      currentSection: formState.currentSection === sectionId ? -1 : sectionId,
    });
  };

  const handleContinue = () => {
    const nextSection = formState.currentSection + 1;
    if (nextSection < sections.length) {
      updateFormState({ currentSection: nextSection });
    }
  };

  const handleSubmit = async () => {
    // Validate all sections
    const allComplete = sections.every((s) => s.isComplete(formState));
    if (!allComplete) {
      // Find first incomplete section and open it
      const incompleteSection = sections.find((s) => !s.isComplete(formState));
      if (incompleteSection) {
        updateFormState({ currentSection: incompleteSection.id });
      }
      return;
    }

    updateFormState({ isSubmitting: true });
    try {
      const id = await onSubmit(formState);
      setBookingId(id);
      updateFormState({ isSubmitting: false, isComplete: true });
    } catch (error) {
      console.error("Submission error:", error);
      updateFormState({ isSubmitting: false });
    }
  };

  const handleReset = () => {
    setFormState(initialFormState);
    setBookingId("");
  };

  // Check if service requires quote only
  const selectedService = serviceCategories.find(
    (s) => s.id === formState.selectedService
  );
  const isQuoteOnly = selectedService?.pricingMode === "quote-only";
  const isHourly = selectedService?.pricingMode === "hourly";
  const isEOL = formState.selectedService === "end-of-lease";

  // If complete, show confirmation
  if (formState.isComplete && bookingId) {
    return (
      <ConfirmationScreen
        formState={formState}
        bookingId={bookingId}
        onReset={handleReset}
      />
    );
  }

  // Calculate pricing
  const pricing = calculateTotalPrice(formState, bedroomOptions, extraServices, bondBackBundle);
  const canSubmit = sections.every((s) => s.isComplete(formState)) && !isQuoteOnly;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 lg:py-10 relative">
        {/* Trust Badges */}
        <TrustBadges className="mb-6" />

        <div className="lg:grid lg:grid-cols-[1fr,380px] lg:gap-8">
          {/* Main Form */}
          <div className="space-y-4">
            {sections.map((section, index) => {
              const isOpen = formState.currentSection === section.id;
              const isComplete = section.isComplete(formState);
              const canOpen =
                index === 0 || sections[index - 1].isComplete(formState);

              // Skip property details for quote-only services
              if (section.id === 1 && isQuoteOnly) return null;
              // Skip extras for quote-only
              if (section.id === 2 && isQuoteOnly) return null;

              return (
                <div
                  key={section.id}
                  className={cn(
                    "bg-card rounded-xl border shadow-sm overflow-hidden transition-all",
                    isOpen && "ring-2 ring-emerald-200"
                  )}
                >
                  {/* Section Header */}
                  <button
                    type="button"
                    onClick={() => handleSectionToggle(section.id)}
                    disabled={!canOpen}
                    className={cn(
                      "w-full flex items-center justify-between p-4 md:p-5 text-left transition-colors",
                      canOpen
                        ? "hover:bg-muted/50 cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {/* Step Number / Check */}
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                          isComplete
                            ? "bg-emerald-500 text-white"
                            : isOpen
                            ? "bg-emerald-500 text-white"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {isComplete ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          section.id + 1
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{section.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {section.subtitle}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Section Content */}
                  <div
                    className={cn(
                      "transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-none opacity-100" : "max-h-0 overflow-hidden opacity-0"
                    )}
                  >
                    <div className="p-4 md:p-5 pt-0 md:pt-0 border-t">
                      {/* Service Selection */}
                      {section.id === 0 && (
                        <ServiceCards
                          selectedService={formState.selectedService}
                          onServiceSelect={handleServiceSelect}
                        />
                      )}

                      {/* Property Details */}
                      {section.id === 1 && !isQuoteOnly && (
                        <PropertyDetails
                          formState={formState}
                          onUpdate={updateFormState}
                          showFurnished={isEOL}
                        />
                      )}

                      {/* Extras */}
                      {section.id === 2 && !isQuoteOnly && (
                        <EOLGuidance
                          formState={formState}
                          onUpdate={updateFormState}
                        />
                      )}

                      {/* Contact & Schedule */}
                      {section.id === 3 && (
                        <ContactSchedule
                          formState={formState}
                          onUpdate={updateFormState}
                        />
                      )}

                      {/* Continue Button (inside section) */}
                      {isOpen && section.id < sections.length - 1 && (
                        <div className="mt-6 pt-4 border-t">
                          <Button
                            onClick={handleContinue}
                            disabled={!isComplete}
                            className="w-full md:w-auto"
                          >
                            Continue
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Submit Button (mobile) */}
            <div className="lg:hidden mt-6">
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit || formState.isSubmitting}
                className="w-full h-14 text-base font-semibold"
                size="lg"
              >
                {formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Confirming...
                  </>
                ) : isQuoteOnly ? (
                  "Request Quote"
                ) : (
                  `Confirm Booking - $${pricing.total}`
                )}
              </Button>
            </div>
          </div>

          {/* Sidebar - Price Summary (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-6 space-y-4">
              <PriceSummary formState={formState} />
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit || formState.isSubmitting}
                className="w-full h-14 text-base font-semibold"
                size="lg"
              >
                {formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Confirming...
                  </>
                ) : isQuoteOnly ? (
                  "Request Quote"
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Price Bar */}
        <PriceSummary formState={formState} variant="mobile" className="lg:hidden" />
      </div>

      {/* Service Change Confirmation Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-amber-100">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <AlertDialogTitle>Change Service?</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-left">
              Switching to a different service will reset your current selections including property details, extras, and contact information.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel onClick={handleCancelServiceChange}>
              Keep Current Service
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmServiceChange}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Change Service
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
