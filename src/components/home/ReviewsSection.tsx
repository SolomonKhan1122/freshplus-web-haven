import { Star } from "lucide-react";

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Sarah Thompson",
      location: "Toorak",
      rating: 5,
      text: "Exceptional service! Left my home absolutely spotless.",
    },
    {
      name: "Michael Chen",
      location: "Melbourne CBD",
      rating: 5,
      text: "Best commercial cleaning in Melbourne. Highly recommended!",
    },
    {
      name: "Emma Wilson",
      location: "Richmond",
      rating: 5,
      text: "Reliable, efficient, and great attention to detail.",
    },
    {
      name: "David Kim",
      location: "South Yarra",
      rating: 5,
      text: "Got my full bond back thanks to Fresh Plus!",
    },
  ];

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-primary-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          {/* 4.9 Star Rating Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-3 rounded-full mb-4 border-2 border-accent/20">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-accent fill-current" />
              ))}
            </div>
            <span className="text-accent font-bold text-xl">4.9/5</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg md:text-xl text-primary/80 max-w-3xl mx-auto">
            Trusted by homeowners and businesses across Melbourne, Toorak, Richmond, South Yarra, and Hawthorn.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-accent"
            >
              <div className="flex items-center mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-accent fill-current"
                  />
                ))}
              </div>
              
              <p className="text-base text-primary/80 mb-4 leading-relaxed italic">"{review.text}"</p>
              
              <div className="border-t border-primary/10 pt-4">
                <p className="font-bold text-primary text-lg">{review.name}</p>
                <p className="text-secondary text-sm font-medium">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-primary/70 text-lg">
            <span className="font-bold text-primary">500+ verified reviews</span> from satisfied customers
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
