import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      title: "Residential Cleaning",
      description: "Professional home cleaning services tailored to your needs",
      icon: "🏠",
      path: "/services/residential",
    },
    {
      title: "Commercial Cleaning",
      description: "Keep your workplace pristine with our commercial cleaning solutions",
      icon: "🏢",
      path: "/services/commercial",
    },
    {
      title: "Deep Cleaning",
      description: "Thorough deep cleaning services for a spotless environment",
      icon: "✨",
      path: "/services/deep-cleaning",
    },
    {
      title: "Carpet Cleaning",
      description: "Expert carpet cleaning for fresher, cleaner carpets",
      icon: "🧽",
      path: "/services/carpet",
    },
    {
      title: "Window Cleaning",
      description: "Crystal clear windows that let in more light",
      icon: "🪟",
      path: "/services/window",
    },
    {
      title: "Tile & Grout Cleaning",
      description: "Restore your tiles and grout to pristine condition",
      icon: "🧱",
      path: "/services/tile-grout",
    },
    {
      title: "End of Lease",
      description: "Comprehensive cleaning to ensure your bond return",
      icon: "🔑",
      path: "/services/end-of-lease",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary-light to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            Our Professional Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary/80 max-w-3xl mx-auto px-4">
            From residential homes to commercial spaces, we deliver exceptional cleaning solutions 
            tailored to your specific needs. Professional, reliable, and guaranteed results.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-semibold">
            <span className="bg-accent/20 text-primary px-4 py-2 rounded-full">✓ Licensed & Insured</span>
            <span className="bg-secondary/20 text-primary px-4 py-2 rounded-full">✓ Eco-Friendly Products</span>
            <span className="bg-primary/20 text-primary px-4 py-2 rounded-full">✓ Same Day Service</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.path}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-secondary"
            >
              <div className="p-6 sm:p-8 text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">{service.icon}</div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-3 sm:mb-4 group-hover:text-secondary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-primary/70 mb-4 sm:mb-6 leading-relaxed">{service.description}</p>
                <div className="flex items-center justify-center gap-2 text-accent font-semibold group-hover:text-accent-dark transition-colors text-sm sm:text-base">
                  Learn More <ArrowRight size={16} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;