import { cn } from "@/lib/utils";
import { useState } from "react";
import { CalendarIcon, Zap, Clock } from "lucide-react";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  timeSlots,
  SAME_DAY_PREMIUM,
  type InstantQuoteFormState,
} from "@/lib/pricing-data";

interface ContactScheduleProps {
  formState: InstantQuoteFormState;
  onUpdate: (updates: Partial<InstantQuoteFormState>) => void;
}

export function ContactSchedule({ formState, onUpdate }: ContactScheduleProps) {
  const [dateOpen, setDateOpen] = useState(false);
  const today = startOfToday();

  const handleSameDayToggle = (checked: boolean) => {
    if (checked) {
      onUpdate({
        sameDayBooking: true,
        preferredDate: today,
      });
    } else {
      onUpdate({
        sameDayBooking: false,
        preferredDate: null,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Same Day Booking Toggle */}
      <div
        className={cn(
          "p-4 rounded-xl border-2 transition-all",
          formState.sameDayBooking
            ? "border-amber-400 bg-amber-50"
            : "border-dashed border-amber-300"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2 rounded-lg",
                formState.sameDayBooking ? "bg-amber-200" : "bg-amber-100"
              )}
            >
              <Zap
                className={cn(
                  "h-5 w-5",
                  formState.sameDayBooking
                    ? "text-amber-700"
                    : "text-amber-500"
                )}
              />
            </div>
            <div>
              <span className="font-semibold text-amber-800 block">
                Need it today?
              </span>
              <span className="text-sm text-amber-700">
                Same day booking available (+${SAME_DAY_PREMIUM})
              </span>
            </div>
          </div>
          <Switch
            checked={formState.sameDayBooking}
            onCheckedChange={handleSameDayToggle}
            className="data-[state=checked]:bg-amber-500"
          />
        </div>
      </div>

      {/* Date Selection */}
      {!formState.sameDayBooking && (
        <div className="space-y-3">
          <Label className="text-base font-semibold">Preferred Date</Label>
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12",
                  !formState.preferredDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formState.preferredDate ? (
                  format(formState.preferredDate, "EEEE, MMMM d, yyyy")
                ) : (
                  <span>Select a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white shadow-lg border" align="start">
              <Calendar
                mode="single"
                selected={formState.preferredDate || undefined}
                onSelect={(date) => {
                  onUpdate({ preferredDate: date || null });
                  setDateOpen(false);
                }}
                disabled={(date) => isBefore(date, today)}
                initialFocus
                className="bg-white rounded-md"
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* Time Selection */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Preferred Time</Label>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              type="button"
              onClick={() => onUpdate({ preferredTime: slot.id })}
              className={cn(
                "flex flex-col items-center p-3 rounded-lg border-2 transition-all",
                "hover:border-emerald-400",
                formState.preferredTime === slot.id
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-border"
              )}
            >
              <Clock
                className={cn(
                  "h-5 w-5 mb-1",
                  formState.preferredTime === slot.id
                    ? "text-emerald-600"
                    : "text-muted-foreground"
                )}
              />
              <span className="font-medium text-sm">{slot.label}</span>
              <span className="text-xs text-muted-foreground">
                {slot.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-base font-semibold">Contact Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="firstName"
              value={formState.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">
              Last Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="lastName"
              value={formState.lastName}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
              className="h-12"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formState.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formState.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">
            Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="address"
            value={formState.address}
            onChange={(e) => onUpdate({ address: e.target.value })}
            className="h-12"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="suburb">
              Suburb <span className="text-destructive">*</span>
            </Label>
            <Input
              id="suburb"
              value={formState.suburb}
              onChange={(e) => onUpdate({ suburb: e.target.value })}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postcode">
              Postcode <span className="text-destructive">*</span>
            </Label>
            <Input
              id="postcode"
              value={formState.postcode}
              onChange={(e) => onUpdate({ postcode: e.target.value })}
              className="h-12"
              maxLength={4}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comments">Special Instructions (Optional)</Label>
          <Textarea
            id="comments"
            value={formState.comments}
            onChange={(e) => onUpdate({ comments: e.target.value })}
            className="min-h-[100px] resize-none"
          />
        </div>
      </div>
    </div>
  );
}
