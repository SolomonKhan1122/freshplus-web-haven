import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const blogPosts = [
    {
      id: "ultimate-guide-end-of-lease-cleaning",
      title: "Ultimate Guide to End of Lease Cleaning: Get Your Bond Back",
      excerpt: "Moving out? Ensure you get your full bond back with our comprehensive end of lease cleaning checklist. Learn what property managers really look for and avoid common mistakes that cost tenants thousands.",
      category: "End of Lease",
      readTime: "8 min read",
      date: "December 15, 2024",
      author: "Fresh Plus Team",
      image: "/Deep Cleaning.webp",
      featured: true
    },
    {
      id: "carpet-cleaning-guide-melbourne",
      title: "Professional Carpet Cleaning vs DIY: What Melbourne Homeowners Need to Know",
      excerpt: "Discover why professional carpet cleaning is worth the investment. Compare costs, results, and health benefits while learning how to maintain your carpets between professional cleanings.",
      category: "Carpet Cleaning",
      readTime: "6 min read",
      date: "December 12, 2024",
      author: "Fresh Plus Team",
      image: "/Carpet steam clean.webp"
    },
    {
      id: "solar-panel-cleaning-efficiency",
      title: "Solar Panel Cleaning: Boost Your Energy Efficiency by 25%",
      excerpt: "Learn how dirty solar panels can reduce your energy output and cost you hundreds annually. Discover the proper cleaning techniques and frequency for Melbourne's climate conditions.",
      category: "Solar Panel",
      readTime: "5 min read",
      date: "December 10, 2024",
      author: "Fresh Plus Team",
      image: "/solar panel cleaning.webp"
    },
    {
      id: "deep-cleaning-checklist-spring",
      title: "Spring Deep Cleaning Checklist: Room by Room Guide",
      excerpt: "Transform your home this spring with our comprehensive deep cleaning checklist. From forgotten corners to overlooked areas, ensure no spot is missed in your seasonal refresh.",
      category: "Deep Cleaning",
      readTime: "10 min read",
      date: "December 8, 2024",
      author: "Fresh Plus Team",
      image: "/House Cleaning.webp"
    },
    {
      id: "commercial-cleaning-productivity",
      title: "How Clean Offices Boost Employee Productivity by 12%",
      excerpt: "Research shows clean workspaces significantly impact employee performance. Learn how professional commercial cleaning creates healthier, more productive work environments.",
      category: "Commercial",
      readTime: "7 min read",
      date: "December 5, 2024",
      author: "Fresh Plus Team",
      image: "/Commercial cleaning.webp"
    },
    {
      id: "tile-grout-restoration-guide",
      title: "Tile and Grout Restoration: From Dingy to Sparkling",
      excerpt: "Restore your tiles to their original beauty with professional cleaning techniques. Learn about different tile types, common problems, and maintenance tips for long-lasting results.",
      category: "Tile & Grout",
      readTime: "6 min read",
      date: "December 3, 2024",
      author: "Fresh Plus Team",
      image: "/Tile&grout.webp"
    }
  ];

  const categories = ["All", "End of Lease", "Carpet Cleaning", "Solar Panel", "Deep Cleaning", "Commercial", "Tile & Grout"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block bg-accent/10 text-accent font-semibold px-4 py-2 rounded-full text-sm uppercase tracking-wide mb-4">
              Expert Cleaning Tips & Guides
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Fresh Plus <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Cleaning</span> Blog
            </h1>
            <p className="text-xl md:text-2xl text-primary/80 max-w-4xl mx-auto leading-relaxed">
              Professional cleaning advice, industry insights, and expert tips from Melbourne's trusted cleaning specialists
            </p>
          </div>
        </div>
      </div>

      {/* Featured Article */}
      {blogPosts.filter(post => post.featured).map(post => (
        <section key={post.id} className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <span className="text-accent font-semibold text-sm uppercase tracking-wide">Featured Article</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-4 text-sm text-primary/60 mb-4">
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
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-lg text-primary/70 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                
                <Link to={`/blog/${post.id}`}>
                  <Button className="bg-accent hover:bg-accent-dark text-black font-semibold px-6 py-3">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="relative">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white px-6 py-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <div>
                      <div className="font-semibold text-sm">By {post.author}</div>
                      <div className="text-xs text-primary-light">{post.readTime}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Categories Filter */}
      <section className="py-8 px-4 bg-gradient-to-r from-primary-light to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-colors border border-primary/20 font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Articles Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
              Latest Cleaning Tips & Guides
            </h2>
            <p className="text-xl text-primary/70 text-center max-w-3xl mx-auto">
              Stay updated with the latest cleaning techniques, industry trends, and expert advice from our professional team
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <article key={post.id} className="bg-gradient-to-br from-primary-light to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-black px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-primary/60 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary mb-3 leading-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-primary/70 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-semibold transition-colors"
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

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-dark to-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated with Cleaning Tips
          </h2>
          <p className="text-xl text-primary-light mb-8">
            Get the latest cleaning guides, seasonal tips, and exclusive offers delivered to your inbox
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg border-0 text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <Button className="bg-accent hover:bg-accent-dark text-black font-semibold px-6 py-3 w-full sm:w-auto">
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm text-primary-light mt-4">
            No spam, unsubscribe anytime. Get tips that actually work!
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Need Professional Cleaning Services?
          </h2>
          <p className="text-xl text-primary/70 mb-8">
            Ready to experience the Fresh Plus difference? Get a free quote for any of our professional cleaning services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quote">
              <Button className="bg-accent hover:bg-accent-dark text-black font-semibold px-8 py-4 text-lg">
                Get Free Quote
              </Button>
            </Link>
            <a href="tel:+61403971720">
              <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary-light px-8 py-4 text-lg">
                Call +61 403 971 720
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
