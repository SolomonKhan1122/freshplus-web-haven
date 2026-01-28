import React from "react";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FormState } from "@/lib/pricing-data";

interface StepTwoProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onBack: () => void;
}

export function StepTwo({ formState, setFormState, onBack }: StepTwoProps) {
  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to services
      </button>

      <div>
        <h2 className="text-xl font-semibold mb-1">Almost there!</h2>
        <p className="text-sm text-muted-foreground">We just need your contact details to confirm this booking.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formState.email}
            onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
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
            placeholder="04XX XXX XXX"
            value={formState.phone}
            onChange={(e) => setFormState((prev) => ({ ...prev, phone: e.target.value }))}
            className="h-12"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="preferredDate">Preferred Date</Label>
            <Input
              id="preferredDate"
              type="date"
              value={formState.preferredDate}
              onChange={(e) => setFormState((prev) => ({ ...prev, preferredDate: e.target.value }))}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredTime">Preferred Time</Label>
            <Select
              value={formState.preferredTime}
              onValueChange={(value) => setFormState((prev) => ({ ...prev, preferredTime: value }))}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select time..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                <SelectItem value="flexible">I&apos;m flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Checkbox
            id="smsOptIn"
            checked={formState.smsOptIn}
            onCheckedChange={(checked) => setFormState((prev) => ({ ...prev, smsOptIn: checked as boolean }))}
          />
          <Label htmlFor="smsOptIn" className="text-sm font-normal cursor-pointer">
            Send me SMS reminders about my booking
          </Label>
        </div>
      </div>
    </div>
  );
}
