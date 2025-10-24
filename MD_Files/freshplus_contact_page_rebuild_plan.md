SYSTEM PROMPT

You are a professional front-end and UX engineer optimizing the Fresh Plus Cleaning Services Melbourne Quote / Booking page.
Your goal is to redesign this form for clarity, trust, and conversion while maintaining brand consistency with the homepage.
Follow the Plan → Implement → Review structure.

# Plan
Rebuild the Contact page to match brand tone and flow used in Residential and Thank You pages.

## Objectives
- Fix meta title and schema
- Simplify layout
- Add reassurance messaging
- Use professional, local tone

# Implement
1. **File Path**
   app/contact/page.tsx

2. **Structure**
   - Hero section (title, subtext, CTA)
   - Contact options grid (call, SMS, email)
   - Service area section
   - Form section (name, email, phone, subject, message)
   - Final CTA footer

3. **Code Example**
   ```tsx
   export default function ContactPage() {
     return (
       <main className="min-h-screen bg-gray-50">
         <section className="text-center py-16 bg-white shadow-sm">
           <h1 className="text-4xl font-semibold text-gray-900">Contact Fresh Plus Cleaning Melbourne</h1>
           <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
             We’re here to help you book, ask, or plan your next cleaning service. Our Melbourne support team responds within 1 hour during business hours.
           </p>
           <div className="mt-6 flex justify-center gap-4">
             <a href="tel:+61403971720" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Call 0403 971 720</a>
             <a href="/quote" className="text-blue-600 font-medium">Get Free Quote</a>
           </div>
         </section>

         <section className="py-12 max-w-screen-lg mx-auto grid md:grid-cols-3 gap-6 text-center">
           {[
             {title: "Call Us", value: "+61 403 971 720", desc: "Speak directly with our Melbourne team between 7AM–7PM."},
             {title: "Text Us", value: "+61 403 971 720", desc: "Quick replies for short or urgent requests."},
             {title: "Email Us", value: "infofreshplusclean@gmail.com", desc: "Ideal for detailed service inquiries."}
           ].map(({title,value,desc})=>(
             <div key={title} className="bg-white p-6 rounded-xl shadow text-gray-700">
               <h2 className="font-semibold text-lg mb-2">{title}</h2>
               <p className="text-blue-600 font-medium">{value}</p>
               <p className="text-sm text-gray-600 mt-2">{desc}</p>
             </div>
           ))}
         </section>

         <section className="text-center py-8 bg-gray-100">
           <p className="text-gray-700">Melbourne, VIC — all suburbs covered.</p>
         </section>

         <section className="py-16 max-w-screen-md mx-auto">
           <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Send Us a Message</h2>
           <p className="text-gray-600 text-center mb-8">Complete the form b
SEO

Title: “Contact Fresh Plus Cleaning Melbourne | Book Your Service Today”

Description: “Get in touch with Fresh Plus Cleaning. Melbourne’s trusted team for home and commercial cleaning. Call 0403 971 720 or request a free quote.”

Schema: ContactPage, LocalBusiness

Also Contact us Page is missing Footer so add it and keep the branding consistent