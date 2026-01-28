import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Phone } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: "ultimate-guide-end-of-lease-cleaning",
      title: "Ultimate Guide to End of Lease Cleaning: Get Your Bond Back",
      excerpt: "Moving out? Ensure you get your full bond back with our comprehensive end of lease cleaning checklist. Learn what property managers really look for.",
      category: "End of Lease",
      readTime: "8 min read",
      date: "December 15, 2024",
      image: "/Deep Cleaning.webp",
      featured: true
    },
    {
      id: "carpet-cleaning-guide-melbourne",
      title: "Professional Carpet Cleaning vs DIY: What You Need to Know",
      excerpt: "Discover why professional carpet cleaning is worth the investment. Compare costs, results, and health benefits.",
      category: "Carpet Cleaning",
      readTime: "6 min read",
      date: "December 12, 2024",
      image: "/Carpet steam clean.webp"
    },
    {
      id: "solar-panel-cleaning-efficiency",
      title: "Solar Panel Cleaning: Boost Your Energy Efficiency by 25%",
      excerpt: "Learn how dirty solar panels can reduce your energy output and cost you hundreds annually in Melbourne.",
      category: "Solar Panel",
      readTime: "5 min read",
      date: "December 10, 2024",
      image: "/solar panel cleaning.webp"
    },
    {
      id: "deep-cleaning-checklist-spring",
      title: "Spring Deep Cleaning Checklist: Room by Room Guide",
      excerpt: "Transform your home this spring with our comprehensive deep cleaning checklist for Melbourne homes.",
      category: "Deep Cleaning",
      readTime: "10 min read",
      date: "December 8, 2024",
      image: "/House Cleaning.webp"
    },
    {
      id: "commercial-cleaning-productivity",
      title: "How Clean Offices Boost Employee Productivity by 12%",
      excerpt: "Research shows clean workspaces significantly impact employee performance and workplace satisfaction.",
      category: "Commercial",
      readTime: "7 min read",
      date: "December 5, 2024",
      image: "/Commercial cleaning.webp"
    },
    {
      id: "tile-grout-restoration-guide",
      title: "Tile and Grout Restoration: From Dingy to Sparkling",
      excerpt: "Restore your tiles to their original beauty with professional cleaning techniques and maintenance tips.",
      category: "Tile & Grout",
      readTime: "6 min read",
      date: "December 3, 2024",
      image: "/Tile&grout.webp"
    }
  ];

  const categories = ["All", "End of Lease", "Carpet Cleaning", "Solar Panel", "Deep Cleaning", "Commercial", "Tile & Grout"];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Cleaning Tips & Guides Blog | Fresh Plus Cleaning Melbourne"
        description="Expert cleaning advice, industry insights, and professional tips from Melbourne's trusted cleaning specialists. Learn from 12+ years of experience."
        canonical="https://www.freshpluscleaning.com.au/blog"
        type="website"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Expert Cleaning Tips & Guides
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            Fresh Plus Cleaning Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Professional cleaning advice, industry insights, and expert tips from Melbourne's trusted cleaning specialists
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {blogPosts.filter(post => post.featured).map(post => (
        <section key={post.id} className="py-12 px-4 bg-gray-50">
          <div className="max-w-screen-xl mx-auto">
            <div className="mb-6">
              <span className="text-accent font-semibold text-sm uppercase tracking-wide">Featured Article</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-80 lg:h-full">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-full font-medium">{post.category}</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <Link to={`/blog/${post.id}`}>
                  <Button className="bg-accent hover:bg-accent-dark text-black font-semibold">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Categories Filter */}
      <section className="py-8 px-4 bg-white border-y border-gray-200">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-gray-50 text-gray-700 hover:bg-primary hover:text-white transition-colors border border-gray-200 font-medium text-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Articles Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Cleaning Tips & Guides
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest cleaning techniques, industry trends, and expert advice
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden group border border-gray-100">
                <div className="relative">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-black px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-semibold text-sm transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Professional Cleaning Services?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Ready to experience the Fresh Plus difference? Get a free quote for any of our professional cleaning services
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-black font-semibold px-8 py-6 text-lg">
              <Link to="/get-quote">See Your Price Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-accent text-accent hover:bg-accent hover:text-primary px-8 py-6 text-lg group font-semibold">
              <a href="tel:+61403971720" className="flex items-center">
                <Phone className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                Call 0403 971 720
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
