import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star, StarHalf } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-[70vh] lg:min-h-[85vh] flex items-center px-4 sm:px-6 lg:px-8 py-10 md:py-20 pt-32 md:pt-36">
      <div className="container-main grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
        {/* Left 60% */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-3"
        >
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            Performance Marketing Agency
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.1] mb-5">
            Accelerating Growth with{" "}
            <span className="text-primary">Data-Driven Marketing</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-6 max-w-xl">
            We build high-converting presences for ambitious brands. From landing pages to full-scale e-commerce and omnichannel ad campaigns, our strategies turn clicks into loyal customers.
          </p>

          {/* Trust Badge */}
          <div className="mb-6">
            <a href="https://share.google/5lOHRfK7veGba5vBe" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium bg-secondary/50 border border-border px-3 py-1.5 rounded-full hover:border-[#FBBC05]/50 transition-colors">
              <div className="flex text-[#FBBC05]">
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <StarHalf size={16} className="fill-current" />
              </div>
              <span>4.5 Google Rating (11 Reviews)</span>
            </a>
          </div>

          {/* Value props */}
          <ul className="space-y-2.5 mb-8">
            {[
              "End-to-end Solutions: Funnel Creation, CRO & Ad Management",
              "Bespoke Landing Pages & Elite E-Commerce Stores",
              "Results-focused omnichannel approach across Meta & Google",
            ].map((prop, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>{prop}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/#audit-form">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-primary to-primary-deep text-primary-foreground px-7 py-3.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2"
              >
                Claim Your Free Audit <ArrowRight size={16} />
              </motion.button>
            </a>
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="border border-border hover:border-primary text-foreground hover:text-primary px-7 py-3.5 rounded-full text-sm font-semibold transition-colors"
              >
                Explore Our Services
              </motion.button>
            </Link>
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
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">What We Do</p>
            {[
              { title: "Meta & Google Ads", desc: "Campaigns built for ROI, not vanity metrics" },
              { title: "Conversion Optimization", desc: "Turn more visitors into paying customers" },
              { title: "Landing Pages & Web", desc: "High-converting, mobile-first design" },
              { title: "Analytics & Tracking", desc: "Full-funnel visibility with proper attribution" },
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
            { label: "Meta & Google Ads", icon: "📈" },
            { label: "CRO & Landing Pages", icon: "🎯" },
            { label: "Web Design", icon: "💻" },
            { label: "Analytics", icon: "📊" },
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
