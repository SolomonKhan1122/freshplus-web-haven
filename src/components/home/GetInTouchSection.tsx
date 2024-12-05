import { Phone, MessageSquare } from "lucide-react";

const GetInTouchSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary mb-8">
          Get In Touch
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="tel:+61400000000"
            className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-colors"
          >
            <Phone size={20} /> Call Us
          </a>
          <a
            href="sms:+61400000000?body=Hi, I'm interested in your cleaning services."
            className="flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-md border border-primary hover:bg-primary-light transition-colors"
          >
            <MessageSquare size={20} /> Text Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;