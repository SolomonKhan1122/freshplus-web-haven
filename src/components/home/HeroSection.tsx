import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ChevronDown } from "lucide-react";
import heroImage from "/Home_Hero.webp";
import logoImage from "/logo.webp";

const HeroSection = () => {
  const services = [
    { name: "Residential Cleaning", path: "/services/residential" },
    { name: "Commercial Cleaning", path: "/services/commercial" },
    { name: "Deep Cleaning", path: "/services/deep-cleaning" },
    { name: "Window Cleaning", path: "/services/window" },
    { name: "Carpet Cleaning", path: "/services/carpet" },
    { name: "Tile & Grout Cleaning", path: "/services/tile-grout" },
    { name: "End of Lease Cleaning", path: "/services/end-of-lease" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white px-4 py-3 sm:py-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center flex-1 min-w-0">
            <Link to="/" className="flex items-center flex-1 min-w-0">
              <img 
                src={logoImage} 
                alt="FreshPlus Professional Home Services" 
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto flex-shrink-0"
              />
              <span className="ml-2 sm:ml-3 md:ml-4 text-sm sm:text-base md:text-lg font-medium text-primary bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent underline decoration-2 underline-offset-4 decoration-accent hidden sm:block">
                Your Home, Our Expertise
              </span>
            </Link>
          </div>
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
            <Button
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary-light bg-transparent text-sm xl:text-base px-3 xl:px-4"
            >
              <Phone className="w-4 h-4 mr-2" />
              CALL +61 403 971 720
            </Button>
            <Link to="/quote">
              <Button className="bg-accent hover:bg-accent-dark text-black font-semibold text-sm xl:text-base px-3 xl:px-4">BOOK NOW</Button>
            </Link>
          </div>
          
          {/* Mobile CTA */}
          <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
            <a href="tel:+61403971720">
              <Button size="sm" variant="outline" className="border-2 border-primary text-primary hover:bg-primary-light bg-transparent px-2">
                <Phone className="w-4 h-4" />
              </Button>
            </a>
            <Link to="/quote">
              <Button size="sm" className="bg-accent hover:bg-accent-dark text-black font-semibold px-3">BOOK</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-primary text-white px-4 py-3 sm:py-4">
        <div className="container mx-auto">
          <div className="hidden md:flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center">
              <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
              <span className="text-xs sm:text-sm font-medium">LOOKING FOR PROFESSIONAL CLEANING?</span>
            </div>
            
            {/* Right side - Menu items with spacing */}
            <div className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8 text-xs sm:text-sm font-medium">
              {/* Services Dropdown */}
              <div className="relative group">
                <div className="flex items-center hover:text-accent cursor-pointer transition-colors">
                  <span>SERVICES</span>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </div>
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link to="/about" className="hover:text-accent cursor-pointer transition-colors">ABOUT US</Link>
              <Link to="/contact" className="hover:text-accent cursor-pointer transition-colors">CONTACT US</Link>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
              <span className="text-xs font-medium">LOOKING FOR PROFESSIONAL CLEANING?</span>
            </div>
            <div className="flex items-center justify-center space-x-4 text-xs font-medium">
              <Link to="/contact" className="hover:text-accent transition-colors">CONTACT</Link>
              <Link to="/about" className="hover:text-accent transition-colors">ABOUT US</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
        {/* Background Image with Blur and Shadow */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 filter blur-sm"
          style={{
            backgroundImage: `url(${heroImage})`,
            filter: 'blur(2px) brightness(0.7)',
          }}
        ></div>
        {/* Additional overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        {/* Shadow overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
        <div className="relative container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20 flex items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
              <span className="block text-shadow-xl" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>FreshPlus</span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-accent mt-2 font-extrabold" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>Professional Home Services</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed font-semibold" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
              Enhance your home with Melbourne's most trusted cleaning service!
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/quote">
                <Button className="bg-accent hover:bg-accent-dark text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  BOOK ONLINE NOW
                </Button>
              </Link>
              <a href="tel:+61403971720">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <Phone className="w-4 h-4 mr-2" />
                  CALL +61 403 971 720
                </Button>
              </a>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-8 sm:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-white text-sm font-medium">
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                <span className="w-3 h-3 bg-accent rounded-full shadow-lg animate-pulse"></span>
                <span>5-Star Rated</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                <span className="w-3 h-3 bg-accent rounded-full shadow-lg animate-pulse"></span>
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                <span className="w-3 h-3 bg-accent rounded-full shadow-lg animate-pulse"></span>
                <span>Eco-Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;