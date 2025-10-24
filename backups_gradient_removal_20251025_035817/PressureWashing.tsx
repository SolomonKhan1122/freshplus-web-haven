import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Phone, 
  CheckCircle, 
  Clock, 
  Shield, 
  Sparkles,
  Star,
  Award,
  Calendar,
  Leaf,
  Home,
  Building
} from "lucide-react";

const PressureWashing = () => {
  const cleaningServices = [
    {
      name: "Driveway Cleaning",
      description: "Remove oil stains, tire marks, and years of dirt from concrete and paved driveways",
      icon: Home
    },
    {
      name: "Deck & Patio",
      description: "Restore wooden decks and outdoor patios to their natural beauty",
      icon: Sparkles
    },
    {
      name: "Building Exteriors",
      description: "Clean walls, facades, and external surfaces for homes and businesses",
      icon: Building
    }
  ];

  const whyChooseUs = [
    {
      title: "High-Pressure Equipment",
      description: "Commercial-grade pressure washers",
      icon: Shield
    },
    {
      title: "Eco-Friendly Solutions",
      description: "Safe cleaning agents and water-efficient",
      icon: Leaf
    },
    {
      title: "Experienced Team",
      description: "Trained in surface care and safety",
      icon: Clock
    },
    {
      title: "Guaranteed Results",
      description: "Satisfaction or we'll make it right",
      icon: Award
    }
  ];

  const pricingPlans = [
    {
      title: "Driveway Only",
      description: "Perfect for standard driveway refresh",
      features: ["Single driveway", "Oil stain treatment", "Tire mark removal", "Surface sealing", "1-2 hour service"],
      cta: "Get Quote"
    },
    {
      title: "Home Exterior",
      description: "Complete outdoor cleaning solution",
      features: ["Driveway & paths", "Deck or patio", "External walls", "Window cleaning", "3-5 hour service"],
      cta: "Get Quote",
      popular: true
    },
    {
      title: "Commercial",
      description: "Business and large property cleaning",
      features: ["Large surface areas", "Multi-level buildings", "Car parks", "Scheduled service", "Custom quote"],
      cta: "Get Quote"
    }
  ];

  const serviceAreas = [
    "Melbourne CBD", "South Yarra", "Richmond", "Collingwood", "Fitzroy",
    "Carlton", "St Kilda", "Prahran", "Toorak", "Hawthorn",
    "Camberwell", "Kew", "Northcote", "Thornbury", "Preston"
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Pressure Washing Melbourne | Fresh Plus Cleaning"
        description="Professional pressure washing services across Melbourne. Driveways, decks, patios, and building exteriors. Eco-friendly high-pressure cleaning specialists."
        canonical="https://www.freshpluscleaning.com.au/services/pressure-washing"
        type="service"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Pressure Washing",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Fresh Plus Cleaning Melbourne",
            "telephone": "+61 403 971 720",
            "areaServed": "Melbourne, VIC",
            "url": "https://freshpluscleaning.com.au"
          },
          "areaServed": {
            "@type": "City",
            "name": "Melbourne",
            "addressRegion": "VIC",
            "addressCountry": "AU"
          }
        }}
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            Pressure Washing Melbourne
              </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your exterior surfaces with professional high-pressure cleaning. Remove stubborn dirt, grime, and stains from driveways, decks, and walls.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-black font-semibold px-8 py-6 text-lg">
              <Link to="/quote">Get Free Quote</Link>
                  </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg">
                <a href="tel:+61403971720">
                <Phone className="mr-2 h-5 w-5" />
                Call 0403 971 720
              </a>
                  </Button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-6">
            {[
              { icon: Calendar, text: "12+ Years Experience" },
              { icon: Shield, text: "Licensed & Insured" },
              { icon: Star, text: "4.9★ Google Rating" },
              { icon: Leaf, text: "Eco-Friendly Products" }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex flex-col items-center gap-2">
                  <IconComponent className="w-8 h-8 text-primary" />
                  <p className="font-medium text-gray-700">{item.text}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-14 px-4">
        <div className="max-w-screen-lg mx-auto text-center">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Our professional pressure washing service uses state-of-the-art equipment and eco-friendly solutions to safely and effectively clean all exterior surfaces. From oil-stained driveways to weathered decks, we restore your property's curb appeal.
            </p>
          </div>
      </section>

      {/* Cleaning Services Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Pressure Washing Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {cleaningServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <IconComponent className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose Fresh Plus
            </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Pressure Washing Packages
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Choose the perfect package for your property
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow relative ${plan.popular ? 'ring-2 ring-accent' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-black px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
          </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.title}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className={`w-full ${plan.popular ? 'bg-accent hover:bg-accent-dark text-black' : 'bg-primary hover:bg-primary-dark text-white'} font-semibold`}>
                  <Link to="/quote">{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Pressure Washing Across Melbourne
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Professional high-pressure cleaning throughout Melbourne
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {serviceAreas.map((suburb, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <span className="text-gray-900 font-medium">{suburb}</span>
                  </div>
                ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't see your suburb? <a href="tel:+61403971720" className="text-accent font-semibold hover:underline">Call us</a> - we likely service your area too
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Property?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Remove years of dirt and grime with professional pressure washing. Get your free quote today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-black font-semibold px-8 py-6 text-lg">
              <Link to="/quote">Get Your Free Quote</Link>
              </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg group">
              <a href="tel:+61403971720" className="flex items-center">
                <Phone className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                Call 0403 971 720
              </a>
              </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PressureWashing;
