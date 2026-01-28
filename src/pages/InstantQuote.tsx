import { AccordionForm } from "@/components/booking/AccordionForm";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  calculateTotalPrice,
  bedroomOptions,
  extraServices,
  bondBackBundle,
  serviceCategories,
  type InstantQuoteFormState,
} from "@/lib/pricing-data";

const InstantQuote = () => {
  const handleSubmit = async (formState: InstantQuoteFormState): Promise<string> => {
    const pricing = calculateTotalPrice(formState, bedroomOptions, extraServices, bondBackBundle);
    const selectedService = serviceCategories.find(s => s.id === formState.selectedService);

    // Prepare data for database
    const bookingData = {
      // Service info
      service_type: formState.selectedService,
      service_name: selectedService?.name || "",
      service_size: formState.bedrooms,
      
      // Property info
      property_type: formState.propertyType,
      furnished: formState.furnished,
      bathrooms: formState.bathrooms,
      
      // Extras (stored as JSON)
      selected_extras: formState.selectedExtras,
      bundle_selected: formState.bundleSelected,
      
      // Pricing
      original_price: pricing.originalTotal,
      discount_amount: pricing.totalSavings,
      final_price: pricing.total,
      same_day_booking: formState.sameDayBooking,
      
      // Schedule
      preferred_date: formState.preferredDate?.toISOString().split('T')[0] || null,
      preferred_time: formState.preferredTime,
      
      // Contact info
      first_name: formState.firstName,
      last_name: formState.lastName,
      email: formState.email,
      phone: formState.phone,
      address: formState.address,
      suburb: formState.suburb,
      postcode: formState.postcode,
      
      // Additional
      comments: formState.comments,
      status: "pending",
    };

    try {
      // #region agent log - Debug instrumentation
      console.log("🔍 DEBUG: Starting booking submission...");
      console.log("🔍 DEBUG: Supabase URL:", import.meta.env.VITE_SUPABASE_URL || "using-fallback");
      console.log("🔍 DEBUG: Anon Key present:", !!(import.meta.env.VITE_SUPABASE_ANON_KEY) ? "from-env" : "using-fallback");
      console.log("🔍 DEBUG: Booking data:", JSON.stringify(bookingData, null, 2));
      // #endregion

      // Insert into database
      const { data, error } = await supabase
        .from("instant_bookings")
        .insert(bookingData)
        .select("id")
        .single();

      // #region agent log - Debug instrumentation
      console.log("🔍 DEBUG: Insert response - data:", data);
      console.log("🔍 DEBUG: Insert response - error:", error);
      // #endregion

      if (error) {
        console.error("Database error:", error);
        // #region agent log - Debug instrumentation
        console.error("🔍 DEBUG: Full error object:", JSON.stringify(error, null, 2));
        // #endregion
        toast.error("Something went wrong. Please try again.");
        throw error;
      }

      // Send email notification
      try {
        // Create extra names map for email template
        const extraServiceNames: Record<string, string> = {};
        extraServices.forEach(extra => {
          extraServiceNames[extra.id] = extra.name;
        });

        await supabase.functions.invoke("email-dispatch", {
          body: {
            type: "instant_booking",
            booking: {
              id: data.id,
              ...bookingData,
            },
            extraServiceNames,
            adminEmail: "infofreshplusclean@gmail.com",
          },
        });
      } catch (emailError) {
        console.error("Email notification error:", emailError);
        // Don't fail the booking if email fails
      }

      toast.success("Booking confirmed! We'll contact you shortly.");
      return data.id;
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit booking. Please try again.");
      throw error;
    }
  };

  return (
    <>
      <SEOHead
        title="Get Instant Quote | Fresh Plus Cleaning Melbourne"
        description="Get an instant quote for professional cleaning services in Melbourne. See real-time pricing, select extras, and book online. 10% off all services!"
        path="/get-quote"
      />
      <Navigation />
      <main className="pt-16">
        <AccordionForm onSubmit={handleSubmit} />
      </main>
      <Footer />
    </>
  );
};

export default InstantQuote;
