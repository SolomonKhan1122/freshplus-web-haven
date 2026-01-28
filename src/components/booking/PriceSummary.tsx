import { cn } from "@/lib/utils";
import { Home, Sparkles, Calendar, Zap, Tag, ChevronUp, ChevronDown, Gift } from "lucide-react";
import { useState } from "react";
import { TrustBadgesMini } from "./TrustBadges";
import {
  calculateTotalPrice,
  bedroomOptions,
  extraServices,
  bondBackBundle,
  serviceCategories,
  SAME_DAY_PREMIUM,
  CUPBOARD_BUNDLE_DISCOUNT,
  hasCupboardBundleDiscount,
  type InstantQuoteFormState,
} from "@/lib/pricing-data";

interface PriceSummaryProps {
  formState: InstantQuoteFormState;
  className?: string;
  variant?: "sidebar" | "mobile" | "compact";
}

export function PriceSummary({
  formState,
  className,
  variant = "sidebar",
}: PriceSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const pricing = calculateTotalPrice(formState, bedroomOptions, extraServices, bondBackBundle);

  const selectedService = serviceCategories.find(
    (s) => s.id === formState.selectedService
  );
  const selectedBedroom = bedroomOptions.find(
    (b) => b.bedrooms === formState.bedrooms
  );

  // Count selected extras
  const extrasCount = Object.values(formState.selectedExtras).reduce(
    (sum, qty) => sum + qty,
    0
  ) + (formState.bundleSelected ? 1 : 0);

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center justify-between", className)}>
        <span className="text-sm text-muted-foreground">Total</span>
        <div className="flex items-baseline gap-2">
          {pricing.totalSavings > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              ${pricing.originalTotal}
            </span>
          )}
          <span className="text-2xl font-bold text-emerald-600">
            ${pricing.total}
          </span>
        </div>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50",
          className
        )}
      >
        {/* Expandable Summary */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 bg-muted/30"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {selectedService?.name || "Select a service"}
            </span>
            {extrasCount > 0 && (
              <span className="px-2 py-0.5 text-xs bg-emerald-100 text-emerald-600 rounded-full">
                +{extrasCount} extras
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              {pricing.totalSavings > 0 && (
                <span className="text-xs text-muted-foreground line-through mr-2">
                  ${pricing.originalTotal}
                </span>
              )}
              <span className="text-xl font-bold text-emerald-600">
                ${pricing.total}
              </span>
            </div>
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </button>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="p-4 space-y-3 max-h-[50vh] overflow-y-auto">
            <PriceBreakdown formState={formState} pricing={pricing} />
          </div>
        )}

        {/* Savings Badge */}
        {pricing.totalSavings > 0 && (
          <div className="px-4 pb-2">
            <SavingsBadge savings={pricing.totalSavings} />
          </div>
        )}
      </div>
    );
  }

  // Sidebar (default)
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5 shadow-sm space-y-4",
        className
      )}
    >
      <h3 className="text-lg font-bold">Your Quote</h3>

      {/* Price Breakdown */}
      <div className="space-y-3">
        {/* Base Service */}
        {selectedService && (
          <div className="flex items-start gap-3 text-sm">
            <Home className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <span className="font-medium">{selectedService.name}</span>
              {selectedBedroom && (
                <span className="text-muted-foreground">
                  {" "}
                  - {selectedBedroom.label}
                </span>
              )}
            </div>
            <div className="text-right">
              {pricing.originalBasePrice > pricing.basePrice && (
                <span className="text-xs text-muted-foreground line-through mr-1">
                  ${pricing.originalBasePrice}
                </span>
              )}
              <span className="font-semibold">${pricing.basePrice}</span>
            </div>
          </div>
        )}

        {/* Bundle */}
        {formState.bundleSelected && (
          <div className="flex items-start gap-3 text-sm">
            <Sparkles className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
            <span className="flex-1 font-medium text-emerald-700">
              {bondBackBundle.name}
            </span>
            <div className="text-right">
              <span className="text-xs text-muted-foreground line-through mr-1">
                ${bondBackBundle.originalTotal}
              </span>
              <span className="font-semibold text-emerald-600">
                ${bondBackBundle.bundlePrice}
              </span>
            </div>
          </div>
        )}

        {/* Individual Extras */}
        {Object.entries(formState.selectedExtras).map(([extraId, qty]) => {
          if (qty === 0) return null;
          const extra = extraServices.find((e) => e.id === extraId);
          if (!extra) return null;
          // Skip if in bundle
          if (formState.bundleSelected && bondBackBundle.includedExtras.includes(extraId)) {
            return null;
          }
          return (
            <div key={extraId} className="flex items-start gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <span className="flex-1">
                {extra.name}
                {qty > 1 && (
                  <span className="text-muted-foreground"> x{qty}</span>
                )}
              </span>
              <span className="font-medium">
                ${extra.discountedPrice * qty}
              </span>
            </div>
          );
        })}

        {/* Same Day Premium */}
        {formState.sameDayBooking && (
          <div className="flex items-start gap-3 text-sm">
            <Zap className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
            <span className="flex-1 font-medium text-amber-700">
              Same Day Booking
            </span>
            <span className="font-semibold text-amber-600">
              +${SAME_DAY_PREMIUM}
            </span>
          </div>
        )}

        {/* Kitchen Cupboards Bundle Discount */}
        {hasCupboardBundleDiscount(formState.selectedExtras) && !formState.bundleSelected && (
          <div className="flex items-start gap-3 text-sm">
            <Gift className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
            <span className="flex-1 font-medium text-emerald-700">
              Kitchen Cupboards Bundle
            </span>
            <span className="font-semibold text-emerald-600">
              -${CUPBOARD_BUNDLE_DISCOUNT}
            </span>
          </div>
        )}

        {/* No selection yet */}
        {!selectedService && (
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Home className="h-4 w-4" />
            <span>Select a service to see pricing</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t" />

      {/* Totals */}
      <div className="space-y-2">
        {pricing.totalSavings > 0 && (
          <SavingsBadge savings={pricing.totalSavings} />
        )}

        <div className="flex justify-between items-baseline pt-2">
          <span className="font-semibold">Total</span>
          <div className="text-right">
            {pricing.originalTotal > pricing.total && (
              <span className="text-sm text-muted-foreground line-through mr-2">
                ${pricing.originalTotal}
              </span>
            )}
            <span className="text-3xl font-bold text-emerald-600">
              ${pricing.total}
            </span>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="pt-3 border-t">
        <TrustBadgesMini />
      </div>
    </div>
  );
}

