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
  Droplets,
  Wind
} from "lucide-react";

const CarpetCleaning = () => {
  const services = [
    {
      name: "Deep Steam Cleaning",
      description: "Truck-mounted equipment for maximum dirt and allergen extraction",
      icon: <Droplets className="w-6 h-6 text-accent" />
    },
    {
      name: "Stain Removal",
      description: "Expert treatment for wine, coffee, food, and pet stains",
      icon: <Sparkles className="w-6 h-6 text-accent" />
    },
    {
      name: "Odor Elimination",
      description: "Professional deodorizing for fresh, clean-smelling carpets",
      icon: <Wind className="w-6 h-6 text-accent" />
    },
    {
      name: "Allergen Removal",
      description: "Remove dust mites and allergens for healthier indoor air",
      icon: <Shield className="w-6 h-6 text-accent" />
    },
    {
      name: "Carpet Protection",
      description: "Apply protective coating to prevent future staining",
      icon: <Award className="w-6 h-6 text-accent" />
    },
    {
      name: "Quick-Dry Technology",
      description: "Advanced drying methods for faster return to normal use",
      icon: <Clock className="w-6 h-6 text-accent" />
    }
  ];

  const carpetTypes = [
    "Wool carpets", "Synthetic carpets", "Berber carpets", "Shag carpets",
    "Persian & Oriental rugs", "Area rugs", "Office carpets", "Stairs carpeting"
  ];

  const problemsWesolve = [
    "Stubborn stains and spills",
    "Embedded dirt and grime", 
    "Pet odors and accidents",
    "Allergens and dust mites",
    "Traffic wear patterns",
    "Dull, faded appearance",
    "Unpleasant odors",
    "Matted carpet fibers"
  ];

  const whyChooseUs = [
    {
      title: "12+ Years Experience",
      description: "Over a decade serving Melbourne homes and businesses",
      icon: <Award className="w-8 h-8 text-accent" />
    },
    {
      title: "Licensed & Insured",
      description: "Fully licensed, insured, and bonded for your peace of mind",
      icon: <Shield className="w-8 h-8 text-accent" />
    },
    {
      title: "Eco-Friendly Products",
      description: "Safe for children, pets, and the environment",
      icon: <Heart className="w-8 h-8 text-accent" />
    },
    {
      title: "100% Satisfaction",
      description: "We guarantee you'll love the results or we'll return",
      icon: <Star className="w-8 h-8 text-accent" />
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
                Professional <span className="text-accent">Carpet Cleaning</span> Melbourne
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Transform your tired, dirty carpets into fresh, vibrant floor coverings that look and smell like new. 
                Our expert steam cleaning removes deep-seated dirt, allergens, and stains that regular vacuuming can't reach.
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
                  <span>Same-day service available</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>100% satisfaction guarantee</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/carpet-cleaning-service.jpg" 
                  alt="Professional carpet cleaning service in Melbourne - FreshPlus technician using industrial equipment"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-primary font-semibold text-lg">Professional Equipment</p>
                    <p className="text-gray-700">Truck-mounted steam cleaning for deep extraction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Carpet Problems We Solve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't let dirty carpets affect your home's comfort and air quality. We tackle the toughest carpet challenges.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemsWesolve.map((problem, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-light to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <CheckCircle className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-primary mb-2">{problem}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Complete Carpet Care Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From deep cleaning to protection, we offer comprehensive carpet care solutions for Melbourne homes and businesses.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
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

      {/* Our Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Professional Carpet Cleaning Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven 7-step process to ensure your carpets receive the best possible care.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Pre-Inspection",
                description: "We assess your carpets and identify problem areas, stains, and high-traffic zones."
              },
              {
                step: "2", 
                title: "Pre-Treatment",
                description: "Stubborn stains and heavily soiled areas receive specialized pre-treatment solutions."
              },
              {
                step: "3",
                title: "Hot Water Extraction", 
                description: "Our truck-mounted system delivers deep steam cleaning with powerful extraction."
              },
              {
                step: "4",
                title: "Spot Treatment",
                description: "Any remaining spots get additional attention with specialized stain removal techniques."
              },
              {
                step: "5",
                title: "Deodorizing",
                description: "Professional deodorizing treatment eliminates odors and leaves carpets smelling fresh."
              },
              {
                step: "6",
                title: "Protection (Optional)",
                description: "Apply carpet protection to help prevent future staining and extend carpet life."
              },
              {
                step: "7",
                title: "Grooming & Drying",
                description: "We groom carpet fibers and ensure optimal drying for the best appearance."
              },
              {
                step: "8",
                title: "Final Inspection",
                description: "Quality check to ensure you're completely satisfied with the results."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carpet Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              We Clean All Carpet Types
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our expert technicians are trained to safely and effectively clean all types of carpets and rugs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {carpetTypes.map((type, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <Home className="w-6 h-6 text-accent mx-auto mb-2" />
                <span className="font-medium text-primary">{type}</span>
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
              Why Melbourne Chooses FreshPlus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference that professional expertise and genuine care make for your carpets.
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

      {/* Service Areas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Serving All Melbourne Suburbs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional carpet cleaning services available throughout Melbourne and surrounding areas.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            {[
              "Melbourne CBD", "South Yarra", "Richmond", "Collingwood", "Fitzroy",
              "Carlton", "St Kilda", "Prahran", "Toorak", "Hawthorn",
              "Camberwell", "Kew", "Northcote", "Thornbury", "Preston",
              "Coburg", "Brunswick", "Footscray", "Williamstown", "Altona"
            ].map((suburb, index) => (
              <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
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
            Ready to Transform Your Carpets?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Don't let dirty carpets affect your home's comfort and health. Get your free quote today and 
            discover why Melbourne homeowners trust FreshPlus for professional carpet cleaning.
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
            <p>📍 Servicing all Melbourne suburbs | ⏰ Same-day service available | 🛡️ Fully insured & licensed</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CarpetCleaning;
