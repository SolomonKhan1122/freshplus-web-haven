import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Star, Users, Shield, Clock, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block bg-accent/10 text-accent font-semibold px-4 py-2 rounded-full text-sm uppercase tracking-wide mb-4">
              12 Years of Excellence
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              About <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">FreshPlus</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary/80 max-w-4xl mx-auto leading-relaxed">
              Melbourne's most trusted cleaning service provider since 2012, delivering excellence one home at a time
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            {[
              { number: "12+", label: "Years Experience", icon: Clock },
              { number: "5000+", label: "Happy Clients", icon: Users },
              { number: "50,000+", label: "Homes Cleaned", icon: Star },
              { number: "100%", label: "Satisfaction Rate", icon: Award }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-accent/10 mb-4">
                  <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-primary/70 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-accent/10">
            
            {/* Our Journey Section */}
            <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-12 md:p-16">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Our Journey of Excellence</h2>
                <p className="text-xl leading-relaxed mb-8 text-white/90">
                  What started as a small family business in 2012 has grown into Melbourne's most reliable cleaning service. 
                  Our story began with a simple belief: every home deserves to be a sanctuary of cleanliness and comfort.
                </p>
                <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                  <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                  <p className="text-lg italic">
                    "We don't just clean homes, we create spaces where families can thrive and memories can be made."
                  </p>
                  <p className="text-accent font-semibold mt-3">- The FreshPlus Family</p>
                </div>
              </div>
            </div>

            {/* Story Timeline */}
            <div className="p-12 md:p-16">
              <h2 className="text-4xl font-bold text-primary text-center mb-12">Our Story</h2>
              <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                  {[
                    {
                      year: "2012",
                      title: "The Beginning",
                      description: "Started with a vision to revolutionize home cleaning in Melbourne. Armed with passion, dedication, and a commitment to excellence, we began serving our first residential clients."
                    },
                    {
                      year: "2015",
                      title: "Growing Trust",
                      description: "Expanded our services and team. Word-of-mouth referrals became our strongest marketing tool as satisfied customers recommended us to friends and family."
                    },
                    {
                      year: "2018",
                      title: "Commercial Excellence",
                      description: "Launched commercial cleaning services, bringing the same attention to detail and reliability that made us Melbourne's favorite residential cleaning service."
                    },
                    {
                      year: "2021",
                      title: "Digital Innovation",
                      description: "Embraced technology to make booking easier, communication clearer, and service delivery more efficient while maintaining our personal touch."
                    },
                    {
                      year: "2024",
                      title: "Leading the Industry",
                      description: "Today, we're proud to be Melbourne's most trusted cleaning service, with over 5,000 satisfied clients and a team that feels like family."
                    }
                  ].map((milestone, index) => (
                    <div key={index} className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="bg-gradient-to-r from-accent to-secondary text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm">
                          {milestone.year}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold text-primary mb-3">{milestone.title}</h3>
                        <p className="text-primary/80 leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mission & Values */}
            <div className="bg-gradient-to-br from-primary-light/30 to-secondary-light/30 p-12 md:p-16">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                  
                  {/* Mission */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-accent/10">
                    <div className="text-center mb-6">
                      <div className="bg-gradient-to-r from-accent to-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-primary">Our Mission</h3>
                    </div>
                    <p className="text-primary/80 leading-relaxed text-center">
                      To transform every space we touch into a sanctuary of cleanliness and comfort, 
                      while building lasting relationships with our clients based on trust, reliability, 
                      and exceptional service that exceeds expectations every single time.
                    </p>
                  </div>

                  {/* Values */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-accent/10">
                    <h3 className="text-3xl font-bold text-primary text-center mb-8">Our Core Values</h3>
                    <div className="space-y-4">
                      {[
                        { title: "Excellence", desc: "We strive for perfection in every detail" },
                        { title: "Integrity", desc: "Honest, transparent, and ethical in all we do" },
                        { title: "Reliability", desc: "Dependable service you can count on" },
                        { title: "Respect", desc: "Treating every home and client with care" }
                      ].map((value, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-accent w-3 h-3 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-bold text-primary mb-1">{value.title}</h4>
                            <p className="text-primary/70 text-sm">{value.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="p-12 md:p-16">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-primary text-center mb-12">
                  Why Melbourne Families Choose FreshPlus
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Users,
                      title: "Experienced Professionals",
                      description: "Our team brings 12 years of expertise and passion to every cleaning job, ensuring exceptional results every time."
                    },
                    {
                      icon: Shield,
                      title: "Fully Licensed & Insured",
                      description: "Complete peace of mind with comprehensive insurance coverage and all necessary licenses for your protection."
                    },
                    {
                      icon: Heart,
                      title: "Eco-Friendly Approach",
                      description: "Safe, non-toxic cleaning products that protect your family's health and our beautiful Melbourne environment."
                    },
                    {
                      icon: Clock,
                      title: "Flexible Scheduling",
                      description: "We work around your busy lifestyle with convenient booking options and reliable, punctual service."
                    },
                    {
                      icon: Star,
                      title: "Satisfaction Guaranteed",
                      description: "100% satisfaction guarantee because your happiness is our success. We're not satisfied until you are."
                    },
                    {
                      icon: Award,
                      title: "Competitive Pricing",
                      description: "Premium cleaning services at fair, transparent prices with no hidden fees or surprise charges."
                    }
                  ].map((feature, index) => (
                    <div key={index} className="text-center group">
                      <div className="bg-gradient-to-br from-primary-light to-secondary-light rounded-2xl p-8 h-full border border-accent/10 group-hover:shadow-lg transition-shadow">
                        <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                          <feature.icon className="w-8 h-8 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                        <p className="text-primary/80 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-12 md:p-16 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">Ready to Experience the FreshPlus Difference?</h2>
                <p className="text-xl mb-8 text-white/90">
                  Join thousands of satisfied Melbourne families who trust FreshPlus for their cleaning needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/quote" className="bg-accent hover:bg-accent/90 text-black font-bold py-4 px-8 rounded-xl transition-colors text-lg">
                    Get Your Free Quote
                  </a>
                  <a href="tel:+61403971720" className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-4 px-8 rounded-xl transition-colors text-lg">
                    Call +61 403 971 720
                  </a>
                </div>
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