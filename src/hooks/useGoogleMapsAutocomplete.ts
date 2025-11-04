import { useEffect, useRef, useState } from 'react';
import { loadGoogleMapsScript } from '@/lib/googleMaps';

// Victoria bounding box coordinates
const VICTORIA_BOUNDS = {
  north: -33.98,  // Northern border
  south: -39.16,  // Southern border (includes all of Victoria)
  east: 150.02,   // Eastern border
  west: 140.96    // Western border
};

export interface AddressComponents {
  streetNumber: string;
  streetName: string;
  suburb: string;
  city: string;
  state: string;
  postcode: string;
  fullAddress: string;
}

interface UseGoogleMapsAutocompleteProps {
  onPlaceSelected: (address: AddressComponents) => void;
  onError?: (error: string) => void;
}

export const useGoogleMapsAutocomplete = ({ 
  onPlaceSelected, 
  onError 
}: UseGoogleMapsAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Google Maps API
    loadGoogleMapsScript()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to load Google Maps:', error);
        onError?.('Failed to load address autocomplete. Please enter your address manually.');
      });
  }, [onError]);

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    try {
      // Prevent form submission on Enter key in autocomplete
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          // Check if dropdown is visible
          const pacContainer = document.querySelector('.pac-container');
          if (pacContainer && pacContainer.children.length > 0) {
            e.preventDefault();
          }
        }
      };

      inputRef.current.addEventListener('keydown', handleKeyDown);

      // Initialize autocomplete with Victoria-only restrictions
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'au' }, // Restrict to Australia
        bounds: VICTORIA_BOUNDS, // Bias results to Victoria
        strictBounds: true, // CRITICAL: Enforce Victoria bounds strictly
        types: ['address'], // Only show addresses, not businesses
        fields: ['address_components', 'formatted_address', 'geometry'], // Limit fields to reduce costs
      });

      autocompleteRef.current = autocomplete;

      // Disable browser autocomplete
      if (inputRef.current) {
        inputRef.current.setAttribute('autocomplete', 'new-password');
      }

      // Listen for place selection
      const listener = autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (!place.address_components) {
          onError?.('Please select a valid address from the dropdown');
          return;
        }

        // Extract address components
        const addressComponents: Partial<AddressComponents> = {
          streetNumber: '',
          streetName: '',
          suburb: '',
          city: '',
          state: '',
          postcode: '',
          fullAddress: place.formatted_address || '',
        };

        // Parse address components
        place.address_components.forEach((component) => {
          const types = component.types;

          if (types.includes('street_number')) {
            addressComponents.streetNumber = component.long_name;
          }
          if (types.includes('route')) {
            addressComponents.streetName = component.long_name;
          }
          if (types.includes('locality')) {
            addressComponents.suburb = component.long_name;
            addressComponents.city = component.long_name; // In Australia, locality is the suburb/city
          }
          if (types.includes('administrative_area_level_1')) {
            addressComponents.state = component.short_name;
          }
          if (types.includes('postal_code')) {
            addressComponents.postcode = component.long_name;
          }
        });

        // Validate that the address is in Victoria (VIC)
        if (addressComponents.state !== 'VIC') {
          onError?.('Thank you for your interest! Unfortunately, we currently only service properties within Victoria. Please select an address in Victoria to continue.');
          if (inputRef.current) {
            inputRef.current.value = '';
          }
          return;
        }

        // Validate that we have required fields
        if (!addressComponents.postcode || !addressComponents.city) {
          onError?.('Please select a complete address with postcode from the dropdown');
          return;
        }

        // Call the callback with parsed address
        onPlaceSelected(addressComponents as AddressComponents);
      });

      // Cleanup
      return () => {
        if (listener) {
          google.maps.event.removeListener(listener);
        }
        if (inputRef.current) {
          inputRef.current.removeEventListener('keydown', handleKeyDown);
        }
      };
    } catch (error) {
      console.error('Error initializing autocomplete:', error);
      onError?.('Error setting up address autocomplete. Please enter your address manually.');
    }
  }, [isLoaded, onPlaceSelected, onError]);

  return {
    inputRef,
    isLoaded,
  };
};

