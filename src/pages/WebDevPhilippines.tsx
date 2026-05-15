import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustSection from "@/components/TrustSection";
import TrustedBrands from "@/components/TrustedBrands";
import Pricing from "@/components/Pricing";
import { useMeta } from "@/hooks/useMeta";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MonitorSmartphone,
  ShoppingCart,
  LayoutTemplate,
  PenTool,
  Zap,
  ShieldCheck,
  Smartphone,
  CreditCard,
  LineChart,
  Award,
} from "lucide-react";

const WebDevPhilippines = () => {
  useMeta({
    title: "#1 Shopify & Website Development Agency in the Philippines | DiziGroww",
    description:
      "Premium Shopify and website development for Philippines D2C brands, SMEs and startups. Fully CRO-optimised. Live in 14 days. Fixed price from $200. GCash & Maya friendly invoicing.",
    keywords:
      "shopify developer Philippines, website development Philippines, web development agency Manila, ecommerce developer Philippines, landing page design Philippines, CRO agency Philippines, dropshipping store Philippines",
    canonicalUrl: "https://dizigroww.in/web-development-philippines",
    ogImage: "https://dizigroww.in/logo.png",
  });

  return (
    <>
      <Navbar />
      <main>
        {/* HERO SECTION */}
        <section className="min-h-[75vh] flex items-center px-4 sm:px-6 lg:px-8 py-20 pt-32 bg-secondary/20">
          <div className="container-main text-center">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              Premium Shopify · Fully CRO-Optimised · Philippines
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto mb-6 leading-tight">
              We don't build stores. <br className="hidden md:block" />
              We build <span className="text-primary">conversion machines</span>.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Live in 14 days. Premium build. Conversion-optimised. Trusted by 20+ brands across the USA, Dubai & Global.
            </p>

            <div className="inline-flex items-baseline gap-2 mb-10">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">From</span>
              <span className="text-5xl md:text-6xl font-black text-primary leading-none">$200</span>
              <span className="text-sm font-semibold text-muted-foreground">onwards</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/919450010826?text=Hi%20DiziGroww,%20I'm%20from%20the%20Philippines%20and%20I'd%20like%20a%20quote%20for%20a%20Shopify%20conversion%20machine."
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#25D366] text-white px-8 py-4 rounded-full text-base font-bold shadow-lg w-full sm:w-auto"
                >
                  Chat on WhatsApp
                </motion.button>
              </a>
              <a href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-base font-bold shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Get Your Free Quote <ArrowRight size={18} />
                </motion.button>
              </a>
            </div>

            <p className="mt-8 text-sm font-medium text-muted-foreground bg-secondary/50 inline-block px-4 py-2 rounded-full border border-border">
              GCash & Maya friendly invoicing · PHP pricing on request · 3+ years · 20+ clients
            </p>
          </div>
        </section>

        {/* BRANDS WE'VE BUILT (second section) */}
        <TrustedBrands />

        {/* TRUST */}
        <TrustSection />

        {/* WHAT MAKES IT A CONVERSION MACHINE */}
        <section className="section-padding bg-background">
          <div className="container-main">
            <div className="text-center mb-16">
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
                What Makes It A Conversion Machine
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Built To Sell. Not Just To Look Good.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every store we ship for Philippine brands is engineered for speed, mobile-first browsing, and Meta/Google ad performance from day one.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Zap size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Speed-Tuned (&lt;2s)</h3>
                  <p className="text-muted-foreground text-sm">
                    Lightweight themes, image optimisation and lazy loading so your mobile shoppers in Manila or Cebu never bounce.
                  </p>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Smartphone size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Mobile-First Build</h3>
                  <p className="text-muted-foreground text-sm">
                    80%+ of Filipino shoppers buy on phones. We design and QA on mobile first, desktop second.
                  </p>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <CreditCard size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Checkout Optimised</h3>
                  <p className="text-muted-foreground text-sm">
                    Cleaner checkout flow, COD enabled, GCash &amp; Maya gateways, and shipping-fee logic that boosts conversion.
                  </p>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Trust Signals Built In</h3>
                  <p className="text-muted-foreground text-sm">
                    Reviews, badges, FAQs, return policy and social proof placed exactly where buyers hesitate.
                  </p>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <LineChart size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Pixel + CAPI Ready</h3>
                  <p className="text-muted-foreground text-sm">
                    Meta Pixel, Conversions API, GA4 and TikTok pixel installed and tested before launch — so your ads can scale.
                  </p>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Award size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">A/B-Test Ready</h3>
                  <p className="text-muted-foreground text-sm">
                    Heatmaps, scroll-tracking and split-test ready sections so you can keep lifting CVR after launch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES OFFERED */}
        <section className="section-padding bg-secondary/30 border-y border-border">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Build For Philippine Brands</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Whether you're scaling a D2C brand from Quezon City or launching a startup in Makati, we ship the digital asset that fits.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <ShoppingCart size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Shopify Stores</h3>
                  <p className="text-muted-foreground text-sm">
                    Conversion-optimised Shopify builds with COD, GCash, Maya and local courier integrations (J&amp;T, LBC, Lalamove).
                  </p>
                </div>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <LayoutTemplate size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Ad-Ready Landing Pages</h3>
                  <p className="text-muted-foreground text-sm">
                    Standalone pages purpose-built for your Meta and Google ad campaigns. One offer. One CTA. Maximum CVR.
                  </p>
                </div>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <MonitorSmartphone size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Corporate Websites</h3>
                  <p className="text-muted-foreground text-sm">
                    Fast, secure, multi-page websites for service businesses and SMEs that build authority and book qualified leads.
                  </p>
                </div>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <PenTool size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Redesign &amp; CRO</h3>
                  <p className="text-muted-foreground text-sm">
                    Already live? We audit your existing store, fix the leaks, and rebuild the high-impact pages for measurable lift.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING (shared component, USD default for Philippines) */}
        <Pricing defaultCurrency="USD" />

        {/* PROCESS */}
        <section className="section-padding bg-background">
          <div className="container-main max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Live In 14 Days. Here's How.</h2>
            <div className="grid sm:grid-cols-4 gap-6">
              <div>
                <div className="w-16 h-16 bg-primary/10 text-primary mx-auto rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  1
                </div>
                <h4 className="font-bold">Discovery</h4>
                <p className="text-xs text-muted-foreground mt-2">Days 1–2</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-primary/10 text-primary mx-auto rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  2
                </div>
                <h4 className="font-bold">Design</h4>
                <p className="text-xs text-muted-foreground mt-2">Days 3–6</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-primary/10 text-primary mx-auto rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  3
                </div>
                <h4 className="font-bold">Development</h4>
                <p className="text-xs text-muted-foreground mt-2">Days 7–12</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-primary/10 text-primary mx-auto rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  4
                </div>
                <h4 className="font-bold">Launch</h4>
                <p className="text-xs text-muted-foreground mt-2">Days 13–14</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ (Philippines-specific) */}
        <section className="section-padding bg-secondary/30 border-y border-border">
          <div className="container-main max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-xl border border-border">
                <h4 className="font-bold mb-2">Are you based in the Philippines?</h4>
                <p className="text-sm text-muted-foreground">
                  Our agency operations are based in India, which is how we deliver premium global-standard builds at fixed,
                  competitive USD pricing for Philippine brands. We've shipped projects for clients across the USA, Dubai and Asia-Pacific.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h4 className="font-bold mb-2">How do we communicate across time zones?</h4>
                <p className="text-sm text-muted-foreground">
                  PHT (UTC+8) and IST (UTC+5:30) have a 2.5-hour overlap during business hours, so daily WhatsApp updates,
                  Zoom calls and shared Notion / Trello boards work smoothly. Most clients hear from us before lunch their time.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h4 className="font-bold mb-2">Can I pay in PHP via GCash, Maya or bank transfer?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes. Default invoicing is USD via Wise / Stripe, but we accept GCash, Maya and Philippine bank transfers in PHP on request.
                  A 50% advance starts the project; balance on launch.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h4 className="font-bold mb-2">Will my store really be live in 14 days?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes — for our Conversion Store package, provided product info and brand assets are shared by Day 2. The Launch
                  landing page goes live in 7–10 days. We've delivered 20+ brands on this exact timeline.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h4 className="font-bold mb-2">Do you integrate COD and Philippine couriers?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes. We set up Cash on Delivery, abandoned-checkout SMS, and integrate with J&amp;T, LBC, Lalamove and Shippo /
                  ShipMNL as needed — the standard stack Philippine D2C brands rely on.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h4 className="font-bold mb-2">Do you offer revisions?</h4>
                <p className="text-sm text-muted-foreground">
                  Every project includes up to 2 major revision rounds during design to make sure the final product matches your vision
                  and converts the way it should.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section-padding bg-secondary/20">
          <div className="container-main max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to turn your Shopify store into a <span className="text-primary">conversion machine</span>?
            </h2>
            <p className="text-muted-foreground mb-8">
              Get a free quote in under 24 hours. No retainers. No lock-in. Just a faster, higher-converting store.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/919450010826?text=Hi%20DiziGroww,%20I'm%20from%20the%20Philippines%20and%20I'd%20like%20a%20quote%20for%20a%20Shopify%20conversion%20machine."
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#25D366] text-white px-8 py-4 rounded-full text-base font-bold shadow-lg w-full sm:w-auto"
                >
                  WhatsApp Us Now
                </motion.button>
              </a>
              <a href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-base font-bold shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Get Your Free Quote <ArrowRight size={18} />
                </motion.button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default WebDevPhilippines;
