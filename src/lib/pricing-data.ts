import { Home, Building2, Sparkles, Key, Droplets, Sun, Grid3X3, Wind, Brush } from "lucide-react";

// Constants
export const DISCOUNT_PERCENT = 10;
export const SAME_DAY_PREMIUM = 40;
export const HOURLY_RATE = 70;
export const CUPBOARD_BUNDLE_DISCOUNT = 8; // $8 off when both inside + outside cupboards added

// Apply discount helper
export const applyDiscount = (price: number): number => {
  return Math.round(price * (1 - DISCOUNT_PERCENT / 100));
};

export const calculateSavings = (originalPrice: number, discountedPrice: number): number => {
  return originalPrice - discountedPrice;
};

// Service Types
export type ServiceType = 
  | "residential" 
  | "end-of-lease" 
  | "commercial" 
  | "deep-cleaning"
  | "carpet-cleaning"
  | "window-cleaning"
  | "pressure-washing"
  | "solar-panel"
  | "tile-grout";

export type PricingMode = "instant" | "quote-only" | "hourly";

export interface ServiceCategory {
  id: ServiceType;
  name: string;
  description: string;
  icon: typeof Home;
  pricingMode: PricingMode;
  startingPrice?: number; // Original competitor price
  discountedPrice?: number; // Your price (10% off)
  priceUnit?: string;
  popular?: boolean;
  tag?: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "residential",
    name: "Residential Cleaning",
    description: "Regular home cleaning with bedroom-based pricing",
    icon: Home,
    pricingMode: "instant",
    startingPrice: 169,
    discountedPrice: applyDiscount(169),
    priceUnit: "from",
    popular: true,
  },
  {
    id: "end-of-lease",
    name: "End of Lease Cleaning",
    description: "Bond-back guarantee cleaning for rental properties",
    icon: Key,
    pricingMode: "instant",
    startingPrice: 219,
    discountedPrice: applyDiscount(219),
    priceUnit: "from",
    tag: "Bond Back Guarantee",
  },
  {
    id: "deep-cleaning",
    name: "Deep Cleaning",
    description: "Intensive cleaning for heavily soiled areas",
    icon: Sparkles,
    pricingMode: "instant",
    startingPrice: 249,
    discountedPrice: applyDiscount(249),
    priceUnit: "from",
  },
  {
    id: "commercial",
    name: "Commercial Cleaning",
    description: "Office, warehouse & retail cleaning",
    icon: Building2,
    pricingMode: "hourly",
    startingPrice: HOURLY_RATE,
    priceUnit: "per hour",
  },
  {
    id: "carpet-cleaning",
    name: "Carpet & Rug Cleaning",
    description: "Steam & dry carpet cleaning",
    icon: Wind,
    pricingMode: "quote-only",
    tag: "Free Quote",
  },
  {
    id: "window-cleaning",
    name: "Window Cleaning",
    description: "Interior & exterior window cleaning",
    icon: Grid3X3,
    pricingMode: "quote-only",
    tag: "Free Quote",
  },
  {
    id: "pressure-washing",
    name: "Pressure Washing",
    description: "Driveways, patios & exterior surfaces",
    icon: Droplets,
    pricingMode: "quote-only",
    tag: "Free Quote",
  },
  {
    id: "solar-panel",
    name: "Solar Panel Cleaning",
    description: "Professional solar panel cleaning",
    icon: Sun,
    pricingMode: "quote-only",
    tag: "Free Quote",
  },
  {
    id: "tile-grout",
    name: "Tile & Grout Cleaning",
    description: "Deep cleaning for tiles and grout",
    icon: Brush,
    pricingMode: "quote-only",
    tag: "Free Quote",
  },
];

// Bedroom-based pricing for residential/EOL/deep cleaning
export interface BedroomOption {
  id: string;
  bedrooms: number;
  label: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  popular?: boolean;
}

