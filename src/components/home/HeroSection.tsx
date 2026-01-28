import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "/Home_Hero.webp";
import Navigation from "../Navigation";

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Component */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[700px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative container mx-auto px-4 py-16 sm:py-20 md:py-24 lg:py-28 flex items-center justify-center min-h-[500px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[700px]">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="block drop-shadow-2xl">Fresh Plus</span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-accent mt-2 font-extrabold drop-shadow-2xl">
                Professional Cleaning Services
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
              Transform your space with Melbourne's most trusted cleaning professionals serving homes and businesses across Melbourne CBD, Toorak, Richmond, South Yarra, and Hawthorn for over 12 years.
            </p>
            
            {/* Single CTA Button */}
            <div className="flex justify-center mb-10">
              <Link to="/get-quote">
                <Button className="bg-accent hover:bg-accent-dark text-black font-bold px-8 py-6 text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                  See Instant Pricing
                </Button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-white text-sm font-semibold">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="w-3 h-3 bg-accent rounded-full animate-pulse"></span>
                <span>4.9★ Rated</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="w-3 h-3 bg-accent rounded-full animate-pulse"></span>
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="w-3 h-3 bg-accent rounded-full animate-pulse"></span>
                <span>Eco-Friendly</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="w-3 h-3 bg-accent rounded-full animate-pulse"></span>
                <span>12+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
