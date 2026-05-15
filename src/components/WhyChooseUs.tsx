import { motion } from "framer-motion";
import { Shield, Layers, Eye, Zap } from "lucide-react";

const reasons = [
  {
    icon: Layers,
    title: "We don't just run ads",
    copy: "Most agencies focus only on Meta or Google metrics. We fix whatever is stopping your business from making money.",
    accent: "from-rose-500/15 to-orange-500/10",
  },
  {
    icon: Shield,
    title: "We don't chase ROAS",
    copy: "High ROAS on a dashboard doesn't always mean money in the bank. We optimize for actual profit margin.",
    accent: "from-blue-500/15 to-indigo-500/10",
  },
  {
    icon: Eye,
    title: "We look at your full business",
    copy: "From the moment they see your ad to their third time buying from you, we optimize the entire customer journey.",
    accent: "from-emerald-500/15 to-teal-500/10",
  },
  {
    icon: Zap,
    title: "We focus on what makes money",
    copy: "Conversion rates, AOV, and retention — the levers that turn a struggling brand into a profitable one.",
    accent: "from-amber-500/15 to-yellow-500/10",
  },
];

const WhyChooseUs = () => (
  <section className="section-padding relative overflow-hidden" id="why-us">
    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    <div className="container-main relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-4 border border-primary/20">
          Why DiziGroww
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-3">Why We're Not Like Other Agencies</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
          Most agencies run ads. We run ads <span className="font-bold text-foreground">AND</span> fix your landing pages. Same team. No hand-offs. No excuses.
        </p>
      </motion.div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="card-premium p-4 sm:p-6 group cursor-default"
          >
            <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${r.accent} flex items-center justify-center mb-4 ring-1 ring-black/5`}>
              <r.icon size={22} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/5 transition-colors" />
            </div>
            <h3 className="font-bold text-sm sm:text-base mb-2 leading-snug">{r.title}</h3>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{r.copy}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
