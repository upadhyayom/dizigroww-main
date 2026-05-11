import { motion } from "framer-motion";
import { Facebook, Search, BarChart3, Layout, Globe, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    slug: "wordpress-development",
    icon: Globe,
    title: "Web Development",
    desc: "We build fast, secure, and scalable websites tailored for your international audience using WordPress and modern frameworks.",
    deliverables: ["Custom WordPress/CMS", "Speed Optimized"],
    useCase: "The Foundation",
    color: "border-l-[hsl(210,80%,50%)]",
    popular: true,
  },
  {
    slug: "shopify-development",
    icon: ShoppingBag,
    title: "E-Commerce (Shopify)",
    desc: "End-to-end Shopify development designed purely to maximize conversions and increase your Average Order Value.",
    deliverables: ["Shopify setups", "Cart abandonment flows"],
    useCase: "The Sales Engine",
    color: "border-l-[hsl(145,60%,40%)]",
    popular: true,
  },
  {
    slug: "landing-page-design",
    icon: Layout,
    title: "Landing Pages & CRO",
    desc: "Traffic bouncing? We design standalone landing pages and audit your funnel to ensure every click counts.",
    deliverables: ["A/B Testing", "Frictionless checkout"],
    useCase: "The Multiplier",
    color: "border-l-[hsl(35,90%,50%)]",
  },
  {
    slug: "performance-marketing",
    icon: Search,
    title: "Performance Marketing",
    desc: "Data-driven Meta and Google Ads campaigns that target high-intent buyers across the UAE, Singapore, and India.",
    deliverables: ["ROAS focused", "Omnichannel strategy"],
    useCase: "The Accelerator",
    color: "border-l-primary",
  },
];

const ServicesGrid = () => (
  <section className="section-padding bg-secondary">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-3">Core Digital Services Built for Growth:</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            We deliver robust web development alongside precision performance marketing to ensure your investment drives real business impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className={`relative bg-card rounded-2xl p-4 sm:p-6 shadow-card border-l-4 ${s.color} hover:shadow-card-hover transition-all group cursor-pointer`}
          >
            {s.popular && (
              <span className="absolute top-4 right-4 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </span>
            )}
            <s.icon className="text-primary mb-3 group-hover:scale-110 transition-transform" size={26} />
            <h3 className="text-base font-bold mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{s.desc}</p>
            <ul className="space-y-1.5 mb-3">
              {s.deliverables.map((d, j) => (
                <li key={j} className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-3">{s.useCase}</p>
            <Link
              to={`/services/${s.slug}`}
              className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
            >
              Learn more →
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
      >
        <a href="/#audit-form">
          <button className="bg-primary text-white border-2 border-primary hover:bg-transparent hover:text-primary px-8 py-4 rounded-full text-base font-bold shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center mx-auto">
            Get a Custom Quote
          </button>
        </a>
      </motion.div>
    </div>
  </section>
);

export default ServicesGrid;
