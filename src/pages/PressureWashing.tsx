import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Shield, Clock, CheckCircle, Droplets, Home, Building, Phone, Mail, Zap, Award } from "lucide-react";
import { SEOHead, generateServiceSchema } from "@/components/SEOHead";

const PressureWashing = () => {
  // SEO Schema for better search engine visibility
  const serviceSchema = generateServiceSchema(
    "Pressure Washing Melbourne",
    "Professional pressure washing services in Melbourne. Remove dirt, grime, mold, and stains from driveways, decks, walls, and more. Eco-friendly solutions with guaranteed results.",
    "CleaningService"
  );

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Pressure Washing", url: "/services/pressure-washing" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <SEOHead
        title="Professional Pressure Washing Melbourne | High-Pressure Cleaning Services"
        description="Transform your property with professional pressure washing in Melbourne. Remove dirt, grime, mold & stains from driveways, decks, walls & more. Licensed, insured & eco-friendly."
        keywords="pressure washing melbourne, power washing, driveway cleaning, deck cleaning, house washing, commercial pressure cleaning, high pressure cleaning melbourne"
        canonical="https://www.freshpluscleaning.com.au/services/pressure-washing"
        type="service"
        schema={serviceSchema}
        breadcrumbs={breadcrumbs}
      />
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Content */}
            <div>
              <span className="inline-block bg-accent/10 text-accent font-semibold px-4 py-2 rounded-full text-sm uppercase tracking-wide mb-4">
                Professional Pressure Washing Melbourne
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                Transform Your Property with <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">High-Pressure Cleaning</span>
              </h1>
              <p className="text-xl text-primary/80 mb-8 leading-relaxed">
                Melbourne's trusted pressure washing specialists. Remove years of dirt, grime, mold, and stains 
                from driveways, decks, walls, and outdoor surfaces. Eco-friendly solutions with 12+ years of expertise.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 mb-8">
                {[
                  { icon: Star, text: "5-Star Rated Service" },
                  { icon: Shield, text: "Fully Licensed & Insured" },
                  { icon: Clock, text: "12+ Years Experience" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <item.icon className="w-5 h-5 text-accent" />
                    <span className="text-primary/80 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/quote">
                  <Button className="bg-accent hover:bg-accent/90 text-black font-bold py-4 px-8 text-lg w-full sm:w-auto">
                    Get Free Quote
                  </Button>
                </Link>
                <a href="tel:+61403971720">
                  <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white py-4 px-8 text-lg w-full sm:w-auto">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-accent/10">
                <img 
                  src="/Pressure_washing.webp" 
                  alt="Professional pressure washing service in Melbourne - driveway and outdoor cleaning"
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/Home_Hero.webp';
                    e.currentTarget.className = 'w-full h-96 object-cover';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-6 h-6 text-accent" />
                    <span className="font-bold text-primary">Powerful Results Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Clean Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Pressure Washing Services Melbourne
            </h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Professional high-pressure cleaning for residential and commercial properties across Melbourne. 
              We restore surfaces to their original condition safely and effectively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Driveway Cleaning",
                icon: "🚗",
                description: "Remove oil stains, tire marks, dirt, and grime from concrete, asphalt, and paver driveways.",
                benefits: ["Oil stain removal", "Concrete restoration", "Paver cleaning", "Driveway sealing available"]
              },
              {
                title: "Deck & Patio Cleaning",
                icon: "🏡",
                description: "Restore wooden decks, composite decking, and patio surfaces. Remove mold, algae, and weathering.",
                benefits: ["Timber deck cleaning", "Composite decking", "Stone patio cleaning", "Mold & algae removal"]
              },
              {
                title: "House Washing",
                icon: "🏠",
                description: "Safely clean exterior walls, siding, brick, render, and weatherboard without damage.",
                benefits: ["Exterior wall cleaning", "Brick cleaning", "Render washing", "Weatherboard cleaning"]
              },
              {
                title: "Roof Cleaning",
                icon: "🏚️",
                description: "Remove moss, lichen, algae, and black streaks from tiles, metal, and Colorbond roofs.",
                benefits: ["Tile roof cleaning", "Metal roof cleaning", "Moss removal", "Gutter cleaning"]
              },
              {
                title: "Fence & Gate Cleaning",
                icon: "🚧",
                description: "Clean timber, Colorbond, and PVC fences. Remove dirt, mold, and restore original appearance.",
                benefits: ["Timber fence cleaning", "Colorbond fences", "Gate restoration", "Mold treatment"]
              },
              {
                title: "Commercial Cleaning",
                icon: "🏢",
                description: "Large-scale pressure washing for commercial properties, car parks, warehouses, and storefronts.",
                benefits: ["Car park cleaning", "Warehouse floors", "Storefront washing", "Graffiti removal"]
              }
            ].map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-light/20 to-secondary-light/20 rounded-2xl p-8 border border-accent/10 hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-primary/80 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-primary/70 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Pressure Washing */}
      <div className="py-16 bg-gradient-to-br from-primary-light/30 to-secondary-light/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Benefits of Professional <span className="text-accent">Pressure Washing</span>
            </h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              High-pressure cleaning isn't just about aesthetics – it protects your property investment 
              and maintains a healthy environment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-12 h-12 text-accent" />,
                title: "Instant Results",
                description: "See dramatic transformation in minutes. Remove years of buildup instantly with professional-grade equipment."
              },
              {
                icon: <Shield className="w-12 h-12 text-accent" />,
                title: "Protect Property Value",
                description: "Regular cleaning prevents long-term damage from mold, algae, and grime, maintaining your property value."
              },
              {
                icon: <Droplets className="w-12 h-12 text-accent" />,
                title: "Eco-Friendly",
                description: "We use biodegradable cleaning solutions that are safe for your family, pets, and the environment."
              },
              {
                icon: <Award className="w-12 h-12 text-accent" />,
                title: "Professional Safety",
                description: "Trained technicians with proper equipment ensure safe cleaning without damage to surfaces or landscaping."
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-accent/10">
                <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{benefit.title}</h3>
                <p className="text-primary/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Before & After Showcase */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              See the <span className="text-accent">Power</span> of Professional Cleaning
            </h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Our high-pressure cleaning delivers remarkable transformations. From grimy to gleaming in hours.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Results Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-light/10 to-accent/10 rounded-3xl shadow-2xl overflow-hidden border border-accent/20 p-6">
                <img 
                  src="/Pressure_washing.webp" 
                  alt="Before and after pressure washing results - dramatic difference in cleanliness"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/Home_Hero.webp';
                    e.currentTarget.className = 'w-full h-80 object-cover rounded-2xl shadow-lg';
                  }}
                />
                <div className="absolute top-10 left-10 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  BEFORE
                </div>
                <div className="absolute top-10 right-10 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  AFTER
                </div>
              </div>
              
              {/* Floating stats */}
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-2xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm">Satisfied Clients</div>
                </div>
              </div>
            </div>
            
            {/* What We Remove */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-primary mb-6">What We Remove</h3>
                <p className="text-lg text-primary/80 mb-8">
                  Our professional pressure washing equipment and techniques effectively eliminate stubborn 
                  contaminants that regular cleaning can't touch.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Dirt & Grime", "Oil Stains", "Mold & Mildew", "Algae Growth",
                  "Moss & Lichen", "Rust Stains", "Paint Splatter", "Graffiti",
                  "Chewing Gum", "Black Streaks", "Salt Deposits", "Tire Marks"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md border border-accent/10">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-primary font-medium">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-primary-light/20 to-accent/10 p-6 rounded-xl shadow-lg border-l-4 border-accent">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-6 h-6 text-accent" />
                  <h4 className="font-bold text-primary">Melbourne Business Owner</h4>
                </div>
                <p className="text-primary/80 italic">
                  "Our commercial property looked 10 years older until FreshPlus pressure washed the exterior. 
                  Now it looks brand new! Professional service, fair pricing, amazing results."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Process */}
      <div className="py-16 bg-gradient-to-br from-primary-light/30 to-secondary-light/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Professional Process</h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              We follow a systematic approach to deliver exceptional results while protecting your property.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Site Inspection",
                description: "We assess the surface type, level of contamination, and identify any areas requiring special attention."
              },
              {
                step: "02", 
                title: "Pre-Treatment",
                description: "Apply specialized cleaning solutions to break down stubborn stains, mold, and organic growth."
              },
              {
                step: "03",
                title: "High-Pressure Cleaning",
                description: "Using professional-grade equipment, we thoroughly clean all surfaces at the optimal pressure level."
              },
              {
                step: "04",
                title: "Final Inspection",
                description: "Quality check and spot treatment of any remaining areas. We ensure complete satisfaction before leaving."
              }
            ].map((process, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-accent/10 text-center">
                <div className="bg-gradient-to-r from-accent to-secondary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{process.title}</h3>
                <p className="text-primary/70">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Areas */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Residential vs Commercial */}
            <div>
              <h2 className="text-4xl font-bold text-primary mb-8">We Serve All of Melbourne</h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-primary-light/20 to-secondary-light/20 rounded-xl p-6 border border-accent/10">
                  <Home className="w-8 h-8 text-accent mb-3" />
                  <h3 className="text-xl font-bold text-primary mb-3">Residential</h3>
                  <ul className="space-y-2 text-primary/70">
                    <li>• Driveways & Walkways</li>
                    <li>• Decks & Patios</li>
                    <li>• House Exteriors</li>
                    <li>• Fences & Gates</li>
                    <li>• Pool Areas</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-accent-light/20 to-secondary-light/20 rounded-xl p-6 border border-accent/10">
                  <Building className="w-8 h-8 text-accent mb-3" />
                  <h3 className="text-xl font-bold text-primary mb-3">Commercial</h3>
                  <ul className="space-y-2 text-primary/70">
                    <li>• Car Parks</li>
                    <li>• Warehouses</li>
                    <li>• Shopping Centers</li>
                    <li>• Office Buildings</li>
                    <li>• Restaurants</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-xl p-6 border border-accent/20">
                <h3 className="text-lg font-bold text-primary mb-2">Melbourne-Wide Service</h3>
                <p className="text-primary/80">
                  From CBD to suburbs, we bring professional pressure washing services to all Melbourne areas. 
                  Same-day and emergency services available.
                </p>
              </div>
            </div>
            
            {/* Why Choose Us */}
            <div>
              <h2 className="text-4xl font-bold text-primary mb-8">Why Choose FreshPlus?</h2>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Professional Grade Equipment",
                    description: "Industrial-strength machines with adjustable pressure settings for safe, effective cleaning of all surfaces."
                  },
                  {
                    title: "Experienced Technicians",
                    description: "12+ years experience with proper training to prevent damage while achieving superior results."
                  },
                  {
                    title: "Eco-Friendly Solutions",
                    description: "Biodegradable cleaning products safe for your family, pets, plants, and the environment."
                  },
                  {
                    title: "Fully Insured & Licensed",
                    description: "Complete public liability insurance and all necessary licenses for your peace of mind."
                  },
                  {
                    title: "Satisfaction Guarantee",
                    description: "Not happy? We'll return and re-clean at no extra cost. Your satisfaction is our priority."
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-accent/10">
                    <h3 className="text-lg font-bold text-primary mb-2">{feature.title}</h3>
                    <p className="text-primary/70">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & Guarantee */}
      <div className="py-16 bg-gradient-to-br from-primary-light/30 to-secondary-light/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Affordable, Transparent Pricing</h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Competitive rates with no hidden fees. Get a free quote customized to your specific needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* What's Included */}
            <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-accent/10">
              <h3 className="text-2xl font-bold text-primary mb-6">Every Service Includes</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Free property assessment", "Pre-treatment solutions", "Professional pressure washing", 
                  "Surface protection care", "Post-cleaning rinse", "Debris cleanup",
                  "Satisfaction guarantee", "Maintenance advice"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-primary/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Guarantee Box */}
            <div className="bg-gradient-to-br from-accent to-secondary text-white rounded-2xl p-8 text-center">
              <Star className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">100% Satisfaction Guarantee</h3>
              <p className="mb-6">
                We stand behind our work. If you're not completely satisfied, we'll return to make it right 
                at no additional charge.
              </p>
              <div className="bg-white/20 rounded-xl p-4">
                <p className="font-bold">Licensed & Insured</p>
                <p className="text-sm">Full public liability coverage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Property?</h2>
          <p className="text-xl mb-8 text-white/90">
            Get a free, no-obligation quote for professional pressure washing in Melbourne. 
            See the FreshPlus difference today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/quote">
              <Button className="bg-accent hover:bg-accent/90 text-black font-bold py-4 px-8 text-lg w-full sm:w-auto">
                Get Your Free Quote
              </Button>
            </Link>
            <a href="tel:+61403971720">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary py-4 px-8 text-lg w-full sm:w-auto">
                <Phone className="w-5 h-5 mr-2" />
                Call +61 403 971 720
              </Button>
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white/80">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Email: info@freshpluscleaning.com.au</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div>Serving all Melbourne suburbs</div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PressureWashing;

