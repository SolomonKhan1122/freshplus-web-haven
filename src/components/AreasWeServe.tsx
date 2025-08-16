import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AreasWeServeProps {
  serviceName?: string;
  compact?: boolean;
}

export const AreasWeServe = ({ serviceName, compact = false }: AreasWeServeProps) => {
  const primarySuburbs = [
    { name: "St Albans", slug: "st-albans" },
    { name: "Sunshine", slug: "sunshine" },
    { name: "Footscray", slug: "footscray" },
    { name: "Braybrook", slug: "braybrook" },
    { name: "Keilor", slug: "keilor" },
    { name: "Caroline Springs", slug: "caroline-springs" },
    { name: "Maribyrnong", slug: "maribyrnong" },
    { name: "Melbourne CBD", slug: "melbourne-cbd" }
  ];

  const additionalAreas = [
    "Pascoe Vale", "Coburg", "Brunswick", "Essendon", "Moonee Ponds",
    "Ascot Vale", "Flemington", "Kensington", "Seddon", "Yarraville",
    "Newport", "Altona", "Laverton", "Point Cook", "Hoppers Crossing"
  ];

  const serviceText = serviceName ? `${serviceName} services` : "professional cleaning services";

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-primary-light to-white p-6 rounded-xl border border-primary/10">
        <h3 className="text-lg font-bold text-primary mb-3">Service Areas</h3>
        <p className="text-primary/80 mb-4">
          We provide {serviceText} across Melbourne's western suburbs including:
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {primarySuburbs.slice(0, 6).map((suburb) => (
            <span 
              key={suburb.slug}
              className="inline-flex items-center gap-1 bg-accent/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
            >
              <MapPin className="w-3 h-3" />
              {suburb.name}
            </span>
          ))}
          <span className="text-primary/60 text-sm">and more...</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/contact">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary-light">
              View All Areas
            </Button>
          </Link>
          <a href="tel:0403971720">
            <Button className="bg-accent hover:bg-accent-dark text-black">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Areas We Serve in Melbourne
          </h2>
          <p className="text-xl text-primary/70 max-w-3xl mx-auto">
            Fresh Plus provides {serviceText} across Melbourne's western suburbs and surrounding areas. 
            We're your local cleaning specialists with deep knowledge of the community.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Primary Service Areas */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">Primary Service Areas</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {primarySuburbs.map((suburb) => (
                <div 
                  key={suburb.slug}
                  className="bg-gradient-to-r from-primary-light to-white p-4 rounded-xl border border-primary/10 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-accent p-2 rounded-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">{suburb.name}</h4>
                      <p className="text-sm text-primary/70">
                        {serviceName ? `${serviceName} in ${suburb.name}` : `Cleaning services in ${suburb.name}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Coverage */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">Extended Coverage Area</h3>
            <div className="bg-gradient-to-br from-primary-light to-white p-6 rounded-xl border border-primary/10">
              <p className="text-primary/80 mb-4">
                We also service these Melbourne suburbs and surrounding areas:
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {additionalAreas.map((area) => (
                  <span 
                    key={area}
                    className="bg-white text-primary px-3 py-1 rounded-full text-sm border border-primary/20"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <div className="border-t border-primary/20 pt-4">
                <p className="text-primary/80 text-sm mb-4">
                  Don't see your suburb listed? We likely service your area too! 
                  Call us to confirm availability in your location.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:0403971720">
                    <Button className="bg-accent hover:bg-accent-dark text-black w-full sm:w-auto">
                      <Phone className="w-4 h-4 mr-2" />
                      Call 0403 971 720
                    </Button>
                  </a>
                  <Link to="/quote">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary-light w-full sm:w-auto">
                      Get Free Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Local Expertise */}
        <div className="mt-12 bg-gradient-to-r from-primary-dark to-primary text-white p-8 rounded-2xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Local Melbourne Expertise</h3>
            <p className="text-xl text-primary-light mb-6 max-w-3xl mx-auto">
              As Melbourne locals, we understand the unique cleaning challenges of our climate and lifestyle. 
              From winter mud to summer dust, we know what works best for Melbourne homes and businesses.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-accent mb-2">12+</div>
                <div className="text-primary-light">Years Serving Melbourne</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">5000+</div>
                <div className="text-primary-light">Local Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                <div className="text-primary-light">Service Availability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreasWeServe;
