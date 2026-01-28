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
  Building,
  Star,
  Award,
  Users,
  Calendar,
  Zap,
  Briefcase,
  ClipboardCheck,
  TrendingUp,
  Globe,
  Leaf
} from "lucide-react";

const CommercialCleaning = () => {
  const commercialServices = [
    {
      name: "Office Cleaning",
      description: "Daily, weekly, or customized cleaning schedules for offices, corporate buildings, and business centers",
      icon: <Building className="w-6 h-6 text-accent" />
    },
    {
      name: "Retail Space Cleaning",
      description: "Maintain pristine shopping environments that enhance customer experience and brand image",
      icon: <Sparkles className="w-6 h-6 text-accent" />
    },
    {
      name: "Warehouse Cleaning",
      description: "Industrial-grade cleaning for warehouses, storage facilities, and distribution centers",
      icon: <Briefcase className="w-6 h-6 text-accent" />
    },
    {
      name: "Medical Facility Cleaning",
      description: "Specialized sanitization for medical offices, clinics, and healthcare facilities",
      icon: <Shield className="w-6 h-6 text-accent" />
    },
    {
      name: "Restaurant & Food Service",
      description: "Health department compliant cleaning for restaurants, cafes, and food service establishments",
      icon: <ClipboardCheck className="w-6 h-6 text-accent" />
    },
    {
      name: "Construction Cleanup",
      description: "Post-construction cleaning and debris removal for new builds and renovations",
      icon: <Zap className="w-6 h-6 text-accent" />
    }
  ];

  const cleaningAreas = [
    "Reception and lobby areas", "Open office spaces", "Private offices and meeting rooms", 
    "Break rooms and kitchens", "Restrooms and washrooms", "Stairwells and elevators",
    "Common areas and hallways", "Retail floors and display areas", "Warehouse storage zones",
    "Loading docks and shipping areas", "Server rooms and tech areas", "Conference and training rooms"
  ];

  const whyChooseUs = [
    {
      title: "Reliable Service",
      description: "Consistent, dependable cleaning teams that never miss scheduled appointments",
      icon: <Clock className="w-8 h-8 text-accent" />
    },
    {
      title: "Professional Standards",
      description: "Trained staff, quality assurance, and adherence to industry best practices",
      icon: <Award className="w-8 h-8 text-accent" />
    },
    {
      title: "Flexible Scheduling",
      description: "Work around your business hours - after hours, weekends, or during business hours",
      icon: <Calendar className="w-8 h-8 text-accent" />
    },
    {
      title: "Competitive Pricing",
      description: "Transparent pricing with no hidden fees, customized to your specific needs",
      icon: <TrendingUp className="w-8 h-8 text-accent" />
    }
  ];

  const businessTypes = [
    {
      type: "Corporate Offices",
      description: "Professional cleaning for corporate environments, ensuring a pristine workplace",
      icon: <Building className="w-8 h-8 text-accent" />
    },
    {
      type: "Retail Stores",
      description: "Maintain clean, inviting shopping environments that attract customers",
      icon: <Sparkles className="w-8 h-8 text-accent" />
    },
    {
      type: "Medical Facilities",
      description: "Specialized sanitization meeting healthcare industry standards",
      icon: <Shield className="w-8 h-8 text-accent" />
    },
    {
      type: "Restaurants",
      description: "Food service cleaning compliant with health department regulations",
      icon: <ClipboardCheck className="w-8 h-8 text-accent" />
    },
    {
      type: "Warehouses",
      description: "Industrial cleaning for large storage and distribution facilities",
      icon: <Briefcase className="w-8 h-8 text-accent" />
    },
    {
      type: "Schools & Education",
      description: "Safe, thorough cleaning for educational institutions and learning centers",
      icon: <Users className="w-8 h-8 text-accent" />
    }
  ];

  const servicePackages = [
    {
      title: "Essential Clean",
      description: "Perfect for small offices and retail spaces",
      features: ["Daily trash removal", "Restroom cleaning", "Basic surface wiping", "Vacuum common areas", "Weekly deep clean"],
      cta: "Get Quote"
    },
    {
      title: "Professional Plus",
      description: "Comprehensive cleaning for growing businesses",
      features: ["All Essential services", "Daily floor mopping", "Kitchen/break room cleaning", "Window cleaning", "Monthly deep sanitization"],
      cta: "Book Service",
      popular: true
    },
    {
      title: "Premium Complete",
      description: "Full-service cleaning for large commercial spaces",
      features: ["All Professional services", "Carpet cleaning", "Pressure washing", "Specialized equipment", "24/7 emergency response"],
      cta: "Contact Sales"
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
                Professional <span className="text-accent">Commercial Cleaning</span> Melbourne
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Maintain a pristine business environment that impresses clients and boosts employee productivity. 
                Trusted by Melbourne businesses for over 12 years with reliable, professional cleaning services.
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
                  <span>Licensed & insured</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Flexible scheduling</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Quality guaranteed</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/Commercial cleaning.webp" 
                  alt="Professional commercial cleaning service in Melbourne - FreshPlus business cleaning team"
                  className="w-full h-[500px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/Home_Hero.webp';
                    e.currentTarget.className = 'w-full h-[500px] object-cover';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-primary font-semibold text-lg">Business Excellence</p>
                    <p className="text-gray-700">Trusted by Melbourne businesses since 2012</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Cleaning Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Complete Business Cleaning Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From small offices to large commercial facilities, we provide specialized cleaning services 
              tailored to your business needs and industry requirements.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commercialServices.map((service, index) => (
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

      {/* Business Types We Serve */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized cleaning expertise across diverse business sectors, ensuring compliance and excellence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessTypes.map((business, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-center">
                <div className="bg-gradient-to-br from-primary-light to-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  {business.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">{business.type}</h3>
                <p className="text-gray-600 leading-relaxed">{business.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Clean */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Comprehensive Commercial Cleaning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every area of your business premises receives thorough, professional attention to detail.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cleaningAreas.map((area, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-light to-white p-6 rounded-xl shadow-md text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <Building className="w-8 h-8 text-accent mx-auto mb-3" />
                <span className="font-medium text-primary">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Businesses Choose FreshPlus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the reliability and professionalism that Melbourne businesses have trusted for over 12 years.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform">
                <div className="bg-white p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:shadow-lg transition-shadow shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Commercial Cleaning Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect cleaning solution for your business size and requirements. All packages are customizable.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {servicePackages.map((plan, index) => (
              <div key={index} className={`bg-gradient-to-br from-white to-primary-light/20 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border ${plan.popular ? 'border-accent ring-2 ring-accent/20' : 'border-gray-100'} relative`}>
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

      {/* Business Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Business Benefits of Professional Cleaning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Invest in professional cleaning and see the positive impact on your business performance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Improved Productivity",
                description: "Clean, organized workspaces boost employee focus and efficiency",
                icon: <TrendingUp className="w-8 h-8 text-accent" />
              },
              {
                title: "Professional Image",
                description: "Impress clients and visitors with immaculate business premises",
                icon: <Star className="w-8 h-8 text-accent" />
              },
              {
                title: "Health & Safety",
                description: "Reduce sick days and create a healthier work environment",
                icon: <Shield className="w-8 h-8 text-accent" />
              },
              {
                title: "Cost Effective",
                description: "Extend the life of office furniture, carpets, and equipment",
                icon: <Award className="w-8 h-8 text-accent" />
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-center">
                <div className="bg-gradient-to-br from-primary-light to-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Serving Melbourne Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional commercial cleaning services available throughout Melbourne's business districts and suburbs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            {[
              "Melbourne CBD", "South Yarra", "Richmond", "Collingwood", "Fitzroy",
              "Carlton", "Docklands", "Southbank", "Port Melbourne", "St Kilda Road",
              "Toorak", "Prahran", "South Melbourne", "East Melbourne", "North Melbourne",
              "West Melbourne", "Parkville", "Kensington", "Flemington", "Footscray"
            ].map((area, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-light to-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-primary font-medium">{area}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Serving businesses across Melbourne. <span className="text-accent font-semibold">Contact us</span> for areas not listed!
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Business Environment?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join hundreds of satisfied Melbourne businesses who trust FreshPlus for their commercial cleaning needs. 
            Get your customized quote today and experience the difference professional cleaning makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg">
              <Link to="/quote">
                <MessageSquare className="mr-2 h-6 w-6" />
                Get Your Business Quote
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg">
              <Phone className="mr-2 h-6 w-6" />
              Call: +61 403 971 720
            </Button>
          </div>
          <div className="mt-8 text-sm opacity-75">
            <p>🏢 Serving all business types | ⏰ Flexible scheduling available | 🛡️ Fully licensed & insured</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommercialCleaning;
