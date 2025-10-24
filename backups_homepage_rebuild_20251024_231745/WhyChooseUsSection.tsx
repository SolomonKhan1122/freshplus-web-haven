import { Shield, Leaf, Clock, Award } from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      title: "Professional & Reliable Team",
      description: "Experienced, vetted, and trained cleaning professionals with full insurance coverage",
      icon: Shield,
      color: "bg-primary",
    },
    {
      title: "Eco-Friendly Products",
      description: "Safe for your family, pets, and the environment - our commitment to sustainability",
      icon: Leaf,
      color: "bg-secondary",
    },
    {
      title: "Flexible Scheduling",
      description: "Book cleanings at your convenience with same-day service available",
      icon: Clock,
      color: "bg-accent",
    },
    {
      title: "100% Satisfaction Guarantee",
      description: "Your satisfaction is our top priority - we'll make it right if you're not happy",
      icon: Award,
      color: "bg-primary",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-secondary-light via-white to-primary-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            Why Choose FreshPlus?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary/80 max-w-3xl mx-auto px-4">
            We're not just another cleaning service. We're your trusted partner in maintaining 
            a spotless, healthy environment for your family and business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-secondary"
              >
                <div className={`${feature.color} w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="text-white h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 group-hover:text-secondary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-primary/70 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 sm:px-8 py-6 rounded-2xl shadow-xl inline-block max-w-md mx-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Ready to Experience the FreshPlus Difference?</h3>
            <p className="text-primary-light text-sm sm:text-base">Join thousands of satisfied customers across Melbourne</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;