import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      title: "Residential Cleaning",
      description: "Professional home cleaning services tailored to your needs",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
      path: "/services/residential",
    },
    {
      title: "Commercial Cleaning",
      description: "Keep your workplace pristine with our commercial cleaning solutions",
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80",
      path: "/services/commercial",
    },
    {
      title: "Deep Cleaning",
      description: "Thorough deep cleaning services for a spotless environment",
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80",
      path: "/services/deep-cleaning",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          Our Services
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.path}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <span className="text-primary hover:text-primary-dark flex items-center gap-2">
                  Learn More <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;