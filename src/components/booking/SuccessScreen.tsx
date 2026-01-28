import { CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessScreenProps {
  firstName: string;
  total: number;
  onReset: () => void;
}

export function SuccessScreen({ firstName, total, onReset }: SuccessScreenProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Booking Request Received!</h1>
          <p className="text-muted-foreground">
            Thanks {firstName}! We&apos;ll call you within 2 hours to confirm your cleaning at{" "}
            <span className="font-semibold text-emerald-600">${total.toFixed(2)}</span>.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-muted/50 border">
          <div className="flex items-center justify-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-emerald-600" />
            <span>Expect a call from Fresh Plus Cleaning to confirm your booking details.</span>
          </div>
        </div>

        <Button onClick={onReset} variant="outline" size="lg" className="mt-4 bg-transparent">
          Book another clean
        </Button>
      </div>
    </div>
  );
}
