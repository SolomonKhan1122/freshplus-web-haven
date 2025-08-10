import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { Phone, MessageSquare } from "lucide-react";

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
      ]
    },
    window: {
      title: "Professional Window Cleaning Melbourne | Let the Sunshine In",
      description: "When did you last notice how much brighter your space could be with crystal-clear windows? Clean windows don't just improve your view of Melbourne's beautiful skyline – they actually let in up to 30% more natural light, making your space feel larger, brighter, and more welcoming. Whether you're in a high-rise apartment in Southbank or a heritage home in Richmond, clean windows make a world of difference. Imagine waking up to unobstructed views of Melbourne's stunning cityscape or your garden, with windows so clear they're practically invisible.",
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
                  href="tel:1327113"
                  className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 text-sm sm:text-base"
                >
                  <Phone size={18} className="sm:w-5 sm:h-5" /> Call 13 27 13
                </a>
                <a
                  href={`sms:1327113?body=Hi, I'm interested in FreshPlus ${currentService.title.toLowerCase()} service.`}
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