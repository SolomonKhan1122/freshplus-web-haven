import { Phone, MessageSquare, Mail, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const GetInTouchSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-dark to-primary text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary-light max-w-3xl mx-auto px-4">
            Contact FreshPlus today for a free quote or to schedule your professional cleaning service. 
            We're here to make your space spotless!
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 mb-12">
          <a
            href="tel:+61403971720"
            className="group bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
          >
            <div className="bg-accent w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <Phone className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Call Now</h3>
            <p className="text-primary-light text-base sm:text-lg font-semibold">+61 403 971 720</p>
            <p className="text-xs sm:text-sm text-primary-light mt-2">Immediate assistance</p>
          </a>
          
          <a
            href="sms:+61403971720?body=Hi, I'm interested in FreshPlus cleaning services."
            className="group bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
          >
            <div className="bg-secondary w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Text Us</h3>
            <p className="text-primary-light text-base sm:text-lg font-semibold">+61 403 971 720</p>
            <p className="text-xs sm:text-sm text-primary-light mt-2">Quick response</p>
          </a>
          
          <a
            href="mailto:infofreshplusclean@gmail.com"
            className="group bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
          >
            <div className="bg-accent w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <Mail className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Email Us</h3>
            <p className="text-primary-light text-xs sm:text-sm">infofreshplusclean@gmail.com</p>
            <p className="text-xs sm:text-sm text-primary-light mt-2">Detailed inquiries</p>
          </a>
          
          <Link
            to="/quote"
            className="group bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
          >
            <div className="bg-secondary w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <Calendar className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Get Quote</h3>
            <p className="text-primary-light text-xs sm:text-sm">Schedule service</p>
            <p className="text-xs sm:text-sm text-primary-light mt-2">24/7 booking</p>
          </Link>
        </div>
        
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 inline-block border border-white/20 max-w-md mx-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Office Hours</h3>
            <p className="text-primary-light text-base sm:text-lg">
              <span className="font-semibold text-accent">Monday - Sunday:</span> 8:00 AM - 5:00 PM
            </p>
            <p className="text-xs sm:text-sm text-primary-light mt-2">Emergency services available 24/7</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;