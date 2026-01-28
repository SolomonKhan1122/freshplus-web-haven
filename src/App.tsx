import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
// Quote form has been archived - now redirects to InstantQuote
// import Quote from "./pages/archived/Quote";
import Book from "./pages/Book";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import LicensedInsured from "./pages/LicensedInsured";
import EndOfLeaseCleaning from "./pages/EndOfLeaseCleaning";
import TileGroutCleaning from "./pages/TileGroutCleaning";
import CarpetCleaning from "./pages/CarpetCleaning";
import ResidentialCleaning from "./pages/ResidentialCleaning";
import CommercialCleaning from "./pages/CommercialCleaning";
import DeepCleaning from "./pages/DeepCleaning";
import SolarPanelCleaning from "./pages/SolarPanelCleaning";
import PressureWashing from "./pages/PressureWashing";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import QuotesList from "./pages/QuotesList";
import SimpleAdmin from "./pages/SimpleAdmin";
// Legacy admin imports (kept for reference)
// import AdminLogin from "./pages/admin/AdminLogin";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminInstantBookings from "./pages/admin/AdminInstantBookings";
// import AdminBookings from "./pages/admin/AdminBookings";
// import AdminQuotes from "./pages/admin/AdminQuotes";
// import AdminContacts from "./pages/admin/AdminContacts";

// New v2 Admin imports
import LoginPage from "./pages/admin/v2/LoginPage";
import DashboardPage from "./pages/admin/v2/DashboardPage";
import BookingsPage from "./pages/admin/v2/BookingsPage";
import BookingDetailPage from "./pages/admin/v2/BookingDetailPage";
import CleanersPage from "./pages/admin/v2/CleanersPage";
import CleanerDetailPage from "./pages/admin/v2/CleanerDetailPage";
import CustomersPage from "./pages/admin/v2/CustomersPage";
import CustomerDetailPage from "./pages/admin/v2/CustomerDetailPage";
import AnalyticsPage from "./pages/admin/v2/AnalyticsPage";
import SettingsPage from "./pages/admin/v2/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PressureWashingLanding from "./pages/PressureWashingLanding";
import TileGroutCleaningLanding from "./pages/TileGroutCleaningLanding";
import EndOfLeaseCleaningLanding from "./pages/EndOfLeaseCleaningLanding";
import ThankYou from "./pages/ThankYou";
import InstantQuote from "./pages/InstantQuote";
import GoogleAnalyticsTracker from "./components/GoogleAnalyticsTracker";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <GoogleAnalyticsTracker />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/services/:service" element={<Services />} />
            <Route path="/services/end-of-lease" element={<EndOfLeaseCleaning />} />
            <Route path="/services/tile-grout" element={<TileGroutCleaning />} />
            <Route path="/services/carpet" element={<CarpetCleaning />} />
            <Route path="/services/residential" element={<ResidentialCleaning />} />
            <Route path="/services/commercial" element={<CommercialCleaning />} />
            <Route path="/services/deep-cleaning" element={<DeepCleaning />} />
            <Route path="/services/solar-panel" element={<SolarPanelCleaning />} />
            <Route path="/services/pressure-washing" element={<PressureWashing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/get-quote" element={<InstantQuote />} />
            {/* Old quote form archived - redirect to instant pricing */}
            <Route path="/quote" element={<Navigate to="/get-quote" replace />} />
            <Route path="/book" element={<Book />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/licensed-insured" element={<LicensedInsured />} />
            <Route path="/admin/quotes-list" element={<QuotesList />} />
            <Route path="/admin/simple" element={<SimpleAdmin />} />
            
            {/* Landing Pages for Google Ads */}
            <Route path="/pressure-washing" element={<PressureWashingLanding />} />
            <Route path="/tile-grout" element={<TileGroutCleaningLanding />} />
            <Route path="/tile-grout-cleaning" element={<TileGroutCleaningLanding />} />
            <Route path="/end-of-lease" element={<EndOfLeaseCleaningLanding />} />
            <Route path="/end-of-lease-cleaning" element={<EndOfLeaseCleaningLanding />} />
            
            {/* Thank You Page for Conversion Tracking */}
            <Route path="/thank-you" element={<ThankYou />} />
            
            {/* Admin Routes - New v2 Dashboard */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/instant-bookings" element={
              <ProtectedRoute>
                <BookingsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/booking/:id" element={
              <ProtectedRoute>
                <BookingDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/cleaners" element={
              <ProtectedRoute>
                <CleanersPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/cleaner/:id" element={
              <ProtectedRoute>
                <CleanerDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/customers" element={
              <ProtectedRoute>
                <CustomersPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/customer/:id" element={
              <ProtectedRoute>
                <CustomerDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/contacts" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/bookings" element={<Navigate to="/admin/instant-bookings" replace />} />
            <Route path="/admin/quotes" element={<Navigate to="/admin/instant-bookings" replace />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;