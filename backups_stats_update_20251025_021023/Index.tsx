import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import ReviewsSection from "../components/home/ReviewsSection";
import GetInTouchSection from "../components/home/GetInTouchSection";
import Footer from "../components/Footer";
import { SEOHead } from "../components/SEOHead";

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
      <SEOHead
        title="Fresh Plus Cleaning Melbourne | Residential & Commercial Cleaners"
        description="Professional cleaning services for homes and offices across Melbourne. Serving Melbourne CBD, Toorak, Richmond, South Yarra, and Hawthorn. Fully insured, eco-friendly, and trusted by 5000+ clients."
        canonical="https://www.freshpluscleaning.com.au/"
        type="website"
        breadcrumbs={[
          { name: "Home", url: "/" }
        ]}
      />
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