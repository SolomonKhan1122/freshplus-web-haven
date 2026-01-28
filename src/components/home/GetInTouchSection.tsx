import { Phone, MessageSquare, Mail, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const GetInTouchSection = () => {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-dark to-primary text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready for a Cleaner Home or Office?
          </h2>
          <p className="text-lg md:text-xl text-primary-light max-w-2xl mx-auto mb-8">
            Get your free quote today and experience the Fresh Plus difference across Melbourne.
          </p>
          
          {/* Single CTA Button */}
          <Link to="/get-quote">
            <Button className="bg-accent hover:bg-accent-dark text-black font-bold px-10 py-6 text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              See Instant Pricing
            </Button>
          </Link>
        </div>
        
        {/* Contact Info in Two Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <a
            href="tel:+61403971720"
            className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 text-center"
          >
            <div className="bg-accent w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
              <Phone className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2">Call Now</h3>
            <p className="text-primary-light text-base font-semibold">+61 403 971 720</p>
          </a>
          
          <a
            href="sms:+61403971720?body=Hi, I'm interested in Fresh Plus cleaning services."
            className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 text-center"
          >
            <div className="bg-secondary w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
              <MessageSquare className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2">Text Us</h3>
            <p className="text-primary-light text-base font-semibold">+61 403 971 720</p>
          </a>
          
          <a
            href="mailto:infofreshplusclean@gmail.com"
            className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 text-center"
          >
            <div className="bg-accent w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2">Email Us</h3>
            <p className="text-primary-light text-sm break-all px-2">infofreshplusclean@gmail.com</p>
          </a>
          
          <Link
            to="/get-quote"
            className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 text-center"
          >
            <div className="bg-secondary w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
              <Calendar className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2">Book Online</h3>
            <p className="text-primary-light text-sm">See Price Instantly</p>
          </Link>
        </div>
        
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block border border-white/20">
            <p className="text-primary-light text-base">
              <span className="font-bold text-white">Monday - Sunday:</span> 8:00 AM - 5:00 PM
            </p>
            <p className="text-sm text-primary-light mt-2">Emergency services available 24/7</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;
