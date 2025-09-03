import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Star, Shield, Award, CheckCircle, Zap, Clock, MapPin } from "lucide-react";
import logoImage from "/logo.webp";
import LandingPageForm from "@/components/forms/LandingPageForm";
import { SEOHead } from "@/components/SEOHead";

const PressureWashingLanding = () => {
  const availableServices = ["pressure-washing", "tile-grout", "end-of-lease"];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Professional Pressure Washing Melbourne | Free Quote | Fresh Plus"
        description="Transform your property with professional pressure washing services in Melbourne. Remove dirt, grime, and stains instantly. Licensed, insured, and guaranteed results. Get your free quote today!"
        keywords="pressure washing melbourne, power washing, driveway cleaning, house washing, commercial pressure cleaning"
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
            
            {/* Left Column - Headlines & Benefits */}
            <div className="space-y-8">
              {/* Attention-Grabbing Badge */}
              <div className="inline-flex items-center bg-accent text-black px-4 py-2 rounded-full font-bold text-sm">
                <Zap className="h-4 w-4 mr-2" />
                LIMITED TIME: Same Day Service Available!
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                  Transform Your Property in 
                  <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent"> Hours</span>
                </h1>
                <h2 className="text-xl sm:text-2xl text-primary/80 font-medium">
                  Professional Pressure Washing Services in Melbourne
                </h2>
              </div>

              {/* Key Benefits */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Remove years of dirt, grime & stains instantly</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Increase property value by up to 15%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Eco-friendly cleaning solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Licensed, insured & satisfaction guaranteed</span>
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
                  <span className="text-sm font-medium text-gray-600">12+ Years Experience</span>
                </div>
              </div>

              {/* Urgency Element */}
              <div className="bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <span className="font-bold text-primary">Get Quote Within 24 Hours!</span>
                </div>
                <p className="text-sm text-gray-600">
                  Don't wait - Melbourne weather can damage your surfaces. Protect your investment today!
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div id="quote-form" className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-primary/10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Get Your FREE Quote Now!
                </h3>
                <p className="text-gray-600">
                  No obligation • Quick response • Professional assessment
                </p>
              </div>
              
              <LandingPageForm 
                serviceType="pressure-washing"
                availableServices={availableServices}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Clean Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              What We Pressure Wash
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional pressure washing for all exterior surfaces across Melbourne
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Driveways & Paths", description: "Remove oil stains, dirt, and weathering", icon: "🚗" },
              { title: "House Exteriors", description: "Refresh siding, brick, and rendered walls", icon: "🏠" },
              { title: "Decks & Patios", description: "Restore timber and concrete outdoor areas", icon: "🏡" },
              { title: "Commercial Properties", description: "Maintain professional business appearance", icon: "🏢" }
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Why Melbourne Trusts Fresh Plus
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Same Day Service</h3>
              <p className="text-gray-600">Available for urgent cleaning needs across Melbourne</p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Fully Licensed & Insured</h3>
              <p className="text-gray-600">Complete peace of mind with every service</p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Award className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">12+ Years Experience</h3>
              <p className="text-gray-600">Trusted by 5000+ Melbourne properties</p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-accent fill-current" />
              ))}
            </div>
            <blockquote className="text-lg sm:text-xl text-center text-gray-700 italic mb-4">
              "Fresh Plus transformed our driveway from embarrassing to amazing! The pressure washing removed 5 years of stains in just 2 hours. Highly recommend!"
            </blockquote>
            <div className="text-center">
              <p className="font-semibold text-primary">Sarah M.</p>
              <p className="text-sm text-gray-500">Toorak, Melbourne</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Property?
          </h2>
          <p className="text-xl mb-8 text-primary-light">
            Join 5000+ satisfied Melbourne customers who trust Fresh Plus
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
              Get Free Quote Above ⬆️
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Free Quotes</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Same Day Service</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>100% Satisfaction Guarantee</span>
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
              <p className="text-gray-300">Melbourne's Most Trusted Pressure Washing Service</p>
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

export default PressureWashingLanding;
