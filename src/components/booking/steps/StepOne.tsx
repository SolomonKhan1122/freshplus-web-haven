import React from "react";
import { Check, Minus, Plus, ChevronDown, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FormState, ServiceOption, FrequencyOption, ExtraService } from "@/lib/pricing-data";

interface StepOneProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  services: ServiceOption[];
  frequencies: FrequencyOption[];
  extras: ExtraService[];
}

export function StepOne({ formState, setFormState, services, frequencies, extras }: StepOneProps) {
  const handleServiceSelect = (serviceId: string) => {
    setFormState((prev) => ({ ...prev, selectedService: serviceId }));
  };

  const handleFrequencySelect = (frequencyId: string) => {
    setFormState((prev) => ({ ...prev, selectedFrequency: frequencyId }));
  };

  const handleExtraToggle = (extraId: string, extra: ExtraService) => {
    setFormState((prev) => {
      const currentQty = prev.selectedExtras[extraId] || 0;
      if (currentQty === 0) {
        const newQty = extra.minQty || 1;
        return { ...prev, selectedExtras: { ...prev.selectedExtras, [extraId]: newQty } };
      }
      const { [extraId]: _, ...rest } = prev.selectedExtras;
      return { ...prev, selectedExtras: rest };
    });
  };

  const handleExtraQtyChange = (extraId: string, delta: number, extra: ExtraService) => {
    setFormState((prev) => {
      const currentQty = prev.selectedExtras[extraId] || 0;
      const newQty = Math.max(extra.minQty || 0, currentQty + delta);
      if (newQty === 0) {
        const { [extraId]: _, ...rest } = prev.selectedExtras;
        return { ...prev, selectedExtras: rest };
      }
      return { ...prev, selectedExtras: { ...prev.selectedExtras, [extraId]: newQty } };
    });
  };

  const selectedExtrasCount = Object.values(formState.selectedExtras).filter((v) => v > 0).length;

  // Group extras by category
  const extrasByCategory = extras.reduce(
    (acc, extra) => {
      if (!acc[extra.category]) acc[extra.category] = [];
      acc[extra.category].push(extra);
      return acc;
    },
    {} as Record<string, ExtraService[]>
  );

  const categoryOrder = ["Recommended", "Kitchen", "Windows", "Deep Clean", "Move In/Out", "General", "Supplies & Special"];

  return (
    <div className="space-y-8">
      {/* Service Selection */}
      <section>
        <h2 className="text-lg font-semibold mb-1">Choose Your Service</h2>
        <p className="text-sm text-muted-foreground mb-4">Select your home size for an instant quote</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {services.map((service) => {
            const isSelected = formState.selectedService === service.id;
            const isPopular = service.id === "3bed";
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => handleServiceSelect(service.id)}
                className={cn(
                  "relative flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 hover:border-emerald-400 hover:shadow-md",
                  isSelected ? "border-emerald-500 bg-emerald-50 shadow-md" : "border-border bg-card"
                )}
              >
                {isPopular && (
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                    Popular
                  </span>
                )}
                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    isSelected ? "border-emerald-500 bg-emerald-500 text-white" : "border-muted-foreground/30"
                  )}
                >
                  {isSelected && <Check className="h-3 w-3" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">{service.name}</div>
                  <div className="text-xs text-muted-foreground">{service.description}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold text-emerald-600">${service.price}</div>
                  <div className="text-xs text-muted-foreground">{service.unit}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Hours slider for hourly service */}
        {formState.selectedService === "hourly" && (
          <div className="mt-4 p-4 rounded-xl bg-muted/50">
            <label className="text-sm font-medium mb-3 block">
              How many hours? <span className="text-emerald-600 font-bold">{formState.hours} hours</span>
            </label>
            <input
              type="range"
              min="1"
              max="8"
              value={formState.hours}
              onChange={(e) => setFormState((prev) => ({ ...prev, hours: Number(e.target.value) }))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1h</span>
              <span>8h</span>
            </div>
          </div>
        )}
      </section>

      {/* Frequency Selection */}
      <section>
        <h2 className="text-lg font-semibold mb-1">How Often?</h2>
        <p className="text-sm text-muted-foreground mb-4">Save up to 10% with recurring cleans</p>
        <div className="flex flex-wrap gap-2">
          {frequencies.map((freq) => {
            const isSelected = formState.selectedFrequency === freq.id;
            return (
              <button
                key={freq.id}
                type="button"
                onClick={() => handleFrequencySelect(freq.id)}
                className={cn(
                  "relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                  isSelected
                    ? "bg-emerald-500 text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {freq.name}
                {freq.discount > 0 && (
                  <span
                    className={cn(
                      "ml-1.5 text-xs",
                      isSelected ? "text-white/80" : "text-emerald-600"
                    )}
                  >
                    -{freq.discount}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {formState.selectedFrequency !== "once" && (
          <p className="mt-3 text-xs text-emerald-600 flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5" />
            Discount applies from 2nd service onwards
          </p>
        )}
      </section>

      {/* Extras Accordion */}
      <section>
        <button
          type="button"
          onClick={() => setFormState((prev) => ({ ...prev, showExtras: !prev.showExtras }))}
          className="flex items-center justify-between w-full p-4 rounded-xl border bg-card hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-emerald-600" />
            <div className="text-left">
              <span className="font-semibold">Add Extras</span>
              {selectedExtrasCount > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-emerald-100 text-emerald-600 rounded-full">
                  {selectedExtrasCount} selected
                </span>
              )}
            </div>
          </div>
          <ChevronDown
            className={cn("h-5 w-5 text-muted-foreground transition-transform duration-200", formState.showExtras && "rotate-180")}
          />
        </button>

        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            formState.showExtras ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          <div className="space-y-6">
            {categoryOrder.map((category) => {
              const categoryExtras = extrasByCategory[category];
              if (!categoryExtras) return null;
              return (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">{category}</h3>
                  <div className="space-y-2">
                    {categoryExtras.map((extra) => {
                      const qty = formState.selectedExtras[extra.id] || 0;
                      const isSelected = qty > 0;
                      return (
                        <div
                          key={extra.id}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-lg border transition-all",
                            isSelected ? "border-emerald-400 bg-emerald-50" : "border-border bg-card"
                          )}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-medium text-sm">{extra.name}</span>
                                {extra.badge && (
                                  <span className="px-1.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded">
                                    {extra.badge}
                                  </span>
                                )}
                                {extra.recommended && (
                                  <span className="px-1.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded">
                                    Recommended
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                ${extra.price.toFixed(2)} {extra.unit}
                                {extra.minQty && ` (min ${extra.minQty})`}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {isSelected ? (
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-transparent"
                                  onClick={() => handleExtraQtyChange(extra.id, -1, extra)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center font-semibold text-sm">{qty}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-transparent"
                                  onClick={() => handleExtraQtyChange(extra.id, 1, extra)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <Button
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
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
