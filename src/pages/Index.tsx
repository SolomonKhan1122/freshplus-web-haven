import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import ReviewsSection from "../components/home/ReviewsSection";
import GetInTouchSection from "../components/home/GetInTouchSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ReviewsSection />
      <GetInTouchSection />
      <Footer />
    </div>
  );
};

export default Index;