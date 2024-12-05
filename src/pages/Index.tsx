import Navigation from "../components/Navigation";
import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import ReviewsSection from "../components/home/ReviewsSection";
import GetInTouchSection from "../components/home/GetInTouchSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ReviewsSection />
      <GetInTouchSection />
    </div>
  );
};

export default Index;