export const bedroomOptions: BedroomOption[] = [
  {
    id: "1bed",
    bedrooms: 1,
    label: "1 Bedroom",
    description: "Studio or 1 bedroom apartment",
    originalPrice: 169,
    discountedPrice: applyDiscount(169),
    savings: calculateSavings(169, applyDiscount(169)),
  },
  {
    id: "2bed",
    bedrooms: 2,
    label: "2 Bedrooms",
    description: "Perfect for couples or small families",
    originalPrice: 189,
    discountedPrice: applyDiscount(189),
    savings: calculateSavings(189, applyDiscount(189)),
  },
  {
    id: "3bed",
    bedrooms: 3,
    label: "3 Bedrooms",
    description: "Most popular family home size",
    originalPrice: 219,
    discountedPrice: applyDiscount(219),
    savings: calculateSavings(219, applyDiscount(219)),
    popular: true,
  },
  {
    id: "4bed",
    bedrooms: 4,
    label: "4 Bedrooms",
    description: "Large family homes",
    originalPrice: 259,
    discountedPrice: applyDiscount(259),
    savings: calculateSavings(259, applyDiscount(259)),
  },
  {
    id: "5bed",
    bedrooms: 5,
    label: "5 Bedrooms",
    description: "Extra large properties",
    originalPrice: 309,
    discountedPrice: applyDiscount(309),
    savings: calculateSavings(309, applyDiscount(309)),
  },
  {
    id: "6bed",
    bedrooms: 6,
    label: "6+ Bedrooms",
    description: "Mansion-level properties",
    originalPrice: 339,
    discountedPrice: applyDiscount(339),
    savings: calculateSavings(339, applyDiscount(339)),
  },
];

// Property Types
export interface PropertyType {
  id: string;
  label: string;
  icon: string;
}

export const propertyTypes: PropertyType[] = [
  { id: "house", label: "House", icon: "🏠" },
  { id: "apartment", label: "Apartment", icon: "🏢" },
  { id: "unit", label: "Unit", icon: "🏘️" },
  { id: "townhouse", label: "Townhouse", icon: "🏡" },
  { id: "villa", label: "Villa", icon: "🏛️" },
];

// Bathroom options
export const bathroomOptions = [
  { id: "1bath", value: 1, label: "1 Bathroom" },
  { id: "2bath", value: 2, label: "2 Bathrooms" },
  { id: "3bath", value: 3, label: "3 Bathrooms" },
  { id: "4bath", value: 4, label: "4+ Bathrooms" },
];

// Quantity types for extras
export type QuantityType = "flat" | "appliance" | "room" | "unit";

// Extra Services with quantities
export interface ExtraService {
  id: string;
  name: string;
  description?: string;
  details?: string; // Expanded "What's included" info
  originalPrice: number;
  discountedPrice: number;
  unit: string;
  category: string;
  quantityType: QuantityType; // Controls how quantity selection works
  minQty?: number;
  maxQty?: number;
  popular?: boolean;
  eolRecommended?: boolean;
  eolTip?: string;
  bundleIncluded?: boolean;
  requiresFurnished?: boolean; // If true, only show when property is furnished (hide for empty)
}

