import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Calendar, FileText } from "lucide-react";

interface Quote {
  id: string;
  name: string;
  email: string;
  phone1: string;
  phone2?: string;
  address: string;
  city: string;
  postcode: string;
  services: string[];
  preferred_date?: string;
  job_description?: string;
  created_at: string;
}

const QuotesList = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ADMIN_PASSWORD = "freshplus2024"; // Simple password protection

  const authenticate = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadQuotes();
    } else {
      alert("Incorrect password");
    }
  };

  const loadQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error loading quotes:', error);
        return;
      }

      setQuotes(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendEmailToCustomer = (quote: Quote) => {
    const subject = `Your Quote Request - FreshPlus Professional Cleaning`;
    const body = `Hi ${quote.name},

Thank you for your quote request! Here are the details we received:

Services: ${quote.services.join(', ')}
Address: ${quote.address}, ${quote.city} ${quote.postcode}

We'll prepare a personalized quote for you and get back to you soon.

Best regards,
FreshPlus Team
Phone: +61 403 971 720`;

    const mailtoUrl = `mailto:${quote.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light to-white flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-accent/10 max-w-md w-full">
          <h1 className="text-3xl font-bold text-primary mb-6 text-center">Admin Access</h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && authenticate()}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button onClick={authenticate} className="w-full">
              Access Quotes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <Navigation />
      
      <div className="pt-24 px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Quote Requests</h1>
            <Button onClick={loadQuotes} variant="outline">
              Refresh
            </Button>
          </div>

          {loading ? (
            <div className="text-center">Loading quotes...</div>
          ) : quotes.length === 0 ? (
            <div className="text-center text-gray-500">No quotes found</div>
          ) : (
            <div className="grid gap-6">
              {quotes.map((quote) => (
                <Card key={quote.id} className="border border-accent/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-primary">{quote.name}</CardTitle>
                        <p className="text-sm text-gray-500">
                          {new Date(quote.created_at).toLocaleDateString('en-AU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => sendEmailToCustomer(quote)}
                          className="bg-accent hover:bg-accent/90 text-black"
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          Reply
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`tel:${quote.phone1.replace(/\s/g, '')}`)}
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-accent" />
                          <span>{quote.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-accent" />
                          <span>{quote.phone1}</span>
                          {quote.phone2 && <span className="text-gray-500">| {quote.phone2}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span>{quote.address}, {quote.city} {quote.postcode}</span>
                        </div>
                        {quote.preferred_date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-accent" />
                            <span>{new Date(quote.preferred_date).toLocaleDateString('en-AU')}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Services Requested:</h4>
                          <div className="flex flex-wrap gap-2">
                            {quote.services.map((service, index) => (
                              <Badge key={index} variant="secondary">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {quote.job_description && (
                          <div>
                            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Job Description:
                            </h4>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                              {quote.job_description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default QuotesList;
