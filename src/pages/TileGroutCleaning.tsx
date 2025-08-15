import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Shield, Clock, CheckCircle, Sparkles, Home, Building, Phone, Mail } from "lucide-react";

const TileGroutCleaning = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Content */}
            <div>
              <span className="inline-block bg-accent/10 text-accent font-semibold px-4 py-2 rounded-full text-sm uppercase tracking-wide mb-4">
                Professional Tile & Grout Cleaning
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                Restore Your Tiles to <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Perfection</span>
              </h1>
              <p className="text-xl text-primary/80 mb-8 leading-relaxed">
                Professional tile and grout cleaning services in Melbourne, Victoria. 
                Transform your dirty, stained tiles back to their original beauty with our 
                advanced cleaning techniques and 12 years of expertise.
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
                  src="/tile-grout-cleaning.jpg" 
                  alt="Professional tile and grout cleaning service in Melbourne"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-accent" />
                    <span className="font-bold text-primary">Professional Results Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Our Service */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Why Your Tiles Need Professional Cleaning
            </h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Over time, tiles and grout accumulate dirt, stains, mold, and bacteria that regular cleaning can't remove. 
              Our professional service restores hygiene and beauty to your surfaces.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Health & Hygiene",
                description: "Eliminate mold, mildew, and bacteria that can cause health issues and poor indoor air quality.",
                benefits: ["Removes allergens", "Prevents mold growth", "Improves air quality", "Safe for families"]
              },
              {
                title: "Aesthetic Appeal",
                description: "Restore the original beauty of your tiles by removing deep stains and discoloration.",
                benefits: ["Removes stubborn stains", "Brightens grout lines", "Restores original color", "Like-new appearance"]
              },
              {
                title: "Cost Effective",
                description: "Extend the life of your tiles and avoid costly replacements with regular professional cleaning.",
                benefits: ["Prevents damage", "Extends tile lifespan", "Avoids replacements", "Maintains property value"]
              }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-light/20 to-secondary-light/20 rounded-2xl p-8 border border-accent/10">
                <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                <p className="text-primary/80 mb-6">{item.description}</p>
                <ul className="space-y-2">
                  {item.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-primary/70">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Process */}
      <div className="py-16 bg-gradient-to-br from-primary-light/30 to-secondary-light/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Professional Cleaning Process</h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              We use advanced equipment and eco-friendly solutions to deliver exceptional results every time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Inspection & Assessment",
                description: "We thoroughly inspect your tiles and grout to determine the best cleaning approach and identify problem areas."
              },
              {
                step: "02", 
                title: "Pre-Treatment",
                description: "Application of specialized cleaning solutions to break down dirt, stains, and built-up grime for easier removal."
              },
              {
                step: "03",
                title: "Deep Steam Cleaning",
                description: "High-pressure steam cleaning with professional equipment removes deep-seated dirt and sanitizes surfaces."
              },
              {
                step: "04",
                title: "Sealing (Optional)",
                description: "Protective grout sealing to prevent future staining and make maintenance easier for long-lasting results."
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
            
            {/* Service Types */}
            <div>
              <h2 className="text-4xl font-bold text-primary mb-8">Areas We Clean</h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-primary-light/20 to-secondary-light/20 rounded-xl p-6 border border-accent/10">
                  <Home className="w-8 h-8 text-accent mb-3" />
                  <h3 className="text-xl font-bold text-primary mb-3">Residential</h3>
                  <ul className="space-y-2 text-primary/70">
                    <li>• Bathroom tiles & shower areas</li>
                    <li>• Kitchen backsplashes</li>
                    <li>• Floor tiles & grout</li>
                    <li>• Laundry room surfaces</li>
                    <li>• Outdoor patios & pool areas</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-accent-light/20 to-secondary-light/20 rounded-xl p-6 border border-accent/10">
                  <Building className="w-8 h-8 text-accent mb-3" />
                  <h3 className="text-xl font-bold text-primary mb-3">Commercial</h3>
                  <ul className="space-y-2 text-primary/70">
                    <li>• Restaurant kitchens</li>
                    <li>• Office building lobbies</li>
                    <li>• Retail store floors</li>
                    <li>• Medical facility surfaces</li>
                    <li>• Shopping center areas</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Tile Types */}
            <div>
              <h2 className="text-4xl font-bold text-primary mb-8">Tile Types We Service</h2>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-accent/10">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Ceramic Tiles", "Porcelain Tiles", "Natural Stone", "Marble Surfaces",
                    "Granite Tiles", "Travertine", "Slate Floors", "Quarry Tiles",
                    "Mosaic Tiles", "Glass Tiles", "Terracotta", "Limestone"
                  ].map((tileType, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-primary/80">{tileType}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-xl p-6 border border-accent/20">
                <h3 className="text-lg font-bold text-primary mb-2">Melbourne's Premier Tile Cleaning Service</h3>
                <p className="text-primary/80">
                  Serving all Melbourne suburbs with professional tile and grout cleaning. 
                  From inner city apartments to suburban homes, we bring our expertise to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & Guarantee */}
      <div className="py-16 bg-gradient-to-br from-primary-light/30 to-secondary-light/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Fair, Transparent Pricing</h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              No hidden fees, no surprises. Get a free quote tailored to your specific needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Pricing Features */}
            <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-accent/10">
              <h3 className="text-2xl font-bold text-primary mb-6">What's Included</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Comprehensive inspection", "Pre-treatment of stains", "Professional steam cleaning", 
                  "Grout line restoration", "Post-cleaning inspection", "Satisfaction guarantee",
                  "Eco-friendly products", "Free maintenance tips"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-primary/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Guarantee */}
            <div className="bg-gradient-to-br from-accent to-secondary text-white rounded-2xl p-8 text-center">
              <Star className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">100% Satisfaction Guarantee</h3>
              <p className="mb-6">
                We're not satisfied until you are. If you're not completely happy with our service, 
                we'll return to make it right at no extra cost.
              </p>
              <div className="bg-white/20 rounded-xl p-4">
                <p className="font-bold">12+ Years of Excellence</p>
                <p className="text-sm">Trusted by 5000+ Melbourne families</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Tiles?</h2>
          <p className="text-xl mb-8 text-white/90">
            Get a free, no-obligation quote for professional tile and grout cleaning in Melbourne. 
            Contact us today and see the FreshPlus difference!
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

export default TileGroutCleaning;
