import { useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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
      
      // Google Ads conversion event
      gtag('event', 'conversion', {
        send_to: 'AW-17525851975/avIKCMDsq5MbEMeO_aRB'
      });
      
      // Page view tracking
      gtag('config', 'G-VY43MPH5J3', {
        page_title: `Thank You - ${getSourceDisplay(source)}`,
        page_location: window.location.href
      });
      
      console.log('✅ Conversion events fired successfully');
    } else {
      console.warn('⚠️ gtag not available - conversion tracking may not work');
    }
  }, [source, type, navigate]);

  const getSourceDisplay = (source: string) => {
    const sourceMap: Record<string, string> = {
      'pressure-washing': 'Pressure Washing',
      'tile-grout': 'Tile & Grout Cleaning',
      'end-of-lease': 'End of Lease Cleaning',
      'main-quote': 'Quote Request',
      'main-booking': 'Booking Request',
      'contact-form': 'Contact Form',
      'website': 'Website'
    };
    return sourceMap[source] || source;
  };

  // Capitalize first letter of name
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  // Determine if this is a contact submission
  const isContact = type === 'contact';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEOHead 
        title="Thank You - Fresh Plus Cleaning Services Melbourne"
        description={isContact 
          ? "Thank you for contacting us. We'll respond to your message soon."
          : "Thank you for your submission. We'll contact you soon with your personalized quote for professional cleaning services in Melbourne."
        }
        noindex={true}
      />

      <Navigation />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-50 px-4 py-16">
        <section className="bg-white shadow-lg rounded-2xl p-8 md:p-12 max-w-xl w-full text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          {/* Thank You Message */}
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            Thank You, {displayName}
          </h1>
          
          {isContact ? (
            // CONTACT FORM SUBMISSION
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Your message has been received. Our Melbourne team will respond to your inquiry within 1 hour between 7:00 AM and 7:00 PM.
            </p>
          ) : (
            // QUOTE FORM SUBMISSION
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Your {type === 'booking' ? 'booking' : 'quote'} request has been received. Our Melbourne team will contact you within 1 hour between 7:00 AM and 7:00 PM.
            </p>
          )}

          {/* What Happens Next */}
          <div className="space-y-4 text-left text-gray-700 mb-8">
            <h2 className="font-semibold text-lg text-gray-800 mb-4">What Happens Next</h2>
            <ul className="space-y-3">
              {isContact ? (
                // CONTACT FORM STEPS
                <>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                    <span>We review your message and inquiry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                    <span>We provide you with the information you need</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                    <span>We assist you with next steps or booking</span>
                  </li>
                </>
              ) : (
                // QUOTE FORM STEPS
                <>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                    <span>We review your cleaning requirements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                    <span>We send you a personalized quote</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                    <span>We schedule your service at your convenience</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Urgent Contact */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-4">Need Urgent Assistance?</h3>
            <p className="text-sm text-gray-600 mb-4">
              For immediate assistance or urgent cleaning needs:
            </p>
            <a 
              href="tel:+61403971720" 
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold w-full sm:w-auto"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call 0403 971 720
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <Button className="w-full bg-accent hover:bg-accent-dark text-black font-semibold px-8 py-6 rounded-xl text-lg shadow-md hover:shadow-lg transition-all">
                <Home className="h-5 w-5 mr-2" />
                Return to Home
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <p className="text-xs text-gray-500 mt-8 pt-6 border-t border-gray-200">
            Licensed & Insured • 5-Star Rated • Satisfaction Guaranteed
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
