# Booking Form Component

This is a multi-step booking form component integrated from v0.dev. It provides a modern, user-friendly interface for booking cleaning services with instant pricing.

## Features

- **Multi-step form** with progress indicator
- **Instant quote calculation** based on service selection
- **Service selection** with home size options
- **Frequency selection** with discount options
- **Extras/add-ons** with categorized options
- **Contact information** collection
- **Address and details** collection
- **Real-time price summary** sidebar
- **Success screen** after submission

## Usage

### Basic Usage

```tsx
import { BookingForm } from "@/components/booking/BookingForm";

function MyPage() {
  return <BookingForm />;
}
```

### With Navigation and Footer

```tsx
import { BookingForm } from "@/components/booking/BookingForm";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

function BookingPage() {
  return (
    <>
      <Navigation />
      <BookingForm />
      <Footer />
    </>
  );
}
```

## Integration with Backend

The form currently uses a mock submission. To integrate with your backend:

1. Open `src/components/booking/BookingForm.tsx`
2. Find the `handleContinue` function
3. Replace the `setTimeout` mock with your actual API call:

```tsx
const handleContinue = async () => {
  if (formState.currentStep < 3) {
    setFormState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
  } else {
    setFormState((prev) => ({ ...prev, isSubmitting: true }));
    
    try {
      // Replace with your actual API call
      await sendBookingToBackend(formState);
      
      setFormState((prev) => ({ ...prev, isSubmitting: false, isComplete: true }));
    } catch (error) {
      // Handle error
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  }
};
```

## Customization

### Update Pricing

Edit `src/lib/pricing-data.ts` to modify:
- Service options and prices
- Frequency options and discounts
- Extra services and categories

### Update Form Fields

- Step 1: `src/components/booking/steps/StepOne.tsx`
- Step 2: `src/components/booking/steps/StepTwo.tsx`
- Step 3: `src/components/booking/steps/StepThree.tsx`

### Styling

The form uses Tailwind CSS and shadcn/ui components. Customize styles by modifying the className props in the component files.

## Components Structure

```
src/components/booking/
├── BookingForm.tsx          # Main form component
├── StepIndicator.tsx         # Progress indicator
├── PriceSummary.tsx         # Price calculation and display
├── SuccessScreen.tsx        # Success state
└── steps/
    ├── StepOne.tsx          # Service selection step
    ├── StepTwo.tsx          # Contact information step
    └── StepThree.tsx        # Address and details step
```

## Form State

The form state is managed using React's `useState` hook. The state structure is defined in `src/lib/pricing-data.ts`:

```typescript
interface FormState {
  selectedService: string | null;
  hours: number;
  selectedFrequency: string;
  selectedExtras: Record<string, number>;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  smsOptIn: boolean;
  firstName: string;
  lastName: string;
  address: string;
  suburb: string;
  postcode: string;
  hasPets: string;
  accessMethod: string;
  parking: string;
  comments: string;
  currentStep: number;
  showExtras: boolean;
  isSubmitting: boolean;
  isComplete: boolean;
}
```

## Adding to Routes

To add this form to your app routes, update `src/App.tsx`:

```tsx
import BookingFormPage from "./pages/BookingFormPage";

// In your Routes:
<Route path="/booking" element={<BookingFormPage />} />
```
