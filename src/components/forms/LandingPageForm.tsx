import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { FormSection } from "@/components/forms/FormSection";
import { CalendarIcon, PaperclipIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";
import { sendQuoteEmails } from "@/lib/emailService";
import { getServiceDisplayName } from "@/lib/serviceMapping";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddressAutocomplete } from "@/components/forms/AddressAutocomplete";
import { useRecaptcha } from "@/hooks/useRecaptcha";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  postcode: z.string().min(4, "Postcode is required"),
  phone1: z.string().min(10, "Phone number must be at least 10 digits"),
  phone2: z.string().optional(),
  email: z.string().email("Invalid email address"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  photos: z.any().optional(),
  preferredDate: z.date().optional(),
  jobDescription: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

interface LandingPageFormProps {
  serviceType: 'pressure-washing' | 'tile-grout' | 'end-of-lease';
  availableServices: string[];
}

const LandingPageForm = ({ serviceType, availableServices }: LandingPageFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const navigate = useNavigate();
  const { getRecaptchaToken } = useRecaptcha();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      postcode: "",
      phone1: "",
      phone2: "",
      email: "",
      services: [serviceType], // Pre-select the service for this landing page
      photos: undefined,
      preferredDate: undefined,
      jobDescription: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Step 1: Get reCAPTCHA token (invisible to user)
      const recaptchaToken = await getRecaptchaToken(`${serviceType}_submission`);
      
      if (!recaptchaToken) {
        toast.error('Security verification failed. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Step 2: Verify reCAPTCHA token with backend
      const verificationResponse = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: recaptchaToken }),
      });

      const verificationResult = await verificationResponse.json();

      if (!verificationResult.success) {
        toast.error(verificationResult.error || 'Security verification failed. Please contact us directly at +61 403 971 720');
        setIsSubmitting(false);
        return;
      }

      // Step 3: User verified as human, proceed with form submission
      const quoteData = {
        name: values.name,
        address: values.address,
        city: values.city,
        postcode: values.postcode,
        phone1: values.phone1,
        phone2: values.phone2 || null,
        email: values.email,
        services: values.services,
        preferred_date: values.preferredDate ? values.preferredDate.toISOString().split('T')[0] : null,
        job_description: values.jobDescription || null,
        terms_accepted: values.termsAccepted,
      };

      // Insert into Supabase
      const { data, error } = await supabase
        .from('quotes')
        .insert([quoteData])
        .select()
        .single();

      if (error) {
        console.error('Error saving quote:', error);
        toast.error("Failed to submit quote. Please try again.");
        return;
      }

      console.log('Quote saved successfully:', data);

      // Send emails
      const emailResult = await sendQuoteEmails({
        id: data.id,
        name: data.name,
        address: data.address,
        city: data.city,
        postcode: data.postcode,
        phone1: data.phone1,
        phone2: data.phone2,
        email: data.email,
        services: data.services,
        preferred_date: data.preferred_date,
        job_description: data.job_description,
      });

      if (emailResult.success) {
        console.log('Emails sent successfully');
        
        console.log('✅ Quote submitted successfully, redirecting to thank you page');
        
        // Redirect to thank you page with parameters (conversion tracking happens there)
        navigate(`/thank-you?source=${serviceType}&type=quote&name=${encodeURIComponent(values.name)}`);
      } else {
        console.error('Email sending failed:', emailResult.error);
        
        // Redirect to thank you page even if email fails (conversion tracking happens there)
        navigate(`/thank-you?source=${serviceType}&type=quote&name=${encodeURIComponent(values.name)}`);
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error("Failed to submit quote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Contact Information */}
          <FormSection title="Contact Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Phone *</FormLabel>
                    <FormControl>
                      <Input placeholder="0400 000 000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="0400 000 000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormSection>

          {/* Property Details */}
          <FormSection title="Property Details">
            {/* Google Maps Address Autocomplete */}
            <AddressAutocomplete 
              control={form.control}
              addressFieldName="address"
              cityFieldName="city"
              postcodeFieldName="postcode"
            />
          </FormSection>

          {/* Service Selection */}
          <FormSection title="Service Selection">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Selected Service: <span className="font-semibold text-primary">{getServiceDisplayName(serviceType)}</span>
              </p>
              {availableServices.map((service) => (
                <FormField
                  key={service}
                  control={form.control}
                  name="services"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(service)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, service])
                                : field.onChange(
                                    field.value?.filter((value) => value !== service)
                                  );
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal">
                            {getServiceDisplayName(service)}
                          </FormLabel>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </div>
          </FormSection>

          {/* Preferred Date */}
          <FormSection title="Preferred Date (Optional)">
            <FormField
              control={form.control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>When would you like us to visit?</FormLabel>
                  <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border border-gray-200 shadow-lg z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setIsDatePickerOpen(false);
                        }}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className="bg-white"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          {/* Additional Information */}
          <FormSection title="Additional Information (Optional)">
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tell us about your cleaning requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe any specific areas of concern, special requirements, or additional details that would help us provide an accurate quote..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          {/* Terms and Conditions */}
          <FormSection title="">
            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal">
                      I agree to the{" "}
                      <a 
                        href="/terms-of-service" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark underline"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a 
                        href="/privacy-policy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark underline"
                      >
                        Privacy Policy
                      </a>
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          {/* Submit Button */}
          <div className="pt-6">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Submitting Your Request...
                </>
              ) : (
                "Get Your Free Quote Now! 🚀"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LandingPageForm;
