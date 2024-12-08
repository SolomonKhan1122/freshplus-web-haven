import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection = ({ title, children, className }: FormSectionProps) => (
  <div className={cn("space-y-4", className)}>
    <h3 className="text-lg font-semibold text-primary">{title}</h3>
    {children}
  </div>
);