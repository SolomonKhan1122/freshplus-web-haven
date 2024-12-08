import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { Phone, MessageSquare } from "lucide-react";

const Services = () => {
  const { service } = useParams();

  const serviceInfo = {
    residential: {
      title: "Professional Residential Cleaning Services",
      description: "Transform your home with our comprehensive residential cleaning services. We provide thorough, reliable, and customized cleaning solutions for homes of all sizes.",
      features: [
        "Regular house cleaning",
        "Deep cleaning services",
        "Kitchen and bathroom sanitization",
        "Indoor window cleaning",
        "Dusting and vacuuming"
      ]
    },
    commercial: {
      title: "Commercial Cleaning Solutions",
      description: "Keep your workplace pristine with our professional commercial cleaning services. We help maintain a clean, healthy environment for your employees and customers.",
      features: [
        "Office cleaning",
        "Retail space maintenance",
        "Industrial cleaning",
        "Common area sanitization",
        "Floor care services"
      ]
    },
    "deep-cleaning": {
      title: "Deep Cleaning Services",
      description: "Our deep cleaning service goes beyond regular cleaning to ensure every corner of your space is thoroughly cleaned and sanitized.",
      features: [
        "Detailed surface cleaning",
        "Behind furniture cleaning",
        "Cabinet and drawer cleaning",
        "Baseboards and trim cleaning",
        "Air vent cleaning"
      ]
    },
    window: {
      title: "Professional Window Cleaning",
      description: "Crystal clear windows that let in more light and improve your property's appearance. Our window cleaning service is thorough and reliable.",
      features: [
        "Interior and exterior cleaning",
        "Screen cleaning",
        "Track and sill cleaning",
        "Hard water removal",
        "High-rise window cleaning"
      ]
    },
    carpet: {
      title: "Expert Carpet Cleaning",
      description: "Revitalize your carpets with our professional cleaning service. We remove deep-seated dirt, stains, and allergens for fresher, cleaner carpets.",
      features: [
        "Deep steam cleaning",
        "Stain removal",
        "Deodorizing",
        "Pet stain treatment",
        "Allergen removal"
      ]
    },
    "end-of-lease": {
      title: "End of Lease Cleaning Services",
      description: "Ensure your bond return with our comprehensive end of lease cleaning service. We follow real estate agent and property manager requirements.",
      features: [
        "Full property cleaning",
        "Kitchen deep clean",
        "Bathroom sanitization",
        "Carpet steam cleaning",
        "Window and track cleaning"
      ]
    },
  };

  const currentService = service ? serviceInfo[service as keyof typeof serviceInfo] : null;

  if (!currentService) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-24 px-4">
          <h1 className="text-3xl font-bold text-primary text-center">Service not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-primary mb-6">{currentService.title}</h1>
          <p className="text-gray-600 mb-8 text-lg">{currentService.description}</p>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">Our Service Features:</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentService.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-colors text-center"
            >
              Get a Quote
            </Link>
            <a
              href="tel:+61400000000"
              className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-colors"
            >
              <Phone size={20} /> Call Us
            </a>
            <a
              href="sms:+61400000000?body=Hi, I'm interested in your cleaning services."
              className="flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-md border border-primary hover:bg-primary-light transition-colors"
            >
              <MessageSquare size={20} /> Text Us
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;