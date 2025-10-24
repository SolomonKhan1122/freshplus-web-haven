import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Star, 
  Users, 
  Shield, 
  Clock, 
  Award, 
  Heart,
  CheckCircle,
  Leaf,
  Phone
} from "lucide-react";

const About = () => {
  const stats = [
    { number: "12+", label: "Years Experience", icon: Clock },
    { number: "5,000+", label: "Happy Clients", icon: Users },
    { number: "50,000+", label: "Homes Cleaned", icon: Star },
    { number: "4.9★", label: "Google Rating", icon: Award }
  ];

  const values = [
    {
      title: "Excellence",
      description: "We maintain the highest standards in every clean",
      icon: Award
    },
    {
      title: "Integrity",
      description: "Honest, transparent, and trustworthy service",
      icon: Shield
    },
    {
      title: "Care",
      description: "We treat your home like our own",
      icon: Heart
    },
    {
      title: "Sustainability",
      description: "Eco-friendly products and practices",
      icon: Leaf
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="About Fresh Plus Cleaning Melbourne | 12+ Years of Excellence"
        description="Melbourne's most trusted cleaning service since 2012. Professional, reliable, eco-friendly cleaning for homes and businesses across Melbourne. Meet our team."
        canonical="https://www.freshpluscleaning.com.au/about"
        type="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "Fresh Plus Cleaning Melbourne",
            "foundingDate": "2012",
            "description": "Professional cleaning services in Melbourne",
            "telephone": "+61 403 971 720",
            "areaServed": "Melbourne, VIC"
          }
        }}
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Since 2012
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            About Fresh Plus Cleaning
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Melbourne's most trusted cleaning service provider since 2012, delivering excellence one home at a time
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md text-center">
                  <IconComponent className="w-8 h-8 text-accent mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-screen-lg mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to Melbourne's trusted cleaning service
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl p-8 md:p-12 mb-12">
            <div className="max-w-3xl mx-auto text-center">
              <Heart className="w-12 h-12 text-accent mx-auto mb-6" />
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                What started as a small family business in 2012 has grown into Melbourne's most reliable cleaning service. Our story began with a simple belief: every home deserves to be a sanctuary of cleanliness and comfort.
              </p>
              <p className="text-lg italic opacity-90">
                "We don't just clean homes, we create spaces where families can thrive and memories can be made."
              </p>
              <p className="text-accent font-semibold mt-4">- The Fresh Plus Family</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-3xl mx-auto text-gray-700">
            <p className="mb-6">
              Over the past 12+ years, we've built our reputation one satisfied customer at a time. Our commitment to quality, reliability, and exceptional customer service has made us the go-to cleaning service for thousands of Melbourne homes and businesses.
            </p>
            <p className="mb-6">
              We understand that inviting someone into your home or business requires trust. That's why every member of our team is carefully vetted, professionally trained, and dedicated to upholding the Fresh Plus standard of excellence.
            </p>
            <p>
              Today, we're proud to serve all Melbourne suburbs with the same passion and attention to detail that defined our first day in business. Our success isn't measured just in the number of homes we've cleaned, but in the relationships we've built and the trust our customers place in us.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-screen-lg mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Melbourne Chooses Fresh Plus
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Professionally trained and vetted cleaning specialists",
              "Licensed, insured, and fully certified",
              "Eco-friendly products safe for families and pets",
              "Flexible scheduling to fit your lifestyle",
              "100% satisfaction guarantee on all services",
              "Transparent pricing with no hidden fees",
              "Same-day service available",
              "Serving all Melbourne suburbs",
              "12+ years of trusted service",
              "Thousands of 5-star reviews"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Fresh Plus Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied Melbourne customers who trust Fresh Plus for all their cleaning needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-black font-semibold px-8 py-6 text-lg">
              <Link to="/quote">Get Your Free Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg">
              <a href="tel:+61403971720">
                <Phone className="mr-2 h-5 w-5" />
                Call 0403 971 720
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
