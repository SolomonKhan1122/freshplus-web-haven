import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link, useParams } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams();

  const blogPosts = {
    "ultimate-guide-end-of-lease-cleaning": {
      title: "Ultimate Guide to End of Lease Cleaning: Get Your Bond Back",
      category: "End of Lease",
      readTime: "8 min read",
      date: "December 15, 2024",
      author: "Fresh Plus Team",
      image: "/Deep Cleaning.webp",
      content: {
        introduction: "Moving out of a rental property can be stressful enough without worrying about your bond. With the average rental bond in Melbourne being $2,000-$4,000, getting it back in full should be your top priority. This comprehensive guide will show you exactly what property managers and landlords look for during their final inspection.",
        sections: [
          {
            title: "What is End of Lease Cleaning?",
            content: "End of lease cleaning, also known as bond cleaning or exit cleaning, is a thorough deep clean of your rental property before you move out. It's designed to return the property to the same condition it was in when you moved in (minus fair wear and tear). This cleaning goes far beyond your regular weekly cleaning routine."
          },
          {
            title: "Legal Requirements in Victoria",
            content: "Under Victorian tenancy laws, tenants must leave the property in a 'reasonably clean condition'. This means you're legally required to clean the property to a professional standard. Failure to do so can result in deductions from your bond to cover professional cleaning costs."
          },
          {
            title: "The Complete End of Lease Cleaning Checklist",
            content: "Here's your room-by-room checklist to ensure nothing is missed:",
            subsections: [
              {
                title: "Kitchen",
                items: [
                  "Clean inside and outside of all appliances (oven, stovetop, refrigerator, dishwasher)",
                  "Degrease range hood and filters",
                  "Clean all cupboards inside and out",
                  "Scrub sink and polish taps",
                  "Clean tiles and remove any grout staining",
                  "Mop floors and clean skirting boards"
                ]
              },
              {
                title: "Bathrooms",
                items: [
                  "Remove soap scum from shower screens and tiles",
                  "Clean and disinfect toilet thoroughly",
                  "Polish mirrors and chrome fixtures",
                  "Clean exhaust fans",
                  "Scrub grout and remove mold",
                  "Clean vanity inside and out"
                ]
              },
              {
                title: "Living Areas & Bedrooms",
                items: [
                  "Professional carpet cleaning (if carpeted)",
                  "Wash walls and remove scuff marks",
                  "Clean all windows inside and out",
                  "Dust ceiling fans and light fixtures",
                  "Clean air conditioning vents",
                  "Vacuum and mop all floors"
                ]
              },
              {
                title: "Outdoor Areas",
                items: [
                  "Sweep and wash balconies/patios",
                  "Clean outdoor furniture if included",
                  "Remove cobwebs from eaves",
                  "Clean garage floors",
                  "Ensure gardens are tidy (if required)"
                ]
              }
            ]
          },
          {
            title: "Common Mistakes That Cost Bonds",
            content: "Avoid these costly mistakes that frequently result in bond deductions:",
            items: [
              "Not cleaning inside appliances thoroughly",
              "Missing ceiling fans and light fixtures",
              "Ignoring wall marks and scuffs",
              "Inadequate carpet cleaning",
              "Forgetting window tracks and sills",
              "Not removing all personal items and rubbish"
            ]
          },
          {
            title: "DIY vs Professional Cleaning",
            content: "While you can attempt end of lease cleaning yourself, consider these factors: Professional cleaners have commercial-grade equipment, know exactly what property managers look for, and often provide guarantees. The cost of professional cleaning (typically $300-$800) is usually much less than potential bond deductions."
          },
          {
            title: "What Property Managers Really Look For",
            content: "Based on our 12+ years of experience, property managers pay special attention to: Kitchen appliances (especially oven interiors), bathroom grout and mold, carpet stains and odors, wall marks and scratches, and overall property presentation."
          }
        ],
        conclusion: "Getting your bond back doesn't have to be stressful. With proper planning and attention to detail, you can ensure your property meets the required standards. Remember, investing in professional end of lease cleaning often saves money in the long run and guarantees your bond return."
      }
    },
    "carpet-cleaning-guide-melbourne": {
      title: "Professional Carpet Cleaning vs DIY: What Melbourne Homeowners Need to Know",
      category: "Carpet Cleaning",
      readTime: "6 min read",
      date: "December 12, 2024",
      author: "Fresh Plus Team",
      image: "/Carpet steam clean.webp",
      content: {
        introduction: "Your carpets are one of the largest investments in your home, yet they're also the most neglected when it comes to proper maintenance. With Melbourne's unique climate and lifestyle, understanding the difference between DIY and professional carpet cleaning can save you thousands in replacement costs.",
        sections: [
          {
            title: "Why Melbourne Carpets Need Special Care",
            content: "Melbourne's variable weather means carpets face unique challenges. High humidity in summer promotes mold growth, while winter mud and debris get tracked inside. The city's dust and pollution also settle deep into carpet fibers, requiring specialized cleaning techniques."
          },
          {
            title: "DIY Carpet Cleaning: Pros and Cons",
            content: "DIY cleaning can handle surface dirt and small spills, costs less upfront, and allows cleaning on your schedule. However, rental machines lack the power of professional equipment, improper technique can damage carpets, and over-wetting can cause mold issues."
          },
          {
            title: "Professional Carpet Cleaning Benefits",
            content: "Professional services use truck-mounted equipment with superior suction power, apply pre-treatment solutions for tough stains, and employ trained technicians who understand different carpet types. This results in deeper cleaning, faster drying times, and extended carpet life."
          },
          {
            title: "Cost Analysis: Investment vs Replacement",
            content: "Professional cleaning costs $150-$400 annually but can extend carpet life by 5-10 years. Replacing carpets costs $15-$50 per square meter. Regular professional cleaning is significantly more economical than premature replacement."
          },
          {
            title: "Health Benefits of Professional Cleaning",
            content: "Professional cleaning removes allergens, dust mites, and bacteria that regular vacuuming can't reach. This is especially important for families with allergies, asthma, or young children who spend time on carpets."
          }
        ],
        conclusion: "While DIY cleaning has its place for maintenance, professional carpet cleaning is an investment in your home's health, appearance, and value. For Melbourne homeowners, annual professional cleaning combined with regular vacuuming provides the best results."
      }
    },
    "solar-panel-cleaning-efficiency": {
      title: "Solar Panel Cleaning: Boost Your Energy Efficiency by 25%",
      category: "Solar Panel",
      readTime: "5 min read", 
      date: "December 10, 2024",
      author: "Fresh Plus Team",
      image: "/solar panel cleaning.webp",
      content: {
        introduction: "With over 3 million Australian households now using solar power, maintaining peak efficiency is crucial for maximizing your investment. Dirty solar panels can reduce energy output by up to 25%, costing the average Melbourne household $200-$500 annually in lost energy production.",
        sections: [
          {
            title: "How Dirt Affects Solar Panel Performance",
            content: "Solar panels work by converting sunlight into electricity. When dirt, dust, bird droppings, or pollen accumulate on the surface, they block sunlight from reaching the photovoltaic cells. Even a thin layer of dust can significantly reduce efficiency."
          },
          {
            title: "Melbourne's Unique Solar Panel Challenges",
            content: "Melbourne's environment presents specific challenges for solar panels: frequent storms deposit dust and debris, birds commonly nest under panels, autumn leaves and tree sap accumulate, and air pollution settles on surfaces."
          },
          {
            title: "Signs Your Solar Panels Need Cleaning",
            content: "Monitor your energy production dashboard for declining output, visually inspect for obvious dirt or debris, check for bird droppings or nesting materials, and notice any shading from accumulated grime."
          },
          {
            title: "DIY vs Professional Solar Panel Cleaning",
            content: "While you can clean accessible ground-mounted panels yourself, roof-mounted systems require professional cleaning for safety. Professionals have proper equipment, use appropriate cleaning solutions, and can identify potential issues during cleaning."
          },
          {
            title: "Cleaning Frequency and Maintenance",
            content: "In Melbourne's climate, panels should be cleaned every 3-6 months. More frequent cleaning may be needed if you live near construction, heavy traffic, or have overhanging trees. Regular cleaning maintains optimal efficiency year-round."
          }
        ],
        conclusion: "Regular solar panel cleaning is a simple investment that pays for itself through increased energy production. With professional cleaning costing $150-$300 but potentially saving hundreds annually, it's one of the best home maintenance investments you can make."
      }
    },
    "deep-cleaning-checklist-spring": {
      title: "Spring Deep Cleaning Checklist: Room by Room Guide",
      category: "Deep Cleaning",
      readTime: "10 min read",
      date: "December 8, 2024",
      author: "Fresh Plus Team",
      image: "/House Cleaning.webp",
      content: {
        introduction: "Spring is the perfect time to refresh your home with a thorough deep clean. After months of closed windows and indoor living, your home needs more than just surface cleaning. This comprehensive guide will help you tackle every room systematically for a truly spotless result.",
        sections: [
          {
            title: "Why Spring Deep Cleaning Matters",
            content: "Winter leaves homes with accumulated dust, stale air, and hidden grime. Spring deep cleaning removes allergens built up over months, refreshes your living space, and prepares your home for the warmer months ahead. It's also the perfect time to declutter and organize."
          },
          {
            title: "Essential Supplies and Equipment",
            content: "Before starting, gather quality cleaning supplies: microfiber cloths, all-purpose cleaners, glass cleaner, disinfectant, vacuum with attachments, mop and bucket, scrub brushes, and trash bags. Having everything ready makes the process more efficient."
          },
          {
            title: "Kitchen Deep Clean",
            content: "Start with appliances - clean inside refrigerator, scrub oven interior, descale coffee machine. Deep clean cabinets inside and out, organize pantry, clean range hood filters, and scrub grout. Don't forget to clean behind appliances and wash curtains or blinds.",
            items: [
              "Empty and clean refrigerator and freezer",
              "Deep clean oven, stovetop, and microwave",
              "Wash all cabinet fronts and interiors",
              "Organize and clean pantry shelves",
              "Clean and degrease range hood",
              "Scrub backsplash tiles and grout",
              "Wash or replace curtains and blinds"
            ]
          },
          {
            title: "Bathroom Renovation",
            content: "Bathrooms require special attention to prevent mold and maintain hygiene. Deep clean all surfaces, replace worn items, and ensure proper ventilation.",
            items: [
              "Remove and wash shower curtains",
              "Deep clean grout and re-seal if needed",
              "Descale showerheads and faucets",
              "Clean exhaust fans thoroughly",
              "Organize medicine cabinets",
              "Replace old towels and bath mats",
              "Clean and disinfect toilet completely"
            ]
          },
          {
            title: "Living Areas and Bedrooms",
            content: "Focus on areas where you spend the most time. Deep clean carpets, wash walls, and refresh soft furnishings for a completely renewed feel.",
            items: [
              "Wash or dry clean curtains and drapes",
              "Deep clean carpets and rugs",
              "Wipe down all walls and baseboards",
              "Clean light fixtures and ceiling fans",
              "Organize closets and wardrobes",
              "Flip and vacuum mattresses",
              "Clean windows inside and out"
            ]
          }
        ],
        conclusion: "Spring deep cleaning is an investment in your home's health and your family's wellbeing. Take it room by room, and don't rush the process. The result will be a fresh, clean home that feels like new. Consider hiring professionals for carpets and windows to ensure the best results."
      }
    },
    "commercial-cleaning-productivity": {
      title: "How Clean Offices Boost Employee Productivity by 12%",
      category: "Commercial",
      readTime: "7 min read",
      date: "December 5, 2024",
      author: "Fresh Plus Team",
      image: "/Commercial cleaning.webp",
      content: {
        introduction: "Studies consistently show that clean work environments significantly impact employee performance, health, and satisfaction. Research indicates that employees in clean offices are 12% more productive than those in cluttered or dirty workspaces. For Melbourne businesses, this translates to real bottom-line benefits.",
        sections: [
          {
            title: "The Science Behind Cleanliness and Productivity",
            content: "Clean environments reduce stress hormones, improve cognitive function, and enhance focus. When employees aren't distracted by clutter or concerned about hygiene, they can dedicate full attention to their work. Clean air also means fewer sick days and better overall health."
          },
          {
            title: "Key Areas That Impact Productivity",
            content: "Certain areas have more impact on productivity than others. Clean restrooms affect employee satisfaction dramatically, organized common areas promote collaboration, and dust-free workstations reduce allergies and distractions.",
            items: [
              "Reception areas create first impressions",
              "Restrooms affect employee satisfaction",
              "Kitchen areas promote team interaction",
              "Workstations need dust-free environments",
              "Meeting rooms require professional appearance",
              "Common areas influence company culture"
            ]
          },
          {
            title: "Professional vs In-House Cleaning",
            content: "While some businesses rely on employees for basic cleaning, professional services provide consistent results, use proper equipment and chemicals, and free up employees to focus on their core responsibilities. The ROI is typically positive within months."
          },
          {
            title: "Creating a Cleaning Schedule",
            content: "Different areas require different cleaning frequencies. High-traffic areas need daily attention, while specialized deep cleaning can be weekly or monthly. A professional cleaning service can customize schedules based on your business needs and budget."
          },
          {
            title: "Melbourne Office Cleaning Considerations",
            content: "Melbourne's weather brings unique challenges - rain means more tracked dirt, seasonal allergies require extra attention to dust removal, and the CBD's pollution means windows need frequent cleaning. Professional cleaners understand these local factors."
          }
        ],
        conclusion: "Investing in professional commercial cleaning isn't just about appearance - it's about creating an environment where employees can thrive. With productivity increases of 12% and reduced sick days, professional cleaning quickly pays for itself while creating a better workplace for everyone."
      }
    },
    "tile-grout-restoration-guide": {
      title: "Tile and Grout Restoration: From Dingy to Sparkling",
      category: "Tile & Grout",
      readTime: "6 min read",
      date: "December 3, 2024",
      author: "Fresh Plus Team",
      image: "/Tile&grout.webp",
      content: {
        introduction: "Tile and grout can transform from beautiful to embarrassing surprisingly quickly. What starts as pristine white grout often becomes dark, stained, and unsightly within months. The good news? With proper techniques and professional restoration, your tiles can look brand new again.",
        sections: [
          {
            title: "Why Grout Gets Dirty So Fast",
            content: "Grout is porous and sits below the tile surface, making it a magnet for dirt, soap scum, and moisture. In Melbourne's humid climate, mold and mildew thrive in these conditions. Regular mopping actually pushes dirt deeper into grout lines."
          },
          {
            title: "Different Tile Types, Different Approaches",
            content: "Ceramic tiles are durable and can handle strong cleaners, porcelain requires gentler treatment to avoid damage, natural stone needs pH-neutral products only, and glass tiles show water spots easily. Each type requires specific cleaning methods."
          },
          {
            title: "Professional Restoration Process",
            content: "Professional restoration involves several steps for optimal results:",
            items: [
              "Pre-treatment with specialized solutions",
              "High-pressure steam cleaning",
              "Grout line scrubbing and extraction",
              "Stain removal treatments",
              "Sealing for future protection",
              "Final polish and inspection"
            ]
          },
          {
            title: "Maintenance Tips for Longevity",
            content: "After professional restoration, proper maintenance extends results significantly. Weekly cleaning with pH-neutral products, immediate spill cleanup, and annual re-sealing keep grout looking new."
          },
          {
            title: "When to Consider Re-grouting",
            content: "Sometimes cleaning isn't enough. If grout is cracked, missing, or permanently stained, re-grouting may be necessary. Professional assessment can determine if restoration or replacement is the better investment."
          },
          {
            title: "Cost vs Value Analysis",
            content: "Professional tile and grout restoration costs significantly less than replacement. While new tiling might cost $30-$80 per square meter, professional cleaning and restoration typically costs $15-$25 per square meter."
          }
        ],
        conclusion: "Don't let dingy grout make your beautiful tiles look dated. Professional restoration can return your surfaces to like-new condition at a fraction of replacement cost. Regular maintenance after restoration ensures your investment lasts for years."
      }
    }
  };

  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
        <Navigation />
        <div className="pt-24 pb-16 px-4 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Article Not Found</h1>
          <p className="text-xl text-primary/70 mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button className="bg-accent hover:bg-accent-dark text-black font-semibold px-6 py-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-primary/70">
              <User className="w-5 h-5" />
              <span className="font-medium">By {post.author}</span>
            </div>
          </div>
          
          <div className="relative mb-12">
            <img 
              src={post.image}
              alt={post.title}
              className="rounded-2xl shadow-2xl w-full h-64 md:h-96 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="pb-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <p className="text-xl text-primary/80 leading-relaxed mb-8 border-l-4 border-accent pl-6 bg-accent/5 py-4 rounded-r-lg">
              {post.content.introduction}
            </p>

            {/* Main Content Sections */}
            {post.content.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{section.title}</h2>
                <p className="text-primary/80 leading-relaxed mb-6">{section.content}</p>
                
                {/* Subsections for checklist items */}
                {section.subsections && (
                  <div className="space-y-6">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="bg-gradient-to-r from-primary-light to-white p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-primary mb-4">{subsection.title}</h3>
                        <ul className="space-y-2">
                          {subsection.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                              <span className="text-primary/80">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Regular list items */}
                {section.items && (
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border-l-4 border-red-400">
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0 mt-2"></span>
                          <span className="text-primary/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {/* Conclusion */}
            <div className="bg-gradient-to-r from-accent/10 to-secondary/10 p-8 rounded-2xl border border-accent/20 mt-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Conclusion</h2>
              <p className="text-primary/80 leading-relaxed text-lg">{post.content.conclusion}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-dark to-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Professional {post.category} Services?
          </h2>
          <p className="text-xl text-primary-light mb-8">
            Get expert advice and professional cleaning services from Melbourne's trusted cleaning specialists.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-quote">
              <Button className="bg-accent hover:bg-accent-dark text-black font-semibold px-8 py-4 text-lg">
                See Instant Pricing
              </Button>
            </Link>
            <Button asChild variant="outline" className="border-2 border-accent text-accent hover:bg-accent hover:text-primary px-8 py-4 text-lg bg-transparent group font-semibold">
              <a href="tel:+61403971720" className="flex items-center">
                <Phone className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
                Call +61 403 971 720
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Show other articles */}
            {Object.entries(blogPosts)
              .filter(([key]) => key !== slug)
              .slice(0, 2)
              .map(([key, relatedPost]) => (
                <Link 
                  key={key}
                  to={`/blog/${key}`}
                  className="group bg-gradient-to-br from-primary-light to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="mb-4">
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                      {relatedPost.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                    {relatedPost.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-primary/60">
                    <span>{relatedPost.readTime}</span>
                    <span>{relatedPost.date}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
