import { Phone, MessageSquare, ArrowRight, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

const Index = () => {
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

  const reviews = [
    {
      name: "Sarah Thompson",
      rating: 5,
      text: "Exceptional service! The team was professional, thorough, and left my home spotless.",
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Best commercial cleaning service in Melbourne. Highly recommended!",
    },
    {
      name: "Emma Wilson",
      rating: 5,
      text: "Reliable, efficient, and great attention to detail. Will use again!",
    },
  ];

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
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
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
              <Link
                to="/book"
                className="bg-white text-primary px-8 py-3 rounded-md border border-primary hover:bg-primary-light transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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

      {/* Why Choose Us Section */}
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

      {/* Reviews Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{review.text}</p>
                <p className="font-semibold text-primary">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">
            Get In Touch
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
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
      </section>
    </div>
  );
};

export default Index;