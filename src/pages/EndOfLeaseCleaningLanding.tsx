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
  Building,
  Key,
  FileCheck,
  ThumbsUp
} from "lucide-react";
import logoImage from "/logo.webp";
import LandingPageForm from "@/components/forms/LandingPageForm";
import { SEOHead } from "@/components/SEOHead";

const EndOfLeaseCleaningLanding = () => {
  const availableServices = ["end-of-lease", "pressure-washing", "tile-grout"];

  const whyChooseUs = [
    {
      title: "100% Bond Back Guarantee",
      description: "We guarantee your full bond return or we'll re-clean for free. That's our promise.",
      icon: Shield
    },
    {
      title: "Real Estate Approved",
      description: "Our checklist meets all real estate requirements. We know exactly what inspectors look for.",
      icon: FileCheck
    },
    {
      title: "Same-Day Service",
      description: "Urgent move? We offer same-day and next-day cleaning for last-minute situations.",
      icon: Clock
    },
    {
      title: "12+ Years Experience",
      description: "Over 5,000 successful bond cleans across Melbourne with 98% bond recovery rate.",
      icon: Award
    }
  ];

  const services = [
    {
      title: "Studio & 1 Bedroom",
      description: "Complete end of lease clean for apartments, studios, and small units",
      features: ["Kitchen deep clean", "Bathroom sanitization", "Window cleaning", "Carpet steam clean", "4-6 hour service"],
      icon: Home
    },
    {
      title: "2-3 Bedroom Homes",
      description: "Thorough bond cleaning for family homes, townhouses, and medium properties",
      features: ["All rooms deep cleaned", "Multiple bathrooms", "Oven & appliances", "Walls & skirting", "6-8 hour service"],
      icon: Building
    },
    {
      title: "3BR+ Large Houses",
      description: "Comprehensive cleaning for large properties, multi-level homes, and estates",
      features: ["Whole house cleaning", "Garage & laundry", "Outdoor areas", "Detailed inspection prep", "8-10+ hour service"],
      icon: Key
    }
  ];

  const faqs = [
    {
      question: "What's included in your end of lease clean?",
      answer: "Everything! Kitchen (oven, stovetop, rangehood, cupboards), bathrooms (tiles, shower, toilet), all rooms (walls, skirting, wardrobes), windows, doors, light fittings, carpet steam cleaning, and more. We follow a comprehensive real estate checklist."
    },
    {
      question: "Do you really guarantee my bond back?",
      answer: "Yes! If the real estate requests a re-clean due to our cleaning, we'll return and fix it for free. We've maintained a 98% bond recovery rate for over 12 years because we know exactly what inspectors look for."
    },
    {
      question: "Can you clean on short notice?",
      answer: "Yes! We offer same-day and next-day service for urgent move-outs. Call us on 0403 971 720 to check availability for your date."
    },
    {
      question: "Do I need to be present during the clean?",
      answer: "No, you don't need to be home. Just ensure we have access to the property and all keys. We'll lock up and return keys as arranged."
    },
    {
      question: "Is carpet cleaning included?",
      answer: "Carpet steam cleaning is included in all our end of lease packages. We use professional equipment for best results and faster drying times."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="End of Lease Cleaning Melbourne | 100% Bond Back Guarantee"
        description="Melbourne's #1 end of lease cleaning service. 100% bond back guarantee. Real estate approved. Same-day available. Expert cleaners. 12+ years experience. Book today!"
        keywords="end of lease cleaning melbourne, bond cleaning, exit cleaning, vacate cleaning, bond back guarantee, real estate cleaning"
        canonical="https://www.freshpluscleaning.com.au/end-of-lease"
      />

      {/* Hero Section - Full Width Background */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/End_lease.webp')" }}
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
            Get Your Bond Back
            <span className="block mt-2 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              100% Guaranteed
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-medium mb-10 max-w-4xl mx-auto">
            Professional end of lease cleaning in Melbourne. Real estate approved checklist. Same-day service available.
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
              <Shield className="h-6 w-6 text-accent fill-accent" />
              <span className="font-semibold">100% Bond Back</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 text-accent fill-accent" />
              <span className="font-semibold">5-Star Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-accent" />
              <span className="font-semibold">Same-Day Available</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Key className="h-8 w-8 text-white/60" />
        </div>
      </section>

      {/* Why Choose Fresh Plus Section */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-light/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
              Why Choose Fresh Plus for End of Lease Cleaning?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Melbourne's most trusted bond cleaning specialists
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
              Bond Cleaning Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional cleaning packages for every property size
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
              serviceType="end-of-lease" 
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
            Ready to Get Your Full Bond Back?
          </h2>
          <p className="text-xl mb-10 text-white/90">
            Book your end of lease clean today with Melbourne's most trusted bond cleaning specialists!
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

export default EndOfLeaseCleaningLanding;

