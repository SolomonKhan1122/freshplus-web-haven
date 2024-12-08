import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">FreshPlus</h3>
            <p className="text-gray-600">
              Professional cleaning services for homes and businesses in Melbourne.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/residential" className="text-gray-600 hover:text-primary">
                  Residential Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/commercial" className="text-gray-600 hover:text-primary">
                  Commercial Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/deep-cleaning" className="text-gray-600 hover:text-primary">
                  Deep Cleaning
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-gray-600 hover:text-primary">
                  Get Quote
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600">
                <Phone size={16} />
                <a href="tel:+61400000000">+61 400 000 000</a>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <a href="mailto:info@freshplus.com.au">info@freshplus.com.au</a>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span>Melbourne, VIC 3000</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} FreshPlus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;