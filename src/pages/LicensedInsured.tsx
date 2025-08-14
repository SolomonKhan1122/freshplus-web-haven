import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Award, FileCheck, Users, Phone, Mail } from "lucide-react";

const LicensedInsured = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-accent-dark text-black py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-full shadow-lg">
                <Shield className="h-16 w-16 text-accent" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Licensed & Insured</h1>
            <p className="text-xl opacity-90">
              Your peace of mind is our priority. We're fully licensed and comprehensively insured for your protection.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center bg-gradient-to-br from-primary-light to-white p-8 rounded-2xl shadow-lg">
                <div className="bg-primary p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Fully Insured</h3>
                <p className="text-gray-700 leading-relaxed">
                  Comprehensive public liability insurance protecting you, your property, and our team.
                </p>
              </div>
              
              <div className="text-center bg-gradient-to-br from-secondary-light to-white p-8 rounded-2xl shadow-lg">
                <div className="bg-secondary p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">Licensed Business</h3>
                <p className="text-gray-700 leading-relaxed">
                  Properly licensed and registered business operating legally in Victoria, Australia.
                </p>
              </div>
              
              <div className="text-center bg-gradient-to-br from-accent-light to-white p-8 rounded-2xl shadow-lg">
                <div className="bg-accent p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-accent-dark mb-4">Trained Staff</h3>
                <p className="text-gray-700 leading-relaxed">
                  All cleaning professionals are background-checked, trained, and certified.
                </p>
              </div>
            </div>

            {/* Insurance Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
              <div className="flex items-center mb-8">
                <Shield className="h-8 w-8 text-primary mr-4" />
                <h2 className="text-3xl font-bold text-primary">Insurance Coverage</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-secondary mb-4">Public Liability Insurance</h3>
                  <div className="space-y-4">
                    <div className="bg-primary-light p-4 rounded-lg">
                      <p className="font-semibold text-primary mb-2">Coverage Amount:</p>
                      <p className="text-2xl font-bold text-primary">$20,000,000</p>
                      <p className="text-sm text-gray-600 mt-1">Twenty Million Dollars</p>
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Property damage protection</li>
                      <li>Third-party injury coverage</li>
                      <li>Professional indemnity included</li>
                      <li>Equipment and tool coverage</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-secondary mb-4">What's Protected</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-secondary p-1 rounded-full mt-1">
                        <FileCheck className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Your Property</p>
                        <p className="text-gray-600 text-sm">Furniture, fixtures, and belongings</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-secondary p-1 rounded-full mt-1">
                        <FileCheck className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Personal Safety</p>
                        <p className="text-gray-600 text-sm">You and your family members</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-secondary p-1 rounded-full mt-1">
                        <FileCheck className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Business Assets</p>
                        <p className="text-gray-600 text-sm">Commercial property and equipment</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-secondary p-1 rounded-full mt-1">
                        <FileCheck className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Accidental Damage</p>
                        <p className="text-gray-600 text-sm">Unexpected incidents during cleaning</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Licensing Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
              <div className="flex items-center mb-8">
                <Award className="h-8 w-8 text-secondary mr-4" />
                <h2 className="text-3xl font-bold text-primary">Business Licensing</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-secondary mb-4">Australian Business Registration</h3>
                  <div className="space-y-4">
                    <div className="bg-secondary-light p-4 rounded-lg">
                      <p className="font-semibold text-secondary mb-2">Business Structure:</p>
                      <p className="text-lg font-medium">Registered Australian Business</p>
                      <p className="text-sm text-gray-600 mt-1">Compliant with all Victorian regulations</p>
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Australian Business Number (ABN)</li>
                      <li>GST registered business</li>
                      <li>Victorian business registration</li>
                      <li>Workers' compensation insurance</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-secondary mb-4">Certifications & Standards</h3>
                  <div className="space-y-3">
                    <div className="bg-accent-light p-4 rounded-lg">
                      <p className="font-semibold text-accent-dark mb-2">Professional Standards</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>✓ Industry-certified cleaning methods</li>
                        <li>✓ Eco-friendly product certification</li>
                        <li>✓ Safety training compliance</li>
                        <li>✓ Quality assurance protocols</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why It Matters */}
            <div className="bg-gradient-to-r from-primary-light to-secondary-light p-8 md:p-12 rounded-2xl">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Why Licensed & Insured Matters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-4">For Your Protection</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Financial protection against accidents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Legal compliance and peace of mind</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Professional accountability standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Quick resolution of any issues</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-4">Our Commitment</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Transparent business practices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Continuous insurance coverage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Regular license renewals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Professional service delivery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mt-12">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Need Insurance Documentation?</h2>
              <p className="text-gray-700 text-center mb-8 leading-relaxed">
                We're happy to provide copies of our insurance certificates and licensing documentation 
                for your records or building management requirements.
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <a 
                  href="tel:+61403971720" 
                  className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span className="font-semibold">Call +61 403 971 720</span>
                </a>
                <a 
                  href="mailto:infofreshplusclean@gmail.com" 
                  className="flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-lg hover:bg-secondary-dark transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span className="font-semibold">Email Us</span>
                </a>
              </div>
              
              <p className="text-center text-sm text-gray-600 mt-6">
                Insurance certificates available within 24 hours upon request
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LicensedInsured;
