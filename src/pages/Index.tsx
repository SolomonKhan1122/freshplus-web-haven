import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import ReviewsSection from "../components/home/ReviewsSection";
import GetInTouchSection from "../components/home/GetInTouchSection";
import Footer from "../components/Footer";

const StatsSection = () => {
  const stats = [
    { number: "12+", label: "Years of Experience" },
    { number: "5000+", label: "Happy Customers" },
    { number: "100%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Customer Support" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-lg text-white/90 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ReviewsSection />
      <GetInTouchSection />
      <Footer />
    </div>
  );
};

export default Index;