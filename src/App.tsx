import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Quote from "./pages/Quote";
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
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import QuotesList from "./pages/QuotesList";
import SimpleAdmin from "./pages/SimpleAdmin";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminQuotes from "./pages/admin/AdminQuotes";
import AdminContacts from "./pages/admin/AdminContacts";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/book" element={<Book />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/licensed-insured" element={<LicensedInsured />} />
            <Route path="/admin/quotes-list" element={<QuotesList />} />
            <Route path="/admin/simple" element={<SimpleAdmin />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/bookings" element={
              <ProtectedRoute>
                <AdminBookings />
              </ProtectedRoute>
            } />
            <Route path="/admin/quotes" element={
              <ProtectedRoute>
                <AdminQuotes />
              </ProtectedRoute>
            } />
            <Route path="/admin/contacts" element={
              <ProtectedRoute>
                <AdminContacts />
              </ProtectedRoute>
            } />
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