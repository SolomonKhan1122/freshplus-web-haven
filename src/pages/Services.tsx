import Navigation from "@/components/Navigation";
import { useParams } from "react-router-dom";

const Services = () => {
  const { service } = useParams();

  const serviceInfo = {
    residential: {
      title: "Residential Cleaning",
      description: "Professional home cleaning services tailored to your needs",
    },
    commercial: {
      title: "Commercial Cleaning",
      description: "Keep your workplace pristine with our commercial cleaning solutions",
    },
    "deep-cleaning": {
      title: "Deep Cleaning",
      description: "Thorough deep cleaning services for a spotless environment",
    },
    window: {
      title: "Window Cleaning",
      description: "Professional window cleaning services for crystal clear views",
    },
    carpet: {
      title: "Carpet Cleaning",
      description: "Deep carpet cleaning for fresh and hygienic floors",
    },
    "end-of-lease": {
      title: "End of Lease Cleaning",
      description: "Comprehensive cleaning services to ensure your bond return",
    },
  };

  const currentService = service ? serviceInfo[service as keyof typeof serviceInfo] : null;

  if (!currentService) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
        <Navigation />
        <div className="pt-24 px-4">
          <h1 className="text-3xl font-bold text-primary text-center">Service not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <Navigation />
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">{currentService.title}</h1>
        <p className="text-gray-600 mb-8">{currentService.description}</p>
        {/* Add more service-specific content here */}
      </div>
    </div>
  );
};

export default Services;