import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Home,
  Building,
  Sparkles,
  Droplets,
  Wind,
  Zap,
  CheckCircle,
  Star,
  Shield,
  Calendar,
  Leaf,
  ArrowRight
} from "lucide-react";

const Services = () => {
  const services = [
    {
      name: "Residential Cleaning",
      description: "Weekly, fortnightly, or monthly home cleaning services",
      icon: Home,
      path: "/services/residential",
      popular: true
    },
    {
      name: "Commercial Cleaning",
      description: "Office, retail, and warehouse cleaning solutions",
      icon: Building,
      path: "/services/commercial"
    },
    {
      name: "Deep Cleaning",
      description: "Comprehensive top-to-bottom cleaning service",
      icon: Sparkles,
      path: "/services/deep-cleaning"
    },
    {
      name: "Carpet Cleaning",
      description: "Steam cleaning and stain removal for all carpet types",
      icon: Droplets,
      path: "/services/carpet"
    },
    {
      name: "Tile & Grout Cleaning",
      description: "Restore shine to kitchen, bathroom, and outdoor tiles",
      icon: Sparkles,
      path: "/services/tile-grout"
    },
    {
      name: "Pressure Washing",
      description: "Driveways, decks, and exterior surface cleaning",
      icon: Wind,
      path: "/services/pressure-washing"
    },
    {
      name: "Solar Panel Cleaning",
      description: "Maximize energy efficiency with professional cleaning",
      icon: Zap,
      path: "/services/solar-panel"
    },
    {
      name: "End of Lease Cleaning",
      description: "100% bond back guarantee for rental properties",
      icon: Home,
      path: "/services/end-of-lease",
      popular: true
    }
  ];

  const whyChooseUs = [
    {
      title: "12+ Years Experience",
      description: "Trusted by Melbourne families and businesses",
      icon: Calendar
    },
    {
      title: "Licensed & Insured",
      description: "Fully certified and protected",
      icon: Shield
    },
    {
      title: "4.9★ Rated",
      description: "Hundreds of 5-star reviews",
      icon: Star
    },
    {
      title: "Eco-Friendly",
      description: "Safe for family, pets, and environment",
      icon: Leaf
    }
  ];

    return (
      <div className="min-h-screen bg-white">
      <SEOHead
        title="Professional Cleaning Services Melbourne | Fresh Plus Cleaning"
        description="Complete cleaning services across Melbourne. Residential, commercial, deep cleaning, carpet, tile & grout, pressure washing, and more. Licensed, insured, eco-friendly."
        canonical="https://www.freshpluscleaning.com.au/services"
        type="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Cleaning Services",
          "description": "Professional cleaning services in Melbourne",
          "itemListElement": services.map((service, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Service",
              "name": service.name,
              "description": service.description,
              "url": `https://freshpluscleaning.com.au${service.path}`
            }
          }))
        }}
      />
      
        <Navigation />
      
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            Professional Cleaning Services Melbourne
                </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            From residential homes to commercial spaces, we provide comprehensive cleaning solutions trusted by Melbourne for over 12 years.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-black font-semibold px-8 py-6 text-lg">
              <Link to="/quote">Get Free Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg">
              <a href="tel:+61403971720">Call 0403 971 720</a>
            </Button>
          </div>
                  </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-6">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex flex-col items-center gap-2">
                  <IconComponent className="w-8 h-8 text-primary" />
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
                  </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Cleaning Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional cleaning solutions for every need. Choose the service that's right for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link
                  key={index}
                  to={service.path}
                  className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all group relative ${
                    service.popular ? 'ring-2 ring-accent' : 'border border-gray-100'
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 right-4">
                      <span className="bg-accent text-black px-3 py-1 rounded-full text-xs font-semibold">
                        Popular
                      </span>
                    </div>
                  )}
                  <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="flex items-center text-primary font-medium text-sm group-hover:text-accent transition-colors">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Fresh Plus */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Fresh Plus
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Melbourne's trusted cleaning professionals delivering excellence since 2012
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Professional Team",
                description: "Trained, vetted, and experienced cleaning specialists who treat your property with care and respect"
              },
              {
                title: "Quality Guaranteed",
                description: "100% satisfaction guarantee on all services. If you're not happy, we'll make it right"
              },
              {
                title: "Eco-Friendly Products",
                description: "Safe, effective cleaning solutions that protect your family, pets, and the environment"
              },
              {
                title: "Flexible Scheduling",
                description: "Book services at times that work for you, including same-day and after-hours availability"
              },
              {
                title: "Competitive Pricing",
                description: "Fair, transparent pricing with no hidden fees. Get exactly what you pay for"
              },
              {
                title: "Melbourne Local",
                description: "Proudly serving all Melbourne suburbs with local knowledge and personalized service"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Fresh Plus Quality?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied Melbourne customers. Get your free quote today
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

export default Services;
