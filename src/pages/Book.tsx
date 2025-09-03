import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ContactFields } from "@/components/forms/ContactFields";
import { ServiceSelection } from "@/components/forms/ServiceSelection";
import { AddressField } from "@/components/forms/AddressField";
import { FormSection } from "@/components/forms/FormSection";
import { supabase } from "@/lib/supabase";
import { sendBookingEmails } from "@/lib/emailService";
import { useState } from "react";
import ThankYouPage from "@/components/ThankYouPage";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  service: z.string().min(1, "Please select a service"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please select a time"),
  specialInstructions: z.string().optional(),
});

const Book = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      address: "",
      date: undefined,
      time: "",
      specialInstructions: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Prepare data for Supabase
      const bookingData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        service: values.service,
        address: values.address,
        service_date: values.date.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
        service_time: values.time,
        special_instructions: values.specialInstructions || null,
      };

      // Insert into Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select();

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        toast.error(`Failed to submit booking: ${error.message}. Please try again.`);
        return;
      }

      console.log("Booking submitted successfully:", data);
      
      // Send confirmation emails
      if (data && data[0]) {
        console.log("📧 Sending booking confirmation emails...");
        const emailResult = await sendBookingEmails({
          id: data[0].id,
          name: data[0].name,
          email: data[0].email,
          phone: data[0].phone,
          service: data[0].service,
          address: data[0].address,
          service_date: data[0].service_date,
          service_time: data[0].service_time,
          special_instructions: data[0].special_instructions,
        });
        
        if (emailResult.success) {
          console.log("✅ Booking confirmation emails sent successfully to customer and admin");
        } else {
          console.error("❌ Failed to send confirmation emails:", emailResult.error);
        }
      }
      
      // Track conversion for Google Analytics and Google Ads
      if (typeof gtag !== 'undefined') {
        // Google Analytics event
        gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'main_booking_form',
          value: 1
        });
        
        // Google Ads conversion
        gtag('event', 'conversion', {
          send_to: 'AW-17525851975/booking_submission',
          event_category: 'conversion',
          event_label: 'main_booking',
          value: 1
        });
      }
      
      // Show thank you page instead of toast
      setSubmittedName(values.name);
      setShowThankYou(true);
      form.reset();
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <Navigation />
      <div className="max-w-4xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold text-primary mb-4">Book Now</h1>
          <p className="text-gray-600">Schedule your cleaning service at your preferred date and time.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 animate-fade-up">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ContactFields control={form.control} />
              <ServiceSelection control={form.control} />
              <AddressField control={form.control} />
              <FormSection title="Schedule">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Service Date</FormLabel>
                        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
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
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setIsDatePickerOpen(false); // Close popup when date is selected
                              }}
                              disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                            <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </FormSection>
              <FormSection title="Additional Information">
                <FormField
                  control={form.control}
                  name="specialInstructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Instructions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any special instructions or requirements..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormSection>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Get Quote Now"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      
      {/* Thank You Page Overlay */}
      {showThankYou && (
        <ThankYouPage 
          type="booking" 
          customerName={submittedName}
          onClose={() => setShowThankYou(false)}
        />
      )}
    </div>
  );
};

export default Book;