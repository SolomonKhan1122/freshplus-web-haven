import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { sendContactEmails } from "@/lib/emailService";
import { Send, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Insert into Supabase contact_messages table
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{
          name: values.name,
          email: values.email,
          phone: values.phone || null,
          subject: values.subject,
          message: values.message,
          status: 'unread'
        }])
        .select();

      if (error) {
        console.error('Supabase error details:', error);
        toast.error(`Failed to send message: ${error.message}. Please try again.`);
        return;
      }

      console.log("Contact message submitted successfully:", data);
      
      // Send admin notification email
      if (data && data[0]) {
        console.log("📧 Sending contact notification emails...");
        const emailResult = await sendContactEmails({
          id: data[0].id,
          name: data[0].name,
          email: data[0].email,
          phone: data[0].phone,
          subject: data[0].subject,
          message: data[0].message,
        });

        if (emailResult.success) {
          console.log("✅ Contact notification emails sent successfully");
        } else {
          console.error("❌ Failed to send contact notification emails:", emailResult.error);
          // Don't fail the form submission if email fails, just log it
        }
      }
      
      // Navigate to thank you page with contact type
      navigate(`/thank-you?type=contact&name=${encodeURIComponent(values.name)}&source=contact-form`);
      
    } catch (error) {
      console.error('Error submitting contact message:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Contact Information Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Contact Information</h3>
              <p className="text-sm text-gray-500">How should we reach you?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input 
                        className="bg-white"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile *</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel"
                        className="bg-white"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      className="bg-white"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Message Details Section */}
          <div className="space-y-6 pt-6 border-t border-gray-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Message Details</h3>
              <p className="text-sm text-gray-500">Tell us how we can help</p>
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject *</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-white"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message *</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[150px] bg-white resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <Button 
              type="submit" 
              size="lg"
              className="w-full bg-accent hover:bg-accent-dark text-black font-semibold text-lg py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              We typically respond within 1 hour during business hours (7AM-7PM)
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
