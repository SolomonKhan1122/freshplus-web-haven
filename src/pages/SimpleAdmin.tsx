import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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

const SimpleAdmin = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

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

  const replyToCustomer = (quote: Quote) => {
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

    // Create full email content
    const fullEmail = `To: ${quote.email}
Subject: ${subject}

${body}`;

    // Copy to clipboard
    navigator.clipboard.writeText(fullEmail).then(() => {
      alert(`✅ Email content copied to clipboard!

To: ${quote.email}
Subject: ${subject}

Open your email client (Gmail, Outlook, etc.) and paste this content.`);
    }).catch(() => {
      alert(`📧 Copy this email content:

To: ${quote.email}
Subject: ${subject}

${body}`);
    });
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <h1>Loading quotes...</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ color: '#1e40af', marginBottom: '30px', textAlign: 'center' }}>
        FreshPlus Admin - Quote Requests
      </h1>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button 
          onClick={loadQuotes}
          style={{
            background: '#1e40af',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Refresh Quotes
        </button>
      </div>

      {quotes.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#666' }}>
          <h2>No quotes found</h2>
        </div>
      ) : (
        <div>
          {quotes.map((quote, index) => (
            <div 
              key={quote.id} 
              style={{
                background: 'white',
                margin: '20px 0',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                border: '2px solid #e2e8f0'
              }}
            >
              <div style={{ borderBottom: '2px solid #1e40af', paddingBottom: '15px', marginBottom: '15px' }}>
                <h2 style={{ color: '#1e40af', margin: '0 0 10px 0' }}>
                  Quote #{index + 1} - {quote.name}
                </h2>
                <p style={{ color: '#666', margin: '5px 0' }}>
                  Submitted: {new Date(quote.created_at).toLocaleDateString('en-AU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ color: '#1e40af', marginBottom: '10px' }}>Customer Details:</h3>
                  <p><strong>Name:</strong> {quote.name}</p>
                  <p><strong>Email:</strong> {quote.email}</p>
                  <p><strong>Phone:</strong> {quote.phone1}</p>
                  {quote.phone2 && <p><strong>Phone 2:</strong> {quote.phone2}</p>}
                  <p><strong>Address:</strong> {quote.address}, {quote.city} {quote.postcode}</p>
                </div>

                <div>
                  <h3 style={{ color: '#1e40af', marginBottom: '10px' }}>Service Request:</h3>
                  <p><strong>Services:</strong></p>
                  <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                    {quote.services.map((service, i) => (
                      <li key={i} style={{ margin: '5px 0' }}>{service}</li>
                    ))}
                  </ul>
                  {quote.preferred_date && (
                    <p><strong>Preferred Date:</strong> {new Date(quote.preferred_date).toLocaleDateString('en-AU')}</p>
                  )}
                  {quote.job_description && (
                    <div>
                      <p><strong>Job Description:</strong></p>
                      <p style={{ background: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
                        {quote.job_description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                <button
                  onClick={() => replyToCustomer(quote)}
                  style={{
                    background: '#059669',
                    color: 'white',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginRight: '10px'
                  }}
                >
                  📧 Copy Reply Email
                </button>
                <button
                  onClick={() => window.open(`tel:${quote.phone1.replace(/\s/g, '')}`)}
                  style={{
                    background: '#1e40af',
                    color: 'white',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  📞 Call Customer
                </button>
              </div>

              <div style={{ 
                background: '#fef3f2', 
                padding: '10px', 
                borderRadius: '5px', 
                marginTop: '15px',
                border: '1px solid #fecaca'
              }}>
                <p style={{ margin: '0', fontSize: '14px', color: '#991b1b' }}>
                  <strong>Quote ID:</strong> {quote.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleAdmin;
