import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <Navigation />
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-12 border-t-4 border-accent">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-primary mb-6">About FreshPlus</h1>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Melbourne's most trusted cleaning service provider since 2015
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="bg-gradient-to-br from-primary-light to-secondary-light p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
              <p className="text-primary/80 leading-relaxed mb-6">
                FreshPlus is Melbourne's leading cleaning service provider, dedicated to delivering exceptional cleaning solutions for both residential and commercial clients. With years of experience in the industry, we have built a reputation for reliability, professionalism, and attention to detail.
              </p>
              <p className="text-primary/80 leading-relaxed">
                Founded with a mission to transform how people experience cleaning services, we've grown to become the most trusted name in Melbourne's cleaning industry.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-secondary-light to-accent-light p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
              <p className="text-primary/80 leading-relaxed mb-6">
                To provide outstanding cleaning services that exceed our clients' expectations while maintaining the highest standards of professionalism, reliability, and environmental responsibility.
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <span className="text-primary font-semibold">Committed to Excellence</span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8">Why Choose FreshPlus?</h2>
              <div className="space-y-4">
                {[
                  "Experienced and professional cleaning staff",
                  "Comprehensive insurance coverage",
                  "Eco-friendly cleaning products",
                  "Flexible scheduling options",
                  "Competitive pricing",
                  "100% satisfaction guarantee"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-secondary w-6 h-6 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <span className="text-primary/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8">Our Values</h2>
              <div className="space-y-6">
                {[
                  { title: "Quality", desc: "We maintain the highest standards in all our services" },
                  { title: "Reliability", desc: "We are committed to being dependable and punctual" },
                  { title: "Integrity", desc: "We operate with honesty and transparency" },
                  { title: "Customer Focus", desc: "We prioritize our clients' needs and satisfaction" }
                ].map((value, index) => (
                  <div key={index} className="border-l-4 border-accent pl-6">
                    <h3 className="text-xl font-bold text-primary mb-2">{value.title}</h3>
                    <p className="text-primary/80">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;