export const extraServices: ExtraService[] = [
  // Kitchen Extras
  {
    id: "oven",
    name: "Oven Deep Clean",
    description: "Full oven degreasing & restoration",
    details: "Includes racks, trays, glass door (inside & out), cavity walls, and element covers",
    originalPrice: 75,
    discountedPrice: applyDiscount(75),
    unit: "each",
    category: "Kitchen",
    quantityType: "appliance",
    maxQty: 2,
    popular: true,
    eolRecommended: true,
    eolTip: "Required by most agents",
    bundleIncluded: true,
  },
  {
    id: "fridge",
    name: "Fridge Interior Clean",
    description: "Complete fridge sanitisation",
    details: "All shelves, drawers, door seals, and compartments cleaned & deodorised",
    originalPrice: 39,
    discountedPrice: applyDiscount(39),
    unit: "each",
    category: "Kitchen",
    quantityType: "appliance",
    maxQty: 2,
    eolRecommended: true,
    eolTip: "Required by most agents",
    bundleIncluded: true,
  },
  {
    id: "cabinets-inside",
    name: "All Kitchen Cupboards (Inside)",
    description: "Every cupboard & drawer interior",
    details: "All cabinet interiors wiped clean - shelves, bases, and inner walls (must be emptied)",
    originalPrice: 45,
    discountedPrice: applyDiscount(45),
    unit: "whole kitchen",
    category: "Kitchen",
    quantityType: "flat",
    eolRecommended: true,
    eolTip: "Recommended for bond back",
  },
  {
    id: "cabinets-outside",
    name: "All Kitchen Cupboards (Outside)",
    description: "Cabinet fronts, edges & handles",
    details: "All cabinet doors, drawer fronts, handles and visible exterior surfaces cleaned",
    originalPrice: 35,
    discountedPrice: applyDiscount(35),
    unit: "whole kitchen",
    category: "Kitchen",
    quantityType: "flat",
  },
  {
    id: "dishwasher",
    name: "Dishwasher Clean",
    description: "Interior & filter sanitisation",
    details: "Door seal, filter, spray arms, interior walls and detergent compartment",
    originalPrice: 29,
    discountedPrice: applyDiscount(29),
    unit: "each",
    category: "Kitchen",
    quantityType: "flat",
  },
  {
    id: "rangehood",
    name: "Rangehood & Filters",
    description: "Degreasing & filter restoration",
    details: "Hood exterior, filters (soaked & degreased), motor cover, and light covers",
    originalPrice: 45,
    discountedPrice: applyDiscount(45),
    unit: "each",
    category: "Kitchen",
    quantityType: "flat",
    eolRecommended: true,
    eolTip: "Often overlooked but checked",
  },

  // Windows & Blinds
  {
    id: "windows-inside",
    name: "All Inside Windows",
    description: "Every window interior surface",
    details: "Glass, frames, sills, tracks and handles on all accessible windows throughout the property",
    originalPrice: 79,
    discountedPrice: applyDiscount(79),
    unit: "whole property",
    category: "Windows",
    quantityType: "flat",
    popular: true,
    eolRecommended: true,
    eolTip: "Required by most agents",
    bundleIncluded: true,
  },
  {
    id: "windows-outside",
    name: "All Outside Windows",
    description: "Exterior glass & frames",
    details: "External glass surfaces on all accessible windows (ground floor or balcony access)",
    originalPrice: 119,
    discountedPrice: applyDiscount(119),
    unit: "whole property",
    category: "Windows",
    quantityType: "flat",
  },
  {
    id: "blinds",
    name: "Blinds (Wet Wipe)",
    description: "Each slat individually wiped",
    details: "Every slat cleaned both sides - works on venetian, timber, and vertical blinds",
    originalPrice: 29,
    discountedPrice: applyDiscount(29),
    unit: "per room",
    category: "Windows",
    quantityType: "room",
    maxQty: 10,
    popular: true,
    eolRecommended: true,
    eolTip: "Recommended for bond back",
    bundleIncluded: true,
  },
  {
    id: "fly-screens",
    name: "Fly Screens",
    description: "Removed, scrubbed & refitted",
    details: "Screens taken out, washed with soap & water, dried and reinstalled",
    originalPrice: 5,
    discountedPrice: applyDiscount(5),
    unit: "each",
    category: "Windows",
    quantityType: "unit",
    maxQty: 20,
  },

  // Walls & Surfaces
  {
    id: "walls",
    name: "Wall Spot Clean",
    description: "Marks, scuffs & fingerprints",
    details: "Targeted removal of visible marks, handprints, and light scuffs using appropriate cleaning methods",
    originalPrice: 29,
    discountedPrice: applyDiscount(29),
    unit: "per room",
    category: "Walls",
    quantityType: "room",
    maxQty: 10,
    eolRecommended: true,
    eolTip: "Check for marks and scuffs",
    bundleIncluded: true,
  },
  {
    id: "walls-full",
    name: "Full Wall Wash",
    description: "Complete wall surface clean",
    details: "Top-to-bottom wall washing for heavily marked walls - ideal for smoker or cooking residue",
    originalPrice: 49,
    discountedPrice: applyDiscount(49),
    unit: "per room",
    category: "Walls",
    quantityType: "room",
    maxQty: 10,
  },
  {
    id: "skirting",
    name: "Skirting Boards",
    description: "All skirting throughout home",
    details: "Every skirting board in all rooms wiped clean of dust, marks and grime",
    originalPrice: 25,
    discountedPrice: applyDiscount(25),
    unit: "whole property",
    category: "Walls",
    quantityType: "flat",
    eolRecommended: true,
    eolTip: "Often inspected by agents",
  },

  // Floors
  {
    id: "carpet-steam",
    name: "Carpet Steam Clean",
    description: "Hot water extraction clean",
    details: "Professional machine deep cleans carpet fibres - removes stains, odours, and allergens",
    originalPrice: 55,
    discountedPrice: applyDiscount(55),
    unit: "per room",
    category: "Floors",
    quantityType: "room",
    minQty: 1,
    maxQty: 10,
    popular: true,
    eolRecommended: true,
    eolTip: "Usually required for bond",
  },
  {
    id: "tile-scrub",
    name: "Tile & Grout Scrub",
    description: "Deep grout line restoration",
    details: "Tile floor scrubbing with grout line detailing - removes built-up grime and discolouration",
    originalPrice: 45,
    discountedPrice: applyDiscount(45),
    unit: "per room",
    category: "Floors",
    quantityType: "unit",
    maxQty: 6,
  },
  {
    id: "balcony",
    name: "Balcony / Courtyard",
    description: "Outdoor area refresh",
    details: "Sweep, mop hard surfaces, wipe balustrades and remove cobwebs",
    originalPrice: 39,
    discountedPrice: applyDiscount(39),
    unit: "each",
    category: "Floors",
    quantityType: "unit",
    maxQty: 3,
    eolRecommended: true,
    eolTip: "Don't forget outdoor areas",
  },

  // Bathroom Extras
  {
    id: "bathroom-deep",
    name: "Extra Bathroom Deep Clean",
    description: "Additional bathroom beyond base",
    details: "Full clean of additional bathroom - toilet, shower/bath, vanity, mirror, floors and fixtures",
    originalPrice: 45,
    discountedPrice: applyDiscount(45),
    unit: "each",
    category: "Bathroom",
    quantityType: "unit",
    maxQty: 4,
  },
  {
    id: "toilet-extra",
    name: "Extra Toilet / WC",
    description: "Separate toilet room",
    details: "For standalone powder rooms or separate WCs not part of a bathroom",
    originalPrice: 20,
    discountedPrice: applyDiscount(20),
    unit: "each",
    category: "Bathroom",
    quantityType: "unit",
    maxQty: 4,
  },
  {
    id: "shower-mould",
    name: "Shower Mould Treatment",
    description: "Mould & mildew removal",
    details: "Specialised treatment for grout, silicone, and tile mould - includes prevention treatment",
    originalPrice: 35,
    discountedPrice: applyDiscount(35),
    unit: "per shower",
    category: "Bathroom",
    quantityType: "unit",
    maxQty: 4,
  },

  // Laundry & Other
  {
    id: "laundry-room",
    name: "Laundry Room",
    description: "Complete laundry clean",
    details: "Tub/sink, benchtops, cupboard fronts, lint filters, floor and wall splash areas",
    originalPrice: 35,
    discountedPrice: applyDiscount(35),
    unit: "flat",
    category: "Other",
    quantityType: "flat",
    eolRecommended: true,
    eolTip: "Often forgotten but checked",
  },
  {
    id: "garage",
    name: "Garage Sweep & Tidy",
    description: "Floor sweep & cobweb removal",
    details: "Floor swept, cobwebs removed from corners and ceiling, light fittings dusted",
    originalPrice: 45,
    discountedPrice: applyDiscount(45),
    unit: "each",
    category: "Other",
    quantityType: "unit",
    maxQty: 2,
  },
  {
    id: "linen-change",
    name: "Bed Linen Change",
    description: "Fresh sheets & pillow cases",
    details: "Old linen removed, fresh linen fitted including hospital corners, bed made presentation-ready",
    originalPrice: 15,
    discountedPrice: applyDiscount(15),
    unit: "per bed",
    category: "Other",
    quantityType: "unit",
    maxQty: 6,
    requiresFurnished: true, // Only show for furnished properties (no beds in empty property)
  },
];

