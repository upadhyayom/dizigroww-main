import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustSection from "@/components/TrustSection";
import Pricing from "@/components/Pricing";
import { motion } from "framer-motion";
import { Layout, MousePointerClick, TrendingUp, PenTool } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";

const features = [
  { icon: PenTool, title: "Persuasive Copywriting", desc: "We write direct-response copy that speaks directly to your buyers' pain points." },
  { icon: MousePointerClick, title: "Frictionless UI/UX", desc: "Removing cognitive load to turn clicks into guaranteed leads." },
  { icon: TrendingUp, title: "A/B Testing Ready", desc: "Built dynamically to allow continuous multivariate testing on paid traffic." }
];

const LandingPageDesign = () => {
  useMeta({
    title: "Landing Page Design & CRO Agency | DiziGroww",
    description: "High-converting landing pages engineered for paid traffic. Direct-response copywriting, frictionless UX, A/B testing — built to multiply your ROAS.",
    keywords: "landing page design, landing page agency, CRO services, paid media landing pages, A/B testing, conversion rate optimization",
    canonicalUrl: "https://dizigroww.in/services/landing-page-design",
    ogImage: "https://dizigroww.in/logo.png"
  });
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
          <div className="container-main relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Layout size={16} /> Paid Media Destinations
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-7xl mb-6 tracking-tight">
              Stop Wasting Clicks. <br className="hidden md:block" /> <span className="text-primary italic">Start Converting.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Directing paid traffic to a generic homepage is burning your budget. We design high-velocity landing pages built purely for lead generation and hard sales.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
              <a href="/#audit-form" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-bold shadow-xl transition-all">Get a Quote</a>
            </motion.div>
          </div>
        </section>

        <TrustSection />

        <section className="section-padding bg-secondary">
          <div className="container-main text-center">
            <h2 className="text-3xl md:text-4xl mb-12">The Anatomy of a Perfect Landing Page</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <div key={i} className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 text-left">
                  <f.icon className="text-primary mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Pricing />
      </main>
      <Footer />
    </>
  );
};

export default LandingPageDesign;
