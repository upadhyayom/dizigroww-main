import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardResultsSection from "@/components/DashboardResultsSection";
import GoogleReviews from "@/components/GoogleReviews";
import GrowthPackageChatbot from "@/components/GrowthPackageChatbot";
import { useMeta } from "@/hooks/useMeta";
import { motion } from "framer-motion";
import {
  Star,
  StarHalf,
  CheckCircle2,
  ArrowRight,
  XCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  MessageCircle,
  Wallet,
  Paintbrush,
  FileWarning,
  Sparkles,
  Calculator,
  Minus,
  GraduationCap,
} from "lucide-react";

declare const fbq: any;

const openChatbot = () => {
  window.dispatchEvent(new Event("open-growth-chatbot"));
};

const GrowthPackage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useMeta({
    title: "Performance Growth Package | No Retainer, Pay As You Grow — DiziGroww",
    description:
      "Tired of flat agency retainers with no guarantee of results? The Performance Growth Package is a no-retainer, step-by-step path to your first 100+ orders — creatives and website fixes included, nothing billed extra.",
    keywords:
      "no retainer marketing agency, pay per order, results based marketing, DiziGroww growth package, D2C ads agency for startups",
    canonicalUrl: "https://dizigroww.in/growth-package",
    ogImage: "https://dizigroww.in/logo.png",
  });

  const whatsappLink =
    "https://wa.me/919450010826?text=Hi!%20I%20have%20a%20question%20about%20the%20Performance%20Growth%20Package.";

  const painPoints = [
    {
      icon: Wallet,
      title: "The Retainer Trap",
      desc: (
        <>
          <strong className="text-foreground">₹20,000–₹50,000+ every month</strong> — whether you get 5 orders or 50.
          The bill shows up either way.
        </>
      ),
    },
    {
      icon: Paintbrush,
      title: "Extra Cost, Extra Bill",
      desc: (
        <>
          New ad creative? A small landing page tweak? A website fix? Most agencies send a{" "}
          <strong className="text-foreground">separate bill</strong> for every one — on top of the retainer.
        </>
      ),
    },
    {
      icon: FileWarning,
      title: "No Real Accountability",
      desc: (
        <>
          You're locked into a <strong className="text-foreground">monthly contract</strong> that has almost no
          connection to the results you actually get.
        </>
      ),
    },
  ];

  const journey = [
    {
      stage: "Stage 1",
      range: "First 75 orders",
      price: "₹20,000",
      note: "One flat fee covers setup, ad creatives, tracking, and your first real orders — nothing billed extra.",
    },
    {
      stage: "Stage 2",
      range: "Next 45 orders (76–120)",
      price: "₹10,000",
      note: "Your system is proven now — scaling what already works is easier, so the fee drops.",
    },
    {
      stage: "Stage 3",
      range: "After 120 orders",
      price: "5% of sales",
      note: "No flat fee — just a small share of sales. The more you sell, the more you keep.",
      highlight: true,
    },
  ];

  const included = [
    {
      title: "Full Campaign Setup & Tracking",
      desc: "Proper tracking set up from day one, so you know exactly which ad is driving orders.",
    },
    {
      title: "Ad Creatives, Included",
      desc: "Scroll-stopping ad creatives are part of the package — not a separate quote like most agencies charge.",
    },
    {
      title: "Website & Landing Page Fixes, Included",
      desc: "The small fixes that turn ad traffic into orders are included too — no surprise mid-month bill.",
    },
    {
      title: "Weekly Reporting & Order Tracking",
      desc: "Full transparency — how many orders came in and which stage you're in, no surprises when it's time to pay.",
    },
  ];

  const faqs = [
    {
      q: "Why don't you charge a fixed retainer like other agencies?",
      a: "Because that model doesn't reward performance — whether we bring 5 orders or 500, you'd pay the same amount. This package ties your cost directly to the orders we actually deliver.",
    },
    {
      q: "Are ad creatives and website fixes really included, or are they extra?",
      a: "They're included at every stage. Unlike most agencies, we don't bill separately for creatives, tracking setup, or landing page/website tweaks — it's all part of the fee.",
    },
    {
      q: "Why does the fee drop as orders increase?",
      a: "Most of the hard work happens early on — getting the setup and system to run reliably. Once that's proven, scaling further takes less effort, so the fee drops, and eventually becomes just a small percentage of sales.",
    },
    {
      q: "What happens after 120 orders?",
      a: "You move to the 5%-of-sales model, so our fee grows proportionally with your revenue instead of turning into an expensive flat retainer.",
    },
    {
      q: "Is there a lock-in contract?",
      a: "No. Since you only pay when real orders come in, there's no reason to lock you into a long-term contract.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 lg:pt-32">
        {/* 1. HERO — the pain, before the price */}
        <section className="section-padding bg-gradient-to-b from-primary/5 to-background text-center relative overflow-hidden">
          <div className="container-main max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs tracking-wider uppercase font-semibold mb-6">
                <Zap className="w-3.5 h-3.5" /> For Startups & New D2C Brands
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]">
                Growing Your Brand Shouldn't Require a Big Retainer
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto font-medium">
                Most agencies charge the same <strong className="text-foreground">fixed fee</strong> every month —
                whether orders come in or not. We're different:{" "}
                <strong className="text-foreground">you only pay when you get real orders.</strong>
              </p>

              <div className="bg-primary/10 border border-primary/20 text-foreground px-4 py-3 md:px-6 md:py-3 rounded-2xl md:rounded-full inline-flex flex-col sm:flex-row items-center font-semibold text-sm md:text-base mb-8 shadow-sm">
                A complete plan to your first 100+ orders, with no retainer — creatives and website fixes included.
              </div>

              <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://www.google.com/search?q=DiziGroww+reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium bg-secondary/80 border border-border px-4 py-2 rounded-full hover:border-[#FBBC05]/50 transition-colors"
                >
                  <div className="flex text-[#FBBC05]">
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <StarHalf size={16} className="fill-current" />
                  </div>
                  <span>4.5 Google Rating</span>
                </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openChatbot}
                className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-5 bg-primary text-white text-base md:text-xl font-bold rounded-2xl md:rounded-full shadow-xl hover:shadow-primary/50 transition-all inline-flex items-center justify-center gap-2"
              >
                Start Your Growth Journey <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* 2. PAIN POINTS */}
        <section className="pb-16 bg-background">
          <div className="container-main max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Does This Sound Familiar?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                It's exactly why most new brands hesitate before hiring an agency at all.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {painPoints.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col gap-3 p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <p.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg text-foreground font-bold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Bridge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-10 max-w-3xl mx-auto"
            >
              <Sparkles className="w-7 h-7 text-primary mx-auto mb-3" />
              <h3 className="text-2xl md:text-3xl font-bold mb-3">There's a Better Way to Grow</h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                The Performance Growth Package changes the whole model. You only pay when real orders come in —
                and ad creatives, tracking, and website/landing page fixes are all included. No surprise bills, no
                heavy invoice after a bad month.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2.5 ROAS vs. REAL PROFIT — the math, made simple */}
        <section className="section-padding bg-muted/20 border-y border-border">
          <div className="container-main max-w-4xl">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" /> The Math Agencies Don't Show You
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                ROAS Looks Good on a Slide. Profit Pays the Bills.
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A 3x ROAS (getting back 3 times what you spent on ads) sounds impressive — but it doesn't tell you
                whether you actually made a profit. Here's a simple example.
              </p>
            </div>

            <div className="bg-card rounded-3xl border border-border shadow-lg overflow-hidden mb-4">
              <div className="divide-y divide-border">
                <div className="flex items-center justify-between p-5 sm:p-6 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">You spend on Meta ads</p>
                      <p className="text-xs text-muted-foreground">Ad spend</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg sm:text-xl flex-shrink-0">₹10</p>
                </div>

                <div className="flex items-center justify-between p-5 sm:p-6 gap-4 bg-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">Meta reports back 3x ROAS</p>
                      <p className="text-xs text-muted-foreground">The number agencies love to show</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-lg sm:text-xl text-primary">₹30</p>
                    <p className="text-[11px] text-muted-foreground">Balance: ₹30</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 sm:p-6 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <Minus className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">Marketing / management fees</p>
                      <p className="text-xs text-muted-foreground">Just an example — varies by agency</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-lg sm:text-xl text-destructive">– ₹10</p>
                    <p className="text-[11px] text-muted-foreground">Balance: ₹20</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 sm:p-6 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <Minus className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">Product, shipping, warehouse & other costs</p>
                      <p className="text-xs text-muted-foreground">Where most brands lose track (e.g. ~40% of revenue)</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-lg sm:text-xl text-destructive">– ₹12</p>
                    <p className="text-[11px] text-muted-foreground">Balance: ₹8</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 sm:p-6 gap-4 bg-primary/10 border-t-2 border-primary">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm sm:text-base text-primary">Real Profit</p>
                      <p className="text-xs text-muted-foreground">What's actually left in your pocket from ₹10 of ad spend</p>
                    </div>
                  </div>
                  <p className="font-extrabold text-2xl sm:text-3xl text-primary flex-shrink-0">₹8</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              This is a simplified example — your actual numbers depend on your product margin, category, and
              stage. The point stays the same: a good ROAS doesn't automatically mean a good profit.
            </p>

            <div className="bg-card rounded-3xl border border-border shadow-sm p-8 md:p-10 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Why We Don't Charge Fixed Fees</h3>
                  <p className="text-foreground font-semibold mb-2">
                    A typical agency takes its fee first — whether the math works out for you or not.
                  </p>
                  <ul className="text-muted-foreground leading-relaxed space-y-1.5 list-disc list-inside">
                    <li>Good ROAS or bad, their bill stays the same</li>
                    <li>Your real costs (product, shipping, warehouse) aren't their problem</li>
                    <li>
                      The Growth Package is different:{" "}
                      <strong className="text-foreground">our fee only grows with your actual orders</strong> —
                      never against your profit
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-3xl border border-border shadow-sm p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Why Your First 100 Orders Matter So Much</h3>
                  <p className="text-foreground font-semibold mb-2">
                    Meta's algorithm needs real orders to learn — the sooner you hit 100, the sooner cost drops.
                  </p>
                  <ul className="text-muted-foreground leading-relaxed space-y-1.5 list-disc list-inside">
                    <li>Early on, cost per order is higher — that's normal, no matter how good the creative is</li>
                    <li>
                      That's why <strong className="text-foreground">Stage 1 (first 75 orders)</strong> is a flat
                      fee — it covers the heavy lifting of setup, testing, and creatives
                    </li>
                    <li>
                      Once Meta has enough data, cost per order drops — which is why{" "}
                      <strong className="text-foreground">our Stage 2 fee drops too</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. JOURNEY / PRICING */}
        <section className="section-padding bg-card border-y border-border">
          <div className="container-main max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
              Your Journey to Your First 100+ Orders
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              Three simple stages. No retainer. No hidden creative or website fees — ever.
            </p>

            <div className="bg-background rounded-3xl border border-border overflow-hidden shadow-lg mb-8">
              <div className="divide-y divide-border">
                {journey.map((t, i) => (
                  <div
                    key={i}
                    className={`p-5 sm:p-6 ${t.highlight ? "bg-primary/10 border-t-2 border-primary" : ""}`}
                  >
                    <div className="grid grid-cols-2 items-center mb-2">
                      <span
                        className={`inline-block w-fit text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          t.highlight ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {t.stage}
                      </span>
                      <div
                        className={`text-right font-extrabold ${
                          t.highlight ? "text-2xl sm:text-3xl text-primary" : "text-xl sm:text-2xl text-foreground"
                        }`}
                      >
                        {t.price}
                      </div>
                    </div>
                    <p
                      className={`font-bold text-sm sm:text-base ${t.highlight ? "text-primary" : "text-foreground"}`}
                    >
                      {t.range}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">{t.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold text-lg px-6 py-3 rounded-full mb-8">
                <TrendingUp className="w-5 h-5" /> A bigger share of every sale always stays with you.
              </div>
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openChatbot}
                  className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-5 bg-primary text-white text-base md:text-xl font-bold rounded-2xl md:rounded-full shadow-xl hover:shadow-primary/50 transition-all inline-flex items-center justify-center gap-2 mb-6"
                >
                  <span className="truncate">See If My Brand Qualifies</span>{" "}
                  <ArrowRight className="w-5 h-5 flex-shrink-0" />
                </motion.button>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1 bg-secondary/30 px-3 py-1.5 rounded-md">
                  <ShieldCheck className="w-4 h-4 text-green-600" /> No fixed monthly retainer
                </span>
                <span className="flex items-center gap-1 bg-secondary/30 px-3 py-1.5 rounded-md">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> No hidden creative/website fees
                </span>
                <span className="flex items-center gap-1 bg-secondary/30 px-3 py-1.5 rounded-md">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> No lock-in contract
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHAT'S INCLUDED */}
        <section className="section-padding bg-background">
          <div className="container-main max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Everything Included — No Extra Bills</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              All of this is included at every stage of the journey. No surprise line items later.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {included.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-card p-5 md:p-8 rounded-2xl border border-border hover:border-primary/50 transition-all shadow-sm"
                >
                  <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg md:text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PROOF — real results screenshots */}
        <DashboardResultsSection />
        <GoogleReviews />

        {/* 6. QUALIFICATION */}
        <section className="section-padding bg-background border-t border-border">
          <div className="container-main max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Is This Right for You?</h2>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-card p-8 xl:p-10 rounded-3xl border border-border shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-primary text-xl" /> IT'S A GREAT FIT IF:
                </h3>
                <ul className="space-y-4">
                  {[
                    "Your D2C / e-commerce brand is new or growing, and your product-to-checkout flow already works",
                    "You don't want to commit to a flat monthly retainer right now",
                    "You want ad creatives and website fixes handled without extra bills",
                    "You're aiming for your first 100+ orders and want to keep scaling from there",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-foreground font-medium items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card p-8 xl:p-10 rounded-3xl border border-border shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <XCircle className="text-muted-foreground text-xl" /> IT'S NOT A FIT IF:
                </h3>
                <ul className="space-y-4">
                  {[
                    "Your store is brand new with no traffic or sales history yet",
                    "You want instant results with no effort on your end",
                    "Your product or service doesn't have a clear, per-unit \"order\"",
                    "You're not comfortable sharing order/sales data for tracking",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-foreground font-medium items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2.5 flex-shrink-0"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FAQ */}
        <section className="section-padding bg-muted/30 border-t border-border">
          <div className="container-main max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card p-5 md:p-6 rounded-2xl border border-border shadow-sm">
                  <h3 className="font-bold text-base md:text-lg mb-2">{faq.q}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FINAL CTA */}
        <div className="bg-gradient-to-br from-primary/10 to-background border-t border-primary/20 pb-24">
          <div className="py-20 text-center container-main">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              Ready to Start Growing Without a Retainer?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-xl">
              Tell us about your brand and see what Stage 1 looks like for you.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openChatbot}
              className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-5 bg-primary text-white text-base md:text-xl font-bold rounded-2xl md:rounded-full shadow-xl hover:shadow-primary/50 transition-all inline-flex items-center justify-center gap-2 mb-8"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" /> Start Your Growth Journey
            </motion.button>

            <div className="flex justify-center mt-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/50 text-foreground border border-border text-base font-semibold rounded-full hover:bg-secondary transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#25D366"
                  stroke="none"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Questions? Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Auto-opening lead-capture chatbot */}
      <GrowthPackageChatbot />
    </div>
  );
};

export default GrowthPackage;
