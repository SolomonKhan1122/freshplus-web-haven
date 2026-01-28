import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Star, Shield, Award, CheckCircle, Home, Clock, DollarSign } from "lucide-react";
import logoImage from "/logo.webp";
import LandingPageForm from "@/components/forms/LandingPageForm";
import { SEOHead } from "@/components/SEOHead";

const EndOfLeaseLanding = () => {
  const availableServices = ["end-of-lease", "pressure-washing", "tile-grout"];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="End of Lease Cleaning Melbourne | Get Your Bond Back | Fresh Plus"
        description="Professional end of lease cleaning in Melbourne. Get your full bond back guaranteed. Licensed, insured cleaners with proven results. Book your exit clean today!"
        keywords="end of lease cleaning melbourne, bond cleaning, exit cleaning, rental cleaning, bond back guarantee"
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
                <DollarSign className="h-4 w-4 mr-2" />
                BOND BACK GUARANTEE!
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                  Get Your
                  <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent"> Full Bond Back</span> Guaranteed
                </h1>
                <h2 className="text-xl sm:text-2xl text-primary/80 font-medium">
                  Professional End of Lease Cleaning in Melbourne
                </h2>
              </div>

              {/* Key Benefits */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-lg text-gray-700">100% bond back guarantee or we re-clean FREE</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Real estate approved cleaning checklist</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Professional equipment & eco-friendly products</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Same day service available</span>
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
                  <span className="text-sm font-medium text-gray-600">5000+ Bonds Returned</span>
                </div>
              </div>

              {/* Urgency Element */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-5 w-5 text-red-500" />
                  <span className="font-bold text-red-700">Moving Out Soon?</span>
                </div>
                <p className="text-sm text-red-600">
                  Don't risk losing your bond! Book now to secure your move-out date.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div id="quote-form" className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-primary/10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  See Your Price Instantly!
                </h3>
                <p className="text-gray-600">
                  Bond back guarantee • Professional service • Quick response
                </p>
              </div>
              
              <LandingPageForm 
                serviceType="end-of-lease"
                availableServices={availableServices}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Complete End of Lease Cleaning Checklist
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every area covered to meet real estate inspection standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Kitchen Deep Clean",
                items: ["Inside & outside all appliances", "Cupboards & drawers", "Benchtops & splashbacks", "Sink & taps"],
                icon: "🍳"
              },
              {
                title: "Bathroom Sanitization",
                items: ["Shower, bath & tiles", "Toilet inside & out", "Mirrors & fixtures", "Floor & skirting"],
                icon: "🚿"
              },
              {
                title: "Living Areas",
                items: ["Vacuuming & mopping", "Dusting all surfaces", "Light fittings & fans", "Window sills & tracks"],
                icon: "🛋️"
              },
              {
                title: "Bedrooms",
                items: ["Built-in wardrobes", "All surfaces dusted", "Carpet/floor cleaning", "Light switches & power points"],
                icon: "🛏️"
              },
              {
                title: "Laundry & Utility",
                items: ["Washing machine & dryer", "Tubs & taps", "Cupboards & shelving", "Floor & walls"],
                icon: "🧺"
              },
              {
                title: "External Areas",
                items: ["Balcony/patio cleaning", "External windows", "Garage if applicable", "Entry areas"],
                icon: "🏡"
              }
            ].map((area) => (
              <div key={area.title} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{area.icon}</span>
                  <h3 className="text-xl font-bold text-primary">{area.title}</h3>
                </div>
                <ul className="space-y-2">
                  {area.items.map((item) => (
                    <li key={item} className="flex items-center text-gray-700">
                      <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-3xl p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-secondary text-white px-6 py-3 rounded-full font-bold text-lg mb-4">
                <Shield className="h-6 w-6 mr-2" />
                100% BOND BACK GUARANTEE
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                We're So Confident, We Guarantee Your Bond Return
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Home className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Professional Clean</h3>
                <p className="text-gray-600">Real estate approved checklist ensures every area meets inspection standards</p>
              </div>
              
              <div>
                <div className="bg-secondary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Bond Returned</h3>
                <p className="text-gray-600">If you don't get your bond back due to cleaning, we'll re-clean for FREE</p>
              </div>
              
              <div>
                <div className="bg-accent/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Peace of Mind</h3>
                <p className="text-gray-600">5000+ successful bond returns across Melbourne properties</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-lg text-primary font-semibold">
                "We've helped 5000+ Melbourne tenants get their full bond back"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Don't Risk Losing Your Bond Money
          </h2>
          <p className="text-xl mb-8 text-primary-light">
            Professional end of lease cleaning with 100% bond back guarantee
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
              <span>Bond Back Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Same Day Service</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Licensed & Insured</span>
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
              <p className="text-gray-300">Melbourne's Bond Back Guarantee Specialists</p>
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

export default EndOfLeaseLanding;