// Most popular extras IDs for the "Most Popular" section
export const mostPopularExtras = ["oven", "carpet-steam", "windows-inside", "fridge", "blinds"];

// Check if cupboard bundle discount should be applied
export const hasCupboardBundleDiscount = (selectedExtras: Record<string, number>): boolean => {
  const hasInside = (selectedExtras["cabinets-inside"] || 0) > 0;
  const hasOutside = (selectedExtras["cabinets-outside"] || 0) > 0;
  return hasInside && hasOutside;
};

// Get cupboard bundle info for display
export const getCupboardBundleInfo = (selectedExtras: Record<string, number>): {
  hasDiscount: boolean;
  hasOnlyOne: "inside" | "outside" | null;
  discountAmount: number;
  originalTotal: number;
  bundleTotal: number;
} => {
  const insideExtra = extraServices.find(e => e.id === "cabinets-inside");
  const outsideExtra = extraServices.find(e => e.id === "cabinets-outside");
  
  const hasInside = (selectedExtras["cabinets-inside"] || 0) > 0;
  const hasOutside = (selectedExtras["cabinets-outside"] || 0) > 0;
  
  const originalTotal = (insideExtra?.discountedPrice || 0) + (outsideExtra?.discountedPrice || 0);
  const bundleTotal = originalTotal - CUPBOARD_BUNDLE_DISCOUNT;
  
  return {
    hasDiscount: hasInside && hasOutside,
    hasOnlyOne: hasInside && !hasOutside ? "inside" : (!hasInside && hasOutside ? "outside" : null),
    discountAmount: CUPBOARD_BUNDLE_DISCOUNT,
    originalTotal,
    bundleTotal,
  };
};

