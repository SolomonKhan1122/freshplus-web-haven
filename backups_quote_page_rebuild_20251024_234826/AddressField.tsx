import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormSection } from "./FormSection";

interface AddressFieldProps {
  control: Control<any>;
}

export const AddressField = ({ control }: AddressFieldProps) => (
  <FormSection title="Service Location">
    <FormField
      control={control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Service Address</FormLabel>
          <FormControl>
            <Input placeholder="123 Example St, Melbourne VIC 3000" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </FormSection>
);