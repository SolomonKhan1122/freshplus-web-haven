import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "/logo.webp";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="w-full">
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
          
          {/* Mobile CTA and menu button */}
          <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
            <a href="tel:+61403971720" className="hidden sm:block">
              <Button size="sm" variant="outline" className="border-2 border-primary text-primary hover:bg-primary-light bg-transparent px-2">
                <Phone className="w-4 h-4" />
              </Button>
            </a>
            <Link to="/quote" className="hidden sm:block">
              <Button size="sm" className="bg-accent hover:bg-accent-dark text-black font-semibold px-3">BOOK</Button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary text-white border-t border-primary-light">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              className="block px-3 py-3 text-white hover:bg-primary-dark rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            <div className="px-3 py-2">
              <div className="text-accent font-semibold text-sm mb-2">Our Services:</div>
              <div className="space-y-1">
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="block px-4 py-2 text-white hover:bg-primary-dark rounded-md text-sm transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link
              to="/about"
              className="block px-3 py-3 text-white hover:bg-primary-dark rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            
            <Link
              to="/contact"
              className="block px-3 py-3 text-white hover:bg-primary-dark rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
            
            {/* Mobile CTA Buttons */}
            <div className="space-y-3 pt-4 border-t border-primary-light">
              <Link
                to="/quote"
                className="block px-3 py-3 text-center text-black bg-accent hover:bg-accent-dark rounded-lg font-semibold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Get Free Quote
              </Link>
              <a
                href="tel:+61403971720"
                className="block px-3 py-3 text-center border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Phone className="w-4 h-4 mr-2 inline" />
                Call +61 403 971 720
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;