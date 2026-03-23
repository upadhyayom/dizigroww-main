import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Target, Activity, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { type: "Meta Ads Dashboard", src: "/meta-r1.jpg", url: "adsmanager.facebook.com" },
  { type: "Shopify Dashboard", src: "/shopify-r1.jpg", url: "admin.shopify.com" },
  { type: "Meta Ads Dashboard", src: "/meta-r2.jpg", url: "adsmanager.facebook.com" },
  { type: "Shopify Dashboard", src: "/shopify-r2.jpg", url: "admin.shopify.com" }
];

const CaseStudySnapshot = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="py-16 bg-muted/30 border-y border-border" id="case-studies">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              Real Results. Verifiable Proof.
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How We Scaled a D2C Brand
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Anyone can make a nice website. We actually deliver results. Here is the exact breakdown of how we transformed a struggling ad account into a profit machine.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Target className="text-red-500 w-5 h-5 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">The Problem</h4>
                  <p className="text-sm text-muted-foreground">Bleeding budget on generic creatives and a landing page that wasn't converting traffic into buyers.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Activity className="text-blue-500 w-5 h-5 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">The Fix (Ads + Dev)</h4>
                  <p className="text-sm text-muted-foreground">We completely rebuilt the funnel. New ad creatives aimed at high-intent buyers, paired with a drastically faster, conversion-optimized landing page.</p>
                </div>
              </div>
            </div>
            
            <a href="/#audit-form">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-foreground text-background px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2"
              >
                Get The Same Audit They Got <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </a>
          </motion.div>

          {/* Right Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border shadow-2xl relative overflow-hidden"
          >
             {/* Decorative Background Glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-xl font-bold border border-border">
                  D2C
                </div>
                <div>
                  <h3 className="text-xl font-bold">D2C Brand</h3>
                  <p className="text-sm text-muted-foreground">E-Commerce</p>
                </div>
              </div>
              
              {/* Carousel Controls (Arrows) */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <div className="rounded-lg overflow-hidden border border-border shadow-md">
                <div className="bg-secondary/50 border-b border-border px-3 py-1.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium ml-2">{slides[currentIndex].url}</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full">
                    {slides[currentIndex].type}
                  </span>
                </div>
                
                {/* Carousel Image Display */}
                <div className="relative aspect-[4/3] w-full bg-muted/20 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      src={slides[currentIndex].src} 
                      alt={slides[currentIndex].type} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Slick Dots */}
              <div className="flex items-center justify-center gap-2 mt-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === index ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-green-50/50 border border-green-100 p-4 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="text-green-600 w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">
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
