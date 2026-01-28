import { BookingForm } from "@/components/booking/BookingForm";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

const BookingFormPage = () => {
  return (
    <>
      <SEOHead
        title="Book a Cleaning Service | Fresh Plus Cleaning"
        description="Book your professional cleaning service with Fresh Plus. Get an instant quote and schedule your clean today."
        path="/booking"
      />
      <Navigation />
      <BookingForm />
      <Footer />
    </>
  );
};

export default BookingFormPage;
