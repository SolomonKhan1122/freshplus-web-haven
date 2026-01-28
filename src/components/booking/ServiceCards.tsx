import { cn } from "@/lib/utils";
import { Check, ArrowRight } from "lucide-react";
import { serviceCategories, type ServiceType, type ServiceCategory } from "@/lib/pricing-data";

interface ServiceCardsProps {
  selectedService: ServiceType | null;
  onServiceSelect: (serviceId: ServiceType) => void;
}

export function ServiceCards({ selectedService, onServiceSelect }: ServiceCardsProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          What service do you need?
        </h2>
        <p className="text-muted-foreground mt-1">
          Select a service to see instant pricing
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {serviceCategories.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={selectedService === service.id}
            onSelect={() => onServiceSelect(service.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface ServiceCardProps {
  service: ServiceCategory;
  isSelected: boolean;
  onSelect: () => void;
}

function ServiceCard({ service, isSelected, onSelect }: ServiceCardProps) {
  const Icon = service.icon;
  const isQuoteOnly = service.pricingMode === "quote-only";
  const isHourly = service.pricingMode === "hourly";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative flex flex-col p-4 md:p-5 rounded-xl border-2 text-left transition-all duration-200",
        "hover:border-emerald-400 hover:shadow-lg hover:scale-[1.02]",
        "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
        "min-h-[140px] md:min-h-[160px]",
        isSelected
          ? "border-emerald-500 bg-emerald-50 shadow-lg"
          : "border-border bg-card"
      )}
    >
      {/* Popular/Tag Badge */}
      {(service.popular || service.tag) && (
        <span
          className={cn(
            "absolute -top-2.5 right-3 px-2.5 py-0.5 text-xs font-semibold rounded-full",
            "bg-emerald-500 text-white"
          )}
        >
          {service.popular ? "Popular" : service.tag}
        </span>
      )}

      {/* Selection Indicator */}
      <div
        className={cn(
          "absolute top-3 left-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
          isSelected
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-muted-foreground/30"
        )}
      >
        {isSelected && <Check className="h-3 w-3" />}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 pl-6">
        {/* Icon and Name */}
        <div className="flex items-center gap-2 mb-2">
          <div
            className={cn(
              "p-2 rounded-lg transition-colors",
              isSelected ? "bg-emerald-100" : "bg-muted"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                isSelected ? "text-emerald-600" : "text-muted-foreground"
              )}
            />
          </div>
          <h3 className="font-semibold text-foreground text-sm md:text-base">
            {service.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">
          {service.description}
        </p>

        {/* Pricing */}
        <div className="mt-auto">
          {isQuoteOnly ? (
            <div className="flex items-center gap-1 text-emerald-600 font-medium text-sm">
              <span>Get Free Quote</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          ) : isHourly ? (
            <div className="flex items-baseline gap-1">
              <span className="text-lg md:text-xl font-bold text-emerald-600">
                ${service.startingPrice}
              </span>
              <span className="text-xs text-muted-foreground">
                {service.priceUnit}
              </span>
            </div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-muted-foreground line-through">
                ${service.startingPrice}
              </span>
              <span className="text-lg md:text-xl font-bold text-emerald-600">
                ${service.discountedPrice}
              </span>
              <span className="text-xs text-muted-foreground">
                {service.priceUnit}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

// Compact version for mobile bottom sheet
export function ServiceCardsCompact({
  selectedService,
  onServiceSelect,
}: ServiceCardsProps) {
  return (
    <div className="space-y-2">
      {serviceCategories.map((service) => {
        const Icon = service.icon;
        const isSelected = selectedService === service.id;
        const isQuoteOnly = service.pricingMode === "quote-only";

        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onServiceSelect(service.id)}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-lg border transition-all",
              isSelected
                ? "border-emerald-500 bg-emerald-50"
                : "border-border hover:border-emerald-300"
            )}
          >
            <div
              className={cn(
                "p-2 rounded-lg",
                isSelected ? "bg-emerald-100" : "bg-muted"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isSelected ? "text-emerald-600" : "text-muted-foreground"
                )}
              />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-medium text-sm">{service.name}</h4>
              {!isQuoteOnly && service.discountedPrice && (
                <p className="text-xs text-muted-foreground">
                  From ${service.discountedPrice}
                </p>
              )}
            </div>
            <div
              className={cn(
                "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                isSelected
                  ? "border-emerald-500 bg-emerald-500"
                  : "border-muted-foreground/30"
              )}
            >
              {isSelected && <Check className="h-3 w-3 text-white" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
