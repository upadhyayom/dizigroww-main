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
    title: "DiziGroww | #1 Performance Marketing & Web Development Agency | India, UAE, Singapore",
    description: "DiziGroww is a top-rated performance marketing & web development agency. We build high-converting Shopify, WordPress & React websites and scale brands with Meta Ads & Google Ads across India, UAE & Singapore. 50+ clients served globally.",
    keywords: "performance marketing agency, web development agency, shopify development, wordpress development, meta ads agency, google ads agency, CRO agency, digital marketing India, digital marketing Dubai, digital marketing Singapore, landing page design, DiziGroww",
    canonicalUrl: "https://dizigroww.in/",
    ogImage: "https://dizigroww.in/logo.png"
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
