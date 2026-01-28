import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { CalendarIcon, Home, Building2, Sparkles, Droplet, Wind, Globe, Grid3x3, Key, Sun, Shield, Award } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";
import { sendQuoteEmails } from "@/lib/emailService";
import { getServiceDisplayName } from "@/lib/serviceMapping";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddressAutocomplete } from "@/components/forms/AddressAutocomplete";
import { useRecaptcha } from "@/hooks/useRecaptcha";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone1: z.string().min(10, "Phone number must be at least 10 digits"),
  phone2: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  postcode: z.string().min(4, "Postcode is required"),
  propertyType: z.string().min(1, "Please select a property type"),
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
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { getRecaptchaToken, error: recaptchaError } = useRecaptcha();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone1: "",
      phone2: "",
      address: "",
      city: "",
      postcode: "",
      propertyType: "",
      services: [],
      photos: undefined,
      preferredDate: undefined,
      jobDescription: "",
      termsAccepted: false,
    },
  });

  // Service categories with icons
  const serviceCategories = {
    home: {
      title: "Home Services",
      services: [
        { id: "residential", name: "Residential Cleaning", icon: Home },
        { id: "deep-cleaning", name: "Deep Cleaning", icon: Sparkles },
        { id: "carpet-dry", name: "Carpet Cleaning", icon: Wind },
        { id: "window", name: "Window Cleaning", icon: Globe },
        { id: "tile-grout", name: "Tile & Grout", icon: Grid3x3 },
      ],
    },
    commercial: {
      title: "Commercial Services",
      services: [
        { id: "office-cleaning", name: "Office Cleaning", icon: Building2 },
        { id: "warehouse-cleaning", name: "Warehouse", icon: Building2 },
        { id: "construction-clean", name: "Construction Clean", icon: Building2 },
      ],
    },
    specialty: {
      title: "Specialty Services",
      services: [
        { id: "pressure-washing", name: "Pressure Washing", icon: Droplet },
        { id: "end-of-lease", name: "End of Lease", icon: Key },
        { id: "solar-panel", name: "Solar Panel", icon: Sun },
        { id: "mould", name: "Mould Removal", icon: Shield },
        { id: "mattress", name: "Mattress Cleaning", icon: Award },
        { id: "upholstery", name: "Upholstery", icon: Wind },
      ],
    },
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Step 1: Get reCAPTCHA token (invisible to user)
      const recaptchaToken = await getRecaptchaToken('quote_submission');
      
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
        email: values.email,
        phone1: values.phone1,
        phone2: values.phone2 || null,
        address: values.address,
        city: values.city,
        postcode: values.postcode,
        property_type: values.propertyType,
        services: values.services,
        preferred_date: values.preferredDate ? values.preferredDate.toISOString().split('T')[0] : null,
        job_description: values.jobDescription || null,
        terms_accepted: values.termsAccepted,
      };

      const { data, error } = await supabase
        .from('quotes')
        .insert([quoteData])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        toast.error(`Failed to submit quote: ${error.message}`);
        return;
      }

      if (data && data[0]) {
        await sendQuoteEmails({
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
      }
      
      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/thank-you?source=main-quote&type=quote&name=${encodeURIComponent(values.name)}`);
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Get a Free Cleaning Quote | Fresh Plus Cleaning Melbourne"
        description="Book professional cleaning services in Melbourne. Get a free online quote for residential, commercial, or end-of-lease cleaning today. Serving Melbourne CBD, Toorak, Richmond, and beyond."
        canonical="https://www.freshpluscleaning.com.au/quote"
        type="website"
        noindex={true}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Cleaning Services",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Fresh Plus Cleaning Melbourne",
            "telephone": "+61 403 971 720",
            "areaServed": "Melbourne, VIC",
            "url": "https://freshpluscleaning.com.au"
          }
        }}
      />
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-dark to-primary text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get Your Free Cleaning Quote
          </h1>
          <p className="text-xl text-primary-light mb-6">
            We'll respond within 1 hour (7AM–7PM) or next business day after hours.
          </p>
          <a href="tel:+61403971720">
            <Button className="bg-accent hover:bg-accent-dark text-black font-bold px-8 py-3">
              Call +61 403 971 720
            </Button>
          </a>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              
              {/* Contact Information Section */}
              <div className="space-y-6">
                <div className="border-b-2 border-primary pb-2">
                  <h2 className="text-2xl font-bold text-primary">Contact Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel className="text-primary font-semibold">Email *</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Mobile *</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
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
                        <FormLabel className="text-primary font-semibold">Work (Optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Property Details Section */}
              <div className="space-y-6">
                <div className="border-b-2 border-primary pb-2">
                  <h2 className="text-2xl font-bold text-primary">Property Details</h2>
                </div>
                
                {/* Google Maps Address Autocomplete */}
                <AddressAutocomplete 
                  control={form.control}
                  addressFieldName="address"
                  cityFieldName="city"
                  postcodeFieldName="postcode"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Property Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="apartment">Apartment / Unit</SelectItem>
                            <SelectItem value="office">Office / Commercial</SelectItem>
                            <SelectItem value="warehouse">Warehouse / Industrial</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Service Selection Section */}
              <div className="space-y-6">
                <div className="border-b-2 border-primary pb-2">
                  <h2 className="text-2xl font-bold text-primary">Services Selection</h2>
                </div>
                <FormField
                  control={form.control}
                  name="services"
                  render={() => (
                    <FormItem>
                      <div className="space-y-6">
                        {Object.entries(serviceCategories).map(([categoryKey, category]) => (
                          <div key={categoryKey} className="space-y-3">
                            <h3 className="text-lg font-semibold text-secondary">{category.title}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {category.services.map((service) => {
                                const IconComponent = service.icon;
                                return (
                                  <FormField
                                    key={service.id}
                                    control={form.control}
                                    name="services"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <label
                                            className={cn(
                                              "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md",
                                              field.value?.includes(service.id)
                                                ? "border-secondary bg-secondary/10"
                                                : "border-gray-200 hover:border-secondary/50"
                                            )}
                                          >
                                            <Checkbox
                                              checked={field.value?.includes(service.id)}
                                              onCheckedChange={(checked) => {
                                                const updatedServices = checked
                                                  ? [...(field.value || []), service.id]
                                                  : field.value?.filter((value) => value !== service.id) || [];
                                                field.onChange(updatedServices);
                                              }}
                                              className="border-2"
                                            />
                                            <IconComponent className="h-5 w-5 text-primary flex-shrink-0" />
                                            <span className="text-sm font-medium text-primary">{service.name}</span>
                                          </label>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Booking Preferences Section */}
              <div className="space-y-6">
                <div className="border-b-2 border-primary pb-2">
                  <h2 className="text-2xl font-bold text-primary">Booking Preferences</h2>
                </div>
                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-primary font-semibold">Preferred Date (Optional)</FormLabel>
                      <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full md:w-64 pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setIsDatePickerOpen(false);
                            }}
                            disabled={(date) => date < new Date()}
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
                  name="jobDescription"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-semibold">Notes or Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                />
              </div>

              {/* Terms & Confirmation Section */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-2 mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          I agree to the{" "}
                          <a 
                            href="/terms-of-service" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-dark underline font-semibold"
                          >
                            terms and conditions
                          </a>{" "}
                          and{" "}
                          <a 
                            href="/privacy-policy" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-dark underline font-semibold"
                          >
                            privacy policy
                          </a>
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* CTA and Reassurance */}
              <div className="space-y-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !form.watch("termsAccepted")}
                  className="w-full bg-accent hover:bg-accent-dark text-black font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
                >
                  {isSubmitting ? "Submitting..." : "Get My Free Quote"}
                </Button>
                <div className="flex items-center justify-center gap-6 text-sm text-primary/70">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Fully Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>Eco-Friendly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>5000+ Clients</span>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              {showSuccess && (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-green-700 mb-2">Thank You!</h3>
                  <p className="text-green-600">We'll contact you shortly with your quote.</p>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Quote;
