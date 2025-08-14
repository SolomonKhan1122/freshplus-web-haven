import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Star, Award, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-dark to-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/logo.webp" 
                alt="FreshPlus Professional Home Services" 
                className="h-24 w-auto"
              />
              <span className="ml-4 text-base font-medium text-accent underline decoration-2 underline-offset-3 decoration-accent">
                Your Home, Our Expertise
              </span>
            </div>
            <p className="text-primary-light mb-6 leading-relaxed">
              Melbourne's premier cleaning service provider. Professional, reliable, 
              and eco-friendly cleaning solutions for homes and businesses.
            </p>
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-accent fill-current" />
              ))}
              <span className="text-primary-light ml-2">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-primary-light">
                <Shield className="h-5 w-5 text-secondary" />
                <span className="text-sm">Insured</span>
              </div>
              <div className="flex items-center gap-2 text-primary-light">
                <Award className="h-5 w-5 text-accent" />
                <span className="text-sm">Licensed</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/residential" className="text-primary-light hover:text-accent transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Residential Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/commercial" className="text-primary-light hover:text-accent transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Commercial Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/deep-cleaning" className="text-primary-light hover:text-accent transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/carpet" className="text-primary-light hover:text-accent transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Carpet Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/window" className="text-primary-light hover:text-accent transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Window Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/end-of-lease" className="text-primary-light hover:text-accent transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  End of Lease
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-primary-light hover:text-accent transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-light hover:text-accent transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-primary-light hover:text-accent transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  Get Quote
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+61403971720" className="flex items-center gap-3 text-primary-light hover:text-accent transition-colors group">
                  <div className="bg-accent p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <Phone size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">+61 403 971 720</div>
                    <div className="text-sm text-primary-light/80">Call now</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@freshpluscleaning.com.au" className="flex items-center gap-3 text-primary-light hover:text-accent transition-colors group">
                  <div className="bg-secondary p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <Mail size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">info@freshpluscleaning.com.au</div>
                    <div className="text-sm text-primary-light/80">Email us</div>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-3 text-primary-light">
                <div className="bg-accent p-2 rounded-lg">
                  <MapPin size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold">Melbourne, VIC</div>
                  <div className="text-sm text-primary-light/80">All suburbs</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-light/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-light">
              &copy; {new Date().getFullYear()} FreshPlus Professional Cleaning Services. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-light">
              <Link to="/privacy-policy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link to="/licensed-insured" className="hover:text-accent transition-colors">
                Licensed & Insured
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;