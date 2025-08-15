import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
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

const Quote = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      services: [],
      photos: undefined,
      preferredDate: undefined,
      jobDescription: "",
      termsAccepted: false,
    },
  });

  const availableServices = [
    "end-of-lease",
    "carpet-dry",
    "rug-cleaning", 
    "upholstery",
    "deluxe-rug",
    "mattress",
    "mould",
    "tile-grout",
  ];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      console.log('Form values received:', values);
      
      // Prepare data for Supabase
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

      console.log('Prepared quote data for Supabase:', quoteData);

      // Insert into Supabase
      const { data, error } = await supabase
        .from('quotes')
        .insert([quoteData])
        .select();

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        toast.error(`Failed to submit quote request: ${error.message}. Please try again.`);
        return;
      }

      console.log("Quote submitted successfully:", data);
      
      // Send confirmation emails
      if (data && data[0]) {
        console.log("📧 Sending confirmation emails...");
        const emailResult = await sendQuoteEmails({
          id: data[0].id,
          name: data[0].name,
          address: data[0].address,
          city: data[0].city,
          postcode: data[0].postcode,
          phone1: data[0].phone1,
          phone2: data[0].phone2,
          email: data[0].email,
          services: data[0].services,
          preferred_date: data[0].preferred_date,
          job_description: data[0].job_description,
        });
        
        if (emailResult.success) {
          console.log("✅ Confirmation emails sent successfully to customer and admin");
          toast.success("Quote request submitted successfully! Confirmation emails have been sent to you and our team.", {
            duration: 6000,
          });
        } else {
          console.error("❌ Failed to send confirmation emails:", emailResult.error);
          console.error("📧 Email error details:", emailResult);
          
          // Fallback: Create a mailto link with the quote details
          const fallbackSubject = `New Quote Request from ${values.name}`;
          const fallbackBody = `
New Quote Request Details:

Customer Information:
- Name: ${values.name}
- Email: ${values.email}
- Phone: ${values.phone1}
${values.phone2 ? `- Secondary Phone: ${values.phone2}` : ''}
- Address: ${values.address}, ${values.city} ${values.postcode}

Services Requested:
${values.services.join(', ')}

Preferred Date: ${values.preferredDate ? format(values.preferredDate, 'PPP') : 'Not specified'}

Job Description:
${values.jobDescription || 'Not provided'}

This quote was submitted through the website but email delivery failed.
          `.trim();
          
          const mailtoUrl = `mailto:infofreshplusclean@gmail.com?subject=${encodeURIComponent(fallbackSubject)}&body=${encodeURIComponent(fallbackBody)}`;
          
          toast.warning("Quote submitted successfully! Email delivery had an issue, but we've prepared a backup email for you to send.", {
            duration: 8000,
            action: {
              label: "Send Backup Email",
              onClick: () => window.open(mailtoUrl)
            }
          });
        }
      } else {
        toast.success("Quote request submitted successfully! We'll get back to you soon.");
      }
      
      form.reset();
      
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <Navigation />
      <div className="max-w-4xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-up">
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-8 px-6 rounded-t-2xl shadow-xl">
            <h1 className="text-5xl font-extrabold mb-3 tracking-tight">
              <span className="text-accent">FreshPlus</span> Cleaning
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
            <h2 className="text-3xl font-bold mb-4 text-primary-light">Online Booking Form</h2>
            <p className="text-primary-light text-lg font-medium mb-3 leading-relaxed max-w-3xl mx-auto">
              Fill in the form with your details to book your professional cleaning service. 
              <br />
              <span className="font-bold text-accent">A FreshPlus representative will get in touch with you to confirm your booking within the day!</span>
            </p>
            <div className="bg-primary-dark/50 rounded-lg p-4 mt-6 inline-block">
              <p className="text-primary-light font-medium">
                <span className="font-bold text-accent">Office Hours:</span> 8:00 AM to 5:00 PM daily
                <br />
                <span className="font-bold text-accent">For urgent bookings, call:</span> +61 403 971 720
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-2xl rounded-b-2xl border-t-4 border-accent p-10 mb-8 animate-fade-up">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-bold text-lg">Name*</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        className="border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-4 text-lg font-medium transition-all duration-200 hover:border-primary/50" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address Field */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-bold text-lg">Address*</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your street address" 
                        className="border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-4 text-lg font-medium transition-all duration-200 hover:border-primary/50" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City and Postcode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold text-lg">City</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter city" 
                          className="border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-4 text-lg font-medium transition-all duration-200 hover:border-primary/50" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold text-lg">Postcode*</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter postcode" 
                          className="border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-4 text-lg font-medium transition-all duration-200 hover:border-primary/50" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Phone Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold text-lg">Phone 1*</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter primary phone number" 
                          type="tel"
                          className="border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-4 text-lg font-medium transition-all duration-200 hover:border-primary/50" 
                          {...field} 
                        />
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
                      <FormLabel className="text-primary font-bold text-lg">Phone 2</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter secondary phone number" 
                          type="tel"
                          className="border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-4 text-lg font-medium transition-all duration-200 hover:border-primary/50" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-bold text-lg">Email*</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email address" 
                        type="email"
                        className="border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-4 text-lg font-medium transition-all duration-200 hover:border-primary/50" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Services Section */}
              <div className="bg-gradient-to-r from-secondary-light to-primary-light p-6 rounded-lg border-l-4 border-secondary">
                <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
                  <span className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-3">S</span>
                  Services
                </h3>
                <FormField
                  control={form.control}
                  name="services"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availableServices.map((service) => (
                          <FormField
                            key={service}
                            control={form.control}
                            name="services"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white p-3 rounded-lg border border-primary/20 hover:border-secondary hover:shadow-md transition-all duration-200">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(service)}
                                    onCheckedChange={(checked) => {
                                      const updatedServices = checked
                                        ? [...(field.value || []), service]
                                        : field.value?.filter((value) => value !== service) || [];
                                      field.onChange(updatedServices);
                                    }}
                                    className="border-2 border-secondary data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                                  />
                                </FormControl>
                                <FormLabel className="text-primary font-semibold cursor-pointer hover:text-secondary transition-colors">
                                  {getServiceDisplayName(service)}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* File Upload Section */}
              <div className="bg-gradient-to-r from-accent-light to-secondary-light p-6 rounded-lg border border-accent">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-accent p-2 rounded-full">
                    <PaperclipIcon className="h-6 w-6 text-white" />
                  </div>
                  <label className="text-primary font-bold text-lg underline cursor-pointer hover:text-secondary transition-colors">
                    Attach any relevant photos (Optional)
                  </label>
                </div>
                <FormField
                  control={form.control}
                  name="photos"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          multiple
                          accept="image/*"
                          className="border-2 border-accent focus:border-accent-dark focus:ring-2 focus:ring-accent/20 rounded-lg p-4 bg-white font-medium transition-all duration-200"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Preferred Booking Date */}
              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-primary font-bold text-lg">Preferred Booking Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-medium border-2 border-primary/30 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-4 text-lg transition-all duration-200",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select a preferred date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white border border-gray-200 shadow-lg z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
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

              {/* Job Description */}
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-bold text-lg">Note or Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide any additional details about your cleaning needs..."
                        className="min-h-[120px] border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-4 text-lg font-medium transition-all duration-200 hover:border-primary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms and Conditions */}
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-2 border-secondary data-[state=checked]:bg-secondary data-[state=checked]:border-secondary w-5 h-5"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-primary font-bold text-lg cursor-pointer">
                        Terms *
                      </FormLabel>
                      <p className="text-primary/80 font-medium leading-relaxed">
                        By ticking this box, you confirm that you have read, understood, and agree to the{" "}
                        <span className="underline cursor-pointer hover:text-primary font-bold">terms and conditions</span> and{" "}
                        <span className="underline cursor-pointer hover:text-primary font-bold">privacy policy</span>.
                      </p>
                      <FormMessage />
                    </div>
                    </FormItem>
                  )}
                />

              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-black font-extrabold py-6 text-2xl rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 border-2 border-accent-dark"
                  disabled={!form.watch("termsAccepted") || isSubmitting}
                >
                  {isSubmitting ? "SUBMITTING..." : "🎯 BOOK ONLINE NOW"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Quote;