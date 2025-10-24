import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { SEOHead } from "@/components/SEOHead";
import { Phone, Mail, MessageSquare, MapPin, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      value: "+61 403 971 720",
      description: "Speak directly with our Melbourne team between 7AM–7PM",
      href: "tel:+61403971720",
      color: "primary"
    },
    {
      icon: MessageSquare,
      title: "Text Us",
      value: "+61 403 971 720",
      description: "Quick replies for short or urgent requests",
      href: "sms:+61403971720",
      color: "secondary"
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "infofreshplusclean@gmail.com",
      description: "Ideal for detailed service inquiries",
      href: "mailto:infofreshplusclean@gmail.com",
      color: "accent"
    }
  ];

  const serviceAreas = [
    "Melbourne CBD", "South Yarra", "Richmond", "Collingwood", "Fitzroy",
    "Carlton", "St Kilda", "Prahran", "Toorak", "Hawthorn",
    "Camberwell", "Kew", "Northcote", "Thornbury", "Preston"
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Contact Fresh Plus Cleaning Melbourne | Book Your Service Today"
        description="Get in touch with Fresh Plus Cleaning. Melbourne's trusted team for home and commercial cleaning. Call 0403 971 720 or request a free quote."
        canonical="https://www.freshpluscleaning.com.au/contact"
        type="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "Fresh Plus Cleaning Melbourne",
            "telephone": "+61 403 971 720",
            "email": "infofreshplusclean@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Melbourne",
              "addressRegion": "VIC",
              "addressCountry": "AU"
            },
            "areaServed": "Melbourne, VIC",
            "url": "https://freshpluscleaning.com.au"
          }
        }}
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            Contact Fresh Plus Cleaning Melbourne
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            We're here to help you book, ask, or plan your next cleaning service. Our Melbourne support team responds within 1 hour during business hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-black font-semibold px-8 py-6 text-lg">
              <a href="tel:+61403971720">
                <Phone className="mr-2 h-5 w-5" />
                Call 0403 971 720
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg">
              <Link to="/quote">Get Free Quote</Link>
            </Button>
          </div>
          
          {/* Response Time Badge */}
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-6 py-3">
            <Clock className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium text-sm">
              Response within 1 hour (7AM-7PM weekdays)
            </span>
          </div>
        </div>
      </section>

      {/* Contact Options Grid */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-screen-lg mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <a
                  key={index}
                  href={method.href}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center group"
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h2>
                  <p className="text-primary font-medium mb-2 break-words">{method.value}</p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-screen-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-8">
            <MapPin className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-gray-900">Service Areas</h2>
          </div>
          <p className="text-gray-600 mb-8">Melbourne, VIC — All suburbs covered including:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {serviceAreas.map((suburb, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
                <span className="text-gray-900 font-medium text-sm">{suburb}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-6 text-sm">
            Don't see your suburb? <a href="tel:+61403971720" className="text-accent font-semibold hover:underline">Call us</a> - we service all Melbourne areas
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-screen-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
            <p className="text-gray-600">
              Complete the form below and we'll get back to you within 1 hour during business hours
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Book Your Cleaning Service?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get your free quote today and experience the Fresh Plus difference
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
          
          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              "12+ Years Experience",
              "Licensed & Insured",
              "4.9★ Rated",
              "Melbourne Based"
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm opacity-90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
