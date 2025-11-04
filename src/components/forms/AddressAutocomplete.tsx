import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGoogleMapsAutocomplete, AddressComponents } from "@/hooks/useGoogleMapsAutocomplete";
import { Control, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { MapPin } from "lucide-react";

interface AddressAutocompleteProps {
  control: Control<any>;
  addressFieldName?: string;
  cityFieldName?: string;
  postcodeFieldName?: string;
  onAddressSelected?: (address: AddressComponents) => void;
}

export const AddressAutocomplete = ({
  control,
  addressFieldName = "address",
  cityFieldName = "city",
  postcodeFieldName = "postcode",
  onAddressSelected,
}: AddressAutocompleteProps) => {
  const form = useFormContext();
  
  const { inputRef, isLoaded } = useGoogleMapsAutocomplete({
    onPlaceSelected: (address) => {
      // Build full street address
      const streetAddress = `${address.streetNumber} ${address.streetName}`.trim();
      
      // Set form values using setValue from react-hook-form
      form.setValue(addressFieldName, streetAddress || address.fullAddress, { 
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
      form.setValue(cityFieldName, address.city || address.suburb, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
      form.setValue(postcodeFieldName, address.postcode, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });

      // Call custom callback if provided
      onAddressSelected?.(address);

      // Show success message
      toast.success('Address selected', {
        description: `${address.city}, VIC ${address.postcode}`,
      });
    },
    onError: (error) => {
      toast.error('Address Error', {
        description: error,
      });
    },
  });

  return (
    <>
      {/* Address Field with Google Autocomplete */}
      <FormField
        control={control}
        name={addressFieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Street Address *
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  ref={(e) => {
                    field.ref(e);
                    if (e) {
                      (inputRef as any).current = e;
                    }
                  }}
                  placeholder="Start typing your address..."
                  className="pr-10"
                  autoComplete="off"
                />
                {isLoaded && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    <img 
                      src="https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3.png" 
                      alt="Powered by Google"
                      className="h-4"
                    />
                  </div>
                )}
              </div>
            </FormControl>
            <p className="text-xs text-muted-foreground">
              Start typing and select your address from the dropdown (Victoria only)
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* City/Suburb Field */}
      <FormField
        control={control}
        name={cityFieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary font-semibold">City/Suburb *</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Melbourne" 
                readOnly={isLoaded}
                className={isLoaded ? "bg-muted" : ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Postcode Field */}
      <FormField
        control={control}
        name={postcodeFieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-primary font-semibold">Postcode *</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="3000" 
                readOnly={isLoaded}
                className={isLoaded ? "bg-muted" : ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

