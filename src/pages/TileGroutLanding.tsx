import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Star, Shield, Award, CheckCircle, Sparkles, Clock } from "lucide-react";
import logoImage from "/logo.webp";
import LandingPageForm from "@/components/forms/LandingPageForm";
import { SEOHead } from "@/components/SEOHead";

const TileGroutLanding = () => {
  const availableServices = ["tile-grout", "pressure-washing", "end-of-lease"];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Professional Tile & Grout Cleaning Melbourne | Fresh Plus"
        description="Restore your tiles to like-new condition with professional tile and grout cleaning in Melbourne. Remove stains, mold, and discoloration. Licensed, insured, guaranteed results."
        keywords="tile grout cleaning melbourne, tile restoration, grout cleaning, bathroom tile cleaning, kitchen tile cleaning"
      />

      {/* Minimal Header with Logo */}
      <header className="bg-white px-4 py-3 shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src={logoImage} 
              alt="Fresh Plus Professional Cleaning Services" 
              className="h-16 sm:h-20 w-auto"
            />
            <span className="ml-3 text-sm sm:text-base font-medium text-primary bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent hidden sm:block">
              Your Home, Our Expertise
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <a 
              href="tel:+61403971720" 
              className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Call Now: </span>
              <span className="font-semibold">0403 971 720</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-light via-white to-secondary-light py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Image & Headlines */}
            <div className="space-y-8">
              {/* Hero Image */}
              <div className="relative mb-4">
                <img 
                  src="/Tile_grout.webp" 
                  alt="Professional Tile & Grout Cleaning Services Melbourne - Before and After Results" 
                  className="w-full h-80 sm:h-96 lg:h-[28rem] object-cover object-bottom rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-sm font-bold text-primary">✨ Amazing Results Guaranteed</p>
                </div>
              </div>
              {/* Attention-Grabbing Badge */}
              <div className="inline-flex items-center bg-accent text-black px-4 py-2 rounded-full font-bold text-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                PROFESSIONAL TILE RESTORATION
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                  Restore Your Tiles to
                  <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent"> Like-New</span> Condition
                </h1>
                <h2 className="text-xl sm:text-2xl text-primary/80 font-medium">
                  Expert Tile & Grout Cleaning Services in Melbourne
                </h2>
              </div>

              {/* Key Benefits */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Remove stubborn stains, mold & discoloration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Professional steam cleaning & sanitization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Grout sealing to prevent future staining</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Safe for all tile types & surfaces</span>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                  <span className="ml-2 font-semibold text-primary">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium text-gray-600">Fully Insured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium text-gray-600">Specialist Equipment</span>
                </div>
              </div>

              {/* Urgency Element */}
              <div className="bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <span className="font-bold text-primary">Book This Week & Save!</span>
                </div>
                <p className="text-sm text-gray-600">
                  Limited availability - Melbourne's most trusted tile cleaning specialists
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-primary/10" id="quote-form">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  See Your Price Instantly!
                </h3>
                <p className="text-gray-600">
                  Professional assessment • No obligation • Quick response
                </p>
              </div>
              
              <LandingPageForm 
                serviceType="tile-grout"
                availableServices={availableServices}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Common Tile & Grout Problems We Solve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { problem: "Discolored Grout", solution: "Professional steam cleaning restores original color", icon: "🧽" },
              { problem: "Mold & Mildew", solution: "Deep sanitization eliminates harmful bacteria", icon: "🦠" },
              { problem: "Stubborn Stains", solution: "Specialized equipment removes years of buildup", icon: "✨" },
              { problem: "Dull Tile Surfaces", solution: "Professional polishing brings back the shine", icon: "💎" },
              { problem: "Soap Scum Buildup", solution: "Complete removal and protective treatment", icon: "🧴" },
              { problem: "Cracked Grout Lines", solution: "Repair and seal to prevent water damage", icon: "🔧" }
            ].map((item) => (
              <div key={item.problem} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-red-600 mb-2">❌ {item.problem}</h3>
                <p className="text-gray-700">✅ {item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Don't Let Dirty Tiles Ruin Your Space
          </h2>
          <p className="text-xl mb-8 text-primary-light">
            Professional tile & grout cleaning that delivers guaranteed results
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:+61403971720"
              className="bg-accent hover:bg-accent-dark text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              📞 Call Now: 0403 971 720
            </a>
            <span className="text-primary-light">OR</span>
            <Button 
              onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-secondary hover:bg-secondary-dark text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              See Pricing Above ⬆️
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Free Quotes</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-bold text-lg mb-2">Fresh Plus Cleaning</h3>
              <p className="text-gray-300">Melbourne's Tile & Grout Cleaning Specialists</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Contact Info</h3>
              <p className="text-gray-300">📞 0403 971 720</p>
              <p className="text-gray-300">✉️ infofreshplusclean@gmail.com</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Service Areas</h3>
              <p className="text-gray-300">All Melbourne Suburbs</p>
              <p className="text-gray-300">Licensed & Insured</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Fresh Plus Professional Cleaning Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TileGroutLanding;
