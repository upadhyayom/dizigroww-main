import { useEffect, useState } from "react";
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
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hide the sticky bottom CTA bar while the chatbot is open — both live in the
  // bottom-left corner and would otherwise overlap.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ open: boolean }>).detail;
      setChatOpen(!!detail?.open);
    };
    window.addEventListener("growth-chatbot-visibility", handler);
    return () => window.removeEventListener("growth-chatbot-visibility", handler);
  }, []);

  useMeta({
    title: "Performance Growth Package | No Retainer, Pay As You Grow — DiziGroww",
    description:
      "Tired of flat agency retainers with no guarantee of results? The Performance Growth Package is a no-retainer, milestone-based path to your first 100+ orders — creatives and website fixes included, nothing billed extra.",
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
      desc: "₹20,000–₹50,000+ every single month — whether that month brings 5 orders or 50. The invoice shows up either way.",
    },
    {
      icon: Paintbrush,
      title: "Extra Costs, Extra Invoices",
      desc: "New ad creatives, a landing page tweak, a website fix — most agencies bill every one of these separately, on top of the retainer you're already paying.",
    },
    {
      icon: FileWarning,
      title: "No Real Accountability",
      desc: "You're locked into a monthly contract with little connection between what you pay each month and what actually comes back to your business.",
    },
  ];

  const journey = [
    {
      stage: "Stage 1",
      range: "First 75 orders",
      price: "₹20,000",
      note: "One flat fee covers setup, ad creatives, tracking, and your first wave of real orders — nothing billed extra.",
    },
    {
      stage: "Stage 2",
      range: "Next 45 orders (76–120)",
      price: "₹10,000",
      note: "Your funnel is proven and you've crossed 100 orders. The fee drops because scaling what already works takes less effort — and you keep that saving.",
    },
    {
      stage: "Stage 3",
      range: "Beyond 120 orders",
      price: "5% of total sales",
      note: "No flat fee at all — just a small share of the sales we help generate. The more you sell, the more of every rupee you keep.",
      highlight: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 lg:pt-32">
        {/* 1. HERO — leads with the pain, not the price */}
        <section className="section-padding bg-gradient-to-b from-primary/5 to-background text-center relative overflow-hidden">
          <div className="container-main max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs tracking-wider uppercase font-semibold mb-6">
                <Zap className="w-3.5 h-3.5" /> Built For Startups & New D2C Brands
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]">
                Growing Your Brand Shouldn't Mean a Retainer You Can't Afford Yet
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto font-medium">
                Most agencies charge the same monthly fee whether you get 5 orders or 500 — plus separate bills for
                creatives and website fixes. We built something different for brands just starting out.
              </p>

              <div className="bg-primary/10 border border-primary/20 text-foreground px-4 py-3 md:px-6 md:py-3 rounded-2xl md:rounded-full inline-flex flex-col sm:flex-row items-center font-semibold text-sm md:text-base mb-8 shadow-sm">
                A no-retainer, milestone-based path to your first 100+ orders — creatives & website fixes included.
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
                Start My Growth Journey <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* 2. PAIN AMPLIFICATION */}
        <section className="pb-16 bg-background">
          <div className="container-main max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Sound Familiar?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                This is exactly why most new brands hold off on hiring an agency at all.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {painPoints.map((p, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 p-6 bg-card rounded-2xl border border-border hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <p.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg text-foreground font-bold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
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
                The Performance Growth Package flips the model. You only pay as real orders come in — and ad
                creatives, tracking, and website/landing page fixes are all part of the package. No surprise
                invoices, no monthly bill for a month that didn't perform.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2.5 ROAS vs. REAL PROFIT — the math, and why the first 100 orders matter */}
        <section className="section-padding bg-muted/20 border-y border-border">
          <div className="container-main max-w-4xl">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" /> The Math Most Agencies Skip
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                ROAS Looks Great on Paper. Profit Pays Your Bills.
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A 3x ROAS sounds impressive in a report — but ROAS alone doesn't tell you if you actually made
                money. Here's a simplified example of why.
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
                      <p className="font-semibold text-sm sm:text-base">Meta reports back a 3x ROAS</p>
                      <p className="text-xs text-muted-foreground">The number most agencies love to show you</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg sm:text-xl text-primary flex-shrink-0">₹30</p>
                </div>

                <div className="flex items-center justify-between p-5 sm:p-6 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <Minus className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">Marketing / management fees</p>
                      <p className="text-xs text-muted-foreground">Example only — varies by agency</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg sm:text-xl text-destructive flex-shrink-0">– ₹10</p>
                </div>

                <div className="flex items-center justify-between p-5 sm:p-6 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <Minus className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">Product, shipping, warehouse & other costs</p>
                      <p className="text-xs text-muted-foreground">This is where most brands lose track</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg sm:text-xl text-destructive flex-shrink-0">– varies</p>
                </div>

                <div className="flex items-center justify-between p-5 sm:p-6 gap-4 bg-primary/10 border-t-2 border-primary">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm sm:text-base text-primary">Real profit</p>
                      <p className="text-xs text-muted-foreground">What's actually left in your pocket</p>
                    </div>
                  </div>
                  <p className="font-extrabold text-sm sm:text-lg text-primary flex-shrink-0 text-right">
                    This is what matters
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              Simplified example for illustration — your exact numbers depend on your product margins, category,
              and current stage. The point stands regardless: ROAS is a media metric, not a profit metric.
            </p>

            <div className="bg-card rounded-3xl border border-border shadow-sm p-8 md:p-10 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Why We Don't Charge a Fixed Fee</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A typical agency takes its fee first, before any of this math plays out for you. Whether that
                    month's ROAS actually turned into real profit after your product, shipping, and warehouse
                    costs — that's your problem, not theirs. We built the Growth Package so our fee only grows
                    alongside your actual orders, not against your profit regardless of them.
                  </p>
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
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Meta's ad algorithm runs a "learning phase" on every new campaign — it needs a meaningful
                    number of real conversions before it figures out exactly who's likely to buy from you. Early
                    on, that usually means a higher cost per order and less predictable results, no matter how good
                    the creative is.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    That's exactly why Stage 1 of the journey (your first 75 orders) is priced as one flat fee — it
                    covers the heavier setup, testing, and creative iteration needed to get through that early
                    phase efficiently. Once you're past it and the algorithm has enough data, cost per order
                    typically drops — which is why our fee drops too, at Stage 2.
                  </p>
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
                <TrendingUp className="w-5 h-5" /> You keep the majority of every sale — always.
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
                  <ShieldCheck className="w-4 h-4 text-green-600" /> No flat monthly retainer
                </span>
                <span className="flex items-center gap-1 bg-secondary/30 px-3 py-1.5 rounded-md">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> No hidden creative or website fees
                </span>
                <span className="flex items-center gap-1 bg-secondary/30 px-3 py-1.5 rounded-md">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> No lock-in contract
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHAT'S INCLUDED — directly answers the "extra cost" pain point */}
        <section className="section-padding bg-background">
          <div className="container-main max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Everything Included — No Extra Invoices</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              Every stage of the journey includes all of this. None of it shows up as a separate line item later.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Full Campaign Setup & Tracking",
                  desc: "Pixel installation, conversions API, and campaign structure — built correctly from day one so every order is tracked back to the ad that drove it.",
                },
                {
                  title: "Ad Creatives, Included",
                  desc: "Scroll-stopping ad creatives, built and refreshed as part of the package — not quoted separately like most agencies do.",
                },
                {
                  title: "Website & Landing Page Fixes, Included",
                  desc: "The tweaks that turn ad traffic into orders are part of the deal too — not a surprise add-on invoice halfway through the month.",
                },
                {
                  title: "Weekly Reporting & Order Tracking",
                  desc: "Full visibility into exactly how many orders we've driven and what stage you're in — no surprises when it's time to pay.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-card p-5 md:p-8 rounded-2xl border border-border hover:border-primary/50 transition-all shadow-sm"
                >
                  <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg md:text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PROOF & AUTHORITY — real results from past campaigns */}
        <DashboardResultsSection />
        <GoogleReviews />

        {/* 6. QUALIFICATION */}
        <section className="section-padding bg-background border-t border-border">
          <div className="container-main max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Is This Right For You?</h2>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-card p-8 xl:p-10 rounded-3xl border border-border shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-primary text-xl" /> PERFECT FOR:
                </h3>
                <ul className="space-y-4">
                  {[
                    "New or growing D2C / e-commerce brands with a working product and checkout flow",
                    "Founders who don't want to commit to a flat monthly retainer this early",
                    "Teams who want ad creatives and website fixes handled without extra invoices",
                    "Brands aiming for their first 100+ orders and ready to keep scaling from there",
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
                  <XCircle className="text-muted-foreground text-xl" /> NOT FOR:
                </h3>
                <ul className="space-y-4">
                  {[
                    "Brand-new stores with zero traffic or sales history yet",
                    "Founders expecting instant results with no effort on their side",
                    "Services/products with no clear per-unit \"order\"",
                    "Brands unwilling to share order/sales data for tracking",
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
              {[
                {
                  q: "Why not just charge a flat retainer like other agencies?",
                  a: "Because that model doesn't reward performance — you'd pay the same amount whether we drove 5 orders or 500. This package ties your cost directly to the orders we actually generate for you.",
                },
                {
                  q: "Are ad creatives and website fixes really included, or are those extra?",
                  a: "They're included at every stage. Unlike most agencies, we don't send separate invoices for creatives, tracking setup, or landing page/website tweaks — it's all built into the fee.",
                },
                {
                  q: "Why does the fee per order drop as I scale?",
                  a: "The heaviest lift is the initial setup and getting your funnel to convert reliably. Once that's proven, scaling further orders takes less effort on our side — so the fee drops, and eventually becomes just a small percentage of sales.",
                },
                {
                  q: "What happens after 120 orders?",
                  a: "You move to a 5% of total sales fee, so as your revenue grows, our fee scales proportionally with it instead of jumping to an expensive flat retainer.",
                },
                {
                  q: "Is there a lock-in contract?",
                  a: "No. Since you only pay as real orders come in, there's no reason to lock you into a long-term contract.",
                },
              ].map((faq, i) => (
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
              Ready to Start Growing — Without the Retainer?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-xl">
              Tell us about your brand and see exactly what Stage 1 looks like for you.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openChatbot}
              className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-5 bg-primary text-white text-base md:text-xl font-bold rounded-2xl md:rounded-full shadow-xl hover:shadow-primary/50 transition-all inline-flex items-center justify-center gap-2 mb-8"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" /> Start My Growth Journey
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
                Questions? Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Sticky Bottom CTA Banner for Mobile & Desktop — hidden while the chatbot is open so they don't overlap */}
      {!chatOpen && (
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] z-[100] flex justify-center items-center">
        <div className="container-main max-w-4xl flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="font-bold text-lg">Performance Growth Package</p>
            <p className="text-sm text-muted-foreground">No retainer. Pay only as real orders come in.</p>
          </div>
          <button
            onClick={openChatbot}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:shadow-primary/50 transition-all text-sm sm:text-base flex items-center justify-center gap-2"
          >
            Start My Growth Journey <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      )}

      {/* Auto-opening lead-capture chatbot */}
      <GrowthPackageChatbot />
    </div>
  );
};

export default GrowthPackage;
