import { Shield, Award, Clock, MapPin, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadge {
  icon: typeof Shield;
  label: string;
  highlight?: boolean;
}

const trustBadges: TrustBadge[] = [
  { icon: Shield, label: "Fully Insured", highlight: true },
  { icon: Award, label: "100% Guarantee" },
  { icon: Clock, label: "12+ Years" },
  { icon: MapPin, label: "Melbourne Local" },
  { icon: Leaf, label: "Eco-Friendly" },
];

interface TrustBadgesProps {
  variant?: "horizontal" | "vertical" | "compact";
  className?: string;
}

export function TrustBadges({ variant = "horizontal", className }: TrustBadgesProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap gap-2 justify-center", className)}>
        {trustBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.label}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-muted/50 rounded-full"
            >
              <Icon className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-muted-foreground">
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={cn("space-y-2", className)}>
        {trustBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.label}
              className="flex items-center gap-3 text-sm"
            >
              <div className="p-1.5 rounded-lg bg-emerald-100">
                <Icon className="h-4 w-4 text-emerald-600" />
              </div>
              <span className="text-muted-foreground">{badge.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal (default)
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 md:gap-6 py-4 px-4 bg-muted/30 rounded-xl",
        className
      )}
    >
      {trustBadges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div
            key={badge.label}
            className={cn(
              "flex items-center gap-2",
              badge.highlight && "text-emerald-600"
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4 md:h-5 md:w-5",
                badge.highlight ? "text-emerald-600" : "text-muted-foreground"
              )}
            />
            <span
              className={cn(
                "text-xs md:text-sm font-medium",
                badge.highlight ? "text-emerald-600" : "text-muted-foreground"
              )}
            >
              {badge.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// Mini version for price summary
export function TrustBadgesMini() {
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-1">
        <Shield className="h-3.5 w-3.5 text-emerald-500" />
        <span>Insured</span>
      </div>
      <div className="flex items-center gap-1">
        <Award className="h-3.5 w-3.5 text-emerald-500" />
        <span>Guaranteed</span>
      </div>
      <div className="flex items-center gap-1">
        <Leaf className="h-3.5 w-3.5 text-emerald-500" />
        <span>Eco</span>
      </div>
    </div>
  );
}
