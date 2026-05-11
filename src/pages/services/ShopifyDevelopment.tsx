import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustSection from "@/components/TrustSection";
import Pricing from "@/components/Pricing";
import WebDevelopmentGlimpse from "@/components/WebDevelopmentGlimpse";
import MarketingBreakdown from "@/components/MarketingBreakdown";
import { ArrowRight } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";

const ShopifyDevelopment = () => {
  useMeta({
    title: "Shopify Development Agency | Custom Stores Built to Convert | DiziGroww",
    description: "Enterprise-grade Shopify development. Custom themes, conversion-optimised product pages, advanced apps and CRO baked in. Trusted by 50+ D2C brands globally.",
    keywords: "shopify development agency, shopify expert, custom shopify themes, shopify CRO, ecommerce development, shopify developer India, shopify developer Dubai",
    canonicalUrl: "https://dizigroww.in/services/shopify-development",
    ogImage: "https://dizigroww.in/logo.png"
  });
  return (
    <>
      <Navbar />
      
      <main className="pt-20">
        
        {/* Layer 0: Action Hero */}
        <section className="relative min-h-[85vh] flex flex-col justify-center bg-background overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none w-[600px] h-[600px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
          <div className="container-main relative z-10 text-center flex flex-col items-center">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-xs tracking-widest uppercase mb-8 shadow-sm">
               Enterprise E-Commerce
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-black text-foreground mb-8 tracking-tighter leading-[1.05] drop-shadow-sm max-w-5xl">
              Stop Building Websites. <br/>
              <span className="text-primary">Start Building Funnels.</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              We design and develop high-converting Shopify stores architected purely for buying psychology, sub-second load times, and maximum ROAS.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <a href="/contact" className="w-full sm:w-auto">
                <button aria-label="Book a Free Call" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-foreground hover:bg-foreground/90 text-background px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  Build Your Digital Store <ArrowRight className="w-5 h-5"/>
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Layer 1: The Trust Validation */}
        <TrustSection />

        {/* Layer 2: The Core WebDev Analysis */}
        <WebDevelopmentGlimpse />

        {/* Layer 3: Omnichannel Integration Context */}
        <MarketingBreakdown />

        {/* Layer 4: Pricing Integration */}
        <section className="bg-background pt-16">
          <div className="text-center mb-8 px-4">
             <h2 className="text-3xl md:text-5xl font-black mb-4">Launch Your Shopify Empire</h2>
             <p className="text-muted-foreground text-lg">Transparent pricing for high-tier development.</p>
          </div>
          <Pricing />
        </section>

      </main>
      
      <div className="relative z-10 bg-background">
         <Footer />
      </div>
    </>
  );
};

export default ShopifyDevelopment;
