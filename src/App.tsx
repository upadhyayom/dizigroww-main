import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Services from "./pages/Services.tsx";
import Contact from "./pages/Contact.tsx";
import Careers from "./pages/Careers.tsx";
import NotFound from "./pages/NotFound.tsx";
import StarterPlan from "./pages/StarterPlan.tsx";
import ThankYou from "./pages/ThankYou.tsx";
import ProposalGenerator from "./pages/ProposalGenerator.tsx";
import Internships from "./pages/Internships.tsx";
import WebDevDubai from "./pages/WebDevDubai.tsx";
import WebDevSingapore from "./pages/WebDevSingapore.tsx";
import WebDevelopment from "./pages/WebDevelopment.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import ShopifyDevelopment from "./pages/services/ShopifyDevelopment.tsx";
import WordPressDevelopment from "./pages/services/WordPressDevelopment.tsx";
import LandingPageDesign from "./pages/services/LandingPageDesign.tsx";
import WebsiteRedesignCRO from "./pages/services/WebsiteRedesignCRO.tsx";
import PerformanceMarketing from "./pages/services/PerformanceMarketing.tsx";
import CookieBanner from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/react";
import { ScrollToHash } from "@/components/ScrollToHash";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/starter-plan" element={<StarterPlan />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/proposal-generator" element={<ProposalGenerator />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/web-development" element={<WebDevelopment />} />
          <Route path="/web-development-dubai" element={<WebDevDubai />} />
          <Route path="/web-development-singapore" element={<WebDevSingapore />} />
          <Route path="/services/shopify-development" element={<ShopifyDevelopment />} />
          <Route path="/services/wordpress-development" element={<WordPressDevelopment />} />
          <Route path="/services/landing-page-design" element={<LandingPageDesign />} />
          <Route path="/services/website-redesign-cro" element={<WebsiteRedesignCRO />} />
          <Route path="/services/performance-marketing" element={<PerformanceMarketing />} />
          <Route path="/careers/internships" element={<Internships />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieBanner />
        <Analytics />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
