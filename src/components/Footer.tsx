import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Star, Award, Shield, CheckCircle } from "lucide-react";

// Scroll to top helper function
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <img 
                src="/logo.webp" 
                alt="Fresh Plus Professional Cleaning Services" 
                className="h-20 w-auto"
              />
            </div>
            <p className="text-white/80 mb-6 leading-relaxed text-sm">
              Melbourne's premier cleaning service provider since 2012. Professional, reliable, and eco-friendly solutions for homes and businesses across Melbourne.
            </p>
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-accent fill-current" />
              ))}
              <span className="text-white/80 ml-2 text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/80">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-sm">Licensed</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Award className="h-4 w-4 text-accent" />
                <span className="text-sm">Insured</span>
              </div>
            </div>
          </div>
          
          {/* Our Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-2">
              {[
                { name: "Residential Cleaning", path: "/services/residential" },
                { name: "Commercial Cleaning", path: "/services/commercial" },
                { name: "Deep Cleaning", path: "/services/deep-cleaning" },
                { name: "Carpet Cleaning", path: "/services/carpet" },
                { name: "Tile & Grout Cleaning", path: "/services/tile-grout" },
                { name: "Pressure Washing", path: "/services/pressure-washing" },
                { name: "Solar Panel Cleaning", path: "/services/solar-panel" },
                { name: "End of Lease Cleaning", path: "/services/end-of-lease" }
              ].map((service) => (
                <li key={service.path}>
                  <Link 
                    to={service.path} 
                    onClick={scrollToTop} 
                    className="text-white/80 hover:text-accent transition-colors text-sm flex items-center gap-2 group"
                  >
                    <CheckCircle className="h-3 w-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Blog", path: "/blog" },
                { name: "Contact", path: "/contact" },
                { name: "See Instant Pricing", path: "/get-quote" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms of Service", path: "/terms-of-service" }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    onClick={scrollToTop} 
                    className="text-white/80 hover:text-accent transition-colors text-sm flex items-center gap-2 group"
                  >
                    <CheckCircle className="h-3 w-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+61403971720" 
                  className="flex items-start gap-3 text-white/80 hover:text-accent transition-colors group"
                >
                  <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent/20 transition-colors mt-0.5">
                    <Phone className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">+61 403 971 720</div>
                    <div className="text-xs text-white/60">7AM-7PM weekdays</div>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:infofreshplusclean@gmail.com" 
                  className="flex items-start gap-3 text-white/80 hover:text-accent transition-colors group"
                >
                  <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent/20 transition-colors mt-0.5">
                    <Mail className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm break-all">infofreshplusclean@gmail.com</div>
                    <div className="text-xs text-white/60">Email anytime</div>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <div className="bg-accent/10 p-2 rounded-lg mt-0.5">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">Melbourne, VIC</div>
                  <div className="text-xs text-white/60">All suburbs covered</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Fresh Plus Professional Cleaning Services. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-white/60">
                <CheckCircle className="h-3 w-3 text-accent" />
                <span>12+ Years Experience</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1 text-xs text-white/60">
                <CheckCircle className="h-3 w-3 text-accent" />
                <span>Licensed & Insured</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1 text-xs text-white/60">
                <CheckCircle className="h-3 w-3 text-accent" />
                <span>Eco-Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
