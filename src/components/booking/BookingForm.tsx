import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/booking/StepIndicator";
import { PriceSummary, calculateTotal } from "@/components/booking/PriceSummary";
import { StepOne } from "@/components/booking/steps/StepOne";
import { StepTwo } from "@/components/booking/steps/StepTwo";
import { StepThree } from "@/components/booking/steps/StepThree";
import { SuccessScreen } from "@/components/booking/SuccessScreen";
import { services, frequencies, extras, initialFormState, type FormState } from "@/lib/pricing-data";

const steps = [{ label: "Service" }, { label: "Contact" }, { label: "Details" }];

export function BookingForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const total = calculateTotal(formState, services, extras);

  const canProceedStep1 = formState.selectedService !== null;
  const canProceedStep2 = formState.email.includes("@") && formState.phone.length >= 8;
  const canProceedStep3 =
    formState.firstName.trim() !== "" &&
    formState.lastName.trim() !== "" &&
    formState.address.trim() !== "" &&
    formState.suburb.trim() !== "" &&
    formState.postcode.length === 4;

  const handleContinue = () => {
    if (formState.currentStep < 3) {
      setFormState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    } else {
      setFormState((prev) => ({ ...prev, isSubmitting: true }));
      // TODO: Integrate with your backend/email service here
      setTimeout(() => {
        setFormState((prev) => ({ ...prev, isSubmitting: false, isComplete: true }));
      }, 1500);
    }
  };

  const handleBack = () => {
    setFormState((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
  };

  const handleReset = () => {
    setFormState(initialFormState);
  };

  if (formState.isComplete) {
    return <SuccessScreen firstName={formState.firstName} total={total} onReset={handleReset} />;
  }

  const getButtonText = () => {
    if (formState.isSubmitting) return "Submitting...";
    if (formState.currentStep === 1) return `Continue with $${total.toFixed(2)}`;
    if (formState.currentStep === 2) return "Continue";
    return "Confirm Booking Request";
  };

  const canProceed =
    (formState.currentStep === 1 && canProceedStep1) ||
    (formState.currentStep === 2 && canProceedStep2) ||
    (formState.currentStep === 3 && canProceedStep3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto px-4 py-6 lg:py-10">
        <StepIndicator currentStep={formState.currentStep} steps={steps} />

        <div className="lg:grid lg:grid-cols-[1fr,380px] lg:gap-8">
          <div className="bg-card rounded-2xl border shadow-sm p-6 lg:p-8">
            {formState.currentStep === 1 && (
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">Get your instant quote</h1>
                <p className="text-muted-foreground mt-1">
                  Select your home size and see the price immediately. No surprises.
                </p>
              </div>
            )}

            <div className="transition-all duration-300">
              {formState.currentStep === 1 && (
                <StepOne
                  formState={formState}
                  setFormState={setFormState}
                  services={services}
                  frequencies={frequencies}
                  extras={extras}
                />
              )}
              {formState.currentStep === 2 && (
                <StepTwo formState={formState} setFormState={setFormState} onBack={handleBack} />
              )}
              {formState.currentStep === 3 && (
                <StepThree formState={formState} setFormState={setFormState} onBack={handleBack} />
              )}
            </div>

            <div className="mt-8 lg:hidden">
              <div className="p-4 rounded-xl bg-muted/50 mb-4">
                <PriceSummary formState={formState} services={services} extras={extras} compact />
              </div>
              <Button
                onClick={handleContinue}
                disabled={!canProceed || formState.isSubmitting}
                className="w-full h-14 text-base font-semibold"
                size="lg"
              >
                {formState.isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {getButtonText()}
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-6 space-y-4">
              <PriceSummary formState={formState} services={services} extras={extras} />
              <Button
                onClick={handleContinue}
                disabled={!canProceed || formState.isSubmitting}
                className="w-full h-14 text-base font-semibold"
                size="lg"
              >
                {formState.isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {getButtonText()}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
