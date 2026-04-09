import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star, TrendingUp, CheckCircle2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-[100%] bg-primary/10 blur-[100px] opacity-70"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>
      <motion.div className="container-main relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

          {/* Floating Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.6, ease: "easeOut" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-8 shadow-lg shadow-primary/5"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-bold text-primary tracking-wide uppercase">
              Trusted Across India, UAE & SEA
            </span>
          </motion.div>

          {/* Core Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-black text-foreground tracking-tighter leading-[1.05] mb-6 drop-shadow-sm"
          >
            We Build High-Converting Websites <br className="hidden lg:block" />
            <span className="text-primary drop-shadow-sm">& Scale Your Brand with Ads.</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-lg md:text-2xl font-bold text-muted-foreground tracking-wide mb-10 max-w-3xl"
          >
            Tired of slow websites, missed deadlines, and agencies that ghost you? We deliver premium web development and data-driven performance marketing under one roof. No middlemen, no excuses.
          </motion.h2>

          {/* Subheading: Icon-driven benefits instead of a huge wall of text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 max-w-4xl mb-12"
          >
            <div className="flex items-center gap-2 bg-secondary/80 border border-border px-4 py-2.5 rounded-full shadow-sm text-sm md:text-base font-semibold text-foreground/90">
               <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" /> End-to-end Web Development
            </div>
            <div className="flex items-center gap-2 bg-secondary/80 border border-border px-4 py-2.5 rounded-full shadow-sm text-sm md:text-base font-semibold text-foreground/90">
               <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" /> Bespoke Landing Pages
            </div>
            <div className="flex items-center gap-2 bg-secondary/80 border border-border px-4 py-2.5 rounded-full shadow-sm text-sm md:text-base font-semibold text-foreground/90">
               <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-500" /> Results-focused Omnichannel
            </div>
          </motion.div>

          {/* CTA & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a href="https://wa.me/918920150935?text=Hi%20DiziGroww,%20I'm%20interested%20in%20web%20development%20for%20my%20business." target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <button aria-label="Chat on WhatsApp" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-5 rounded-full text-lg font-bold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <MessageCircle className="w-5 h-5 fill-current" /> Chat on WhatsApp
              </button>
            </a>

            <a href="/contact" className="w-full sm:w-auto">
              <button aria-label="Book a Free Call" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-5 rounded-full text-lg font-bold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Book a Free Call
                <ArrowRight className="w-5 h-5" />
              </button>
            </a>
          </motion.div>

          {/* Social Proof Strip below CTA */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 pt-10 border-t border-border/60 w-full"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=D`} className="w-10 h-10 rounded-full border-2 border-background shadow-sm" alt="User 1" />
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=A`} className="w-10 h-10 rounded-full border-2 border-background shadow-sm" alt="User 2" />
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=K`} className="w-10 h-10 rounded-full border-2 border-background shadow-sm" alt="User 3" />
                <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shadow-sm">+8</div>
              </div>
              <div className="text-left flex flex-col">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-sm font-semibold text-foreground">4.5 Google Rating</span>
              </div>
            </div>

            <div className="w-px h-10 bg-border hidden sm:block"></div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary p-2.5 rounded-full">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-left flex flex-col">
                <span className="text-xl font-black text-foreground">20+</span>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Projects Delivered</span>
              </div>
            </div>

            <div className="w-px h-10 bg-border hidden lg:block"></div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary p-2.5 rounded-full">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-left flex flex-col">
                <span className="text-xl font-black text-foreground">3</span>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Continents Served</span>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
