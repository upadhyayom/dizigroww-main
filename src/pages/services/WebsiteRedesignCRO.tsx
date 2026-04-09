import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustSection from "@/components/TrustSection";
import Pricing from "@/components/Pricing";
import { motion } from "framer-motion";
import { BarChart3, LineChart, Target, Eye } from "lucide-react";
import { Helmet } from "react-helmet-async";

const features = [
  { icon: Eye, title: "Heatmap Analysis", desc: "We track exactly where users drop off and optimize the funnel." },
  { icon: Target, title: "Trust Architecture", desc: "Implementing psychological triggers that build instant B2B credibility." },
  { icon: LineChart, title: "Data-Driven Reskins", desc: "We don't guess. Every design choice is backed by session data." }
];

const WebsiteRedesignCRO = () => {
  return (
    <>
      <Helmet>
        <title>Website Redesign & CRO | DiziGroww</title>
        <meta name="description" content="We audit and revamp your outdated site to meet modern standards, dramatically improving your conversion rates." />
      </Helmet>
      
      <Navbar />
      <main className="pt-20">
        <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
          <div className="container-main relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <BarChart3 size={16} /> Conversion Rate Optimization
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-7xl mb-6 tracking-tight">
              Turn your old website into <br className="hidden md:block" /> <span className="text-primary italic">A Digital Sales Rep.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              An outdated website is destroying your brand trust. We audit, wireframe, and deploy complete redesigns engineered purely to lift your conversion rates.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
              <a href="/#audit-form" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-bold shadow-xl transition-all">Get a Quote</a>
            </motion.div>
          </div>
        </section>

        <TrustSection />

        <section className="section-padding bg-secondary">
          <div className="container-main text-center">
            <h2 className="text-3xl md:text-4xl mb-12">How We Lift Your Conversion Rates</h2>
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

export default WebsiteRedesignCRO;
