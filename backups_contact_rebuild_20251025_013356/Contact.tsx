import Navigation from "@/components/Navigation";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MessageSquare, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <Navigation />
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-12 border-t-4 border-accent">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-primary mb-6">Contact FreshPlus</h1>
            <p className="text-xl text-primary/80 mb-8 max-w-3xl mx-auto">
              Have questions about our cleaning services? We're here to help! Get in touch with Melbourne's most trusted cleaning professionals.
            </p>
            
            {/* Urgent Contact Notice */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Phone className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-bold text-amber-800">Need Urgent Assistance?</h3>
              </div>
              <p className="text-amber-700 font-semibold">
                For urgent inquiries, please call us directly at <a href="tel:+61403971720" className="text-primary hover:text-accent font-bold underline">+61 403 971 720</a>
              </p>
              <p className="text-amber-600 text-sm mt-2">
                Response times: Within 1 hour (7AM-7PM) • Next business day (after 7PM)
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <a
              href="tel:+61403971720"
              className="group bg-gradient-to-br from-primary-light to-secondary-light p-8 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-accent"
            >
              <div className="bg-accent w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Phone size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-3">Call Now</h2>
              <p className="text-primary/80 text-lg font-semibold mb-2">+61 403 971 720</p>
              <p className="text-secondary text-sm">Within 1 hour (7AM-7PM)</p>
            </a>

            <a
              href="sms:+61403971720"
              className="group bg-gradient-to-br from-secondary-light to-accent-light p-8 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-secondary"
            >
              <div className="bg-secondary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-3">Text Us</h2>
              <p className="text-primary/80 text-lg font-semibold mb-2">+61 403 971 720</p>
              <p className="text-secondary text-sm">Quick response guaranteed</p>
            </a>

            <a
              href="mailto:infofreshplusclean@gmail.com"
              className="group bg-gradient-to-br from-accent-light to-primary-light p-8 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary"
            >
              <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mail size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-3">Email Us</h2>
              <p className="text-primary/80 text-sm font-semibold mb-2 break-all">infofreshplusclean@gmail.com</p>
              <p className="text-secondary text-sm">Detailed inquiries welcome</p>
            </a>

            <div className="group bg-gradient-to-br from-primary-light to-secondary-light p-8 rounded-2xl border-2 border-primary/20">
              <div className="bg-secondary w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <MapPin size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-3">Service Area</h2>
              <p className="text-primary/80 font-semibold mb-2">Melbourne, VIC</p>
              <p className="text-secondary text-sm">All suburbs covered</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mb-12">
            <ContactForm />
          </div>

          <div className="text-center bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Book Your Cleaning Service?</h2>
            <p className="text-primary-light mb-6 text-lg">Get your free quote today and experience the FreshPlus difference!</p>
            <Link
              to="/quote"
              className="inline-block bg-accent hover:bg-accent-dark text-black font-bold px-12 py-4 rounded-xl text-xl transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;