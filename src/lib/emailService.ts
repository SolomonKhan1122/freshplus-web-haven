import { supabase } from './supabase';
import { getServiceDisplayName } from './serviceMapping';

// Admin email - receives all booking and quote notifications
const ADMIN_EMAIL = 'infofreshplusclean@gmail.com';

// Business email for customer communications
const BUSINESS_EMAIL = 'info@freshpluscleaning.com.au';

// Email service now uses Supabase Edge Function exclusively to avoid CORS issues
console.log('🔧 Email Service Configuration:');
console.log('- Email Service: ✅ Supabase Edge Function');
console.log('- Admin Email:', ADMIN_EMAIL);
console.log('- Business Email:', BUSINESS_EMAIL);
console.log('- Environment:', import.meta.env.MODE || 'development');
console.log('✅ All emails will be sent via Supabase Edge Function (no CORS issues)');

// Test email function to verify service is working
export const sendTestEmail = async (testEmail: string) => {
  console.log('🧪 Testing email service with address:', testEmail);
  
  try {
    // Create a test quote to send via Edge Function
    const testQuote = {
      id: 'test-' + Date.now(),
      name: 'Test User',
      email: testEmail,
      address: 'Test Address',
      city: 'Melbourne',
      postcode: '3000',
      phone1: '0400000000',
      services: ['residential-cleaning'],
      job_description: 'This is a test email to verify the email service is working.'
    };
    
    const { data: edgeData, error: edgeError } = await supabase.functions.invoke('email-dispatch', {
      body: { type: 'quote', quote: testQuote, adminEmail: ADMIN_EMAIL }
    });

    if (edgeError) {
      console.error('❌ Test email failed:', edgeError);
      return { success: false, error: edgeError.message || JSON.stringify(edgeError) };
    }
    
    if (edgeData?.success) {
      console.log('✅ Test email sent successfully via Edge Function');
      return { success: true, data: edgeData };
    } else {
      console.error('❌ Test email failed:', edgeData);
      return { success: false, error: edgeData?.error || 'Unknown error' };
    }
  } catch (error) {
    console.error('❌ Test email failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export interface BookingData {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  service_date: string;
  service_time: string;
  special_instructions?: string;
}

export interface QuoteData {
  id: string;
  name: string;
  address: string;
  city: string;
  postcode: string;
  phone1: string;
  phone2?: string;
  email: string;
  property_type?: string;
  services: string[];
  preferred_date?: string;
  job_description?: string;
}

export interface ContactData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface InstantBookingData {
  id: string;
  service_type: string;
  service_name: string;
  service_size: number | null;
  property_type: string | null;
  furnished: 'furnished' | 'empty' | null;
  bathrooms: number;
  selected_extras: Record<string, number>;
  bundle_selected: boolean;
  original_price: number;
  discount_amount: number;
  final_price: number;
  same_day_booking: boolean;
  preferred_date: string | null;
  preferred_time: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  postcode: string;
  comments: string | null;
}

// Generate booking confirmation email HTML for customer
export const generateBookingConfirmationEmail = (booking: BookingData) => {
  const formattedDate = new Date(booking.service_date).toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const timeSlots = {
    'morning': 'Morning (8AM - 12PM)',
    'afternoon': 'Afternoon (12PM - 4PM)',
    'evening': 'Evening (4PM - 8PM)'
  };

  const formattedTime = timeSlots[booking.service_time as keyof typeof timeSlots] || booking.service_time;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation - FreshPlus</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8fafc;
            }
            .container {
                background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
            }
            .logo {
                font-size: 32px;
                font-weight: 900;
                margin-bottom: 10px;
            }
            .logo .accent {
                color: #fbbf24;
            }
            .tagline {
                font-size: 18px;
                opacity: 0.9;
                margin-bottom: 20px;
            }
            .booking-id {
                background: rgba(251, 191, 36, 0.2);
                color: #fbbf24;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                display: inline-block;
            }
            .content {
                background: white;
                padding: 40px 30px;
            }
            .greeting {
                font-size: 24px;
                font-weight: bold;
                color: #1e3a8a;
                margin-bottom: 20px;
            }
            .confirmation-message {
                font-size: 18px;
                color: #059669;
                font-weight: 600;
                margin-bottom: 30px;
                text-align: center;
                background: #d1fae5;
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid #059669;
            }
            .booking-details {
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                padding: 25px;
                margin: 25px 0;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                border-bottom: 1px solid #e2e8f0;
            }
            .detail-row:last-child {
                border-bottom: none;
            }
            .detail-label {
                font-weight: 600;
                color: #1e3a8a;
                flex: 1;
            }
            .detail-value {
                color: #374151;
                flex: 2;
                text-align: right;
            }
            .next-steps {
                background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
                color: #000;
                padding: 25px;
                border-radius: 12px;
                margin: 25px 0;
            }
            .next-steps h3 {
                margin-top: 0;
                font-size: 20px;
                font-weight: bold;
            }
            .contact-info {
                background: #1e3a8a;
                color: white;
                padding: 25px;
                border-radius: 12px;
                text-align: center;
                margin-top: 25px;
            }
            .contact-button {
                background: #fbbf24;
                color: #000;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
                margin: 10px;
                transition: all 0.3s ease;
            }
            .footer {
                background: #f8fafc;
                padding: 20px;
                text-align: center;
                color: #6b7280;
                font-size: 14px;
            }
            .trust-badges {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin: 20px 0;
                flex-wrap: wrap;
            }
            .badge {
                background: rgba(251, 191, 36, 0.1);
                color: #1e3a8a;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">
                    <span class="accent">Fresh</span>Plus
                </div>
                <div class="tagline">Professional Home Services</div>
                <div class="booking-id">Booking ID: ${booking.id.slice(0, 8).toUpperCase()}</div>
            </div>
            
            <div class="content">
                <div class="greeting">Hello ${booking.name}! 👋</div>
                
                <div class="confirmation-message">
                    ✅ Your booking has been confirmed! We've received your request and will contact you soon.
                </div>
                
                <div class="booking-details">
                    <h3 style="color: #1e3a8a; margin-top: 0; margin-bottom: 20px; font-size: 20px;">📋 Booking Details</h3>
                    <div class="detail-row">
                        <span class="detail-label">🏠 Service:</span>
                        <span class="detail-value">${getServiceDisplayName(booking.service)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">📍 Address:</span>
                        <span class="detail-value">${booking.address}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">📅 Date:</span>
                        <span class="detail-value">${formattedDate}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">⏰ Time:</span>
                        <span class="detail-value">${formattedTime}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">📞 Contact:</span>
                        <span class="detail-value">${booking.phone}</span>
                    </div>
                    ${booking.special_instructions ? `
                    <div class="detail-row">
                        <span class="detail-label">📝 Instructions:</span>
                        <span class="detail-value">${booking.special_instructions}</span>
                    </div>
                    ` : ''}
                </div>
                
                <div class="next-steps">
                    <h3>🚀 What Happens Next?</h3>
                    <p><strong>1.</strong> Our team will contact you within 24 hours to confirm your booking</p>
                    <p><strong>2.</strong> We'll provide you with a precise time window for your service</p>
                    <p><strong>3.</strong> Our professional cleaners will arrive on time with all necessary equipment</p>
                    <p><strong>4.</strong> Enjoy your sparkling clean space!</p>
                </div>
                
                <div class="trust-badges">
                    <span class="badge">⭐ 5-Star Rated</span>
                    <span class="badge">🛡️ Fully Insured</span>
                    <span class="badge">🌿 Eco-Friendly</span>
                    <span class="badge">💯 Satisfaction Guaranteed</span>
                </div>
                
                <div class="contact-info">
                    <h3>Need to Make Changes?</h3>
                    <p>Contact us anytime - we're here to help!</p>
                    <a href="tel:+61403971720" class="contact-button">📞 Call +61 403 971 720</a>
                    <a href="mailto:infofreshplusclean@gmail.com" class="contact-button">✉️ Email Us</a>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Fresh Plus Professional Cleaning Services</strong></p>
                <p>Melbourne's Most Trusted Cleaning Service</p>
                <p>Office Hours: 8:00 AM to 5:00 PM daily</p>
                <p style="margin-top: 15px; opacity: 0.7;">
                    This email was sent to ${booking.email}. 
                    If you have any questions, please don't hesitate to contact us.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Generate quote confirmation email HTML for customer
export const generateQuoteConfirmationEmail = (quote: QuoteData) => {
  const formattedDate = quote.preferred_date 
    ? new Date(quote.preferred_date).toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Not specified';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quote Request Received - FreshPlus</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8fafc;
            }
            .container {
                background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
            }
            .logo {
                font-size: 32px;
                font-weight: 900;
                margin-bottom: 10px;
            }
            .logo .accent {
                color: #fbbf24;
            }
            .tagline {
                font-size: 18px;
                opacity: 0.9;
                margin-bottom: 20px;
            }
            .quote-id {
                background: rgba(251, 191, 36, 0.2);
                color: #fbbf24;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                display: inline-block;
            }
            .content {
                background: white;
                padding: 40px 30px;
            }
            .greeting {
                font-size: 24px;
                font-weight: bold;
                color: #1e3a8a;
                margin-bottom: 20px;
            }
            .confirmation-message {
                font-size: 18px;
                color: #059669;
                font-weight: 600;
                margin-bottom: 30px;
                text-align: center;
                background: #d1fae5;
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid #059669;
            }
            .quote-details {
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                padding: 25px;
                margin: 25px 0;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 10px 0;
                border-bottom: 1px solid #e2e8f0;
            }
            .detail-row:last-child {
                border-bottom: none;
            }
            .detail-label {
                font-weight: 600;
                color: #1e3a8a;
                flex: 1;
                min-width: 120px;
            }
            .detail-value {
                color: #374151;
                flex: 2;
                text-align: right;
            }
            .services-list {
                text-align: right;
            }
            .service-item {
                background: #fbbf24;
                color: #000;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 600;
                display: inline-block;
                margin: 2px;
            }
            .next-steps {
                background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
                color: #000;
                padding: 25px;
                border-radius: 12px;
                margin: 25px 0;
            }
            .next-steps h3 {
                margin-top: 0;
                font-size: 20px;
                font-weight: bold;
            }
            .contact-info {
                background: #1e3a8a;
                color: white;
                padding: 25px;
                border-radius: 12px;
                text-align: center;
                margin-top: 25px;
            }
            .contact-button {
                background: #fbbf24;
                color: #000;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
                margin: 10px;
                transition: all 0.3s ease;
            }
            .footer {
                background: #f8fafc;
                padding: 20px;
                text-align: center;
                color: #6b7280;
                font-size: 14px;
            }
            .trust-badges {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin: 20px 0;
                flex-wrap: wrap;
            }
            .badge {
                background: rgba(251, 191, 36, 0.1);
                color: #1e3a8a;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">
                    <span class="accent">Fresh</span>Plus
                </div>
                <div class="tagline">Professional Home Services</div>
                <div class="quote-id">Quote ID: ${quote.id.slice(0, 8).toUpperCase()}</div>
            </div>
            
            <div class="content">
                <div class="greeting">Hello ${quote.name}! 👋</div>
                
                <div class="confirmation-message">
                    📋 Your quote request has been received! We'll get back to you within the day with a personalized quote.
                </div>
                
                <div class="quote-details">
                    <h3 style="color: #1e3a8a; margin-top: 0; margin-bottom: 20px; font-size: 20px;">📋 Quote Request Details</h3>
                    <div class="detail-row">
                        <span class="detail-label">📍 Address:</span>
                        <span class="detail-value">${quote.address}, ${quote.city} ${quote.postcode}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">📞 Primary Phone:</span>
                        <span class="detail-value">${quote.phone1}</span>
                    </div>
                    ${quote.phone2 ? `
                    <div class="detail-row">
                        <span class="detail-label">📱 Secondary Phone:</span>
                        <span class="detail-value">${quote.phone2}</span>
                    </div>
                    ` : ''}
                    ${quote.property_type ? `
                    <div class="detail-row">
                        <span class="detail-label">🏢 Property Type:</span>
                        <span class="detail-value" style="text-transform: capitalize;">${quote.property_type.replace('-', ' ')}</span>
                    </div>
                    ` : ''}
                    <div class="detail-row">
                        <span class="detail-label">🏠 Services:</span>
                        <div class="services-list">
                            ${quote.services.map(service => `<span class="service-item">${getServiceDisplayName(service)}</span>`).join('')}
                        </div>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">📅 Preferred Date:</span>
                        <span class="detail-value">${formattedDate}</span>
                    </div>
                    ${quote.job_description ? `
                    <div class="detail-row">
                        <span class="detail-label">📝 Description:</span>
                        <span class="detail-value">${quote.job_description}</span>
                    </div>
                    ` : ''}
                </div>
                
                <div class="next-steps">
                    <h3>🚀 What Happens Next?</h3>
                    <p><strong>1.</strong> Our team will review your requirements within the day</p>
                    <p><strong>2.</strong> We'll contact you with a detailed, personalized quote</p>
                    <p><strong>3.</strong> Once approved, we'll schedule your service at your convenience</p>
                    <p><strong>4.</strong> Our professional cleaners will deliver exceptional results!</p>
                </div>
                
                <div class="trust-badges">
                    <span class="badge">⭐ 5-Star Rated</span>
                    <span class="badge">🛡️ Fully Insured</span>
                    <span class="badge">🌿 Eco-Friendly</span>
                    <span class="badge">💯 Satisfaction Guaranteed</span>
                </div>
                
                <div class="contact-info">
                    <h3>Questions? We're Here to Help!</h3>
                    <p>Contact us anytime - we're here to help!</p>
                    <a href="tel:+61403971720" class="contact-button">📞 Call +61 403 971 720</a>
                    <a href="mailto:infofreshplusclean@gmail.com" class="contact-button">✉️ Email Us</a>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Fresh Plus Professional Cleaning Services</strong></p>
                <p>Melbourne's Most Trusted Cleaning Service</p>
                <p>Office Hours: 8:00 AM to 5:00 PM daily</p>
                <p style="margin-top: 15px; opacity: 0.7;">
                    This email was sent to ${quote.email}. 
                    If you have any questions, please don't hesitate to contact us.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Generate admin notification email for new booking
export const generateAdminBookingNotification = (booking: BookingData) => {
  const formattedDate = new Date(booking.service_date).toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const timeSlots = {
    'morning': 'Morning (8AM - 12PM)',
    'afternoon': 'Afternoon (12PM - 4PM)',
    'evening': 'Evening (4PM - 8PM)'
  };

  const formattedTime = timeSlots[booking.service_time as keyof typeof timeSlots] || booking.service_time;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Booking Alert - FreshPlus Admin</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8fafc;
            }
            .container {
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                border: 3px solid #dc2626;
            }
            .header {
                background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            .alert-badge {
                background: #fbbf24;
                color: #000;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                display: inline-block;
                margin-bottom: 15px;
                font-size: 14px;
            }
            .title {
                font-size: 24px;
                font-weight: 900;
                margin: 0;
            }
            .content {
                padding: 30px;
            }
            .booking-info {
                background: #fef3f2;
                border: 2px solid #fecaca;
                border-radius: 12px;
                padding: 25px;
                margin: 20px 0;
            }
            .customer-details {
                background: #f0f9ff;
                border: 2px solid #bae6fd;
                border-radius: 12px;
                padding: 25px;
                margin: 20px 0;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 8px 0;
                border-bottom: 1px solid #e5e7eb;
            }
            .detail-row:last-child {
                border-bottom: none;
            }
            .detail-label {
                font-weight: 600;
                color: #374151;
                flex: 1;
                min-width: 120px;
            }
            .detail-value {
                color: #1f2937;
                flex: 2;
                text-align: right;
                word-break: break-word;
            }
            .urgent {
                background: #dc2626;
                color: white;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                font-weight: bold;
                margin: 20px 0;
            }
            .action-buttons {
                text-align: center;
                margin: 25px 0;
            }
            .action-button {
                background: #dc2626;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
                margin: 10px;
                transition: all 0.3s ease;
            }
            .secondary-button {
                background: #6b7280;
            }
            .footer {
                background: #f9fafb;
                padding: 20px;
                text-align: center;
                color: #6b7280;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="alert-badge">🚨 NEW BOOKING ALERT</div>
                <h1 class="title">FreshPlus Admin Dashboard</h1>
                <p>A new booking has been submitted and requires your attention</p>
            </div>
            
            <div class="content">
                <div class="urgent">
                    ⚡ ACTION REQUIRED: Customer is expecting confirmation within 24 hours
                </div>
                
                <div class="booking-info">
                    <h3 style="color: #dc2626; margin-top: 0; margin-bottom: 15px;">📅 Booking Information</h3>
                    <div class="detail-row">
                        <span class="detail-label">Booking ID:</span>
                        <span class="detail-value"><strong>${booking.id.slice(0, 8).toUpperCase()}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Service:</span>
                        <span class="detail-value"><strong>${getServiceDisplayName(booking.service)}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Date:</span>
                        <span class="detail-value"><strong>${formattedDate}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Time:</span>
                        <span class="detail-value"><strong>${formattedTime}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Address:</span>
                        <span class="detail-value">${booking.address}</span>
                    </div>
                    ${booking.special_instructions ? `
                    <div class="detail-row">
                        <span class="detail-label">Special Instructions:</span>
                        <span class="detail-value">${booking.special_instructions}</span>
                    </div>
                    ` : ''}
                </div>
                
                <div class="customer-details">
                    <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px;">👤 Customer Details</h3>
                    <div class="detail-row">
                        <span class="detail-label">Name:</span>
                        <span class="detail-value"><strong>${booking.name}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">${booking.email}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Phone:</span>
                        <span class="detail-value"><strong>${booking.phone}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Submitted:</span>
                        <span class="detail-value">${new Date().toLocaleString('en-AU')}</span>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <a href="tel:${booking.phone.replace(/\s/g, '')}" class="action-button">📞 Call Customer</a>
                    <a href="mailto:${booking.email}" class="action-button secondary-button">✉️ Email Customer</a>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>FreshPlus Admin System</strong></p>
                <p>This is an automated notification. Please respond to the customer promptly.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Generate admin notification email for new quote
export const generateAdminQuoteNotification = (quote: QuoteData) => {
  const formattedDate = quote.preferred_date 
    ? new Date(quote.preferred_date).toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Not specified';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Quote Request - FreshPlus Admin</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8fafc;
            }
            .container {
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                border: 3px solid #059669;
            }
            .header {
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            .alert-badge {
                background: #fbbf24;
                color: #000;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                display: inline-block;
                margin-bottom: 15px;
                font-size: 14px;
            }
            .title {
                font-size: 24px;
                font-weight: 900;
                margin: 0;
            }
            .content {
                padding: 30px;
            }
            .quote-info {
                background: #f0fdf4;
                border: 2px solid #bbf7d0;
                border-radius: 12px;
                padding: 25px;
                margin: 20px 0;
            }
            .customer-details {
                background: #f0f9ff;
                border: 2px solid #bae6fd;
                border-radius: 12px;
                padding: 25px;
                margin: 20px 0;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 8px 0;
                border-bottom: 1px solid #e5e7eb;
            }
            .detail-row:last-child {
                border-bottom: none;
            }
            .detail-label {
                font-weight: 600;
                color: #374151;
                flex: 1;
                min-width: 120px;
            }
            .detail-value {
                color: #1f2937;
                flex: 2;
                text-align: right;
                word-break: break-word;
            }
            .services-list {
                text-align: right;
            }
            .service-item {
                background: #fbbf24;
                color: #000;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 600;
                display: inline-block;
                margin: 2px;
            }
            .urgent {
                background: #059669;
                color: white;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                font-weight: bold;
                margin: 20px 0;
            }
            .action-buttons {
                text-align: center;
                margin: 25px 0;
            }
            .action-button {
                background: #059669;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
                margin: 10px;
                transition: all 0.3s ease;
            }
            .secondary-button {
                background: #6b7280;
            }
            .footer {
                background: #f9fafb;
                padding: 20px;
                text-align: center;
                color: #6b7280;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="alert-badge">💰 NEW QUOTE REQUEST</div>
                <h1 class="title">FreshPlus Admin Dashboard</h1>
                <p>A new quote request has been submitted and needs your attention</p>
            </div>
            
            <div class="content">
                <div class="urgent">
                    ⏰ ACTION REQUIRED: Customer expects quote response within the day
                </div>
                
                <div class="quote-info">
                    <h3 style="color: #059669; margin-top: 0; margin-bottom: 15px;">📋 Quote Request Details</h3>
                    <div class="detail-row">
                        <span class="detail-label">Quote ID:</span>
                        <span class="detail-value"><strong>${quote.id.slice(0, 8).toUpperCase()}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Address:</span>
                        <span class="detail-value">${quote.address}, ${quote.city} ${quote.postcode}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Services Requested:</span>
                        <div class="services-list">
                            ${quote.services.map(service => `<span class="service-item">${getServiceDisplayName(service)}</span>`).join('')}
                        </div>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Preferred Date:</span>
                        <span class="detail-value">${formattedDate}</span>
                    </div>
                    ${quote.job_description ? `
                    <div class="detail-row">
                        <span class="detail-label">Job Description:</span>
                        <span class="detail-value">${quote.job_description}</span>
                    </div>
                    ` : ''}
                </div>
                
                <div class="customer-details">
                    <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px;">👤 Customer Details</h3>
                    <div class="detail-row">
                        <span class="detail-label">Name:</span>
                        <span class="detail-value"><strong>${quote.name}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">${quote.email}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Primary Phone:</span>
                        <span class="detail-value"><strong>${quote.phone1}</strong></span>
                    </div>
                    ${quote.phone2 ? `
                    <div class="detail-row">
                        <span class="detail-label">Secondary Phone:</span>
                        <span class="detail-value">${quote.phone2}</span>
                    </div>
                    ` : ''}
                    ${quote.property_type ? `
                    <div class="detail-row">
                        <span class="detail-label">Property Type:</span>
                        <span class="detail-value" style="text-transform: capitalize;"><strong>${quote.property_type.replace('-', ' ')}</strong></span>
                    </div>
                    ` : ''}
                    <div class="detail-row">
                        <span class="detail-label">Submitted:</span>
                        <span class="detail-value">${new Date().toLocaleString('en-AU')}</span>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <a href="tel:${quote.phone1.replace(/\s/g, '')}" class="action-button">📞 Call Customer</a>
                    <a href="mailto:${quote.email}" class="action-button secondary-button">✉️ Email Quote</a>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>FreshPlus Admin System</strong></p>
                <p>This is an automated notification. Please respond to the customer promptly.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Generate instant booking confirmation email for customer
export const generateInstantBookingCustomerEmail = (booking: InstantBookingData, extraServiceNames: Record<string, string>) => {
  const formattedDate = booking.preferred_date 
    ? new Date(booking.preferred_date).toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'To be confirmed';

  const timeSlots: Record<string, string> = {
    'morning': 'Morning (8AM - 12PM)',
    'afternoon': 'Afternoon (12PM - 5PM)',
    'flexible': 'Flexible - Any time'
  };

  const formattedTime = booking.preferred_time 
    ? (timeSlots[booking.preferred_time] || booking.preferred_time)
    : 'To be confirmed';

  // Format extras list
  const extrasHtml = Object.entries(booking.selected_extras)
    .filter(([_, qty]) => qty > 0)
    .map(([extraId, qty]) => {
      const name = extraServiceNames[extraId] || extraId;
      return `<div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e2e8f0;">
        <span>${name}</span>
        <span style="color: #059669; font-weight: 600;">${qty > 1 ? `x${qty}` : '✓'}</span>
      </div>`;
    }).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmed - FreshPlus</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8fafc;
            }
            .container {
                background: white;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
            }
            .logo {
                font-size: 32px;
                font-weight: 900;
                margin-bottom: 10px;
            }
            .logo .accent {
                color: #fbbf24;
            }
            .booking-id {
                background: rgba(251, 191, 36, 0.2);
                color: #fbbf24;
                padding: 10px 20px;
                border-radius: 25px;
                font-weight: bold;
                display: inline-block;
                font-size: 14px;
                margin-top: 15px;
            }
            .content {
                padding: 40px 30px;
            }
            .greeting {
                font-size: 26px;
                font-weight: bold;
                color: #059669;
                margin-bottom: 10px;
            }
            .success-badge {
                background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
                border: 2px solid #059669;
                color: #047857;
                padding: 20px;
                border-radius: 12px;
                text-align: center;
                margin: 25px 0;
                font-size: 18px;
                font-weight: 600;
            }
            .section {
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                padding: 25px;
                margin: 25px 0;
            }
            .section-title {
                color: #059669;
                font-size: 18px;
                font-weight: bold;
                margin: 0 0 20px 0;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #e2e8f0;
            }
            .detail-row:last-child {
                border-bottom: none;
            }
            .detail-label {
                font-weight: 600;
                color: #374151;
            }
            .detail-value {
                color: #1f2937;
                text-align: right;
            }
            .pricing-box {
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
                color: white;
                border-radius: 12px;
                padding: 25px;
                margin: 25px 0;
            }
            .pricing-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                opacity: 0.9;
            }
            .pricing-total {
                display: flex;
                justify-content: space-between;
                padding-top: 15px;
                margin-top: 15px;
                border-top: 2px solid rgba(255,255,255,0.3);
                font-size: 24px;
                font-weight: bold;
            }
            .savings-badge {
                background: #fbbf24;
                color: #000;
                padding: 10px 20px;
                border-radius: 8px;
                text-align: center;
                font-weight: bold;
                margin-top: 15px;
            }
            ${booking.same_day_booking ? `
            .same-day-badge {
                background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                text-align: center;
                font-weight: bold;
                margin: 15px 0;
            }
            ` : ''}
            .next-steps {
                background: #fef3c7;
                border: 2px solid #fbbf24;
                border-radius: 12px;
                padding: 25px;
                margin: 25px 0;
            }
            .contact-box {
                background: #1e3a8a;
                color: white;
                padding: 25px;
                border-radius: 12px;
                text-align: center;
                margin-top: 25px;
            }
            .contact-button {
                background: #fbbf24;
                color: #000;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
                margin: 8px;
            }
            .footer {
                background: #f8fafc;
                padding: 25px;
                text-align: center;
                color: #6b7280;
                font-size: 14px;
            }
            .trust-badges {
                display: flex;
                justify-content: center;
                gap: 15px;
                flex-wrap: wrap;
                margin: 20px 0;
            }
            .badge {
                background: #f0fdf4;
                color: #059669;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                border: 1px solid #bbf7d0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">
                    <span class="accent">Fresh</span>Plus
                </div>
                <p style="margin: 0; opacity: 0.9;">Professional Cleaning Services</p>
                <div class="booking-id">Booking #${booking.id.slice(0, 8).toUpperCase()}</div>
            </div>
            
            <div class="content">
                <div class="greeting">Hi ${booking.first_name}! 👋</div>
                <p style="color: #6b7280; margin-bottom: 0;">Thank you for choosing FreshPlus!</p>
                
                <div class="success-badge">
                    ✅ Your booking has been confirmed!
                </div>

                ${booking.same_day_booking ? `
                <div class="same-day-badge">
                    ⚡ SAME DAY SERVICE REQUESTED
                </div>
                ` : ''}
                
                <div class="section">
                    <h3 class="section-title">🏠 Service Details</h3>
                    <div class="detail-row">
                        <span class="detail-label">Service</span>
                        <span class="detail-value"><strong>${booking.service_name}</strong></span>
                    </div>
                    ${booking.service_size ? `
                    <div class="detail-row">
                        <span class="detail-label">Property Size</span>
                        <span class="detail-value">${booking.service_size} Bedroom${booking.service_size > 1 ? 's' : ''}</span>
                    </div>
                    ` : ''}
                    <div class="detail-row">
                        <span class="detail-label">Bathrooms</span>
                        <span class="detail-value">${booking.bathrooms}</span>
                    </div>
                    ${booking.property_type ? `
                    <div class="detail-row">
                        <span class="detail-label">Property Type</span>
                        <span class="detail-value" style="text-transform: capitalize;">${booking.property_type}</span>
                    </div>
                    ` : ''}
                </div>
                
                <div class="section">
                    <h3 class="section-title">📍 Address & Schedule</h3>
                    <div class="detail-row">
                        <span class="detail-label">Address</span>
                        <span class="detail-value">${booking.address}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Suburb</span>
                        <span class="detail-value">${booking.suburb} ${booking.postcode}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Preferred Date</span>
                        <span class="detail-value"><strong>${formattedDate}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Preferred Time</span>
                        <span class="detail-value">${formattedTime}</span>
                    </div>
                </div>

                ${extrasHtml || booking.bundle_selected ? `
                <div class="section">
                    <h3 class="section-title">✨ Selected Extras</h3>
                    ${booking.bundle_selected ? `
                    <div style="background: #fef3c7; padding: 12px; border-radius: 8px; margin-bottom: 15px; text-align: center;">
                        <strong>🎁 Bond Back Bundle Included</strong>
                    </div>
                    ` : ''}
                    ${extrasHtml}
                </div>
                ` : ''}
                
                <div class="pricing-box">
                    <div class="pricing-row">
                        <span>Original Price</span>
                        <span style="text-decoration: line-through; opacity: 0.7;">$${booking.original_price}</span>
                    </div>
                    ${booking.discount_amount > 0 ? `
                    <div class="pricing-row">
                        <span>Your Discount</span>
                        <span>-$${booking.discount_amount}</span>
                    </div>
                    ` : ''}
                    ${booking.same_day_booking ? `
                    <div class="pricing-row">
                        <span>Same Day Premium</span>
                        <span>+$40</span>
                    </div>
                    ` : ''}
                    <div class="pricing-total">
                        <span>Total</span>
                        <span>$${booking.final_price}</span>
                    </div>
                    ${booking.discount_amount > 0 ? `
                    <div class="savings-badge">
                        🎉 You saved $${booking.discount_amount}!
                    </div>
                    ` : ''}
                </div>
                
                <div class="next-steps">
                    <h3 style="color: #92400e; margin-top: 0;">📋 What Happens Next?</h3>
                    <p><strong>1.</strong> Our team will contact you within 24 hours to confirm details</p>
                    <p><strong>2.</strong> We'll provide an exact arrival time window</p>
                    <p><strong>3.</strong> Our professional cleaners arrive with all equipment</p>
                    <p><strong>4.</strong> Enjoy your sparkling clean home! ✨</p>
                </div>
                
                <div class="trust-badges">
                    <span class="badge">⭐ 5-Star Rated</span>
                    <span class="badge">🛡️ Fully Insured</span>
                    <span class="badge">🌿 Eco-Friendly</span>
                    <span class="badge">💯 Satisfaction Guaranteed</span>
                </div>
                
                <div class="contact-box">
                    <h3 style="margin-top: 0;">Need to Make Changes?</h3>
                    <p style="opacity: 0.9;">Contact us anytime - we're here to help!</p>
                    <a href="tel:+61403971720" class="contact-button">📞 Call Us</a>
                    <a href="mailto:infofreshplusclean@gmail.com" class="contact-button">✉️ Email Us</a>
                </div>

                ${booking.comments ? `
                <div class="section" style="margin-top: 25px;">
                    <h3 class="section-title">📝 Your Comments</h3>
                    <p style="color: #6b7280; margin: 0;">${booking.comments}</p>
                </div>
                ` : ''}
            </div>
            
            <div class="footer">
                <p><strong>Fresh Plus Professional Cleaning</strong></p>
                <p>Melbourne's Most Trusted Cleaning Service</p>
                <p style="opacity: 0.7; margin-top: 15px;">
                    This confirmation was sent to ${booking.email}
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Generate admin notification email for instant booking
export const generateInstantBookingAdminEmail = (booking: InstantBookingData, extraServiceNames: Record<string, string>) => {
  const formattedDate = booking.preferred_date 
    ? new Date(booking.preferred_date).toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Not specified';

  // Format extras list
  const extrasList = Object.entries(booking.selected_extras)
    .filter(([_, qty]) => qty > 0)
    .map(([extraId, qty]) => {
      const name = extraServiceNames[extraId] || extraId;
      return `${name}${qty > 1 ? ` x${qty}` : ''}`;
    }).join(', ') || 'None';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Instant Booking - FreshPlus Admin</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8fafc;
            }
            .container {
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                border: 3px solid #059669;
            }
            .header {
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
                color: white;
                padding: 25px;
                text-align: center;
            }
            .alert-badge {
                background: #fbbf24;
                color: #000;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                display: inline-block;
                margin-bottom: 10px;
                font-size: 14px;
            }
            .content {
                padding: 25px;
            }
            .urgent {
                background: ${booking.same_day_booking ? '#dc2626' : '#059669'};
                color: white;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                font-weight: bold;
                margin: 15px 0;
            }
            .section {
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                border-radius: 10px;
                padding: 20px;
                margin: 15px 0;
            }
            .section-title {
                color: #059669;
                font-weight: bold;
                margin: 0 0 15px 0;
                font-size: 16px;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid #e5e7eb;
            }
            .detail-row:last-child {
                border-bottom: none;
            }
            .detail-label {
                font-weight: 600;
                color: #374151;
            }
            .detail-value {
                color: #1f2937;
                text-align: right;
            }
            .price-highlight {
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
                color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                margin: 15px 0;
            }
            .price-large {
                font-size: 36px;
                font-weight: bold;
            }
            .action-buttons {
                text-align: center;
                margin: 20px 0;
            }
            .action-button {
                background: #059669;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
                margin: 5px;
            }
            .secondary {
                background: #6b7280;
            }
            .footer {
                background: #f9fafb;
                padding: 15px;
                text-align: center;
                color: #6b7280;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="alert-badge">⚡ NEW INSTANT BOOKING</div>
                <h1 style="margin: 0; font-size: 22px;">FreshPlus Admin</h1>
            </div>
            
            <div class="content">
                <div class="urgent">
                    ${booking.same_day_booking 
                      ? '🚨 SAME DAY BOOKING - URGENT ACTION REQUIRED!' 
                      : '📋 New booking received - Contact customer within 24hrs'}
                </div>
                
                <div class="price-highlight">
                    <div style="opacity: 0.8; font-size: 14px;">Booking Value</div>
                    <div class="price-large">$${booking.final_price}</div>
                    <div style="opacity: 0.8; font-size: 14px;">Saved customer $${booking.discount_amount}</div>
                </div>
                
                <div class="section">
                    <div class="section-title">👤 Customer Details</div>
                    <div class="detail-row">
                        <span class="detail-label">Name</span>
                        <span class="detail-value"><strong>${booking.first_name} ${booking.last_name}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Phone</span>
                        <span class="detail-value"><strong>${booking.phone}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Email</span>
                        <span class="detail-value">${booking.email}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Address</span>
                        <span class="detail-value">${booking.address}, ${booking.suburb} ${booking.postcode}</span>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">🏠 Service Details</div>
                    <div class="detail-row">
                        <span class="detail-label">Service</span>
                        <span class="detail-value"><strong>${booking.service_name}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Type</span>
                        <span class="detail-value" style="text-transform: capitalize;">${booking.service_type.replace(/-/g, ' ')}</span>
                    </div>
                    ${booking.service_size ? `
                    <div class="detail-row">
                        <span class="detail-label">Bedrooms</span>
                        <span class="detail-value">${booking.service_size}</span>
                    </div>
                    ` : ''}
                    <div class="detail-row">
                        <span class="detail-label">Bathrooms</span>
                        <span class="detail-value">${booking.bathrooms}</span>
                    </div>
                    ${booking.property_type ? `
                    <div class="detail-row">
                        <span class="detail-label">Property Type</span>
                        <span class="detail-value" style="text-transform: capitalize;">${booking.property_type}</span>
                    </div>
                    ` : ''}
                    ${booking.furnished ? `
                    <div class="detail-row">
                        <span class="detail-label">Furnished</span>
                        <span class="detail-value" style="text-transform: capitalize;">${booking.furnished}</span>
                    </div>
                    ` : ''}
                </div>
                
                <div class="section">
                    <div class="section-title">📅 Schedule</div>
                    <div class="detail-row">
                        <span class="detail-label">Preferred Date</span>
                        <span class="detail-value"><strong>${formattedDate}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Preferred Time</span>
                        <span class="detail-value">${booking.preferred_time || 'Flexible'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Same Day</span>
                        <span class="detail-value" style="color: ${booking.same_day_booking ? '#dc2626' : '#059669'}; font-weight: bold;">
                            ${booking.same_day_booking ? 'YES (+$40)' : 'No'}
                        </span>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">✨ Extras & Pricing</div>
                    <div class="detail-row">
                        <span class="detail-label">Bundle Selected</span>
                        <span class="detail-value">${booking.bundle_selected ? '✅ Bond Back Bundle' : 'No'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Individual Extras</span>
                        <span class="detail-value">${extrasList}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Original Price</span>
                        <span class="detail-value">$${booking.original_price}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Discount Given</span>
                        <span class="detail-value" style="color: #059669;">-$${booking.discount_amount}</span>
                    </div>
                    <div class="detail-row" style="background: #d1fae5; margin: 10px -20px -20px; padding: 15px 20px; border-radius: 0 0 8px 8px;">
                        <span class="detail-label" style="font-size: 18px;">FINAL PRICE</span>
                        <span class="detail-value" style="font-size: 18px; font-weight: bold; color: #059669;">$${booking.final_price}</span>
                    </div>
                </div>

                ${booking.comments ? `
                <div class="section">
                    <div class="section-title">📝 Customer Comments</div>
                    <p style="margin: 0; color: #6b7280;">${booking.comments}</p>
                </div>
                ` : ''}
                
                <div class="action-buttons">
                    <a href="tel:${booking.phone.replace(/\s/g, '')}" class="action-button">📞 Call Customer</a>
                    <a href="mailto:${booking.email}" class="action-button secondary">✉️ Email Customer</a>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Booking ID:</strong> ${booking.id}</p>
                <p>FreshPlus Admin System • ${new Date().toLocaleString('en-AU')}</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Send instant booking confirmation emails
export const sendInstantBookingEmails = async (booking: InstantBookingData, extraServiceNames: Record<string, string>) => {
  console.log('📧 Sending instant booking emails for:', booking.first_name, booking.last_name, '- Service:', booking.service_name);
  
  try {
    // Use Supabase Edge Function for server-side email dispatch
    const { data: edgeData, error: edgeError } = await supabase.functions.invoke('email-dispatch', {
      body: { 
        type: 'instant_booking', 
        booking, 
        extraServiceNames,
        adminEmail: ADMIN_EMAIL 
      }
    });

    if (edgeError) {
      console.error('❌ Edge function instant booking email error:', edgeError);
      throw new Error(`Edge function failed: ${edgeError.message || JSON.stringify(edgeError)}`);
    }
    
    if (edgeData?.success) {
      console.log('✅ Instant booking emails sent via Edge Function:', edgeData);
      return { success: true, customerEmail: edgeData.customer, adminEmail: edgeData.admin };
    } else {
      console.error('❌ Edge function returned unsuccessful result:', edgeData);
      throw new Error(`Edge function returned error: ${edgeData?.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('❌ Error sending instant booking emails:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error', details: error };
  }
};

// Send booking confirmation email to customer and admin notification
export const sendBookingEmails = async (booking: BookingData) => {
  console.log('📧 Attempting to send booking emails for:', booking.name, '- Service:', getServiceDisplayName(booking.service));
  
  try {
    // Use Supabase Edge Function for server-side email dispatch (avoids CORS issues)
    const { data: edgeData, error: edgeError } = await supabase.functions.invoke('email-dispatch', {
      body: { type: 'booking', booking, adminEmail: ADMIN_EMAIL }
    });

    if (edgeError) {
      console.error('❌ Edge function booking email error:', edgeError);
      throw new Error(`Edge function failed: ${edgeError.message || JSON.stringify(edgeError)}`);
    }
    
    if (edgeData?.success) {
      console.log('✅ Booking emails sent via Edge Function:', edgeData);
      console.log('🎉 All booking emails sent successfully!');
      return { success: true, customerEmail: edgeData.customer, adminEmail: edgeData.admin };
    } else {
      console.error('❌ Edge function returned unsuccessful result:', edgeData);
      throw new Error(`Edge function returned error: ${edgeData?.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('❌ Error sending booking emails:', error);
    console.error('📋 Booking data:', JSON.stringify(booking, null, 2));
    
    // Detailed error information
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error', details: error };
  }
};

// Send quote confirmation email to customer and admin notification
export const sendQuoteEmails = async (quote: QuoteData) => {
  console.log('📧 Attempting to send quote emails for:', quote.name, '- Services:', quote.services.map(service => getServiceDisplayName(service)).join(', '));
  
  try {
    // Use Supabase Edge Function for server-side email dispatch (avoids CORS issues)
    const { data: edgeData, error: edgeError } = await supabase.functions.invoke('email-dispatch', {
      body: { type: 'quote', quote, adminEmail: ADMIN_EMAIL }
    });

    if (edgeError) {
      console.error('❌ Edge function quote email error:', edgeError);
      throw new Error(`Edge function failed: ${edgeError.message || JSON.stringify(edgeError)}`);
    }
    
    if (edgeData?.success) {
      console.log('✅ Quote emails sent via Edge Function:', edgeData);
      console.log('🎉 All quote emails sent successfully!');
      return { success: true, customerEmail: edgeData.customer, adminEmail: edgeData.admin };
    } else {
      console.error('❌ Edge function returned unsuccessful result:', edgeData);
      throw new Error(`Edge function returned error: ${edgeData?.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('❌ Error sending quote emails:', error);
    console.error('📋 Quote data:', JSON.stringify(quote, null, 2));
    
    // Detailed error information
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error', details: error };
  }
};

// Send contact form notification to admin
export const sendContactEmails = async (contact: ContactData) => {
  console.log('📧 Attempting to send contact emails for:', contact.name, '- Subject:', contact.subject);
  
  try {
    // Use Supabase Edge Function for server-side email dispatch (avoids CORS issues)
    const { data: edgeData, error: edgeError } = await supabase.functions.invoke('email-dispatch', {
      body: { type: 'contact', contact, adminEmail: ADMIN_EMAIL }
    });

    if (edgeError) {
      console.error('❌ Edge function contact email error:', edgeError);
      throw new Error(`Edge function failed: ${edgeError.message || JSON.stringify(edgeError)}`);
    }
    
    if (edgeData?.success) {
      console.log('✅ Contact emails sent via Edge Function:', edgeData);
      console.log('🎉 All contact emails sent successfully!');
      return { success: true, customerEmail: edgeData.customer, adminEmail: edgeData.admin };
    } else {
      console.error('❌ Edge function returned unsuccessful result:', edgeData);
      throw new Error(`Edge function returned error: ${edgeData?.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('❌ Error sending contact emails:', error);
    console.error('📋 Contact data:', JSON.stringify(contact, null, 2));
    
    // Detailed error information
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error', details: error };
  }
};

// Update admin email (to be called when you provide the actual admin email)
export const updateAdminEmail = (newAdminEmail: string) => {
  // This function would be used to update the admin email
  // For now, you'll need to manually update the ADMIN_EMAIL constant above
  console.log(`Admin email should be updated to: ${newAdminEmail}`);
};
