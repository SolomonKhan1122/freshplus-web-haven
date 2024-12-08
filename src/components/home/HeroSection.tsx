import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center animate-fade-up">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
            Professional Cleaning Services in Melbourne
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the difference with Melbourne's most trusted cleaning service. Professional, reliable, and tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/quote"
              className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-colors"
            >
              Get a Quote
            </Link>
            <a
              href="sms:+61400000000?body=Hi, I'm interested in your cleaning services."
              className="flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-md border border-primary hover:bg-primary-light transition-colors"
            >
              <MessageSquare size={20} /> Text Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;