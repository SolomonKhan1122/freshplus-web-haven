import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { Phone, MessageSquare, CheckCircle, Star, Clock, Shield, Award, Users } from "lucide-react";

const Services = () => {
  const { service } = useParams();

  const serviceInfo = {
    residential: {
      title: "Melbourne's Most Trusted Residential Cleaning Service",
      description: "Tired of spending your precious weekends scrubbing floors instead of exploring Melbourne's incredible laneways and cafés? We get it. Life in Melbourne is busy enough without worrying about keeping your home spotless. That's where FreshPlus comes in – we're not just another cleaning service, we're your home's best friend. Imagine walking into a home that's always guest-ready, where every surface sparkles and that fresh, clean scent welcomes you after a long day.",
      features: [
        "Weekly, fortnightly, or monthly regular cleaning schedules that fit your Melbourne lifestyle",
        "One-off deep cleans that make your home sparkle like new",
        "Kitchen deep cleaning including inside appliances and hard-to-reach areas",
        "Bathroom sanitization with hospital-grade, eco-friendly products",
        "Bedroom and living area dusting, vacuuming, and mopping",
        "Internal window cleaning for crystal-clear views of Melbourne",
        "Flexible scheduling around your busy work and social commitments",
        "Eco-friendly products safe for your family, pets, and the environment"
      ]
    },
    commercial: {
      title: "Professional Commercial Cleaning Melbourne | Your Business Image Starts Here",
      description: "First impressions matter. When clients walk into your Melbourne office or retail space, what do they see? A spotless workplace isn't just about aesthetics – it's about productivity, health, and professionalism. Studies show that employees are 12% more productive in clean environments, and customers are 76% more likely to return to businesses that maintain high cleanliness standards. In Melbourne's competitive business landscape, every advantage counts. Picture your team arriving each morning to a pristine office that smells fresh and feels professional.",
      features: [
        "Daily, weekly, or customized office cleaning schedules for Melbourne businesses",
        "Retail space maintenance during off-hours to never disrupt customers",
        "Industrial facility deep cleaning and maintenance programs",
        "Common area sanitization including lobbies, kitchens, and bathrooms",
        "Professional floor care including carpet cleaning and hard surface maintenance",
        "Window cleaning for street-facing Melbourne storefronts",
        "COVID-19 sanitization protocols and deep disinfection services",
        "Emergency cleaning services for unexpected situations",
        "Waste management and recycling services"
      ]
    },
    "deep-cleaning": {
      title: "Deep Cleaning Melbourne | When Regular Cleaning Just Isn't Enough",
      description: "Moving into a new place? Preparing for a special event? Or just feeling like your space needs a complete refresh? Sometimes regular cleaning doesn't reach those forgotten corners, built-up grime, or neglected areas that accumulate dust and dirt over Melbourne's changing seasons. Our deep cleaning service goes beyond surface-level tidying – we're talking about the kind of clean that makes your space feel brand new again. Experience the satisfaction of a home or office that's been cleaned to perfection, like getting a brand new space without the renovation costs.",
      image: "/Deep Cleaning.webp",
      features: [
        "Complete surface cleaning from ceiling to floor, no corner left untouched",
        "Behind furniture and appliance cleaning including hard-to-reach areas",
        "Cabinet and drawer interior cleaning and organization",
        "Baseboards, trim, and skirting board deep cleaning",
        "Air vent cleaning and dust removal for better air quality",
        "Light fixture and ceiling fan maintenance and cleaning",
        "Tile grout deep cleaning and restoration",
        "Carpet and upholstery deep clean and stain treatment",
        "Window track and sill deep cleaning",
        "Wall washing and mark removal"
      ],
      process: [
        {
          step: 1,
          title: "Detailed Assessment",
          description: "We conduct a thorough inspection to identify all areas requiring deep cleaning attention"
        },
        {
          step: 2,
          title: "Preparation & Protection",
          description: "We protect your belongings and prepare specialized equipment for comprehensive cleaning"
        },
        {
          step: 3,
          title: "Deep Cleaning Execution",
          description: "Systematic room-by-room deep cleaning using professional-grade products and techniques"
        },
        {
          step: 4,
          title: "Quality Assurance",
          description: "Final walkthrough and touch-ups to ensure every surface meets our high standards"
        }
      ],
      benefits: [
        {
          icon: "refresh",
          title: "Complete Reset",
          description: "Transform your space with a thorough clean that reaches every corner and surface"
        },
        {
          icon: "health",
          title: "Healthier Environment",
          description: "Remove hidden allergens, bacteria, and dust for improved indoor air quality"
        },
        {
          icon: "time",
          title: "Long-lasting Results",
          description: "Deep cleaning creates a foundation that makes regular maintenance easier"
        },
        {
          icon: "value",
          title: "Property Value",
          description: "Maintain and enhance your property's condition and market value"
        }
      ],
      testimonials: [
        {
          name: "Emma Thompson",
          location: "Toorak",
          rating: 5,
          comment: "Absolutely amazing deep clean! They cleaned places I didn't even know existed. My home feels brand new again."
        },
        {
          name: "Michael Zhang",
          location: "Carlton",
          rating: 5,
          comment: "Professional team that paid attention to every detail. Perfect for our end-of-lease clean - got our full bond back!"
        },
        {
          name: "Lisa Rodriguez",
          location: "St Kilda",
          rating: 5,
          comment: "Exceptional deep cleaning service. They removed years of built-up grime. Couldn't be happier with the results!"
        }
      ],
      pricing: {
        residential: [
          { type: "Small Home/Apartment (1-2 bedrooms)", price: "From $320", duration: "3-4 hours" },
          { type: "Medium Home (3-4 bedrooms)", price: "From $480", duration: "4-6 hours" },
          { type: "Large Home (5+ bedrooms)", price: "From $650", duration: "6-8 hours" }
        ],
        commercial: [
          { type: "Small Office Space", price: "From $4.50 per sqm", duration: "Varies" },
          { type: "Large Commercial Space", price: "Custom Quote", duration: "Varies" },
          { type: "Post-Construction Clean", price: "From $6.00 per sqm", duration: "Varies" }
        ]
      },
      faqs: [
        {
          question: "How is deep cleaning different from regular cleaning?",
          answer: "Deep cleaning goes beyond surface cleaning to tackle built-up grime, hidden dirt, and areas that regular cleaning doesn't reach. We clean inside appliances, behind furniture, detailed grout cleaning, and comprehensive sanitization."
        },
        {
          question: "How long does a deep clean take?",
          answer: "Deep cleaning typically takes 3-8 hours depending on the size and condition of your property. We provide time estimates during our initial assessment."
        },
        {
          question: "Do I need to be home during the deep clean?",
          answer: "You don't need to be present during the entire service, but we recommend being available at the start for a walkthrough and at the end for the final inspection."
        },
        {
          question: "What should I prepare before the deep clean?",
          answer: "We recommend removing personal items, valuables, and clearing access to areas that need cleaning. We can work around furniture, but moving smaller items helps us clean more thoroughly."
        },
        {
          question: "Is deep cleaning suitable for rental properties?",
          answer: "Absolutely! Deep cleaning is perfect for end-of-lease requirements, move-in preparation, or maintaining rental properties to professional standards."
        },
        {
          question: "What cleaning products do you use?",
          answer: "We use professional-grade, eco-friendly products that are safe for your family and pets while being tough on dirt and grime. We can accommodate specific product preferences if needed."
        }
      ]
    },
    window: {
      title: "Professional Window Cleaning Melbourne | Let the Sunshine In",
      description: "When did you last notice how much brighter your space could be with crystal-clear windows? Clean windows don't just improve your view of Melbourne's beautiful skyline – they actually let in up to 30% more natural light, making your space feel larger, brighter, and more welcoming. Whether you're in a high-rise apartment in Southbank or a heritage home in Richmond, clean windows make a world of difference. Imagine waking up to unobstructed views of Melbourne's stunning cityscape or your garden, with windows so clear they're practically invisible.",
      image: "/window cleaning.webp",
      features: [
        "Interior and exterior window cleaning with streak-free guarantee",
        "Screen cleaning and maintenance for better airflow",
        "Window track and sill deep cleaning and debris removal",
        "Hard water stain and mineral deposit removal",
        "High-rise and difficult-access window cleaning with safety equipment",
        "Solar panel cleaning for maximum energy efficiency",
        "Post-construction window cleanup and restoration",
        "Regular maintenance programs available for ongoing sparkle",
        "Emergency window cleaning for special events"
      ],
      process: [
        {
          step: 1,
          title: "Initial Assessment",
          description: "We inspect your windows to identify specific cleaning needs, stains, and access requirements"
        },
        {
          step: 2,
          title: "Preparation",
          description: "We protect surrounding areas and set up professional equipment for safe, efficient cleaning"
        },
        {
          step: 3,
          title: "Deep Cleaning",
          description: "Using professional-grade tools and eco-friendly solutions, we clean both sides thoroughly"
        },
        {
          step: 4,
          title: "Final Inspection",
          description: "We conduct a quality check to ensure streak-free, crystal-clear results before we leave"
        }
      ],
      benefits: [
        {
          icon: "brightness",
          title: "30% More Natural Light",
          description: "Clean windows dramatically increase the amount of natural light entering your space"
        },
        {
          icon: "eye",
          title: "Enhanced Views",
          description: "Enjoy unobstructed views of Melbourne's beautiful skyline and surroundings"
        },
        {
          icon: "home",
          title: "Increased Property Value",
          description: "Well-maintained windows significantly boost your property's curb appeal and value"
        },
        {
          icon: "health",
          title: "Better Indoor Air Quality",
          description: "Clean windows and screens improve ventilation and air circulation"
        }
      ],
      testimonials: [
        {
          name: "Sarah Mitchell",
          location: "South Yarra",
          rating: 5,
          comment: "FreshPlus transformed our apartment windows! The difference in natural light is incredible. Professional service from start to finish."
        },
        {
          name: "David Chen",
          location: "Richmond",
          rating: 5,
          comment: "They cleaned our heritage home's windows perfectly. Very careful with the old frames and delivered amazing results. Highly recommended!"
        },
        {
          name: "Melbourne Office Tower",
          location: "CBD",
          rating: 5,
          comment: "Professional commercial window cleaning service. They handle our 20-story building efficiently and safely. Excellent work!"
        }
      ],
      pricing: {
        residential: [
          { type: "Standard Home (up to 15 windows)", price: "From $180", duration: "1-2 hours" },
          { type: "Large Home (16-25 windows)", price: "From $280", duration: "2-3 hours" },
          { type: "Mansion/Luxury Home (25+ windows)", price: "From $380", duration: "3-4 hours" }
        ],
        commercial: [
          { type: "Small Office/Retail", price: "From $2.50 per window", duration: "Varies" },
          { type: "Multi-story Building", price: "Custom Quote", duration: "Varies" },
          { type: "Post-Construction Cleanup", price: "From $4.00 per window", duration: "Varies" }
        ]
      },
      faqs: [
        {
          question: "How often should I have my windows professionally cleaned?",
          answer: "For residential properties, we recommend professional window cleaning every 3-6 months. Commercial buildings typically benefit from monthly or quarterly cleaning, depending on location and environmental factors."
        },
        {
          question: "Do you clean windows in all weather conditions?",
          answer: "We clean windows in most weather conditions, but avoid cleaning during heavy rain or extreme winds for safety and quality reasons. Light rain actually helps with the cleaning process!"
        },
        {
          question: "What's included in your window cleaning service?",
          answer: "Our standard service includes interior and exterior window cleaning, screen cleaning, window sill and track cleaning, and frame wiping. We also remove cobwebs and debris around window areas."
        },
        {
          question: "Are your cleaning products safe for my family and pets?",
          answer: "Absolutely! We use eco-friendly, biodegradable cleaning solutions that are safe for children, pets, and the environment while still delivering professional results."
        },
        {
          question: "Can you clean high-rise or hard-to-reach windows?",
          answer: "Yes! We have specialized equipment and trained professionals for high-rise and difficult-access window cleaning. All our technicians are fully insured and follow strict safety protocols."
        },
        {
          question: "Do you offer window cleaning for commercial buildings?",
          answer: "Yes, we provide comprehensive commercial window cleaning services for offices, retail stores, restaurants, and multi-story buildings throughout Melbourne."
        }
      ]
    },
    carpet: {
      title: "Expert Carpet Cleaning Melbourne | Breathe New Life into Your Carpets",
      description: "Is your carpet looking tired, feeling rough, or harboring odors that just won't go away? Your carpets work hard, especially in Melbourne's variable weather conditions. They trap dust, allergens, pet dander, and everyday spills that regular vacuuming simply can't reach. Over time, this buildup not only makes your carpets look dull but can also affect your indoor air quality and your family's health. Rediscover the true color and softness of your carpets with our professional steam cleaning service. Your carpets will look, feel, and smell like new – extending their life and improving your home's overall comfort.",
      features: [
        "Deep steam cleaning with truck-mounted equipment for maximum extraction",
        "Stubborn stain removal including wine, coffee, and food spills",
        "Odor elimination and deodorizing treatment for fresh-smelling carpets",
        "Pet stain and odor specialist treatments that actually work",
        "Allergen and dust mite removal for healthier indoor air",
        "Carpet protection application to prevent future staining",
        "Quick-dry technology for faster return to normal use",
        "Eco-friendly, child and pet-safe cleaning products",
        "Upholstery cleaning for sofas, chairs, and mattresses"
      ]
    },
    "end-of-lease": {
      title: "End of Lease Cleaning Melbourne | Get Your Full Bond Back, Guaranteed",
      description: "Moving out and worried about getting your full bond back? Melbourne's rental market is competitive enough without losing money on cleaning. Property managers and real estate agents in Melbourne have specific standards when it comes to end-of-lease inspections. One overlooked detail – a dirty oven, stained carpet, or grimy bathroom tiles – can cost you hundreds of dollars from your bond. Our end-of-lease cleaning team knows exactly what Melbourne property managers look for during final inspections. Walk away from your rental property with complete confidence, knowing every surface has been cleaned to professional standards.",
      features: [
        "Complete property deep clean to real estate inspection standards",
        "Kitchen appliance deep cleaning including oven, stovetop, and range hood",
        "Bathroom deep clean and sanitization including tiles and grout",
        "Carpet steam cleaning with stain treatment and deodorizing",
        "Internal window and track cleaning for sparkling results",
        "Cabinet and drawer interior cleaning and wiping",
        "Wall washing and scuff mark removal",
        "Light fixture and ceiling fan cleaning",
        "Balcony or outdoor area cleaning and sweeping",
        "100% bond back guarantee on our cleaning work"
      ]
    },
  };

  const currentService = service ? serviceInfo[service as keyof typeof serviceInfo] : null;

  if (!currentService) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-24 px-4">
          <h1 className="text-3xl font-bold text-primary text-center">Service not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  // Enhanced rendering for deep cleaning service
  if (service === 'deep-cleaning') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
        <Navigation />
        <div className="pt-16 sm:pt-20 md:pt-24 px-4 max-w-7xl mx-auto pb-8">
          {/* Hero Section with Image */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-accent mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-6 sm:p-8 md:p-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6">
                  {currentService.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-primary/80 mb-6 sm:mb-8 leading-relaxed">
                  {currentService.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/quote"
                    className="bg-accent hover:bg-accent-dark text-black font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Get Free Quote
                  </Link>
                  <a
                    href="tel:+61403971720"
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300"
                  >
                    <Phone size={18} /> Call Now
                  </a>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={(currentService as any).image} 
                  alt="Professional Deep Cleaning Melbourne"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8">Why Choose Professional Deep Cleaning?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(currentService as any).benefits?.map((benefit: any, index: number) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-secondary-light to-primary-light rounded-xl border-2 border-transparent hover:border-secondary transition-all duration-300">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    {benefit.icon === 'refresh' && <span className="text-2xl">🔄</span>}
                    {benefit.icon === 'health' && <span className="text-2xl">🌿</span>}
                    {benefit.icon === 'time' && <span className="text-2xl">⏰</span>}
                    {benefit.icon === 'value' && <span className="text-2xl">💎</span>}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-primary/70 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What's Included Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-6 sm:mb-8">What's Included</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {currentService.features.map((feature, index) => (
                <div key={index} className="flex items-start bg-gradient-to-r from-secondary-light to-primary-light p-4 rounded-xl border-2 border-transparent hover:border-secondary transition-all duration-300">
                  <div className="bg-secondary w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-primary font-medium sm:font-semibold text-sm sm:text-base leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8">Our Deep Cleaning Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(currentService as any).process?.map((step: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-primary/70 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8">Transparent Pricing</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-primary mb-4 text-center">Residential</h3>
                <div className="space-y-4">
                  {(currentService as any).pricing?.residential?.map((item: any, index: number) => (
                    <div key={index} className="bg-gradient-to-r from-primary-light to-secondary-light p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-primary">{item.type}</span>
                        <span className="font-bold text-secondary text-lg">{item.price}</span>
                      </div>
                      <div className="flex items-center text-primary/70 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-4 text-center">Commercial</h3>
                <div className="space-y-4">
                  {(currentService as any).pricing?.commercial?.map((item: any, index: number) => (
                    <div key={index} className="bg-gradient-to-r from-primary-light to-secondary-light p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-primary">{item.type}</span>
                        <span className="font-bold text-secondary text-lg">{item.price}</span>
                      </div>
                      <div className="flex items-center text-primary/70 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(currentService as any).testimonials?.map((testimonial: any, index: number) => (
                <div key={index} className="bg-gradient-to-br from-secondary-light to-primary-light p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-primary/80 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-primary/60 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {(currentService as any).faqs?.map((faq: any, index: number) => (
                <div key={index} className="border-b border-primary/20 pb-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">{faq.question}</h3>
                  <p className="text-primary/70 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 sm:p-8 rounded-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready for a Complete Deep Clean?</h2>
            <p className="text-primary-light mb-6 sm:mb-8 text-base sm:text-lg">Contact us today for a free quote and give your space the reset it deserves!</p>
            
            <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
              <Link
                to="/quote"
                className="bg-accent hover:bg-accent-dark text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 text-center transform hover:scale-105 shadow-lg"
              >
                Get Free Quote
              </Link>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="tel:+61403971720"
                  className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 text-sm sm:text-base"
                >
                  <Phone size={18} className="sm:w-5 sm:h-5" /> Call +61 403 971 720
                </a>
                <a
                  href={`sms:+61403971720?body=Hi, I'm interested in FreshPlus deep cleaning service.`}
                  className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 text-sm sm:text-base"
                >
                  <MessageSquare size={18} className="sm:w-5 sm:h-5" /> Text Us
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Enhanced rendering for window cleaning service
  if (service === 'window') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
        <Navigation />
        <div className="pt-16 sm:pt-20 md:pt-24 px-4 max-w-7xl mx-auto pb-8">
          {/* Hero Section with Image */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-accent mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-6 sm:p-8 md:p-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6">
                  {currentService.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-primary/80 mb-6 sm:mb-8 leading-relaxed">
                  {currentService.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/quote"
                    className="bg-accent hover:bg-accent-dark text-black font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Get Free Quote
                  </Link>
                  <a
                    href="tel:+61403971720"
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300"
                  >
                    <Phone size={18} /> Call Now
                  </a>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={(currentService as any).image} 
                  alt="Professional Window Cleaning Melbourne"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8">Why Choose Professional Window Cleaning?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(currentService as any).benefits?.map((benefit: any, index: number) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-secondary-light to-primary-light rounded-xl border-2 border-transparent hover:border-secondary transition-all duration-300">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    {benefit.icon === 'brightness' && <span className="text-2xl">☀️</span>}
                    {benefit.icon === 'eye' && <span className="text-2xl">👁️</span>}
                    {benefit.icon === 'home' && <span className="text-2xl">🏠</span>}
                    {benefit.icon === 'health' && <span className="text-2xl">💨</span>}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-primary/70 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What's Included Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-6 sm:mb-8">What's Included</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {currentService.features.map((feature, index) => (
                <div key={index} className="flex items-start bg-gradient-to-r from-secondary-light to-primary-light p-4 rounded-xl border-2 border-transparent hover:border-secondary transition-all duration-300">
                  <div className="bg-secondary w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-primary font-medium sm:font-semibold text-sm sm:text-base leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(currentService as any).process?.map((step: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-primary/70 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8">Transparent Pricing</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-primary mb-4 text-center">Residential</h3>
                <div className="space-y-4">
                  {(currentService as any).pricing?.residential?.map((item: any, index: number) => (
                    <div key={index} className="bg-gradient-to-r from-primary-light to-secondary-light p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-primary">{item.type}</span>
                        <span className="font-bold text-secondary text-lg">{item.price}</span>
                      </div>
                      <div className="flex items-center text-primary/70 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-4 text-center">Commercial</h3>
                <div className="space-y-4">
                  {(currentService as any).pricing?.commercial?.map((item: any, index: number) => (
                    <div key={index} className="bg-gradient-to-r from-primary-light to-secondary-light p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-primary">{item.type}</span>
                        <span className="font-bold text-secondary text-lg">{item.price}</span>
                      </div>
                      <div className="flex items-center text-primary/70 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(currentService as any).testimonials?.map((testimonial: any, index: number) => (
                <div key={index} className="bg-gradient-to-br from-secondary-light to-primary-light p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-primary/80 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-primary/60 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {(currentService as any).faqs?.map((faq: any, index: number) => (
                <div key={index} className="border-b border-primary/20 pb-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">{faq.question}</h3>
                  <p className="text-primary/70 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 sm:p-8 rounded-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready for Crystal Clear Windows?</h2>
            <p className="text-primary-light mb-6 sm:mb-8 text-base sm:text-lg">Contact us today for a free quote and let the sunshine in!</p>
            
            <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
              <Link
                to="/quote"
                className="bg-accent hover:bg-accent-dark text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 text-center transform hover:scale-105 shadow-lg"
              >
                Get Free Quote
              </Link>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="tel:+61403971720"
                  className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 text-sm sm:text-base"
                >
                  <Phone size={18} className="sm:w-5 sm:h-5" /> Call +61 403 971 720
                </a>
                <a
                  href={`sms:+61403971720?body=Hi, I'm interested in FreshPlus window cleaning service.`}
                  className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 text-sm sm:text-base"
                >
                  <MessageSquare size={18} className="sm:w-5 sm:h-5" /> Text Us
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Standard rendering for other services
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <Navigation />
      <div className="pt-16 sm:pt-20 md:pt-24 px-4 max-w-7xl mx-auto pb-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 border-t-4 border-accent">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6">{currentService.title}</h1>
            <p className="text-base sm:text-lg md:text-xl text-primary/80 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">{currentService.description}</p>
          </div>
          
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-6 sm:mb-8">What's Included</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {currentService.features.map((feature, index) => (
                <div key={index} className="flex items-start bg-gradient-to-r from-secondary-light to-primary-light p-4 rounded-xl border-2 border-transparent hover:border-secondary transition-all duration-300">
                  <div className="bg-secondary w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-xs sm:text-sm">✓</span>
                  </div>
                  <span className="text-primary font-medium sm:font-semibold text-sm sm:text-base leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 sm:p-8 rounded-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Book This Service?</h2>
            <p className="text-primary-light mb-6 sm:mb-8 text-base sm:text-lg">Contact us today for a free quote and professional service!</p>
            
            <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
              <Link
                to="/quote"
                className="bg-accent hover:bg-accent-dark text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 text-center transform hover:scale-105 shadow-lg"
              >
                Get Free Quote
              </Link>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="tel:+61403971720"
                  className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 text-sm sm:text-base"
                >
                  <Phone size={18} className="sm:w-5 sm:h-5" /> Call +61 403 971 720
                </a>
                <a
                  href={`sms:+61403971720?body=Hi, I'm interested in FreshPlus ${currentService.title.toLowerCase()} service.`}
                  className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 text-sm sm:text-base"
                >
                  <MessageSquare size={18} className="sm:w-5 sm:h-5" /> Text Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;