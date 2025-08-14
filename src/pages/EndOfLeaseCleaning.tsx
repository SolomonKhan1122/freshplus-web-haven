import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Phone, MessageSquare, CheckCircle, Star, Clock, Shield, Award, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const EndOfLeaseCleaning = () => {
  const bondBackGuarantees = [
    "Complete kitchen deep clean including oven, stovetop, and exhaust fan",
    "Bathroom deep sanitization with mold and mildew removal",
    "Carpet steam cleaning with stain treatment and deodorizing",
    "Window cleaning inside and out including tracks and sills",
    "Wall washing and scuff mark removal throughout property",
    "Light fixture and ceiling fan cleaning",
    "Cabinet and drawer interior cleaning",
    "Balcony and outdoor area pressure washing",
    "Final inspection walkthrough with detailed checklist"
  ];

  const melbourneAreas = [
    "Melbourne CBD", "South Yarra", "St Kilda", "Richmond", "Fitzroy",
    "Carlton", "Prahran", "Toorak", "Brighton", "Caulfield", "Hawthorn",
    "Kew", "Camberwell", "Malvern", "Armadale", "Windsor", "Albert Park",
    "Port Melbourne", "Southbank", "Docklands", "Collingwood", "Abbotsford",
    "Brunswick", "Northcote", "Preston", "Coburg", "Essendon", "Moonee Ponds",
    "Footscray", "Yarraville", "Williamstown", "Altona", "Glen Waverley",
    "Clayton", "Monash", "Burwood", "Box Hill", "Ringwood", "Blackburn"
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      location: "South Yarra",
      text: "Got my full $2,800 bond back! The team was incredibly thorough and knew exactly what the property manager would check. Worth every penny.",
      rating: 5
    },
    {
      name: "James L.",
      location: "Richmond",
      text: "Best end of lease cleaning in Melbourne! They even cleaned areas I didn't know needed cleaning. Professional and reliable.",
      rating: 5
    },
    {
      name: "Emma K.",
      location: "St Kilda",
      text: "After a stressful move, FreshPlus made getting my bond back effortless. The property looked better than when I moved in!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white pt-24 pb-16">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              End of Lease Cleaning Melbourne
              <span className="block text-accent text-3xl md:text-4xl lg:text-5xl mt-2">
                Get Your Full Bond Back Guaranteed
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-light leading-relaxed">
              Melbourne's #1 rated end of lease cleaning service. 100% bond back guarantee or we'll return and re-clean for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link to="/quote">
                <Button className="bg-accent hover:bg-accent-dark text-black font-bold px-8 py-4 text-lg">
                  Get Free Quote Now
                </Button>
              </Link>
              <a href="tel:+61403971720">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call +61 403 971 720
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                <span>100% Bond Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <span>Same Day Service Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                <span>5-Star Rated Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose FreshPlus Section */}
      <section className="py-16 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Why Melbourne Tenants Choose FreshPlus
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Moving out is stressful enough. Let Melbourne's most trusted end of lease cleaning specialists 
                handle the cleaning while you focus on your new home.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-accent w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">100% Bond Back Guarantee</h3>
                <p className="text-gray-600">
                  We're so confident in our work that we guarantee you'll get your full bond back. 
                  If not, we'll return and re-clean for free.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-secondary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Melbourne Property Experts</h3>
                <p className="text-gray-600">
                  Our team knows exactly what Melbourne property managers and real estate agents 
                  look for during final inspections.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-accent w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Flexible Scheduling</h3>
                <p className="text-gray-600">
                  Same day and weekend services available. We work around your moving schedule, 
                  even during Melbourne's busy rental season.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">5-Star Rated Team</h3>
                <p className="text-gray-600">
                  Melbourne's highest-rated end of lease cleaning service with hundreds of 
                  verified reviews from satisfied tenants.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-secondary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Comprehensive Checklist</h3>
                <p className="text-gray-600">
                  We follow a detailed 50-point checklist that covers everything property managers 
                  inspect during Melbourne rental handovers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-accent w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Eco-Friendly Products</h3>
                <p className="text-gray-600">
                  Professional-grade, eco-friendly cleaning products that are safe for you, 
                  your family, and Melbourne's environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Cleaning Checklist */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Complete End of Lease Cleaning Checklist
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our comprehensive cleaning service covers every detail that Melbourne property managers check. 
                Nothing is left to chance when your bond money is on the line.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-primary-light to-white p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-primary mb-6">Kitchen Deep Clean</h3>
                <ul className="space-y-3">
                  {[
                    "Oven interior and exterior deep clean",
                    "Stovetop and range hood degreasing",
                    "Refrigerator interior and exterior",
                    "Dishwasher filter and interior clean",
                    "Cabinet doors and interior wiping",
                    "Benchtop and backsplash deep clean",
                    "Sink and tap descaling",
                    "Floor scrubbing and mopping"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-secondary-light to-white p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-primary mb-6">Bathroom Sanitization</h3>
                <ul className="space-y-3">
                  {[
                    "Shower and bathtub deep clean",
                    "Toilet interior and exterior sanitization",
                    "Tile and grout mold removal",
                    "Mirror and glass shower screen polishing",
                    "Exhaust fan cleaning and dusting",
                    "Cabinet and vanity cleaning",
                    "Tap and fixture descaling",
                    "Floor scrubbing and disinfection"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-accent-light to-white p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-primary mb-6">Living Areas & Bedrooms</h3>
                <ul className="space-y-3">
                  {[
                    "Carpet steam cleaning and stain removal",
                    "Window cleaning inside and out",
                    "Window track and sill cleaning",
                    "Wall washing and scuff mark removal",
                    "Light switch and power point cleaning",
                    "Ceiling fan and light fixture dusting",
                    "Wardrobe interior and shelving",
                    "Floor vacuuming and mopping"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-primary-light to-white p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-primary mb-6">Additional Services</h3>
                <ul className="space-y-3">
                  {[
                    "Balcony and outdoor area cleaning",
                    "Garage and storage area sweeping",
                    "Air conditioning vent cleaning",
                    "Light globe replacement if needed",
                    "Garden maintenance (basic)",
                    "Rubbish removal and bin cleaning",
                    "Final inspection walkthrough",
                    "Detailed photo documentation"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Melbourne Areas Served */}
      <section className="py-16 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              End of Lease Cleaning Across Melbourne
            </h2>
            <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
              We provide professional end of lease cleaning services throughout Melbourne and surrounding suburbs. 
              No matter where you're moving from, we've got you covered.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
              {melbourneAreas.map((area, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-gray-700 font-medium">{area}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-600 mt-8">
              Don't see your suburb? Call us at{" "}
              <a href="tel:+61403971720" className="text-primary font-semibold hover:text-secondary">
                +61 403 971 720
              </a>{" "}
              - we service all of Greater Melbourne!
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                What Melbourne Tenants Say About Us
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what real Melbourne tenants say about our 
                end of lease cleaning service.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-primary-light to-white p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="text-sm">
                    <span className="font-semibold text-primary">{testimonial.name}</span>
                    <span className="text-gray-600"> - {testimonial.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Your Full Bond Back?
            </h2>
            <p className="text-xl mb-8 text-primary-light">
              Don't risk losing your bond money. Book Melbourne's most trusted end of lease cleaning service today 
              and move out with complete peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link to="/quote">
                <Button className="bg-accent hover:bg-accent-dark text-black font-bold px-8 py-4 text-lg">
                  Get Free Quote in 60 Seconds
                </Button>
              </Link>
              <a href="tel:+61403971720">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +61 403 971 720
                </Button>
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>100% Bond Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Same Day Service Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Over 1,000 Happy Melbourne Tenants</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EndOfLeaseCleaning;
