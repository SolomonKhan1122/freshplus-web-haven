import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Phone, Mail, Home, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThankYouPageProps {
  type: 'quote' | 'booking' | 'contact';
  customerName?: string;
  onClose?: () => void;
}

const ThankYouPage = ({ type, customerName, onClose }: ThankYouPageProps) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onClose) {
            onClose();
          } else {
            navigate('/');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, onClose]);

  const getTypeSpecificContent = () => {
    switch (type) {
      case 'quote':
        return {
          title: 'Quote Request Received!',
          subtitle: 'Thank you for choosing FreshPlus',
          message: 'We\'ve received your quote request and will get back to you with a personalized estimate.',
          icon: '📋',
          color: 'from-emerald-500 to-teal-600'
        };
      case 'booking':
        return {
          title: 'Booking Confirmed!',
          subtitle: 'Your service is scheduled',
          message: 'We\'ve received your booking request and will contact you soon to confirm all details.',
          icon: '✅',
          color: 'from-blue-500 to-indigo-600'
        };
      case 'contact':
        return {
          title: 'Message Sent!',
          subtitle: 'We\'ll be in touch soon',
          message: 'Thank you for reaching out to FreshPlus. We\'ve received your message and will respond promptly.',
          icon: '✉️',
          color: 'from-purple-500 to-violet-600'
        };
      default:
        return {
          title: 'Thank You!',
          subtitle: 'Message received',
          message: 'Thank you for contacting FreshPlus.',
          icon: '🙏',
          color: 'from-primary to-primary-dark'
        };
    }
  };

  const content = getTypeSpecificContent();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-auto overflow-hidden animate-in zoom-in-95 duration-500">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${content.color} text-white px-8 py-12 text-center relative overflow-hidden`}>
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full"></div>
          </div>
          
          {/* Logo */}
          <div className="relative z-10 mb-6">
            <img 
              src="/logo.webp" 
              alt="FreshPlus" 
              className="h-16 w-auto mx-auto mb-4"
            />
            <div className="text-sm opacity-90 font-medium">Professional Cleaning Services</div>
          </div>
          
          {/* Success Icon */}
          <div className="relative z-10 mb-6">
            <div className="bg-white/20 backdrop-blur-sm w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="text-6xl mb-4">{content.icon}</div>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-3 relative z-10">
            {content.title}
          </h1>
          <p className="text-xl opacity-90 relative z-10">{content.subtitle}</p>
        </div>
        
        {/* Content */}
        <div className="px-8 py-12 text-center">
          {customerName && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">
                Hello {customerName}! 👋
              </h2>
            </div>
          )}
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-lg mx-auto">
            {content.message}
          </p>
          
          {/* Response Time Info */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-emerald-600" />
              <h3 className="text-lg font-bold text-emerald-800">Our Response Times</h3>
            </div>
            <div className="text-emerald-700">
              <p className="font-semibold">📞 Within 1 hour (7AM - 7PM daily)</p>
              <p className="font-semibold">🌙 Next business day (after 7PM)</p>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-amber-800 mb-4">Need Immediate Assistance?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+61403971720" 
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-semibold">+61 403 971 720</span>
              </a>
              <a 
                href="mailto:infofreshplusclean@gmail.com" 
                className="flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-dark transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="font-semibold">Email Us</span>
              </a>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              ⭐ 5-Star Rated
            </span>
            <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold">
              🛡️ Fully Insured
            </span>
            <span className="bg-accent/10 text-accent-dark px-4 py-2 rounded-full text-sm font-semibold">
              🌿 Eco-Friendly
            </span>
            <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
              💯 Satisfaction Guaranteed
            </span>
          </div>
          
          {/* Countdown and Actions */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-gray-600 mb-6">
              Redirecting to homepage in <span className="font-bold text-primary text-xl">{countdown}</span> seconds...
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/')}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Go to Homepage Now
              </Button>
              
              {onClose && (
                <Button 
                  onClick={onClose}
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold"
                >
                  Stay on Page
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