// Bond Back Bundle - pre-configured package for EOL
export interface BundlePackage {
  id: string;
  name: string;
  description: string;
  includedExtras: string[];
  originalTotal: number;
  bundlePrice: number;
  savings: number;
}

export const bondBackBundle: BundlePackage = {
  id: "bond-back-bundle",
  name: "Bond Back Bundle",
  description: "Most common extras required by agents - save when bundled!",
  includedExtras: ["oven", "fridge", "windows-inside", "blinds", "walls"],
  originalTotal: 75 + 39 + 79 + 29 + 29, // Sum of original prices
  bundlePrice: applyDiscount(75 + 39 + 79 + 29 + 29) - 20, // Extra $20 bundle discount
  savings: (75 + 39 + 79 + 29 + 29) - (applyDiscount(75 + 39 + 79 + 29 + 29) - 20),
};

// Frequency options (for recurring residential)
export interface FrequencyOption {
  id: string;
  name: string;
  discount: number;
  description?: string;
}

export const frequencyOptions: FrequencyOption[] = [
  { id: "once", name: "One Time", discount: 0 },
  { id: "weekly", name: "Weekly", discount: 15, description: "Best value" },
  { id: "fortnightly", name: "Fortnightly", discount: 10, description: "Popular" },
  { id: "monthly", name: "Monthly", discount: 5 },
];

// Time Slots
export interface TimeSlot {
  id: string;
  label: string;
  description: string;
}

export const timeSlots: TimeSlot[] = [
  { id: "morning", label: "Morning", description: "8:00 AM - 12:00 PM" },
  { id: "afternoon", label: "Afternoon", description: "12:00 PM - 5:00 PM" },
  { id: "flexible", label: "Flexible", description: "Any time works" },
];

