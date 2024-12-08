import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-primary mb-6">About FreshPlus</h1>
          
          <div className="space-y-6 text-gray-600">
            <p>
              FreshPlus is Melbourne's leading cleaning service provider, dedicated to delivering exceptional cleaning solutions for both residential and commercial clients. With years of experience in the industry, we have built a reputation for reliability, professionalism, and attention to detail.
            </p>
            
            <h2 className="text-2xl font-semibold text-primary mt-8">Our Mission</h2>
            <p>
              To provide outstanding cleaning services that exceed our clients' expectations while maintaining the highest standards of professionalism, reliability, and environmental responsibility.
            </p>
            
            <h2 className="text-2xl font-semibold text-primary mt-8">Why Choose Us</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Experienced and professional cleaning staff</li>
              <li>Comprehensive insurance coverage</li>
              <li>Eco-friendly cleaning products</li>
              <li>Flexible scheduling options</li>
              <li>Competitive pricing</li>
              <li>100% satisfaction guarantee</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-primary mt-8">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Quality: We maintain the highest standards in all our services</li>
              <li>Reliability: We are committed to being dependable and punctual</li>
              <li>Integrity: We operate with honesty and transparency</li>
              <li>Customer Focus: We prioritize our clients' needs and satisfaction</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;