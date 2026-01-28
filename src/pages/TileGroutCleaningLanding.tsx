import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Star, 
  Shield, 
  Award, 
  CheckCircle, 
  Sparkles, 
  Clock,
  Home,
  Droplets,
  Leaf,
  Zap,
  ThumbsUp
} from "lucide-react";
import logoImage from "/logo.webp";
import LandingPageForm from "@/components/forms/LandingPageForm";
import { SEOHead } from "@/components/SEOHead";

const TileGroutCleaningLanding = () => {
  const availableServices = ["tile-grout", "pressure-washing", "end-of-lease"];

  const whyChooseUs = [
    {
      title: "Professional Steam Cleaning",
      description: "High-pressure steam technology that deep cleans tiles and grout without harsh chemicals",
      icon: Droplets
    },
    {
      title: "Grout Sealing Included",
      description: "Protect your investment with professional grout sealing to prevent future staining",
      icon: Shield
    },
    {
      title: "Safe for All Tiles",
      description: "Gentle yet effective cleaning safe for ceramic, porcelain, natural stone, and more",
      icon: Leaf
    },
    {
      title: "Guaranteed Results",
      description: "Restore your tiles to like-new condition or we'll make it right at no extra cost",
      icon: ThumbsUp
    }
  ];

  const services = [
    {
      title: "Bathroom Tile Cleaning",
      description: "Remove soap scum, mold, mildew, and hard water stains from bathroom tiles and grout",
      features: ["Shower tile restoration", "Floor tile cleaning", "Mold & mildew removal", "Grout whitening"],
      icon: Droplets
    },
    {
      title: "Kitchen Tile Cleaning",
      description: "Eliminate grease, food stains, and discoloration from kitchen backsplashes and floors",
      features: ["Backsplash cleaning", "Floor tile refresh", "Grease removal", "Stain treatment"],
      icon: Sparkles
    },
    {
      title: "Commercial Tile Cleaning",
      description: "Professional tile and grout cleaning for restaurants, offices, and commercial spaces",
      features: ["Large area cleaning", "After-hours service", "High-traffic areas", "Scheduled maintenance"],
      icon: Home
    }
  ];

  const faqs = [
    {
      question: "How long does tile and grout cleaning take?",
      answer: "Most bathrooms take 2-3 hours, kitchens 3-4 hours. We'll provide an accurate time estimate based on your space during the quote."
    },
    {
      question: "Can you remove all grout stains?",
      answer: "We can remove 95%+ of stains using professional steam cleaning and specialized treatments. Heavily stained grout may require re-coloring or replacement, which we can also provide."
    },
    {
      question: "Is grout sealing really necessary?",
      answer: "Yes! Grout is porous and absorbs dirt, moisture, and stains. Professional sealing creates a protective barrier that keeps your grout cleaner longer and makes future cleaning much easier."
    },
    {
      question: "How often should I have my tiles professionally cleaned?",
      answer: "We recommend professional cleaning every 12-18 months for residential properties, and every 6-12 months for high-traffic commercial areas."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Professional Tile & Grout Cleaning Melbourne | Fresh Plus"
        description="Melbourne's #1 tile and grout cleaning service. Remove stains, mold & discoloration. Steam cleaning + grout sealing. 100% satisfaction guaranteed. Book today!"
        keywords="tile grout cleaning melbourne, tile restoration, bathroom tile cleaning, kitchen tile cleaning, grout sealing, tile steam cleaning"
        canonical="https://www.freshpluscleaning.com.au/tile-grout"
      />

      {/* Hero Section - Full Width Background */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Tile_grout.webp')" }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary-dark/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <Link to="/" className="inline-block">
              <img 
                src={logoImage} 
                alt="Fresh Plus Professional Cleaning Services" 
                className="h-20 sm:h-24 w-auto mx-auto drop-shadow-2xl"
              />
            </Link>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Restore Your Tiles to
            <span className="block mt-2 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Like-New Condition
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-medium mb-10 max-w-4xl mx-auto">
            Expert tile & grout cleaning in Melbourne. Remove stains, mold & discoloration with professional steam cleaning.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href="#quote-form">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-black font-bold text-lg px-10 py-7 rounded-xl shadow-2xl hover:scale-105 transition-transform"
              >
                See Instant Pricing
              </Button>
            </a>
            <a href="tel:+61403971720">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-10 py-7 rounded-xl shadow-2xl hover:scale-105 transition-transform"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call: 0403 971 720
              </Button>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-white">
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 text-accent fill-accent" />
              <span className="font-semibold">5-Star Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-accent" />
              <span className="font-semibold">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-accent" />
              <span className="font-semibold">Same-Day Available</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Droplets className="h-8 w-8 text-white/60" />
        </div>
      </section>

      {/* Why Choose Fresh Plus Section */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-light/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
              Why Choose Fresh Plus for Tile & Grout Cleaning?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with Melbourne's premier tile restoration specialists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-primary/10"
              >
                <div className="bg-gradient-to-br from-primary to-primary-dark w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
              Our Tile & Grout Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional cleaning solutions for every tile surface
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white to-primary-light/5 p-8 rounded-2xl border-2 border-primary/20 hover:border-primary transition-all hover:shadow-2xl"
              >
                <div className="bg-accent w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-20 bg-gradient-to-b from-primary-light/10 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
              See Your Price Today
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 1 hour (7AM-7PM) or next business day
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-primary/10">
            <LandingPageForm 
              serviceType="tile-grout" 
              availableServices={availableServices} 
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-primary-light/5 p-6 rounded-xl border border-primary/10">
                <h3 className="text-xl font-bold text-primary mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-dark to-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Restore Your Tiles?
          </h2>
          <p className="text-xl mb-10 text-white/90">
            Book your tile & grout cleaning today and see the Fresh Plus difference!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#quote-form">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-black font-bold text-lg px-10 py-7 rounded-xl"
              >
                See Pricing Now
              </Button>
            </a>
            <a href="tel:+61403971720">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-10 py-7 rounded-xl border-2 border-white"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call: 0403 971 720
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-primary-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/80">
            © 2024 Fresh Plus Professional Cleaning Services. All rights reserved.
          </p>
          <div className="mt-4 space-x-6">
            <Link to="/privacy" className="text-white/80 hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="text-white/80 hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TileGroutCleaningLanding;

