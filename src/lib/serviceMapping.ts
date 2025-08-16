// Service mapping utilities for consistent display across the application

export interface ServiceInfo {
  value: string;
  displayName: string;
  shortName: string;
}

export const SERVICES: Record<string, ServiceInfo> = {
  'end-of-lease': {
    value: 'end-of-lease',
    displayName: 'End of Lease Cleaning',
    shortName: 'End of Lease'
  },
  'residential': {
    value: 'residential',
    displayName: 'Residential Cleaning',
    shortName: 'Residential'
  },
  'commercial': {
    value: 'commercial',
    displayName: 'Commercial Cleaning',
    shortName: 'Commercial'
  },
  'deep-cleaning': {
    value: 'deep-cleaning',
    displayName: 'Deep Cleaning',
    shortName: 'Deep Cleaning'
  },
  'window': {
    value: 'window',
    displayName: 'Window Cleaning',
    shortName: 'Window'
  },
  'carpet': {
    value: 'carpet',
    displayName: 'Carpet Cleaning',
    shortName: 'Carpet'
  },
  'carpet-dry': {
    value: 'carpet-dry',
    displayName: 'Carpet Dry Cleaning',
    shortName: 'Carpet Dry'
  },
  'rug-cleaning': {
    value: 'rug-cleaning',
    displayName: 'In-Home Rug Cleaning',
    shortName: 'Rug Cleaning'
  },
  'upholstery': {
    value: 'upholstery',
    displayName: 'Upholstery Cleaning',
    shortName: 'Upholstery'
  },
  'deluxe-rug': {
    value: 'deluxe-rug',
    displayName: 'Deluxe Rug Wash',
    shortName: 'Deluxe Rug'
  },
  'mattress': {
    value: 'mattress',
    displayName: 'Mattress Cleaning',
    shortName: 'Mattress'
  },
  'mould': {
    value: 'mould',
    displayName: 'Mould Cleaning',
    shortName: 'Mould'
  },
  'tile-grout': {
    value: 'tile-grout',
    displayName: 'Tile & Grout Cleaning',
    shortName: 'Tile & Grout'
  },
  'office-cleaning': {
    value: 'office-cleaning',
    displayName: 'Office Cleaning',
    shortName: 'Office'
  },
  'warehouse-cleaning': {
    value: 'warehouse-cleaning',
    displayName: 'Warehouse Cleaning',
    shortName: 'Warehouse'
  },
  'construction-clean': {
    value: 'construction-clean',
    displayName: 'Construction Clean',
    shortName: 'Construction'
  },
  'solar-panel': {
    value: 'solar-panel',
    displayName: 'Solar Panel Cleaning',
    shortName: 'Solar Panel'
  }
};

// Get display name for a service value
export const getServiceDisplayName = (serviceValue: string): string => {
  // Handle legacy full names that might be stored in database
  const legacyMappings: Record<string, string> = {
    'End of Lease Cleaning': 'end-of-lease',
    'Carpet Dry Cleaning': 'carpet-dry',
    'In-Home Rug Cleaning': 'rug-cleaning',
    'Upholstery Cleaning': 'upholstery',
    'Deluxe Rug Wash': 'deluxe-rug',
    'Mattress Cleaning': 'mattress',
    'Mould Cleaning': 'mould',
    'Tile & Grout Cleaning': 'tile-grout',
    'Office Cleaning': 'office-cleaning',
    'Warehouse Cleaning': 'warehouse-cleaning',
    'Construction Clean': 'construction-clean'
  };

  // Check if it's a legacy full name
  const mappedValue = legacyMappings[serviceValue];
  if (mappedValue && SERVICES[mappedValue]) {
    return SERVICES[mappedValue].displayName;
  }

  // Check if it's a standard value
  if (SERVICES[serviceValue]) {
    return SERVICES[serviceValue].displayName;
  }

  // Return as-is if not found (fallback)
  return serviceValue;
};

// Get short name for a service value
export const getServiceShortName = (serviceValue: string): string => {
  const legacyMappings: Record<string, string> = {
    'End of Lease Cleaning': 'end-of-lease',
    'Carpet Dry Cleaning': 'carpet-dry',
    'In-Home Rug Cleaning': 'rug-cleaning',
    'Upholstery Cleaning': 'upholstery',
    'Deluxe Rug Wash': 'deluxe-rug',
    'Mattress Cleaning': 'mattress',
    'Mould Cleaning': 'mould',
    'Tile & Grout Cleaning': 'tile-grout',
    'Office Cleaning': 'office-cleaning',
    'Warehouse Cleaning': 'warehouse-cleaning',
    'Construction Clean': 'construction-clean'
  };

  const mappedValue = legacyMappings[serviceValue];
  if (mappedValue && SERVICES[mappedValue]) {
    return SERVICES[mappedValue].shortName;
  }

  if (SERVICES[serviceValue]) {
    return SERVICES[serviceValue].shortName;
  }

  return serviceValue;
};

// Get all services for dropdowns (in order)
export const getAllServices = (): ServiceInfo[] => {
  return [
    SERVICES['end-of-lease'],
    SERVICES['residential'], 
    SERVICES['commercial'],
    SERVICES['deep-cleaning'],
    SERVICES['window'],
    SERVICES['carpet'],
    SERVICES['solar-panel']
  ];
};

// Get all quote services (in order)
export const getAllQuoteServices = (): ServiceInfo[] => {
  return [
    SERVICES['end-of-lease'],
    SERVICES['carpet-dry'],
    SERVICES['rug-cleaning'],
    SERVICES['upholstery'],
    SERVICES['deluxe-rug'],
    SERVICES['mattress'],
    SERVICES['mould'],
    SERVICES['tile-grout'],
    SERVICES['office-cleaning'],
    SERVICES['warehouse-cleaning'],
    SERVICES['construction-clean'],
    SERVICES['solar-panel']
  ];
};