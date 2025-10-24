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
  Zap,
  Target,
  Scissors,
  Droplets,
  Wind,
  Thermometer,
  Eye,
  RefreshCw
} from "lucide-react";

const DeepCleaning = () => {
  const deepCleaningServices = [
    {
      name: "Kitchen Deep Clean",
      description: "Inside appliances, cabinets, drawers, backsplash deep scrubbing, and grease removal",
      icon: <Zap className="w-6 h-6 text-accent" />
    },
    {
      name: "Bathroom Intensive Clean",
      description: "Tile scrubbing, grout cleaning, mold removal, and complete sanitization",
      icon: <Droplets className="w-6 h-6 text-accent" />
    },
    {
      name: "Bedroom & Living Deep Clean",
      description: "Furniture moving, baseboards, light fixtures, and detailed dusting of all surfaces",
      icon: <Home className="w-6 h-6 text-accent" />
    },
    {
      name: "Window & Glass Restoration",
      description: "Internal and external windows, mirrors, glass doors cleaned to crystal clarity",
      icon: <Eye className="w-6 h-6 text-accent" />
    },
    {
      name: "Carpet & Upholstery Deep Clean",
      description: "Steam cleaning, stain removal, and fabric protection for all soft furnishings",
      icon: <RefreshCw className="w-6 h-6 text-accent" />
    },
    {
      name: "Air Vent & Fan Cleaning",
      description: "HVAC vents, ceiling fans, and air circulation systems thoroughly cleaned",
      icon: <Wind className="w-6 h-6 text-accent" />
    }
  ];

  const deepCleaningAreas = [
    "Kitchen appliances (inside & out)", "Bathroom tiles and grout", "Baseboards and skirting", 
    "Light fixtures and ceiling fans", "Window sills and tracks", "Cabinet doors and handles",
    "Oven and range hood deep clean", "Refrigerator coils and interior", "Behind furniture areas",
    "Staircase and handrails", "Door frames and moldings", "Switch plates and outlets"
  ];

  const whenYouNeed = [
    {
      title: "Moving In/Out",
      description: "Start fresh in your new home or ensure bond return with comprehensive cleaning",
      icon: <Target className="w-8 h-8 text-accent" />
    },
    {
      title: "Spring Cleaning",
      description: "Annual deep refresh to eliminate accumulated dirt and grime from every corner",
      icon: <Sparkles className="w-8 h-8 text-accent" />
    },
    {
      title: "Post-Renovation",
      description: "Remove construction dust, debris, and get your home back to pristine condition",
      icon: <Scissors className="w-8 h-8 text-accent" />
    },
    {
      title: "Special Occasions",
      description: "Prepare for holidays, parties, or important events with thorough deep cleaning",
      icon: <Star className="w-8 h-8 text-accent" />
    }
  ];

  const deepVsRegular = [
    {
      regular: "Surface cleaning",
      deep: "Deep scrubbing and sanitization"
    },
    {
      regular: "Visible areas only",
      deep: "Behind and under furniture"
    },
    {
      regular: "Basic dusting",
      deep: "Light fixtures, fans, vents"
    },
    {
      regular: "Floor mopping",
      deep: "Baseboard and molding cleaning"
    },
    {
      regular: "Bathroom wipe down",
      deep: "Tile, grout, and mold removal"
    },
    {
      regular: "Kitchen surface clean",
      deep: "Inside appliances and cabinets"
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Pre-Cleaning Assessment",
      description: "Thorough inspection of your home to identify problem areas and special requirements"
    },
    {
      step: "2", 
      title: "Room-by-Room Planning",
      description: "Customized cleaning plan developed based on your home's specific needs"
    },
    {
      step: "3",
      title: "Deep Cleaning Execution", 
      description: "Systematic deep cleaning using professional equipment and techniques"
    },
    {
      step: "4",
      title: "Quality Inspection",
      description: "Comprehensive quality check to ensure every detail meets our high standards"
    },
    {
      step: "5",
      title: "Final Walkthrough",
      description: "Review completed work with you to ensure 100% satisfaction before we leave"
    }
  ];

  const pricingOptions = [
    {
      title: "Apartment/Unit",
      description: "Perfect for 1-2 bedroom apartments and units",
      features: ["All rooms deep cleaned", "Kitchen appliances", "Bathroom intensive", "Windows included", "4-6 hours service"],
      cta: "Get Quote"
    },
    {
      title: "Family Home",
      description: "Comprehensive deep clean for 3-4 bedroom homes",
      features: ["Whole house deep clean", "Multiple bathrooms", "Living areas detailed", "Garage/laundry included", "6-8 hours service"],
      cta: "Book Service",
      popular: true
    },
    {
      title: "Large Property",
      description: "Extensive deep cleaning for large homes and properties",
      features: ["5+ bedrooms covered", "Multiple living areas", "Outdoor area cleaning", "Pool area included", "8+ hours service"],
      cta: "Contact Us"
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
                Professional <span className="text-accent">Deep Cleaning</span> Melbourne
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Transform your home with our comprehensive deep cleaning service. We go beyond surface cleaning 
                to tackle every corner, crevice, and hidden area for a truly spotless, healthy living environment.
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
                  <span>Professional equipment</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Eco-friendly products</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>100% satisfaction</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/Deep Cleaning.webp" 
                  alt="Professional deep cleaning service in Melbourne - intensive detailed cleaning"
                  className="w-full h-[500px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/Home_Hero.webp';
                    e.currentTarget.className = 'w-full h-[500px] object-cover';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-primary font-semibold text-lg">Intensive Deep Cleaning</p>
                    <p className="text-gray-700">Every corner, every surface, every detail</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Cleaning Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Complete Deep Cleaning Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our deep cleaning goes far beyond regular cleaning. We tackle every area of your home 
              with intensive, detailed attention that leaves no surface untouched.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deepCleaningServices.map((service, index) => (
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

      {/* When You Need Deep Cleaning */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              When You Need Deep Cleaning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Perfect for special situations that require more than regular cleaning. Get the thorough, 
              intensive clean your home deserves.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whenYouNeed.map((situation, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-center">
                <div className="bg-gradient-to-br from-primary-light to-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  {situation.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">{situation.title}</h3>
                <p className="text-gray-600 leading-relaxed">{situation.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep vs Regular Cleaning */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Deep Cleaning vs Regular Cleaning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the difference between our comprehensive deep cleaning and standard maintenance cleaning.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary-light to-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6 text-center">Regular Cleaning</h3>
                <div className="space-y-4">
                  {deepVsRegular.map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">{item.regular}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-accent mb-6 text-center">Deep Cleaning</h3>
                <div className="space-y-4">
                  {deepVsRegular.map((item, index) => (
                    <div key={index} className="bg-accent/10 p-4 rounded-lg shadow-sm border border-accent/20">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-accent" />
                        <span className="text-primary font-medium">{item.deep}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Deep Clean */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              What We Deep Clean
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No area is overlooked in our comprehensive deep cleaning service. Every surface receives detailed attention.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deepCleaningAreas.map((area, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <Sparkles className="w-8 h-8 text-accent mx-auto mb-3" />
                <span className="font-medium text-primary">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Deep Cleaning Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our 5-Step Deep Cleaning Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a systematic approach to ensure every aspect of your home receives thorough, professional attention.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
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

      {/* Pricing Options */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Deep Cleaning Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect deep cleaning package for your property size. All packages include our satisfaction guarantee.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingOptions.map((option, index) => (
              <div key={index} className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border ${option.popular ? 'border-accent ring-2 ring-accent/20' : 'border-gray-100'} relative`}>
                {option.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-primary mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-6">{option.description}</p>
                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className={`w-full ${option.popular ? 'bg-accent hover:bg-accent/90' : 'bg-primary hover:bg-primary/90'} text-white`}>
                  <Link to="/quote">
                    {option.cta}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Health Benefits of Deep Cleaning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep cleaning isn't just about appearance - it's about creating a healthier living environment for you and your family.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Allergen Removal",
                description: "Eliminate dust mites, pet dander, and pollen for better air quality",
                icon: <Wind className="w-8 h-8 text-accent" />
              },
              {
                title: "Mold Prevention",
                description: "Remove moisture and mold spores to prevent respiratory issues",
                icon: <Shield className="w-8 h-8 text-accent" />
              },
              {
                title: "Bacteria Elimination",
                description: "Sanitize surfaces to reduce illness-causing germs and bacteria",
                icon: <Thermometer className="w-8 h-8 text-accent" />
              },
              {
                title: "Stress Reduction",
                description: "Clean, organized spaces promote mental well-being and relaxation",
                icon: <Heart className="w-8 h-8 text-accent" />
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-light to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-center">
                <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-md">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
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
              Deep Cleaning Across Melbourne
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional deep cleaning services available throughout Melbourne and surrounding areas.
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
              Don't see your area? <span className="text-accent font-semibold">Call us</span> - we likely service your location too!
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for the Ultimate Deep Clean?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Experience the transformative power of professional deep cleaning. Get your free quote today and 
            discover how comprehensive cleaning can refresh and revitalize your entire home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg">
              <Link to="/quote">
                <MessageSquare className="mr-2 h-6 w-6" />
                Get Your Deep Clean Quote
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg">
              <Phone className="mr-2 h-6 w-6" />
              Call: +61 403 971 720
            </Button>
          </div>
          <div className="mt-8 text-sm opacity-75">
            <p>🏠 All property types | ⏰ Flexible scheduling | 🛡️ 100% satisfaction guaranteed</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DeepCleaning;
