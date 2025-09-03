import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { FormSection } from "./FormSection";

interface ServiceSelectionProps {
  control: Control<any>;
}

export const ServiceSelection = ({ control }: ServiceSelectionProps) => (
  <FormSection title="Service Details">
    <FormField
      control={control}
      name="service"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Service Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="pressure-washing">Pressure Washing</SelectItem>
              <SelectItem value="end-of-lease">End of Lease Cleaning</SelectItem>
              <SelectItem value="residential">Residential Cleaning</SelectItem>
              <SelectItem value="commercial">Commercial Cleaning</SelectItem>
              <SelectItem value="deep-cleaning">Deep Cleaning</SelectItem>
              <SelectItem value="window">Window Cleaning</SelectItem>
              <SelectItem value="carpet">Carpet Cleaning</SelectItem>
              <SelectItem value="solar-panel">Solar Panel Cleaning</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  </FormSection>
);