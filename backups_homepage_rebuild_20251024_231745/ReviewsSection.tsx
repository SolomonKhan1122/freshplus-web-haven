import { Star, Quote } from "lucide-react";

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Sarah Thompson",
      location: "Toorak, VIC",
      rating: 5,
      text: "Exceptional service! The FreshPlus team was professional, thorough, and left my home absolutely spotless. I couldn't be happier with the results.",
      service: "Residential Cleaning",
    },
    {
      name: "Michael Chen",
      location: "Melbourne CBD",
      rating: 5,
      text: "Best commercial cleaning service in Melbourne. Their attention to detail and reliability is unmatched. Highly recommended for any business!",
      service: "Commercial Cleaning",
    },
    {
      name: "Emma Wilson",
      location: "Richmond, VIC",
      rating: 5,
      text: "Reliable, efficient, and great attention to detail. The deep cleaning service exceeded my expectations. Will definitely use FreshPlus again!",
      service: "Deep Cleaning",
    },
    {
      name: "David Kim",
      location: "South Yarra, VIC",
      rating: 5,
      text: "Outstanding end of lease cleaning! Got my full bond back thanks to FreshPlus. Professional team and incredible results.",
      service: "End of Lease Cleaning",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-primary-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-accent/10 px-6 py-2 rounded-full mb-4">
            <span className="text-accent font-bold text-lg">⭐ 4.9/5 Rating</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary/80 max-w-3xl mx-auto px-4">
            Don't just take our word for it. Here's what our satisfied customers 
            across Melbourne have to say about FreshPlus cleaning services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.name}
              className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-secondary relative"
            >
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-accent w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                <Quote className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              
              <div className="flex items-center mb-3 sm:mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 sm:h-5 sm:w-5 text-accent fill-current"
                  />
                ))}
              </div>
              
              <p className="text-sm sm:text-base text-primary/80 mb-4 sm:mb-6 leading-relaxed italic">"{review.text}"</p>
              
              <div className="border-t border-primary/10 pt-3 sm:pt-4">
                <p className="font-bold text-primary text-base sm:text-lg">{review.name}</p>
                <p className="text-secondary text-xs sm:text-sm font-medium">{review.location}</p>
                <p className="text-accent text-xs sm:text-sm mt-2 font-semibold">{review.service}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-secondary to-primary text-white px-6 sm:px-8 py-6 rounded-2xl shadow-xl inline-block max-w-md mx-auto">
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 sm:h-6 sm:w-6 text-accent fill-current" />
              ))}
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">4.9/5 Customer Satisfaction</h3>
            <p className="text-primary-light text-sm sm:text-base">Based on 500+ verified reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;