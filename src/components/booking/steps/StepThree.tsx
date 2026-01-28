import React from "react";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FormState } from "@/lib/pricing-data";

interface StepThreeProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onBack: () => void;
}

export function StepThree({ formState, setFormState, onBack }: StepThreeProps) {
  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div>
        <h2 className="text-xl font-semibold mb-1">Final details</h2>
        <p className="text-sm text-muted-foreground">Tell us where and a few more details.</p>
      </div>

      {/* Contact Info */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="firstName"
              placeholder="John"
              value={formState.firstName}
              onChange={(e) => setFormState((prev) => ({ ...prev, firstName: e.target.value }))}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">
              Last Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="lastName"
              placeholder="Smith"
              value={formState.lastName}
              onChange={(e) => setFormState((prev) => ({ ...prev, lastName: e.target.value }))}
              className="h-12"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">
            Street Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="address"
            placeholder="123 Main Street"
            value={formState.address}
            onChange={(e) => setFormState((prev) => ({ ...prev, address: e.target.value }))}
            className="h-12"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="space-y-2 col-span-2 sm:col-span-1">
            <Label htmlFor="suburb">
              Suburb <span className="text-destructive">*</span>
            </Label>
            <Input
              id="suburb"
              placeholder="Melbourne"
              value={formState.suburb}
              onChange={(e) => setFormState((prev) => ({ ...prev, suburb: e.target.value }))}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postcode">
              Postcode <span className="text-destructive">*</span>
            </Label>
            <Input
              id="postcode"
              placeholder="3000"
              value={formState.postcode}
              onChange={(e) => setFormState((prev) => ({ ...prev, postcode: e.target.value }))}
              className="h-12"
              maxLength={4}
            />
          </div>
        </div>
      </div>

      {/* Additional Questions */}
      <div className="pt-4 border-t space-y-4">
        <h3 className="font-medium">A few more questions</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Do you have pets?</Label>
            <Select
              value={formState.hasPets}
              onValueChange={(value) => setFormState((prev) => ({ ...prev, hasPets: value }))}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No pets</SelectItem>
                <SelectItem value="dog">Dog</SelectItem>
                <SelectItem value="cat">Cat</SelectItem>
                <SelectItem value="both">Dog & Cat</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>How will we get in?</Label>
            <Select
              value={formState.accessMethod}
              onValueChange={(value) => setFormState((prev) => ({ ...prev, accessMethod: value }))}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">I&apos;ll be home</SelectItem>
                <SelectItem value="lockbox">Key in lockbox</SelectItem>
                <SelectItem value="concierge">Concierge</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label>Where can we park?</Label>
            <Select
              value={formState.parking}
              onValueChange={(value) => setFormState((prev) => ({ ...prev, parking: value }))}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="driveway">Driveway</SelectItem>
                <SelectItem value="street">Street parking</SelectItem>
                <SelectItem value="visitor">Visitor parking</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comments">General Comments</Label>
          <Textarea
            id="comments"
            placeholder="Special instructions, focus areas, or anything else..."
            value={formState.comments}
            onChange={(e) => setFormState((prev) => ({ ...prev, comments: e.target.value }))}
            className="min-h-[100px] resize-none"
          />
        </div>
      </div>

      {/* Payment Note */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
        <div className="flex items-start gap-3">
          <CreditCard className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-emerald-800">No payment required now</p>
            <p className="text-sm text-emerald-700 mt-0.5">
              We&apos;ll call to confirm your booking first. Payment is only taken after you&apos;re happy with the clean.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
