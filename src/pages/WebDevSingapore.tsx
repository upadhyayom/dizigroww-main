import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustSection from "@/components/TrustSection";
import { useMeta } from "@/hooks/useMeta";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MonitorSmartphone, ShoppingCart, LayoutTemplate, PenTool } from "lucide-react";

const WebDevSingapore = () => {
  useMeta({
    title: "Website Development for Singapore Businesses | DiziGroww",
    description: "Website Development Agency for Singapore Startups & SMEs. Fixed price. Fast delivery. Built to perform."
  });

  return (
    <>
      <Navbar />
      <main>
        {/* HERO SECTION */}
        <section className="min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8 py-20 pt-32 bg-secondary/20">
          <div className="container-main text-center">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              Web Development Agency Singapore
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto mb-6 leading-tight">
              Website Development Agency for <span className="text-primary">Singapore</span> Startups & SMEs
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Fixed price. Fast delivery. Built to perform. Reliable technology partners for modern brands.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://wa.me/918920150935?text=Hi%20DiziGroww,%20I'm%20interested%20in%20web%20development%20for%20my%20business%20in%20Singapore" target="_blank" rel="noreferrer">
                <motion.button whileHover={{ scale: 1.05 }} className="bg-[#25D366] text-white px-8 py-4 rounded-full text-base font-bold shadow-lg w-full sm:w-auto">
                  Chat on WhatsApp
                </motion.button>
              </a>
              <a href="/contact">
                <motion.button whileHover={{ scale: 1.05 }} className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-base font-bold shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto">
                  Book a Free Call <ArrowRight size={18} />
                </motion.button>
              </a>
            </div>
            
            <p className="mt-8 text-sm font-medium text-muted-foreground bg-secondary/50 inline-block px-4 py-2 rounded-full border border-border">
              PayNow-friendly invoicing available. SGD pricing option on request. Fast & transparent delivery.
            </p>
          </div>
        </section>

        {/* TRUST */}
        <TrustSection />

        {/* SERVICES OFFERED */}
        <section className="section-padding bg-background">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Grade Solutions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Scalable digital assets engineered for growth and reliability.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="bg-card p-8 rounded-2xl border border-border shadow-sm flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0"><MonitorSmartphone size={24} /></div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Corporate Websites</h3>
                    <p className="text-muted-foreground text-sm">Professional, fast, and secure websites that establish authority and generate B2B leads.</p>
                  </div>
                </div>
                <div className="bg-card p-8 rounded-2xl border border-border shadow-sm flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0"><ShoppingCart size={24} /></div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">E-Commerce Architecture</h3>
                    <p className="text-muted-foreground text-sm">High-converting online stores optimized for AOV and seamless checkout experiences across Southeast Asia.</p>
                  </div>
                </div>
                <div className="bg-card p-8 rounded-2xl border border-border shadow-sm flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0"><LayoutTemplate size={24} /></div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Campaign Landing Pages</h3>
                    <p className="text-muted-foreground text-sm">Standalone pages designed purely to capture leads from your paid ad campaigns.</p>
                  </div>
                </div>
                <div className="bg-card p-8 rounded-2xl border border-border shadow-sm flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0"><PenTool size={24} /></div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">CRO & Redesigns</h3>
                    <p className="text-muted-foreground text-sm">Auditing and revamping your outdated site to meet modern UI/UX standards and optimization metrics.</p>
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* PRICING (USD Base with SGD Request) */}
        <section className="section-padding bg-secondary/30 border-y border-border">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Clearly defined scope with flat-rate international billing (USD default, SGD accepted).</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-card p-8 rounded-2xl border border-border flex flex-col relative overflow-hidden">
                <h3 className="text-xl font-bold mb-1">Starter</h3>
                <p className="text-sm text-muted-foreground mb-6">Perfect for campaign landing pages.</p>
                <div className="text-4xl font-black mb-6">$499<span className="text-xl ml-2 font-bold tracking-normal opacity-70">onwards</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Single Landing Page</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> 5 Dedicated Sections</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Mobile Responsive</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Lead Form Integration</li>
                </ul>
                <a href="/contact" className="block text-center bg-secondary hover:bg-border text-foreground font-semibold py-3 rounded-xl transition-colors">Start Project</a>
              </div>
              
              <div className="bg-foreground text-background p-8 rounded-2xl border flex flex-col relative shadow-xl transform md:-translate-y-4">
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-wider uppercase">Most Popular</div>
                <h3 className="text-xl font-bold mb-1">Growth</h3>
                <p className="text-sm text-gray-400 mb-6">For corporate & service businesses.</p>
                <div className="text-4xl font-black mb-6">$999<span className="text-xl ml-2 font-bold tracking-normal opacity-70">onwards</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Multi-page Website (Up to 7)</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> CMS Setup (WordPress)</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Basic Technical SEO</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Mobile & Tablet Optimized</li>
                </ul>
                <a href="/contact" className="block text-center bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-colors">Start Project</a>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border flex flex-col relative">
                <h3 className="text-xl font-bold mb-1">E-Commerce</h3>
                <p className="text-sm text-muted-foreground mb-6">Full scale online stores.</p>
                <div className="text-4xl font-black mb-6">$1,799<span className="text-xl ml-2 font-bold tracking-normal opacity-70">onwards</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Shopify or WooCommerce</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Up to 50 Products added</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Payment Gateway Integration</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Cart & Checkout Optimization</li>
                </ul>
                <a href="/contact" className="block text-center bg-secondary hover:bg-border text-foreground font-semibold py-3 rounded-xl transition-colors">Start Project</a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};
export default WebDevSingapore;
