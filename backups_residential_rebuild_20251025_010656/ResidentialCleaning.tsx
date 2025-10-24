import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Phone, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Shield, 
  Sparkles,
  Home,
  Star,
  Award,
  Heart,
  Users,
  Calendar,
  Zap,
  Leaf
} from "lucide-react";

const ResidentialCleaning = () => {
  const cleaningServices = [
    {
      name: "Regular House Cleaning",
      description: "Weekly, fortnightly, or monthly scheduled cleaning to keep your home consistently spotless",
      icon: <Calendar className="w-6 h-6 text-accent" />
    },
    {
      name: "Deep Cleaning Service",
      description: "Comprehensive top-to-bottom cleaning for move-ins, special occasions, or seasonal refreshes",
      icon: <Sparkles className="w-6 h-6 text-accent" />
    },
    {
      name: "Kitchen Deep Clean",
      description: "Inside appliances, cabinets, backsplash, and all surfaces thoroughly cleaned and sanitized",
      icon: <Zap className="w-6 h-6 text-accent" />
    },
    {
      name: "Bathroom Sanitization",
      description: "Complete bathroom cleaning with hospital-grade products, eliminating germs and grime",
      icon: <Shield className="w-6 h-6 text-accent" />
    },
    {
      name: "Bedroom & Living Areas",
      description: "Dusting, vacuuming, mopping, and organizing all living spaces to perfection",
      icon: <Home className="w-6 h-6 text-accent" />
    },
    {
      name: "Internal Window Cleaning",
      description: "Crystal-clear windows and glass surfaces for maximum natural light",
      icon: <Star className="w-6 h-6 text-accent" />
    }
  ];

  const cleaningAreas = [
    "Living rooms and family areas", "All bedrooms and guest rooms", "Kitchen and dining areas", 
    "Bathrooms and powder rooms", "Hallways and staircases", "Home offices and studies",
    "Laundry rooms and mudrooms", "Internal windows and mirrors"
  ];

  const whyChooseUs = [
    {
      title: "Trusted Professionals",
      description: "Fully trained, background-checked, and insured cleaning specialists",
      icon: <Shield className="w-8 h-8 text-accent" />
    },
    {
      title: "Eco-Friendly Products",
      description: "Safe for children, pets, and the environment - premium green cleaning solutions",
      icon: <Leaf className="w-8 h-8 text-accent" />
    },
    {
      title: "Flexible Scheduling",
      description: "Book around your busy lifestyle with same-day service available",
      icon: <Clock className="w-8 h-8 text-accent" />
    },
    {
      title: "100% Satisfaction",
      description: "We guarantee perfect results or we'll return to make it right",
      icon: <Award className="w-8 h-8 text-accent" />
    }
  ];

  const pricingPlans = [
    {
      title: "One-Time Clean",
      description: "Perfect for special occasions or when you need a fresh start",
      features: ["Complete house cleaning", "All rooms and areas", "Eco-friendly products", "Satisfaction guarantee"],
      cta: "Get Quote"
    },
    {
      title: "Regular Weekly",
      description: "The ultimate convenience - your home always guest-ready",
      features: ["Weekly scheduled visits", "Consistent cleaning team", "Priority booking", "15% discount"],
      cta: "Book Weekly",
      popular: true
    },
    {
      title: "Fortnightly Service",
      description: "Perfect balance of cleanliness and affordability",
      features: ["Every two weeks", "Deep clean focus", "Flexible rescheduling", "10% discount"],
      cta: "Book Fortnightly"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                Professional <span className="text-accent">Residential Cleaning</span> Melbourne
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Transform your home into a spotless sanctuary with Melbourne's most trusted residential cleaning service. 
                Enjoy more free time while we take care of every detail, from deep cleaning to regular maintenance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 py-3">
                  <Link to="/quote">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Get Free Quote
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: +61 403 971 720
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>12+ years experience</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Licensed & insured</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Eco-friendly products</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/House Cleaning.webp" 
                  alt="Professional house cleaning service in Melbourne - FreshPlus residential cleaning team"
                  className="w-full h-[500px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/Home_Hero.webp';
                    e.currentTarget.className = 'w-full h-[500px] object-cover';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-primary font-semibold text-lg">Professional Home Care</p>
                    <p className="text-gray-700">Trusted by Melbourne families for over 12 years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Residential Cleaning Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Complete Home Cleaning Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From regular maintenance to deep cleaning, we provide comprehensive residential cleaning services 
              tailored to your home and lifestyle needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cleaningServices.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-light to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-semibold text-primary ml-3">{service.name}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Clean */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Every Room, Every Surface
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We clean every area of your home with meticulous attention to detail, ensuring no corner is overlooked.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cleaningAreas.map((area, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <Home className="w-8 h-8 text-accent mx-auto mb-3" />
                <span className="font-medium text-primary">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Melbourne Families Choose FreshPlus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference that comes from working with Melbourne's most trusted residential cleaning professionals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform">
                <div className="bg-gradient-to-br from-primary-light to-accent/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Flexible Cleaning Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect cleaning schedule that fits your lifestyle and budget. All plans include our satisfaction guarantee.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border ${plan.popular ? 'border-accent ring-2 ring-accent/20' : 'border-gray-100'} relative`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-primary mb-3">{plan.title}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className={`w-full ${plan.popular ? 'bg-accent hover:bg-accent/90' : 'bg-primary hover:bg-primary/90'} text-white`}>
                  <Link to="/quote">
                    {plan.cta}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Serving Melbourne Homes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional residential cleaning services available throughout Melbourne and surrounding suburbs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            {[
              "Melbourne CBD", "South Yarra", "Richmond", "Collingwood", "Fitzroy",
              "Carlton", "St Kilda", "Prahran", "Toorak", "Hawthorn",
              "Camberwell", "Kew", "Northcote", "Thornbury", "Preston",
              "Coburg", "Brunswick", "Footscray", "Williamstown", "Altona"
            ].map((suburb, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-light to-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-primary font-medium">{suburb}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't see your suburb? <span className="text-accent font-semibold">Call us</span> - we likely service your area too!
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for a Spotless Home?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join thousands of satisfied Melbourne families who trust FreshPlus for their home cleaning needs. 
            Get your free quote today and discover the difference professional cleaning makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg">
              <Link to="/quote">
                <MessageSquare className="mr-2 h-6 w-6" />
                Get Your Free Quote
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg">
              <Phone className="mr-2 h-6 w-6" />
              Call: +61 403 971 720
            </Button>
          </div>
          <div className="mt-8 text-sm opacity-75">
            <p>📍 Serving all Melbourne suburbs | ⏰ Flexible scheduling available | 🛡️ Fully insured & licensed</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResidentialCleaning;
