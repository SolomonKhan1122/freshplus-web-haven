import emailjs from '@emailjs/browser';

// EmailJS Configuration - Free and reliable email service
const EMAILJS_SERVICE_ID = 'service_freshplus';
const EMAILJS_TEMPLATE_ID = 'template_quote';
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // You'll need to get this from EmailJS

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Admin email for notifications
const ADMIN_EMAIL = 'infofreshplusclean@gmail.com';

export interface QuoteEmailData {
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
}

// Send quote email using EmailJS
export const sendQuoteEmailJS = async (quoteData: QuoteEmailData) => {
  console.log('📧 Sending quote email via EmailJS for:', quoteData.name);
  
  try {
    // Prepare email template parameters
    const templateParams = {
      to_name: 'FreshPlus Team',
      to_email: ADMIN_EMAIL,
      from_name: quoteData.name,
      from_email: quoteData.email,
      customer_name: quoteData.name,
      customer_email: quoteData.email,
      customer_phone: quoteData.phone1,
      customer_phone2: quoteData.phone2 || 'Not provided',
      customer_address: `${quoteData.address}, ${quoteData.city} ${quoteData.postcode}`,
      services_requested: quoteData.services.join(', '),
      preferred_date: quoteData.preferred_date || 'Not specified',
      job_description: quoteData.job_description || 'Not provided',
      message: `
New Quote Request from ${quoteData.name}

Customer Details:
- Name: ${quoteData.name}
- Email: ${quoteData.email}
- Phone: ${quoteData.phone1}
${quoteData.phone2 ? `- Secondary Phone: ${quoteData.phone2}` : ''}
- Address: ${quoteData.address}, ${quoteData.city} ${quoteData.postcode}

Services Requested:
${quoteData.services.map(service => `- ${service}`).join('\n')}

Preferred Date: ${quoteData.preferred_date || 'Not specified'}

Job Description:
${quoteData.job_description || 'Not provided'}

Please respond to this quote request promptly.
      `.trim()
    };

    // Send email via EmailJS
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('✅ Quote email sent successfully via EmailJS:', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ EmailJS error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Simple alternative using mailto (as fallback)
export const sendQuoteViaMailto = (quoteData: QuoteEmailData) => {
  const subject = `New Quote Request from ${quoteData.name}`;
  const body = `
New Quote Request Details:

Customer Information:
- Name: ${quoteData.name}
- Email: ${quoteData.email}
- Phone: ${quoteData.phone1}
${quoteData.phone2 ? `- Secondary Phone: ${quoteData.phone2}` : ''}
- Address: ${quoteData.address}, ${quoteData.city} ${quoteData.postcode}

Services Requested:
${quoteData.services.map(service => `- ${service}`).join('\n')}

Preferred Date: ${quoteData.preferred_date || 'Not specified'}

Job Description:
${quoteData.job_description || 'Not provided'}

Please respond to this customer promptly.
  `.trim();

  const mailtoUrl = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  console.log('📧 Opening mailto link as fallback');
  window.open(mailtoUrl);
  
  return { success: true, method: 'mailto' };
};
