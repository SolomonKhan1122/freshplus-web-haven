import { Shield, Leaf, Clock, Award } from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      title: "Local Team",
      description: "Melbourne-based professionals with full insurance and expert training",
      icon: Shield,
      color: "bg-primary",
    },
    {
      title: "Eco-Friendly Products",
      description: "Safe for your family, pets, and the environment",
      icon: Leaf,
      color: "bg-secondary",
    },
    {
      title: "Flexible Scheduling",
      description: "Book at your convenience with same-day service available",
      icon: Clock,
      color: "bg-accent",
    },
    {
      title: "Satisfaction Guarantee",
      description: "100% satisfaction or we'll make it right at no extra cost",
      icon: Award,
      color: "bg-primary",
    },
  ];

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-secondary-light via-white to-primary-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            Why Choose Fresh Plus?
          </h2>
          <p className="text-lg md:text-xl text-primary/80 max-w-3xl mx-auto">
            Your trusted partner for maintaining a spotless, healthy environment across Melbourne.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-secondary"
              >
                <div className={`${feature.color} w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="text-white h-7 w-7 md:h-8 md:w-8" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-base text-primary/70 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