// Savings Badge Component
function SavingsBadge({ savings }: { savings: number }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
      <Tag className="h-4 w-4 text-emerald-600" />
      <span className="text-sm font-semibold text-emerald-700">
        You Save: ${savings}
      </span>
    </div>
  );
}

// Price Breakdown for mobile expansion
function PriceBreakdown({
  formState,
  pricing,
}: {
  formState: InstantQuoteFormState;
  pricing: ReturnType<typeof calculateTotalPrice>;
}) {
  const selectedBedroom = bedroomOptions.find(
    (b) => b.bedrooms === formState.bedrooms
  );

  return (
    <div className="space-y-2 text-sm">
      {/* Base */}
      {selectedBedroom && (
        <div className="flex justify-between">
          <span>{selectedBedroom.label} Clean</span>
          <div>
            <span className="text-muted-foreground line-through mr-1">
              ${pricing.originalBasePrice}
            </span>
            <span className="font-medium">${pricing.basePrice}</span>
          </div>
        </div>
      )}

      {/* Bundle */}
      {formState.bundleSelected && (
        <div className="flex justify-between text-emerald-700">
          <span>{bondBackBundle.name}</span>
          <span className="font-medium">${bondBackBundle.bundlePrice}</span>
        </div>
      )}

      {/* Extras */}
      {Object.entries(formState.selectedExtras).map(([extraId, qty]) => {
        if (qty === 0) return null;
        const extra = extraServices.find((e) => e.id === extraId);
        if (!extra) return null;
        if (formState.bundleSelected && bondBackBundle.includedExtras.includes(extraId)) {
          return null;
        }
        return (
          <div key={extraId} className="flex justify-between">
            <span>
              {extra.name} {qty > 1 && `x${qty}`}
            </span>
            <span className="font-medium">${extra.discountedPrice * qty}</span>
          </div>
        );
      })}

      {/* Same Day */}
      {formState.sameDayBooking && (
        <div className="flex justify-between text-amber-700">
          <span>Same Day Booking</span>
          <span className="font-medium">+${SAME_DAY_PREMIUM}</span>
        </div>
      )}

      {/* Cupboard Bundle Discount */}
      {hasCupboardBundleDiscount(formState.selectedExtras) && !formState.bundleSelected && (
        <div className="flex justify-between text-emerald-700">
          <span>Kitchen Cupboards Bundle</span>
          <span className="font-medium">-${CUPBOARD_BUNDLE_DISCOUNT}</span>
        </div>
      )}
    </div>
  );
}

// Re-export calculateTotal for use elsewhere
export { calculateTotalPrice };
