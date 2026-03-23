import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Target, Activity, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

const metaImages = ["/meta-r1.jpg", "/meta-r2.jpg", "/meta-r3.jpg", "/meta-r4.jpg"];
const shopifyImages = ["/shopify-r1.jpg", "/shopify-r2.jpg", "/shopify-r3.jpg", "/shopify-r4.jpg"];

// Sub-component for an independent Image Carousel
const ImageCarousel = ({ images, type, url }: { images: string[], type: string, url: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-card shadow-md relative group">
      <div className="bg-secondary/80 border-b border-border px-3 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex gap-1.5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <span className="text-[10px] md:text-xs text-muted-foreground font-medium ml-1 truncate">{url}</span>
        </div>
        <span className="text-[9px] md:text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full whitespace-nowrap hidden sm:block">
          {type}
        </span>
      </div>
      
      {/* Carousel Screen */}
      <div className="relative aspect-[16/9] w-full bg-background overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={images[currentIndex]} 
            alt={`${type} Screenshot ${currentIndex + 1}`} 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </AnimatePresence>
        
        {/* Overlay Arrows - Appear on Hover on Desktop, Always visible on mobile if needed, but let's just make them subtle */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 md:pl-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={prev}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={next}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Persistent subtle arrows for mobile touch targets */}
        <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-center md:hidden" onClick={prev}>
          <div className="w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"><ChevronLeft className="w-4 h-4 text-white" /></div>
        </div>
        <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-center md:hidden" onClick={next}>
           <div className="w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"><ChevronRight className="w-4 h-4 text-white" /></div>
        </div>
      </div>
      
      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-10 pointer-events-none">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full shadow-sm transition-all ${
              currentIndex === index ? "w-5 bg-primary" : "w-1.5 bg-white/60 backdrop-blur-sm border border-black/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
};


const CaseStudySnapshot = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30 border-y border-border relative overflow-hidden" id="case-studies">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-full md:w-[60vw] h-[80vh] bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              Real Results. Verifiable Proof.
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
              How We Scaled a D2C Brand
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              Anyone can make a nice website. We actually deliver results. Here is the exact breakdown of how we transformed a struggling ad account into a profit machine.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex gap-4 p-4 rounded-2xl bg-background border border-border shadow-sm">
                <Target className="text-red-500 w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-lg mb-1 text-foreground">The Problem</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Bleeding budget on generic creatives and a landing page that wasn't converting traffic into buyers.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 rounded-2xl bg-background border border-border shadow-sm">
                <Activity className="text-blue-500 w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-lg mb-1 text-foreground">The Fix (Ads + Dev)</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">We completely rebuilt the funnel. New ad creatives aimed at high-intent buyers, paired with a drastically faster, conversion-optimized landing page.</p>
                </div>
              </div>
            </div>
            
            <a href="/#audit-form">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-foreground text-background px-8 py-4 rounded-full text-base font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                Get The Same Audit They Got <ArrowUpRight className="w-5 h-5" />
              </motion.button>
            </a>
          </motion.div>

          {/* Right Stats Carousels (Meta + Shopify independent) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Meta Carousel Block */}
            <div className="relative">
              <div className="absolute -left-3 -top-3 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl" />
              <ImageCarousel 
                images={metaImages} 
                type="Meta Ads Manager" 
                url="adsmanager.facebook.com" 
              />
            </div>

            {/* Shopify Carousel Block */}
            <div className="relative">
              <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-green-500/10 rounded-full blur-2xl" />
              <ImageCarousel 
                images={shopifyImages} 
                type="Shopify Analytics" 
                url="admin.shopify.com" 
              />
            </div>

            <div className="bg-green-50/80 border border-green-200 p-5 rounded-2xl flex items-start gap-4 shadow-sm mt-2">
              <CheckCircle2 className="text-green-600 w-6 h-6 flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-green-900 leading-relaxed font-medium">
                "Scaling has finally become predictable. The DiziGroww team actually cares about our profit margin, not just their ad spend cut."
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CaseStudySnapshot;
