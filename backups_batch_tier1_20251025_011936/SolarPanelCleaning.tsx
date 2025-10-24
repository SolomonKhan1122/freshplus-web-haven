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
  Sun,
  DollarSign,
  TrendingUp,
  Leaf,
  Droplets
} from "lucide-react";

const SolarPanelCleaning = () => {
  const services = [
    {
      name: "Residential Solar Panel Cleaning",
      description: "Professional cleaning for home solar panel systems",
      icon: <Home className="w-6 h-6 text-accent" />
    },
    {
      name: "Commercial Solar Cleaning",
      description: "Large-scale solar farm and commercial building panel cleaning",
      icon: <Sparkles className="w-6 h-6 text-accent" />
    },
    {
      name: "Efficiency Restoration",
      description: "Remove dirt, dust, and grime to restore maximum energy output",
      icon: <TrendingUp className="w-6 h-6 text-accent" />
    },
    {
      name: "Bird Dropping Removal",
      description: "Specialized cleaning for stubborn bird droppings and organic matter",
      icon: <Droplets className="w-6 h-6 text-accent" />
    },
    {
      name: "Regular Maintenance Programs",
      description: "Scheduled cleaning to maintain optimal solar panel performance",
      icon: <Clock className="w-6 h-6 text-accent" />
    },
    {
      name: "Eco-Friendly Methods",
      description: "Environmentally safe cleaning solutions and pure water systems",
      icon: <Leaf className="w-6 h-6 text-accent" />
    }
  ];

  const benefits = [
    "Increase energy output by up to 25%",
    "Extend solar panel lifespan",
    "Maintain warranty requirements",
    "Improve return on investment",
    "Professional equipment and expertise",
    "Fully insured and licensed service"
  ];

  const pricing = [
    {
      category: "Residential (up to 20 panels)",
      price: "$150 - $200",
      description: "Standard home solar system cleaning"
    },
    {
      category: "Medium System (21-40 panels)",
      price: "$200 - $300",
      description: "Larger residential or small commercial systems"
    },
    {
      category: "Large System (40+ panels)",
      price: "$300 - $500+",
      description: "Commercial systems, quote on inspection"
    },
    {
      category: "Regular Maintenance",
      price: "15% Discount",
      description: "Quarterly or bi-annual cleaning programs"
    }
  ];

  const testimonials = [
    {
      name: "David Chen",
      location: "Glen Waverley",
      rating: 5,
      text: "Our solar panel efficiency improved dramatically after Fresh Plus cleaned them. Highly professional service and great value!"
    },
    {
      name: "Sarah Williams", 
      location: "Doncaster",
      rating: 5,
      text: "The team was punctual, careful, and thorough. Our panels look brand new and our energy bills have dropped significantly."
    },
    {
      name: "Mike Thompson",
      location: "Ringwood",
      rating: 5,
      text: "Excellent service! They cleaned our 30-panel system efficiently and safely. Will definitely book them again next quarter."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-block bg-accent/10 text-accent font-semibold px-4 py-2 rounded-full text-sm uppercase tracking-wide mb-4">
                  Maximize Solar Efficiency
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                  Professional <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Solar Panel</span> Cleaning
                </h1>
                <p className="text-xl text-primary/80 mb-8 leading-relaxed">
                  Maximize your solar panel efficiency with Melbourne's trusted solar cleaning specialists. 
                  Professional cleaning can increase your energy output by up to 25%.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/quote">
                  <Button className="bg-accent hover:bg-accent-dark text-black font-semibold px-8 py-4 text-lg w-full sm:w-auto">
                    Get Free Quote
                  </Button>
                </Link>
                <a href="tel:+61403971720">
                  <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary-light px-8 py-4 text-lg w-full sm:w-auto">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/solar panel cleaning.webp" 
                alt="Professional Solar Panel Cleaning Service" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-black px-6 py-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Sun className="w-6 h-6" />
                  <div>
                    <div className="font-bold text-lg">Up to 25%</div>
                    <div className="text-sm">Efficiency Increase</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Complete Solar Panel Cleaning Solutions
            </h2>
            <p className="text-xl text-primary/70 max-w-3xl mx-auto">
              From residential rooftops to commercial solar farms, we provide comprehensive 
              cleaning services to maximize your solar investment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-light to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10">
                <div className="bg-white p-3 rounded-xl mb-6 w-fit">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{service.name}</h3>
                <p className="text-primary/70 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-dark to-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Why Regular Solar Panel Cleaning is Essential
              </h2>
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-6 h-6 text-accent" />
                  <span className="text-accent font-semibold text-lg">Did You Know?</span>
                </div>
                <p className="text-primary-light">
                  Dirty solar panels can lose 15-25% of their efficiency. In Melbourne's climate, 
                  panels should be cleaned every 3-6 months for optimal performance.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
                <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
                <div className="text-3xl font-bold text-accent mb-2">25%</div>
                <div className="text-primary-light">Efficiency Increase</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
                <DollarSign className="w-12 h-12 text-accent mx-auto mb-4" />
                <div className="text-3xl font-bold text-accent mb-2">$500+</div>
                <div className="text-primary-light">Annual Savings</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
                <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
                <div className="text-3xl font-bold text-accent mb-2">100%</div>
                <div className="text-primary-light">Insured Service</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
                <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                <div className="text-3xl font-bold text-accent mb-2">12+</div>
                <div className="text-primary-light">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Transparent Pricing
            </h2>
            <p className="text-xl text-primary/70 max-w-3xl mx-auto">
              Competitive rates for professional solar panel cleaning in Melbourne. 
              All prices include equipment, cleaning solutions, and comprehensive service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricing.map((tier, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-light to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10 text-center">
                <h3 className="text-xl font-bold text-primary mb-4">{tier.category}</h3>
                <div className="text-3xl font-bold text-accent mb-4">{tier.price}</div>
                <p className="text-primary/70 mb-6">{tier.description}</p>
                <Link to="/quote">
                  <Button className="bg-primary hover:bg-primary-dark text-white w-full">
                    Get Quote
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-accent/10 to-secondary/10 p-8 rounded-2xl border border-accent/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">Need a Custom Quote?</h3>
              <p className="text-primary/70 mb-6">
                Large commercial installations, difficult access, or special requirements? 
                Contact us for a personalized assessment and competitive pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/quote">
                  <Button className="bg-accent hover:bg-accent-dark text-black font-semibold px-8 py-3">
                    Request Custom Quote
                  </Button>
                </Link>
                <a href="tel:+61403971720">
                  <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary-light px-8 py-3">
                    <Phone className="w-5 h-5 mr-2" />
                    Discuss Your Needs
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-primary-light to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Our Solar Panel Cleaning Process
            </h2>
            <p className="text-xl text-primary/70 max-w-3xl mx-auto">
              Professional, safe, and effective cleaning methods that protect your investment 
              while maximizing energy output.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Safety Assessment",
                description: "Comprehensive safety check and equipment setup"
              },
              {
                step: "2", 
                title: "Pre-Cleaning Inspection",
                description: "Document current condition and identify problem areas"
              },
              {
                step: "3",
                title: "Professional Cleaning",
                description: "Use specialized equipment and eco-friendly solutions"
              },
              {
                step: "4",
                title: "Quality Check",
                description: "Final inspection and efficiency testing"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-accent text-black text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{step.title}</h3>
                <p className="text-primary/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-primary/70">
              Trusted by hundreds of Melbourne solar panel owners
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-light to-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-primary/80 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-primary">{testimonial.name}</div>
                  <div className="text-primary/60">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-dark to-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Maximize Your Solar Efficiency?
          </h2>
          <p className="text-xl text-primary-light mb-8">
            Get a free quote for professional solar panel cleaning and start saving on your energy bills today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/quote">
              <Button className="bg-accent hover:bg-accent-dark text-black font-semibold px-8 py-4 text-lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Get Free Quote
              </Button>
            </Link>
            <a href="tel:+61403971720">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg bg-transparent">
                <Phone className="w-5 h-5 mr-2" />
                Call +61 403 971 720
              </Button>
            </a>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center items-center gap-8 text-primary-light">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <span>Fully Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              <span>Licensed Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent" />
              <span>100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SolarPanelCleaning;
