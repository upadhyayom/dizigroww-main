import { motion } from "framer-motion";
import { Smartphone, Clapperboard, MousePointerClick, Laptop, CreditCard } from "lucide-react";

const cards = [
  {
    icon: Laptop,
    title: "15% Goes to Web Architecture",
    description: "A fast, scalable foundation is critical. Stop relying on slow page builders.",
    iconColor: "text-purple-500",
    iconBg: "bg-purple-100 dark:bg-purple-500/20"
  },
  {
    icon: MousePointerClick,
    title: "50% Goes to Funnel & CRO",
    description: "Your landing page is your best salesman. We optimize it using direct conversion psychology.",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100 dark:bg-blue-500/20"
  },
  {
    icon: Clapperboard,
    title: "20% Goes to Meta & Google Ads",
    description: "Traffic is useless without conversions. We push targeted traffic strictly to optimized checkout pages.",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-100 dark:bg-orange-500/20"
  },
  {
    icon: Smartphone,
    title: "10% Goes to Follow-Ups",
    description: "Retargeting audiences heavily across Omni-channels generates up to 40% of standard revenue.",
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-100 dark:bg-indigo-500/20"
  },
  {
    icon: CreditCard,
    title: "5% Goes to Cart Recoveries",
    description: "Cart abandonment is a leak. We plug it instantly with automated sequences.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100 dark:bg-blue-600/20"
  }
];

const MarketingBreakdown = () => {
  return (
    <section className="py-24 bg-background overflow-hidden relative" id="marketing-breakdown">
      <div className="container-main max-w-[1400px]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
            The Truth About Scaling
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            Where your focus and budget actually need to go.
          </p>
        </div>

        <div className="flex overflow-x-auto lg:grid lg:grid-cols-5 gap-4 lg:gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#f8f9fc] dark:bg-muted/30 border border-border/50 rounded-2xl p-6 min-w-[280px] lg:min-w-0 snap-center flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 font-bold shadow-sm border border-black/5 dark:border-white/5 ${card.iconBg}`}>
                <card.icon className={`w-7 h-7 ${card.iconColor}`} />
              </div>
              
              <h3 className="text-[17px] leading-snug font-black text-foreground mb-3 tracking-tight">
                {card.title}
              </h3>
              
              <p className="text-[14px] text-muted-foreground font-medium leading-relaxed mt-auto">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketingBreakdown;
