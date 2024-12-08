import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { ContactFields } from "@/components/forms/ContactFields";
import { ServiceSelection } from "@/components/forms/ServiceSelection";
import { AddressField } from "@/components/forms/AddressField";
import { FormSection } from "@/components/forms/FormSection";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  service: z.string().min(1, "Please select a service"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Quote = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      address: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("Quote request submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <Navigation />
      <div className="max-w-4xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold text-primary mb-4">Get a Free Quote</h1>
          <p className="text-gray-600">Fill out the form below and we'll get back to you with a quote within 24 hours.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 animate-fade-up">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ContactFields control={form.control} />
              <ServiceSelection control={form.control} />
              <AddressField control={form.control} />
              <FormSection title="Additional Information">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        placeholder="Please provide any additional details about your cleaning needs..."
                        className="min-h-[100px]"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormSection>
              <Button type="submit" className="w-full">Submit Quote Request</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Quote;