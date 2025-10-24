import { Link } from "react-router-dom";
import { Home, Building2, Sparkles, Droplet, Wind, Globe, Grid3x3, Key, Sun } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      title: "Residential Cleaning",
      description: "Professional home cleaning tailored to your needs",
      icon: Home,
      path: "/services/residential",
    },
    {
      title: "Commercial Cleaning",
      description: "Pristine workplace cleaning solutions",
      icon: Building2,
      path: "/services/commercial",
    },
    {
      title: "Deep Cleaning",
      description: "Thorough cleaning for spotless results",
      icon: Sparkles,
      path: "/services/deep-cleaning",
    },
    {
      title: "Pressure Washing",
      description: "High-pressure cleaning for exterior surfaces",
      icon: Droplet,
      path: "/services/pressure-washing",
    },
    {
      title: "Carpet Cleaning",
      description: "Expert carpet cleaning for fresher carpets",
      icon: Wind,
      path: "/services/carpet",
    },
    {
      title: "Window Cleaning",
      description: "Crystal clear windows for more light",
      icon: Globe,
      path: "/services/window",
    },
    {
      title: "Tile & Grout Cleaning",
      description: "Restore tiles to pristine condition",
      icon: Grid3x3,
      path: "/services/tile-grout",
    },
    {
      title: "End of Lease",
      description: "Bond-back guarantee cleaning",
      icon: Key,
      path: "/services/end-of-lease",
    },
    {
      title: "Solar Panel Cleaning",
      description: "Maximize efficiency with professional cleaning",
      icon: Sun,
      path: "/services/solar-panel",
    },
  ];

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary-light to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Professional Services
          </h2>
          <p className="text-lg md:text-xl text-primary/80 max-w-3xl mx-auto">
            From residential homes to commercial spaces across Melbourne, we deliver exceptional cleaning solutions. Professional, reliable, and guaranteed results every time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={service.title}
                to={service.path}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-secondary"
              >
                <div className="p-6 md:p-8">
                  <div className="bg-gradient-to-br from-primary to-secondary w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="text-white h-7 w-7 md:h-8 md:w-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base text-primary/70 leading-relaxed">{service.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
