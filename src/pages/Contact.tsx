import Navigation from "@/components/Navigation";
import { Phone, Mail, MessageSquare, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-primary mb-6 text-center">Contact Us</h1>
          <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            Have questions about our cleaning services? We're here to help! Choose your preferred way to reach us below.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <a
              href="tel:+61400000000"
              className="flex flex-col items-center p-6 bg-primary-light rounded-lg hover:bg-primary-light/80 transition-colors"
            >
              <Phone size={32} className="text-primary mb-4" />
              <h2 className="text-lg font-semibold text-primary mb-2">Call Us</h2>
              <p className="text-gray-600">+61 400 000 000</p>
            </a>

            <a
              href="sms:+61400000000"
              className="flex flex-col items-center p-6 bg-primary-light rounded-lg hover:bg-primary-light/80 transition-colors"
            >
              <MessageSquare size={32} className="text-primary mb-4" />
              <h2 className="text-lg font-semibold text-primary mb-2">Text Us</h2>
              <p className="text-gray-600">+61 400 000 000</p>
            </a>

            <a
              href="mailto:info@freshplus.com.au"
              className="flex flex-col items-center p-6 bg-primary-light rounded-lg hover:bg-primary-light/80 transition-colors"
            >
              <Mail size={32} className="text-primary mb-4" />
              <h2 className="text-lg font-semibold text-primary mb-2">Email Us</h2>
              <p className="text-gray-600">info@freshplus.com.au</p>
            </a>

            <div className="flex flex-col items-center p-6 bg-primary-light rounded-lg">
              <MapPin size={32} className="text-primary mb-4" />
              <h2 className="text-lg font-semibold text-primary mb-2">Visit Us</h2>
              <p className="text-gray-600 text-center">Melbourne, VIC 3000</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/quote"
              className="inline-block bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;