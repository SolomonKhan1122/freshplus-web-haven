import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-primary-light">
              Your privacy is important to us. Learn how we protect your personal information.
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
              <div className="mb-8 p-4 bg-accent-light rounded-lg border-l-4 border-accent">
                <p className="text-sm text-gray-600">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString('en-AU')}
                </p>
              </div>

              {/* Introduction */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  FreshPlus Professional Cleaning Services ("we", "our", or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
                  our website or use our cleaning services in Melbourne, Victoria, Australia.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This policy complies with the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth) 
                  and applicable Victorian privacy legislation.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">Information We Collect</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-secondary mb-3">Personal Information</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Name and contact details (phone number, email address)</li>
                    <li>Home or business address for service delivery</li>
                    <li>Payment information for billing purposes</li>
                    <li>Service preferences and special requirements</li>
                    <li>Communication records with our team</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-secondary mb-3">Automatically Collected Information</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Website usage data and analytics</li>
                    <li>IP address and browser information</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>

              {/* How We Use Information */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Provide and deliver our cleaning services</li>
                  <li>Process payments and manage billing</li>
                  <li>Communicate about appointments and service updates</li>
                  <li>Improve our services and customer experience</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              {/* Information Sharing */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">Information Sharing and Disclosure</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>With trusted service providers who assist in our operations</li>
                  <li>When required by law or to protect our legal rights</li>
                  <li>With your explicit consent</li>
                  <li>To protect the safety of our employees and customers</li>
                </ul>
              </div>

              {/* Data Security */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">Data Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate technical and organisational measures to protect your personal information 
                  against unauthorised access, alteration, disclosure, or destruction. This includes secure storage 
                  systems, encrypted communications, and regular security assessments.
                </p>
              </div>

              {/* Your Rights */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">Your Rights Under Australian Privacy Law</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Under the Privacy Act 1988, you have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Access your personal information we hold</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information (subject to legal requirements)</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Make a complaint about our privacy practices</li>
                </ul>
              </div>

              {/* Cookies */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4">Cookies and Tracking</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our website uses cookies to enhance your browsing experience and analyse website usage. 
                  You can control cookie settings through your browser preferences. Disabling cookies may 
                  affect the functionality of our website.
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-primary-light to-secondary-light p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-primary mb-4">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> <a href="mailto:info@freshpluscleaning.com.au" className="text-primary hover:text-secondary">info@freshpluscleaning.com.au</a></p>
                  <p><strong>Phone:</strong> <a href="tel:132713" className="text-primary hover:text-secondary">13 27 13</a></p>
                  <p><strong>Address:</strong> Melbourne, Victoria, Australia</p>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  We will respond to your privacy inquiries within 30 days as required under Australian privacy law.
                </p>
              </div>

              {/* Policy Updates */}
              <div className="mt-10 p-4 bg-accent-light rounded-lg">
                <h3 className="text-lg font-semibold text-primary mb-2">Policy Updates</h3>
                <p className="text-sm text-gray-600">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or 
                  applicable laws. We will notify you of any material changes by posting the updated policy on our website.
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

export default PrivacyPolicy;
