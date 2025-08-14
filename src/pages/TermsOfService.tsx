import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-secondary-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-secondary-light">
              Professional cleaning services you can trust. Our terms ensure quality and transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              
              {/* Last Updated */}
              <div className="mb-8 p-4 bg-secondary-light rounded-lg border-l-4 border-secondary">
                <p className="text-sm text-gray-600">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString('en-AU')}
                </p>
              </div>

              {/* Introduction */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Welcome to FreshPlus Professional Cleaning Services. These Terms of Service ("Terms") govern your use 
                  of our cleaning services and website located in Melbourne, Victoria, Australia.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  By engaging our services, you agree to be bound by these Terms. Please read them carefully before 
                  booking any cleaning services.
                </p>
              </div>

              {/* Services */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">Our Services</h2>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-secondary mb-3">Service Types</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Residential cleaning services</li>
                    <li>Commercial cleaning services</li>
                    <li>Deep cleaning and spring cleaning</li>
                    <li>Carpet and upholstery cleaning</li>
                    <li>Window cleaning services</li>
                    <li>End of lease cleaning</li>
                    <li>Post-construction cleanup</li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  All services are performed by trained, insured professionals using environmentally safe cleaning products 
                  and modern equipment.
                </p>
              </div>

              {/* Booking and Scheduling */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">Booking and Scheduling</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-secondary mb-3">Booking Process</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Services can be booked online, by phone, or email</li>
                    <li>A written estimate will be provided before work begins</li>
                    <li>Booking confirmation includes date, time, and service details</li>
                    <li>We reserve the right to accept or decline service requests</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-secondary mb-3">Rescheduling and Cancellation</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>24-hour notice required for cancellations or rescheduling</li>
                    <li>Same-day cancellations may incur a service fee</li>
                    <li>Weather-related cancellations will be rescheduled at no charge</li>
                    <li>We may reschedule due to unforeseen circumstances</li>
                  </ul>
                </div>
              </div>

              {/* Pricing and Payment */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">Pricing and Payment</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-secondary mb-3">Pricing</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Prices are quoted in Australian Dollars (AUD)</li>
                    <li>All prices include GST where applicable</li>
                    <li>Quotes are valid for 30 days from issue date</li>
                    <li>Additional services may incur extra charges</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-secondary mb-3">Payment Terms</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Payment is due upon completion of services</li>
                    <li>We accept cash, card, and bank transfer payments</li>
                    <li>Invoices are payable within 7 days for commercial clients</li>
                    <li>Late payment fees may apply to overdue accounts</li>
                  </ul>
                </div>
              </div>

              {/* Customer Responsibilities */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">Customer Responsibilities</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Provide safe access to all areas requiring cleaning</li>
                  <li>Secure or remove valuable and fragile items</li>
                  <li>Inform us of any special requirements or concerns</li>
                  <li>Ensure pets are secured during service</li>
                  <li>Provide accurate contact information and property access</li>
                  <li>Report any damage or concerns within 24 hours</li>
                </ul>
              </div>

              {/* Quality Guarantee */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">Service Guarantee</h2>
                <div className="bg-accent-light p-6 rounded-lg mb-4">
                  <h3 className="text-xl font-semibold text-primary mb-3">100% Satisfaction Guarantee</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We stand behind our work. If you're not completely satisfied with our cleaning service, 
                    contact us within 24 hours and we'll return to re-clean the affected areas at no additional charge.
                  </p>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Quality inspections available upon request</li>
                  <li>Eco-friendly cleaning products used unless otherwise requested</li>
                  <li>All staff are trained, vetted, and insured</li>
                  <li>We maintain comprehensive public liability insurance</li>
                </ul>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  While we take every precaution to prevent damage, FreshPlus Professional Cleaning Services' 
                  liability is limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>The cost of the cleaning service provided</li>
                  <li>Coverage available through our public liability insurance</li>
                  <li>Direct damages only (not consequential or indirect damages)</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  We are not liable for damage to items that should have been secured by the customer, 
                  or damage to items in poor condition prior to cleaning.
                </p>
              </div>

              {/* Governing Law */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms are governed by the laws of Victoria, Australia. Any disputes will be resolved 
                  in the courts of Victoria. We comply with Australian Consumer Law and your rights as a 
                  consumer are protected under these laws.
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-secondary-light to-accent-light p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-primary mb-4">Questions About Our Terms?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please don't hesitate to contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> <a href="mailto:info@freshpluscleaning.com.au" className="text-primary hover:text-secondary">info@freshpluscleaning.com.au</a></p>
                  <p><strong>Phone:</strong> <a href="tel:+61403971720" className="text-primary hover:text-secondary">+61 403 971 720</a></p>
                  <p><strong>Service Areas:</strong> All Melbourne suburbs</p>
                </div>
              </div>

              {/* Terms Updates */}
              <div className="mt-10 p-4 bg-secondary-light rounded-lg">
                <h3 className="text-lg font-semibold text-primary mb-2">Terms Updates</h3>
                <p className="text-sm text-gray-600">
                  We reserve the right to modify these Terms at any time. Updated Terms will be posted on our 
                  website and take effect immediately upon posting. Continued use of our services constitutes 
                  acceptance of any changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
