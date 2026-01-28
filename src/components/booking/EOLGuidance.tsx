import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, Sparkles, AlertCircle, Plus, Minus, Package, Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  extraServices,
  bondBackBundle,
  getExtrasByCategory,
  getCupboardBundleInfo,
  mostPopularExtras,
  CUPBOARD_BUNDLE_DISCOUNT,
  type InstantQuoteFormState,
  type ExtraService,
} from "@/lib/pricing-data";

interface EOLGuidanceProps {
  formState: InstantQuoteFormState;
  onUpdate: (updates: Partial<InstantQuoteFormState>) => void;
}

export function EOLGuidance({ formState, onUpdate }: EOLGuidanceProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [prevBedrooms, setPrevBedrooms] = useState(formState.bedrooms);
  const extrasByCategory = getExtrasByCategory();
  const cupboardBundleInfo = getCupboardBundleInfo(formState.selectedExtras);
  const isEOL = formState.selectedService === "end-of-lease";
  const isEmptyProperty = formState.furnished === "empty";

  // Filter function to hide extras that require furnished property when empty is selected
  const filterByFurnished = (extra: ExtraService): boolean => {
    // If property is empty, hide extras that require furnished (e.g., Bed Linen Change)
    if (isEmptyProperty && extra.requiresFurnished) {
      return false;
    }
    return true;
  };

  // Get most popular extras (filtered by furnished status)
  const popularExtras = extraServices
    .filter(e => mostPopularExtras.includes(e.id))
    .filter(filterByFurnished);

  // Auto-update room-based extras when bedroom count changes
  useEffect(() => {
    if (formState.bedrooms !== prevBedrooms && formState.bedrooms > 0) {
      const updatedExtras = { ...formState.selectedExtras };
      let hasChanges = false;

      // Find all room-based extras that are currently selected
      Object.keys(updatedExtras).forEach((extraId) => {
        const extra = extraServices.find(e => e.id === extraId);
        if (extra && extra.quantityType === "room" && updatedExtras[extraId] > 0) {
          // Update quantity to match bedroom count (respecting maxQty)
          const newQty = Math.min(formState.bedrooms, extra.maxQty || 10);
          if (updatedExtras[extraId] !== newQty) {
            updatedExtras[extraId] = newQty;
            hasChanges = true;
          }
        }
      });

      if (hasChanges) {
        onUpdate({ selectedExtras: updatedExtras });
      }
      setPrevBedrooms(formState.bedrooms);
    }
  }, [formState.bedrooms, formState.selectedExtras, prevBedrooms, onUpdate]);

  // Remove furniture-dependent extras when user switches to empty property
  useEffect(() => {
    if (isEmptyProperty) {
      const updatedExtras = { ...formState.selectedExtras };
      let hasChanges = false;

      // Find and remove any extras that require furnished property
      Object.keys(updatedExtras).forEach((extraId) => {
        const extra = extraServices.find(e => e.id === extraId);
        if (extra && extra.requiresFurnished) {
          delete updatedExtras[extraId];
          hasChanges = true;
        }
      });

      if (hasChanges) {
        onUpdate({ selectedExtras: updatedExtras });
      }
    }
  }, [isEmptyProperty]);

  const toggleExpanded = (extraId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(extraId)) {
        newSet.delete(extraId);
      } else {
        newSet.add(extraId);
      }
      return newSet;
    });
  };

  // Get initial quantity based on quantity type and bedrooms
  const getInitialQuantity = (extra: ExtraService): number => {
    if (extra.quantityType === "room" && formState.bedrooms > 0) {
      // Pre-fill with bedroom count for room-based items
      return Math.min(formState.bedrooms, extra.maxQty || 10);
    }
    return extra.minQty || 1;
  };

  const handleExtraToggle = (extraId: string, extra: ExtraService) => {
    const currentQty = formState.selectedExtras[extraId] || 0;
    if (currentQty === 0) {
      // For flat items, quantity is always 1
      const newQty = extra.quantityType === "flat" ? 1 : getInitialQuantity(extra);
      onUpdate({
        selectedExtras: { ...formState.selectedExtras, [extraId]: newQty },
      });
    } else {
      const { [extraId]: _, ...rest } = formState.selectedExtras;
      onUpdate({ selectedExtras: rest });
    }
  };

  const handleExtraQtyChange = (extraId: string, delta: number, extra: ExtraService) => {
    const currentQty = formState.selectedExtras[extraId] || 0;
    const newQty = Math.max(extra.minQty || 0, Math.min(extra.maxQty || 99, currentQty + delta));
    if (newQty === 0) {
      const { [extraId]: _, ...rest } = formState.selectedExtras;
      onUpdate({ selectedExtras: rest });
    } else {
      onUpdate({
        selectedExtras: { ...formState.selectedExtras, [extraId]: newQty },
      });
    }
  };

  const handleBundleToggle = () => {
    if (formState.bundleSelected) {
      // Remove bundle - also remove bundle items from extras
      const newExtras = { ...formState.selectedExtras };
      bondBackBundle.includedExtras.forEach((id) => {
        delete newExtras[id];
      });
      onUpdate({ bundleSelected: false, selectedExtras: newExtras });
    } else {
      onUpdate({ bundleSelected: true });
    }
  };

  // Render a single extra item
  const renderExtraItem = (extra: ExtraService, showInPopular: boolean = false) => {
    const qty = formState.selectedExtras[extra.id] || 0;
    const isSelected = qty > 0 || (formState.bundleSelected && extra.bundleIncluded);
    const isInBundle = formState.bundleSelected && extra.bundleIncluded;
    const isExpanded = expandedItems.has(extra.id);
    const isFlat = extra.quantityType === "flat";
    const canIncrement = !isFlat && extra.quantityType !== undefined;

    return (
      <div
        key={extra.id}
        className={cn(
          "rounded-lg border transition-all",
          isSelected
            ? "border-emerald-300 bg-emerald-50/50"
            : "border-border hover:border-emerald-200",
          isInBundle && "opacity-60"
        )}
      >
        <div className="flex items-center justify-between p-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm">{extra.name}</span>
              {extra.eolRecommended && isEOL && (
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              )}
              {showInPopular && extra.popular && (
                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              )}
              {isInBundle && (
                <span className="px-1.5 py-0.5 text-xs bg-emerald-100 text-emerald-700 rounded">
                  In Bundle
                </span>
              )}
              {/* Info button with tooltip on desktop, expands on mobile */}
              {extra.details && (
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpanded(extra.id);
                        }}
                        className={cn(
                          "p-1 rounded-full transition-all duration-200",
                          isExpanded
                            ? "bg-emerald-100 text-emerald-600 shadow-sm ring-1 ring-emerald-200"
                            : "text-muted-foreground hover:text-emerald-600 hover:bg-emerald-50"
                        )}
                      >
                        <Info className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="max-w-xs text-xs hidden md:block bg-white shadow-lg border border-gray-200 p-3 rounded-lg"
                    >
                      <p className="font-semibold text-gray-800 mb-1.5">What's included:</p>
                      <p className="text-gray-600 leading-relaxed">{extra.details}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {extra.description && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {extra.description}
              </p>
            )}
            {extra.eolTip && isEOL && (
              <p className="text-xs text-amber-600 mt-1">
                {extra.eolTip}
              </p>
            )}
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xs text-muted-foreground line-through">
                ${extra.originalPrice}
              </span>
              <span className="text-sm font-semibold text-emerald-600">
                ${extra.discountedPrice}
              </span>
              <span className="text-xs text-muted-foreground">
                {extra.unit}
              </span>
            </div>
          </div>

          {/* Quantity Controls - Different based on quantityType */}
          <div className="flex items-center gap-2 shrink-0 ml-3">
            {isInBundle ? (
              <span className="text-xs text-muted-foreground px-3">
                Included
              </span>
            ) : isSelected && canIncrement ? (
              // Show quantity controls for appliance, room, and unit types
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleExtraQtyChange(extra.id, -1, extra)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold text-sm">
                  {qty}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleExtraQtyChange(extra.id, 1, extra)}
                  disabled={extra.maxQty !== undefined && qty >= extra.maxQty}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : isSelected && isFlat ? (
              // Show "Added" button for flat items that are selected
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={() => handleExtraToggle(extra.id, extra)}
                className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-md shadow-emerald-200/50"
              >
                <Check className="h-4 w-4 mr-1" /> Added
              </Button>
            ) : (
              // Show "Add" button for unselected items
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleExtraToggle(extra.id, extra)}
                className="text-emerald-600 border-emerald-300 hover:bg-emerald-100"
              >
                Add
              </Button>
            )}
          </div>
        </div>
        
        {/* Expandable details section (mobile-friendly) */}
        {extra.details && isExpanded && (
          <div className="px-3 pb-3 -mt-1 md:hidden">
            <div className="p-3 bg-gradient-to-br from-emerald-50 to-white rounded-lg border border-emerald-100 shadow-sm">
              <p className="text-xs font-semibold text-emerald-800 mb-1.5">What's included:</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {extra.details}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Most Popular Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          <h3 className="font-semibold text-sm uppercase tracking-wide">
            Most Popular
          </h3>
        </div>
        <div className="space-y-2">
          {popularExtras.map((extra) => renderExtraItem(extra, true))}
        </div>
      </div>

      {/* EOL Bond Back Bundle */}
      {isEOL && (
        <div
          className={cn(
            "p-4 md:p-5 rounded-xl border-2 transition-all",
            formState.bundleSelected
              ? "border-emerald-500 bg-emerald-50 animate-bundle-glow"
              : "border-dashed border-emerald-300 bg-emerald-50/50 animate-bundle-border"
          )}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100">
              <Package className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-emerald-800">
                  {bondBackBundle.name}
                </h3>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500 text-white rounded-full">
                  Save ${bondBackBundle.savings}
                </span>
              </div>
              <p className="text-sm text-emerald-700 mt-1">
                {bondBackBundle.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {bondBackBundle.includedExtras.map((extraId) => {
                  const extra = extraServices.find((e) => e.id === extraId);
                  return extra ? (
                    <span
                      key={extraId}
                      className="px-2 py-0.5 text-xs bg-emerald-200 text-emerald-800 rounded-full"
                    >
                      {extra.name}
                    </span>
                  ) : null;
                })}
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-emerald-600 line-through">
                    ${bondBackBundle.originalTotal}
                  </span>
                  <span className="text-2xl font-bold text-emerald-700">
                    ${bondBackBundle.bundlePrice}
                  </span>
                </div>
                <Button
                  type="button"
                  onClick={handleBundleToggle}
                  variant={formState.bundleSelected ? "default" : "outline"}
                  className={cn(
                    formState.bundleSelected
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "border-emerald-500 text-emerald-700 hover:bg-emerald-100"
                  )}
                >
                  {formState.bundleSelected ? (
                    <>
                      <Check className="h-4 w-4 mr-1" /> Added
                    </>
                  ) : (
                    "Add Bundle"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Kitchen Cupboards Bundle Suggestion */}
      {cupboardBundleInfo.hasOnlyOne && !formState.bundleSelected && (
        <div className="flex items-start gap-3 p-4 bg-teal-50 border border-teal-200 rounded-lg animate-suggestion-pulse">
          <Info className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-teal-800">
              Complete your kitchen cupboards
            </p>
            <p className="text-xs text-teal-700 mt-1">
              Add {cupboardBundleInfo.hasOnlyOne === "inside" ? "outside" : "inside"} cupboards 
              and save ${CUPBOARD_BUNDLE_DISCOUNT} with our automatic bundle discount!
            </p>
          </div>
        </div>
      )}

      {/* Kitchen Cupboards Bundle Applied */}
      {cupboardBundleInfo.hasDiscount && !formState.bundleSelected && (
        <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg animate-bundle-glow">
          <Check className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-800">
              Kitchen Cupboards Bundle Applied!
            </p>
            <p className="text-xs text-emerald-700 mt-1">
              You saved ${CUPBOARD_BUNDLE_DISCOUNT} by adding both inside & outside cupboards
            </p>
          </div>
        </div>
      )}

      {/* EOL Recommended Extras Notice */}
      {isEOL && !formState.bundleSelected && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              Recommended for Bond Back
            </p>
            <p className="text-xs text-amber-700 mt-1">
              Items marked with a star are commonly required by real estate agents
            </p>
          </div>
        </div>
      )}

      {/* Extras by Category */}
      <div className="space-y-6">
        {Object.entries(extrasByCategory).map(([category, extras]) => {
          // Filter out extras that are:
          // 1. Already shown in Most Popular section
          // 2. Require furnished property when empty is selected
          const filteredExtras = extras
            .filter(e => !mostPopularExtras.includes(e.id))
            .filter(filterByFurnished);
          if (filteredExtras.length === 0) return null;
          
          return (
            <div key={category} className="space-y-3">
              <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">
                {category}
              </h3>
              <div className="space-y-2">
                {filteredExtras.map((extra) => renderExtraItem(extra))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
