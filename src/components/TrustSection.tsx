import { motion } from "framer-motion";
import { Zap, MessageCircle, Lock, Globe2, RefreshCcw } from "lucide-react";

const trustFeatures = [
  { icon: <Zap size={24} />, title: "Fast Delivery", desc: "Projects launched in 3-6 weeks." },
  { icon: <MessageCircle size={24} />, title: "Direct Communication", desc: "WhatsApp & Email. No middlemen." },
  { icon: <Lock size={24} />, title: "Fixed Pricing", desc: "No hidden costs, ever." },
  { icon: <Globe2 size={24} />, title: "Global Clients", desc: "Serving India, UAE, Singapore, Australia, Canada & US." },
  { icon: <RefreshCcw size={24} />, title: "Revision Policy", desc: "2 rounds of revisions always included." }
];

const TrustSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30 border-y border-border overflow-hidden">
      <div className="container-main">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            Why DiziGroww?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Built for International Standards</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 flex-wrap lg:flex lg:flex-row justify-center gap-6 lg:gap-8 max-w-6xl mx-auto">
          {trustFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card p-6 rounded-2xl border border-border shadow-sm flex-1 min-w-[200px]"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
