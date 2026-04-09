import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustSection from "@/components/TrustSection";
import Pricing from "@/components/Pricing";
import DashboardResultsSection from "@/components/DashboardResultsSection";
import MarketingBreakdown from "@/components/MarketingBreakdown";
import WhatsAppTestimonials from "@/components/WhatsAppTestimonials";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";

const PerformanceMarketing = () => {
  return (
    <>
      <Helmet>
        <title>Performance Marketing Agency | DiziGroww</title>
        <meta name="description" content="Data-heavy ad campaigns targeting high-intent demographics pushing pure ROAS." />
      </Helmet>
      
      <Navbar />
      
      {/* Container for Z-Axis Stacking Scroll */}
      <main className="relative pb-24">
        
        {/* Layer 0: The Hook / Hero */}
        <section className="sticky top-[80px] z-[1] min-h-[85vh] flex flex-col justify-center bg-background overflow-hidden border-b border-border/50">
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
        <div className="sticky top-[100px] z-[2] bg-background shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.1)] pt-12 pb-8 rounded-t-[3rem] border-t border-border">
          <TrustSection />
        </div>

        {/* Layer 2: The Core Breakdown */}
        <div className="sticky top-[120px] z-[3] bg-[#f8f9fc] dark:bg-black shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.2)] rounded-t-[3rem] border-t border-border">
          <MarketingBreakdown />
        </div>

        {/* Layer 3: Unarguable Results */}
        <div className="sticky top-[140px] z-[4] bg-background shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.3)] rounded-t-[3rem] border-t border-border">
          <DashboardResultsSection />
        </div>

        {/* Layer 4: Raw Social Proof */}
        <div className="sticky top-[160px] z-[5] bg-secondary shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.4)] rounded-t-[3rem] border-t border-border">
          <WhatsAppTestimonials />
        </div>

        {/* Layer 5: The Final Pitch & Pricing */}
        <div className="sticky top-[180px] z-[6] bg-background shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.5)] rounded-t-[3rem] border-t-2 border-primary/20 pt-16">
          <div className="text-center mb-8 px-4">
             <h2 className="text-3xl md:text-5xl font-black mb-4">Start Scaling Today</h2>
             <p className="text-muted-foreground text-lg">Pick a plan and book your onboarding call directly below.</p>
          </div>
          <Pricing />
        </div>

      </main>
      
      {/* Footer remains at absolute bottom of scroll flow */}
      <div className="relative z-10 bg-background">
         <Footer />
      </div>
    </>
  );
};

export default PerformanceMarketing;
