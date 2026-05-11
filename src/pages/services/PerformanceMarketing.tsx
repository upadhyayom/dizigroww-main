import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustSection from "@/components/TrustSection";
import Pricing from "@/components/Pricing";
import DashboardResultsSection from "@/components/DashboardResultsSection";
import MarketingBreakdown from "@/components/MarketingBreakdown";
import WhatsAppTestimonials from "@/components/WhatsAppTestimonials";
import { ArrowRight } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";

const PerformanceMarketing = () => {
  useMeta({
    title: "Performance Marketing Agency | Meta Ads & Google Ads | DiziGroww",
    description: "DiziGroww is a top-rated performance marketing agency managing $4M+ in Meta and Google ad spend with 350% average ROI. We engineer end-to-end conversion funnels for D2C and service brands across India, UAE & Singapore.",
    keywords: "performance marketing agency, meta ads agency, google ads agency, paid media agency, D2C marketing, ecommerce ads, ROAS, performance marketing India, performance marketing Dubai",
    canonicalUrl: "https://dizigroww.in/services/performance-marketing",
    ogImage: "https://dizigroww.in/logo.png"
  });
  return (
    <>
      <Navbar />
      
      {/* Container without Z-Axis Stacking */}
      <main className="pt-20">
        
        {/* Layer 0: The Hook / Hero */}
        <section className="relative min-h-[85vh] flex flex-col justify-center bg-background overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none w-[600px] h-[600px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
          <div className="container-main relative z-10 text-center flex flex-col items-center">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-xs tracking-widest uppercase mb-8 shadow-sm">
               The Conversion Engine
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-black text-foreground mb-8 tracking-tighter leading-[1.05] drop-shadow-sm max-w-5xl">
              Stop Paying Agencies <br/>
              <span className="text-primary">For Meaningless Traffic.</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              We deploy sophisticated Meta and Google Ads campaigns focused entirely on pure ROAS. We don't track clicks, we track sales.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <a href="/contact" className="w-full sm:w-auto">
                <button aria-label="Book a Free Call" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-foreground hover:bg-foreground/90 text-background px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  Scale Your Revenue <ArrowRight className="w-5 h-5"/>
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Layer 1: The Trust Validation */}
        <TrustSection />

        {/* Layer 2: The Core Breakdown */}
        <MarketingBreakdown />

        {/* Layer 3: Unarguable Results */}
        <DashboardResultsSection />

        {/* Layer 4: Raw Social Proof */}
        <WhatsAppTestimonials />

        {/* Layer 5: The Final Pitch & Pricing */}
        <section className="bg-background pt-16">
          <div className="text-center mb-8 px-4">
             <h2 className="text-3xl md:text-5xl font-black mb-4">Start Scaling Today</h2>
             <p className="text-muted-foreground text-lg">Pick a plan and book your onboarding call directly below.</p>
          </div>
          <Pricing />
        </section>

      </main>
      
      {/* Footer remains at absolute bottom of scroll flow */}
      <div className="relative z-10 bg-background">
         <Footer />
      </div>
    </>
  );
};

export default PerformanceMarketing;
