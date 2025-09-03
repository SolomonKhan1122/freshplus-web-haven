import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Phone, Mail } from "lucide-react";
import logoImage from "/logo.webp";
import { SEOHead } from "@/components/SEOHead";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  // Get parameters from URL
  const source = searchParams.get('source') || 'website';
  const type = searchParams.get('type') || 'quote';
  const name = searchParams.get('name') || 'valued customer';

  // Track conversion when thank you page loads
  useEffect(() => {
    // Fire Google Analytics and Google Ads conversion events
    if (typeof gtag !== 'undefined') {
      console.log('🎯 Firing conversion events on thank you page');
      
      // Google Analytics conversion event
      gtag('event', 'conversion_complete', {
        event_category: 'conversion',
        event_label: source,
        custom_map: {
          'custom_parameter_1': type,
          'custom_parameter_2': source
        }
      });
      
      // Google Ads conversion event (this is what triggers conversion tracking)
      gtag('event', 'conversion', {
        send_to: 'AW-17525851975/avIKCMDsq5MbEMeO_aRB'
      });
      
      // Page view tracking for thank you page
      gtag('config', 'G-VY43MPH5J3', {
        page_title: `Thank You - ${getSourceDisplay(source)}`,
        page_location: window.location.href
      });
      
      console.log('✅ Conversion events fired successfully');
    } else {
      console.warn('⚠️ gtag not available - conversion tracking may not work');
    }

    // Auto-redirect countdown (optional - can be removed if not wanted)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Auto-redirect to home after countdown (optional)
          // navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [source, type, navigate]);

  const getSourceDisplay = (source: string) => {
    const sourceMap: Record<string, string> = {
      'pressure-washing': 'Pressure Washing',
      'tile-grout': 'Tile & Grout Cleaning',
      'end-of-lease': 'End of Lease Cleaning',
      'main-quote': 'Quote Request',
      'main-booking': 'Booking Request',
      'website': 'Website'
    };
    return sourceMap[source] || source;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <SEOHead 
        title="Thank You - Fresh Plus Cleaning Services"
        description="Thank you for your submission. We'll contact you soon with your personalized quote."
      />

      {/* Simple Header with Logo */}
      <header className="bg-white px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
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
        </div>
      </header>

      {/* Thank You Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center w-24 h-24 bg-secondary rounded-full mb-8">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Main Thank You Message */}
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
            Thank You, {name}! 🎉
          </h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Your {type === 'booking' ? 'Booking' : 'Quote Request'} Has Been Received!
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                ✅ We've received your <strong>{type === 'booking' ? 'booking' : 'quote'} request</strong>
              </p>
              <p className="text-lg">
                📧 Confirmation email has been sent to your inbox
              </p>
              <p className="text-lg">
                ⏱️ Our team will contact you within <strong>1 hour</strong> from 7:00 AM to 7:00 PM
              </p>
              <p className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                📅 <strong>Note:</strong> Requests submitted after 7:00 PM will be handled next business day
              </p>
            </div>

            {/* What Happens Next */}
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl">
              <h3 className="text-xl font-bold text-primary mb-4">🚀 What Happens Next?</h3>
              <div className="space-y-2 text-left">
                <p className="flex items-center text-gray-700">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Our team reviews your requirements
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</span>
                  We contact you with {type === 'booking' ? 'confirmation details' : 'a personalized quote'}
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">3</span>
                  {type === 'booking' ? 'Our cleaners arrive on time' : 'We schedule your service at your convenience'}
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl">
              <h3 className="text-lg font-bold text-red-700 mb-4">🚨 Urgent Inquiries?</h3>
              <p className="text-sm text-red-600 mb-4">
                For immediate assistance or urgent cleaning needs, please call us directly:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+61403971720"
                  className="flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-bold"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now: 0403 971 720
                </a>
                <a 
                  href="mailto:infofreshplusclean@gmail.com"
                  className="flex items-center justify-center bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-dark transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Us
                </a>
              </div>
              <p className="text-xs text-gray-600 mt-3 text-center">
                Available 7:00 AM - 7:00 PM daily
              </p>
            </div>
          </div>

          {/* Return to Home Button */}
          <div className="space-y-4">
            <Link to="/">
              <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Home className="h-5 w-5 mr-2" />
                Return to Home
              </Button>
            </Link>

            {/* Optional: Auto-redirect notice */}
            {/* <p className="text-sm text-gray-500">
              Automatically redirecting to home page in {countdown} seconds...
            </p> */}
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow">
              <CheckCircle className="h-5 w-5 text-secondary" />
              <span className="text-gray-700">Licensed & Insured</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span className="text-gray-700">5-Star Rated</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-gray-700">Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4">
            <h3 className="font-bold text-lg mb-2">Fresh Plus Professional Cleaning Services</h3>
            <p className="text-gray-300">Melbourne's Most Trusted Cleaning Service</p>
          </div>
          
          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-400">&copy; 2024 Fresh Plus Professional Cleaning Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ThankYou;
