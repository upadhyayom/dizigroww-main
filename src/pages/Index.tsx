import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Pricing from "@/components/Pricing";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import GoogleReviews from "@/components/GoogleReviews";
import DashboardResultsSection from "@/components/DashboardResultsSection";
import NetworkStats from "@/components/NetworkStats";
import TrustedBrands from "@/components/TrustedBrands";
import PerformanceMarketingGlimpse from "@/components/PerformanceMarketingGlimpse";
import WebDevelopmentGlimpse from "@/components/WebDevelopmentGlimpse";
import MarketingBreakdown from "@/components/MarketingBreakdown";
import HowItWorks from "@/components/HowItWorks";
import WhatsAppTestimonials from "@/components/WhatsAppTestimonials";
import { useMeta } from "@/hooks/useMeta";

const Index = () => {
  useMeta({
    title: "DiziGroww | Web Development & Performance Marketing | UAE, Singapore & India",
    description: "We Build High-Converting Websites & Run Ads That Actually Grow Your Business.",
    canonicalUrl: "https://dizigroww.in/"
  });

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustedBrands />
        
        <PerformanceMarketingGlimpse />
        <WebDevelopmentGlimpse />
        
        <NetworkStats />
        <HowItWorks />
        
        <MarketingBreakdown />
        <DashboardResultsSection />
        <WhatsAppTestimonials />
        
        <WhyChooseUs />
        <GoogleReviews />
        
        <Pricing />
        
        <LeadForm />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default Index;
