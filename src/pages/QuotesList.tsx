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
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Remove password protection

  useEffect(() => {
    loadQuotes();
  }, []);

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
${quote.preferred_date ? `Preferred Date: ${new Date(quote.preferred_date).toLocaleDateString('en-AU')}` : ''}
${quote.job_description ? `Special Requirements: ${quote.job_description}` : ''}

We'll prepare a personalized quote for you and get back to you within 24 hours.

Best regards,
FreshPlus Professional Cleaning Services
Phone: +61 403 971 720
Email: infofreshplusclean@gmail.com

---
Quote ID: ${quote.id}`;

    // Simple approach - just show the email content directly
    const emailWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
    
    if (emailWindow) {
      emailWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Email Reply to ${quote.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
            .header { background: #1e40af; color: white; padding: 20px; margin: -20px -20px 20px -20px; }
            .email-content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; margin: 20px 0; }
            .buttons { margin: 20px 0; }
            button { background: #1e40af; color: white; padding: 10px 20px; margin: 5px; border: none; border-radius: 5px; cursor: pointer; }
            button:hover { background: #1e3a8a; }
            .copy-button { background: #059669; }
            .copy-button:hover { background: #047857; }
            textarea { width: 100%; height: 400px; font-family: Arial, sans-serif; padding: 10px; border: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Email Reply to Customer</h1>
            <p>Customer: ${quote.name} (${quote.email})</p>
          </div>
          
          <div class="buttons">
            <button onclick="openGmail()">Open in Gmail</button>
            <button onclick="openOutlook()">Open in Outlook</button>
            <button onclick="copyToClipboard()" class="copy-button">Copy Email Content</button>
            <button onclick="window.print()">Print</button>
          </div>
          
          <h2>Email Content (Copy and paste into your email client):</h2>
          
          <div class="email-content">
            <p><strong>To:</strong> ${quote.email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <textarea id="emailBody" readonly>${body}</textarea>
          
          <div class="buttons">
            <button onclick="selectAll()">Select All Text</button>
            <button onclick="copyToClipboard()" class="copy-button">Copy to Clipboard</button>
          </div>
          
          <script>
            function openGmail() {
              const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + 
                encodeURIComponent('${quote.email}') + '&su=' + 
                encodeURIComponent('${subject}') + '&body=' + 
                encodeURIComponent('${body.replace(/'/g, "\\'")}');
              window.open(gmailUrl, '_blank');
            }
            
            function openOutlook() {
              const outlookUrl = 'https://outlook.live.com/mail/0/deeplink/compose?to=' + 
                encodeURIComponent('${quote.email}') + '&subject=' + 
                encodeURIComponent('${subject}') + '&body=' + 
                encodeURIComponent('${body.replace(/'/g, "\\'")}');
              window.open(outlookUrl, '_blank');
            }
            
            function copyToClipboard() {
              const fullEmail = 'To: ${quote.email}\\nSubject: ${subject}\\n\\n${body.replace(/'/g, "\\'")}';
              
              navigator.clipboard.writeText(fullEmail).then(function() {
                alert('Email content copied to clipboard!\\n\\nYou can now paste it into any email client.');
              }).catch(function() {
                // Fallback for older browsers
                const textarea = document.getElementById('emailBody');
                textarea.select();
                document.execCommand('copy');
                alert('Email content copied to clipboard!');
              });
            }
            
            function selectAll() {
              const textarea = document.getElementById('emailBody');
              textarea.select();
              textarea.setSelectionRange(0, 99999); // For mobile devices
            }
          </script>
        </body>
        </html>
      `);
      emailWindow.document.close();
    } else {
      // If popup is blocked, show alert with email content
      alert(`Reply to: ${quote.email}

Subject: ${subject}

Message:
${body}

Copy this content and paste it into your email client.`);
    }
  };

  // No authentication needed - direct admin access

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
