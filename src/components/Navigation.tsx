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
    { name: "Pressure Washing", path: "/services/pressure-washing" },
    { name: "Window Cleaning", path: "/services/window" },
    { name: "Carpet Cleaning", path: "/services/carpet" },
    { name: "Tile & Grout Cleaning", path: "/services/tile-grout" },
    { name: "End of Lease Cleaning", path: "/services/end-of-lease" },
    { name: "Solar Panel Cleaning", path: "/services/solar-panel" },
  ];

  return (
    <div className="w-full">
      {/* Header - Sticky */}
      <header className="sticky top-0 z-50 bg-white px-4 py-2 sm:py-3 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center flex-1 min-w-0">
            <Link to="/" className="flex items-center flex-1 min-w-0">
              <img 
                src={logoImage} 
                alt="Fresh Plus Professional Cleaning Services" 
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto flex-shrink-0"
              />
              <span className="ml-2 sm:ml-3 md:ml-4 text-sm sm:text-base md:text-lg font-medium text-primary bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent underline decoration-2 underline-offset-4 decoration-accent hidden sm:block">
                Your Home, Our Expertise
              </span>
            </Link>
          </div>
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link to="/quote">
              <Button className="bg-accent hover:bg-accent-dark text-black font-semibold text-sm px-6 py-2">
                Get Free Quote
              </Button>
            </Link>
          </div>
          
          {/* Mobile CTA and menu button */}
          <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
            <Link to="/quote" className="hidden sm:block">
              <Button size="sm" className="bg-accent hover:bg-accent-dark text-black font-semibold px-4">
                Get Quote
              </Button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-accent p-3 bg-white border-2 border-primary rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation - Sticky */}
      <nav className="sticky top-[72px] sm:top-[84px] md:top-[100px] lg:top-[116px] z-40 bg-primary text-white px-4 py-3 sm:py-4 shadow-md">
        <div className="container mx-auto">
          <div className="hidden md:flex items-center justify-center">
            {/* Centered Menu items */}
            <div className="flex items-center space-x-6 lg:space-x-8 xl:space-x-10 text-sm font-medium">
              <Link to="/" className="hover:text-accent cursor-pointer transition-colors">
                HOME
              </Link>
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
              <Link to="/about" className="hover:text-accent cursor-pointer transition-colors">
                ABOUT
              </Link>
              <Link to="/blog" className="hover:text-accent cursor-pointer transition-colors">
                BLOG
              </Link>
              <Link to="/contact" className="hover:text-accent cursor-pointer transition-colors">
                CONTACT
              </Link>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden text-center">
            <div className="flex items-center justify-center space-x-4 text-xs font-medium">
              <Link to="/" className="hover:text-accent transition-colors">HOME</Link>
              <Link to="/about" className="hover:text-accent transition-colors">ABOUT</Link>
              <Link to="/blog" className="hover:text-accent transition-colors">BLOG</Link>
              <Link to="/contact" className="hover:text-accent transition-colors">CONTACT</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="fixed md:hidden top-[72px] sm:top-[84px] md:top-[100px] lg:top-[116px] left-0 right-0 bg-primary text-white border-t border-primary-light shadow-xl z-30 max-h-[calc(100vh-72px)] sm:max-h-[calc(100vh-84px)] overflow-y-auto">
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
              About
            </Link>
            
            <Link
              to="/blog"
              className="block px-3 py-3 text-white hover:bg-primary-dark rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            
            <Link
              to="/contact"
              className="block px-3 py-3 text-white hover:bg-primary-dark rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            
            {/* Mobile CTA Button */}
            <div className="pt-4 border-t border-primary-light">
              <Link
                to="/quote"
                className="block px-3 py-3 text-center text-black bg-accent hover:bg-accent-dark rounded-lg font-semibold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;