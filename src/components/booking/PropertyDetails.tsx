import { cn } from "@/lib/utils";
import { Check, Home, Building2, Sofa, Package } from "lucide-react";
import { 
  propertyTypes, 
  bedroomOptions, 
  bathroomOptions,
  type InstantQuoteFormState 
} from "@/lib/pricing-data";
import { Label } from "@/components/ui/label";

interface PropertyDetailsProps {
  formState: InstantQuoteFormState;
  onUpdate: (updates: Partial<InstantQuoteFormState>) => void;
  showFurnished?: boolean;
}

export function PropertyDetails({ 
  formState, 
  onUpdate, 
  showFurnished = false 
}: PropertyDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Property Type */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Property Type</Label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {propertyTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => onUpdate({ propertyType: type.id })}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all",
                "hover:border-emerald-400",
                formState.propertyType === type.id
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-border"
              )}
            >
              <span className="text-2xl">{type.icon}</span>
              <span className="text-xs font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Number of Bedrooms</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {bedroomOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onUpdate({ bedrooms: option.bedrooms })}
              className={cn(
                "relative flex flex-col p-3 rounded-lg border-2 transition-all text-left",
                "hover:border-emerald-400",
                formState.bedrooms === option.bedrooms
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-border"
              )}
            >
              {option.popular && (
                <span className="absolute -top-2 right-2 px-2 py-0.5 text-xs font-semibold bg-emerald-500 text-white rounded-full">
                  Popular
                </span>
              )}
              <div className="flex items-center justify-between">
                <span className="font-semibold">{option.label}</span>
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2 flex items-center justify-center",
                    formState.bedrooms === option.bedrooms
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-muted-foreground/30"
                  )}
                >
                  {formState.bedrooms === option.bedrooms && (
                    <Check className="h-2.5 w-2.5 text-white" />
                  )}
                </div>
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {option.description}
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-xs text-muted-foreground line-through">
                  ${option.originalPrice}
                </span>
                <span className="text-lg font-bold text-emerald-600">
                  ${option.discountedPrice}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Number of Bathrooms</Label>
        <div className="flex flex-wrap gap-2">
          {bathroomOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onUpdate({ bathrooms: option.value })}
              className={cn(
                "px-4 py-2.5 rounded-full border-2 font-medium transition-all",
                "hover:border-emerald-400",
                formState.bathrooms === option.value
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-border"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Furnished/Empty (for EOL) */}
      {showFurnished && (
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            Is the property furnished or empty?
          </Label>
          <p className="text-sm text-muted-foreground">
            This helps us recommend the right extras for your bond back
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onUpdate({ furnished: "furnished" })}
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg border-2 transition-all",
                "hover:border-emerald-400",
                formState.furnished === "furnished"
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-border"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-lg",
                  formState.furnished === "furnished"
                    ? "bg-emerald-100"
                    : "bg-muted"
                )}
              >
                <Sofa
                  className={cn(
                    "h-6 w-6",
                    formState.furnished === "furnished"
                      ? "text-emerald-600"
                      : "text-muted-foreground"
                  )}
                />
              </div>
              <div className="text-left">
                <span className="font-semibold block">Furnished</span>
                <span className="text-xs text-muted-foreground">
                  With furniture
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onUpdate({ furnished: "empty" })}
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg border-2 transition-all",
                "hover:border-emerald-400",
                formState.furnished === "empty"
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-border"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-lg",
                  formState.furnished === "empty"
                    ? "bg-emerald-100"
                    : "bg-muted"
                )}
              >
                <Package
                  className={cn(
                    "h-6 w-6",
                    formState.furnished === "empty"
                      ? "text-emerald-600"
                      : "text-muted-foreground"
                  )}
                />
              </div>
              <div className="text-left">
                <span className="font-semibold block">Empty</span>
                <span className="text-xs text-muted-foreground">
                  All moved out
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
