import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star, StarHalf } from "lucide-react";
import Background3D from "./Background3D";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center px-4 sm:px-6 lg:px-8 py-10 md:py-20 pt-32 md:pt-36 overflow-hidden">
      <Background3D />
      <div className="container-main relative z-10 grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
        {/* Left 60% */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-3"
        >
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            Trusted by businesses across India, UAE & Southeast Asia
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.15] mb-5 font-bold tracking-tight">
            We Build High-Converting Websites & Run Ads That Actually Grow Your Business.
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-6 max-w-xl">
            Tired of slow websites, missed deadlines, and agencies that ghost you? We deliver premium web development and data-driven performance marketing under one roof. No middlemen, no excuses.
          </p>

          {/* Trust Badges */}
          <div className="mb-6 flex flex-wrap gap-3 items-center">
            <a href="https://share.google/5lOHRfK7veGba5vBe" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium bg-secondary/50 border border-border px-3 py-1.5 rounded-full hover:border-[#FBBC05]/50 transition-colors">
              <div className="flex text-[#FBBC05]">
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <StarHalf size={16} className="fill-current" />
              </div>
              <span>4.5 Google Rating</span>
            </a>
            <div className="inline-flex items-center gap-2 text-sm font-medium bg-secondary/50 border border-border px-3 py-1.5 rounded-full">
               <span>🌍 Serving UAE, SG & India</span>
            </div>
          </div>

          {/* Value props */}
          <ul className="space-y-2.5 mb-8">
            {[
              "End-to-end Web Development (Shopify, WordPress, Custom)",
              "Bespoke Landing Pages Built for Conversion",
              "Results-focused omnichannel approach (Meta & Google Ads)",
            ].map((prop, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80 font-medium">
                <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>{prop}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="https://wa.me/918920150935?text=Hi%20DiziGroww,%20I'm%20interested%20in%20web%20development%20for%20my%20business." target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white px-7 py-3.5 rounded-full text-sm font-semibold shadow-lg flex items-center justify-center w-full transition-colors"
              >
                Chat on WhatsApp
              </motion.button>
            </a>
            <a href="/contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3.5 rounded-full text-sm font-semibold shadow-lg flex items-center justify-center gap-2 w-full transition-colors"
              >
                Book a Free Call <ArrowRight size={16} />
              </motion.button>
            </a>
          </div>
          
          {/* Trust Bar below Hero CTAs */}
          <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <div className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> 3-6 Week Delivery</div>
            <div className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> Fixed Pricing</div>
            <div className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> 100% Satisfaction Guarantee</div>
            <div className="flex items-center gap-1.5"><Check size={14} className="text-green-500" /> 20+ Projects Delivered</div>
          </div>
        </motion.div>

        {/* Right 40% — Service highlights */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-2 hidden lg:block"
        >
          <div className="bg-card rounded-2xl shadow-card-hover p-6 border border-border space-y-4">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">How We Do It</p>
            {[
              { title: "Bring the right people", desc: "Ads that target buyers, not just clicks" },
              { title: "Make them buy", desc: "Websites fixed for maximum conversion" },
              { title: "Increase order value", desc: "Offers that make people spend more" },
              { title: "Bring them back", desc: "Retention systems for loyal customers" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-secondary border border-border"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile service cards */}
        <div className="lg:hidden grid grid-cols-2 gap-3">
          {[
            { label: "Bring the right people", icon: "🤝" },
            { label: "Make them buy", icon: "🛒" },
            { label: "Increase order value", icon: "📈" },
            { label: "Bring them back", icon: "🔁" },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl p-3 text-center shadow-card border border-border"
            >
              <p className="text-lg mb-1">{s.icon}</p>
              <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
