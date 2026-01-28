import { CheckCircle2, Calendar, MapPin, Phone, Mail, MessageCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  calculateTotalPrice,
  bedroomOptions,
  extraServices,
  bondBackBundle,
  serviceCategories,
  timeSlots,
  type InstantQuoteFormState,
} from "@/lib/pricing-data";

interface ConfirmationScreenProps {
  formState: InstantQuoteFormState;
  bookingId: string;
  onReset: () => void;
}

export function ConfirmationScreen({
  formState,
  bookingId,
  onReset,
}: ConfirmationScreenProps) {
  const pricing = calculateTotalPrice(formState, bedroomOptions, extraServices, bondBackBundle);
  const selectedService = serviceCategories.find(
    (s) => s.id === formState.selectedService
  );
  const selectedBedroom = bedroomOptions.find(
    (b) => b.bedrooms === formState.bedrooms
  );
  const selectedTime = timeSlots.find((t) => t.id === formState.preferredTime);

  const handleAddToCalendar = () => {
    if (!formState.preferredDate) return;

    const startDate = formState.preferredDate;
    const title = `Fresh Plus Cleaning - ${selectedService?.name || "Cleaning Service"}`;
    const description = `Booking ID: ${bookingId.slice(0, 8).toUpperCase()}%0AService: ${selectedService?.name || "Cleaning"}%0ATotal: $${pricing.total}`;
    const location = `${formState.address}, ${formState.suburb} ${formState.postcode}`;

    // Format for Google Calendar
    const dateStr = format(startDate, "yyyyMMdd");
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dateStr}/${dateStr}&details=${description}&location=${encodeURIComponent(location)}`;

    window.open(googleUrl, "_blank");
  };

  const handleWhatsApp = () => {
    const message = `Hi! I just booked a cleaning service (Booking ID: ${bookingId.slice(0, 8).toUpperCase()}). Looking forward to it!`;
    const whatsappUrl = `https://wa.me/61403971720?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4 md:p-6">
      <div className="max-w-lg w-full text-center space-y-6">
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center animate-bounce-once">
          <CheckCircle2 className="h-12 w-12 text-emerald-600" />
        </div>

        {/* Confirmation Message */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground">
            Thanks {formState.firstName}! Your cleaning has been scheduled.
          </p>
        </div>

        {/* Booking ID */}
        <div className="inline-block px-4 py-2 bg-emerald-100 rounded-full">
          <span className="text-sm font-medium text-emerald-600">
            Booking ID: {bookingId.slice(0, 8).toUpperCase()}
          </span>
        </div>

        {/* Booking Details Card */}
        <div className="bg-card border rounded-xl p-5 text-left space-y-4">
          {/* Service */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold">{selectedService?.name}</p>
              {selectedBedroom && (
                <p className="text-sm text-muted-foreground">
                  {selectedBedroom.label}
                </p>
              )}
            </div>
          </div>

          {/* Date & Time */}
          {formState.preferredDate && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-100">
                <Calendar className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold">
                  {format(formState.preferredDate, "EEEE, MMMM d, yyyy")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedTime?.label} ({selectedTime?.description})
                </p>
              </div>
            </div>
          )}

          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100">
              <MapPin className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold">{formState.address}</p>
              <p className="text-sm text-muted-foreground">
                {formState.suburb}, {formState.postcode}
              </p>
            </div>
          </div>

          {/* Total */}
          <div className="pt-3 border-t">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total</span>
              <div className="text-right">
                {pricing.totalSavings > 0 && (
                  <span className="text-sm text-muted-foreground line-through mr-2">
                    ${pricing.originalTotal}
                  </span>
                )}
                <span className="text-2xl font-bold text-emerald-600">
                  ${pricing.total}
                </span>
              </div>
            </div>
            {pricing.totalSavings > 0 && (
              <p className="text-sm text-emerald-600 text-right mt-1">
                You saved ${pricing.totalSavings}!
              </p>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-4 bg-muted/50 rounded-xl space-y-2">
          <p className="text-sm font-medium">
            We&apos;ll contact you to confirm the details:
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{formState.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{formState.email}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleAddToCalendar}
            variant="outline"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Add to Calendar
          </Button>
          <Button
            onClick={handleWhatsApp}
            className="gap-2 bg-emerald-600 hover:bg-emerald-700"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </Button>
        </div>

        {/* Book Another */}
        <Button
          onClick={onReset}
          variant="ghost"
          className="text-muted-foreground"
        >
          Book another cleaning
        </Button>
      </div>
    </div>
  );
}
