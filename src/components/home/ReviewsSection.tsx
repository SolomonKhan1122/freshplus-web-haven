import { Star } from "lucide-react";

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Sarah Thompson",
      rating: 5,
      text: "Exceptional service! The team was professional, thorough, and left my home spotless.",
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Best commercial cleaning service in Melbourne. Highly recommended!",
    },
    {
      name: "Emma Wilson",
      rating: 5,
      text: "Reliable, efficient, and great attention to detail. Will use again!",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{review.text}</p>
              <p className="font-semibold text-primary">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;