// Form State Interface
export interface InstantQuoteFormState {
  // Step 1: Service Selection
  selectedService: ServiceType | null;
  
  // Step 2: Property Details
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  furnished: "furnished" | "empty" | null;
  
  // Step 3: Extras
  selectedExtras: Record<string, number>; // extra id -> quantity
  bundleSelected: boolean;
  
  // Step 4: Contact & Schedule
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  postcode: string;
  preferredDate: Date | null;
  preferredTime: string;
  sameDayBooking: boolean;
  comments: string;
  
  // Form state
  currentSection: number;
  isSubmitting: boolean;
  isComplete: boolean;
}

export const initialFormState: InstantQuoteFormState = {
  selectedService: null,
  propertyType: "",
  bedrooms: 0,
  bathrooms: 1,
  furnished: null,
  selectedExtras: {},
  bundleSelected: false,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  suburb: "",
  postcode: "",
  preferredDate: null,
  preferredTime: "",
  sameDayBooking: false,
  comments: "",
  currentSection: 0,
  isSubmitting: false,
  isComplete: false,
};

// Price calculation helper
export const calculateTotalPrice = (
  formState: InstantQuoteFormState,
  bedroomOptions: BedroomOption[],
  extraServices: ExtraService[],
  bondBackBundle: BundlePackage
): {
  basePrice: number;
  originalBasePrice: number;
  extrasTotal: number;
  originalExtrasTotal: number;
  sameDayFee: number;
  cupboardBundleDiscount: number;
  total: number;
  originalTotal: number;
  totalSavings: number;
} => {
  let basePrice = 0;
  let originalBasePrice = 0;
  let extrasTotal = 0;
  let originalExtrasTotal = 0;
  
  // Base price from bedroom selection
  if (formState.bedrooms > 0) {
    const bedroom = bedroomOptions.find(b => b.bedrooms === formState.bedrooms);
    if (bedroom) {
      basePrice = bedroom.discountedPrice;
      originalBasePrice = bedroom.originalPrice;
    }
  }
  
  // Extras calculation
  if (formState.bundleSelected) {
    extrasTotal += bondBackBundle.bundlePrice;
    originalExtrasTotal += bondBackBundle.originalTotal;
  }
  
  // Individual extras
  Object.entries(formState.selectedExtras).forEach(([extraId, qty]) => {
    if (qty > 0) {
      const extra = extraServices.find(e => e.id === extraId);
      if (extra) {
        // Skip bundle items if bundle is selected
        if (formState.bundleSelected && bondBackBundle.includedExtras.includes(extraId)) {
          return;
        }
        extrasTotal += extra.discountedPrice * qty;
        originalExtrasTotal += extra.originalPrice * qty;
      }
    }
  });
  
  // Apply cupboard bundle discount if both inside and outside are selected
  const cupboardBundleDiscount = hasCupboardBundleDiscount(formState.selectedExtras) ? CUPBOARD_BUNDLE_DISCOUNT : 0;
  
  const sameDayFee = formState.sameDayBooking ? SAME_DAY_PREMIUM : 0;
  const total = basePrice + extrasTotal + sameDayFee - cupboardBundleDiscount;
  const originalTotal = originalBasePrice + originalExtrasTotal + sameDayFee;
  const totalSavings = originalTotal - total;
  
  return {
    basePrice,
    originalBasePrice,
    extrasTotal,
    originalExtrasTotal,
    sameDayFee,
    cupboardBundleDiscount,
    total,
    originalTotal,
    totalSavings,
  };
};

// Export grouped extras by category
export const getExtrasByCategory = (): Record<string, ExtraService[]> => {
  return extraServices.reduce((acc, extra) => {
    if (!acc[extra.category]) {
      acc[extra.category] = [];
    }
    acc[extra.category].push(extra);
    return acc;
  }, {} as Record<string, ExtraService[]>);
};

// Get EOL recommended extras
export const getEOLRecommendedExtras = (): ExtraService[] => {
  return extraServices.filter(e => e.eolRecommended);
};
