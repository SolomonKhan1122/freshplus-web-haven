import { CheckCircle } from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      title: "Professional & Reliable Team",
      description: "Experienced, vetted, and trained cleaning professionals",
    },
    {
      title: "Eco-Friendly Products",
      description: "Safe for your family, pets, and the environment",
    },
    {
      title: "Flexible Scheduling",
      description: "Book cleanings at your convenience",
    },
    {
      title: "100% Satisfaction Guarantee",
      description: "Your satisfaction is our top priority",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-light">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <CheckCircle className="text-primary mb-4 h-8 w-8" />
              <h3 className="text-lg font-semibold text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;