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
    title: "Performance Growth Package | Pay Only For Results — DiziGroww",
    description:
      "No flat retainers. Our Performance Growth Package charges you based on the orders we actually generate — ₹20,000 for your first 75 orders, ₹10,000 for the next 45, then just 5% of sales after that.",
    keywords:
      "performance marketing, pay per order, results based marketing, DiziGroww growth package, D2C ads agency",
    canonicalUrl: "https://dizigroww.in/growth-package",
    ogImage: "https://dizigroww.in/logo.png",
  });

  const whatsappLink =
    "https://wa.me/919450010826?text=Hi!%20I%20have%20a%20question%20about%20the%20Performance%20Growth%20Package.";

  const tiers = [
    {
      range: "First 75 orders",
      price: "₹20,000",
      note: "Flat fee to set up, launch & get your first wave of results.",
    },
    {
      range: "Next 45 orders (76–120)",
      price: "₹10,000",
      note: "Lower fee once your funnel is proven and scaling.",
    },
    {
      range: "After 120 orders",
      price: "5% of total sales",
      note: "We only earn more when you earn a lot more.",
      highlight: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 lg:pt-32">
        {/* 1. HERO */}
        <section className="section-padding bg-gradient-to-b from-primary/5 to-background text-center relative overflow-hidden">
          <div className="container-main max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs tracking-wider uppercase font-semibold mb-6">
                <Zap className="w-3.5 h-3.5" /> Performance-Based Pricing
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
                The Performance Growth Package
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto font-medium">
                Tired of paying flat retainers regardless of results?{" "}
                <span className="text-foreground font-bold">You pay only for results.</span>
              </p>

              <div className="bg-primary/10 border border-primary/20 text-foreground px-4 py-3 md:px-6 md:py-3 rounded-2xl md:rounded-full inline-flex flex-col sm:flex-row items-center font-semibold text-sm md:text-base mb-8 shadow-sm">
                ₹20,000 for your first 75 orders → ₹10,000 for the next 45 → just 5% of sales after that.
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
                Get My Custom Quote <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* 2. PAIN AMPLIFICATION */}
        <section className="pb-16 bg-background">
          <div className="container-main max-w-4xl">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Paying a flat retainer even in months with weak results.",
                "No clear link between agency fees and actual orders.",
                "Locked into contracts before trust is even built.",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 p-6 bg-card rounded-2xl border border-border hover:shadow-md transition-shadow text-center items-center"
                >
                  <XCircle className="w-8 h-8 text-primary/70" />
                  <p className="text-lg text-foreground font-semibold">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. PRICING TIERS */}
        <section className="section-padding bg-card border-y border-border">
          <div className="container-main max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
              Simple, Milestone-Based Pricing
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              The more orders we generate for you, the more it costs — and the rate drops the further we scale you.
              No hidden fees.
            </p>

            <div className="bg-background rounded-3xl border border-border overflow-hidden shadow-lg mb-8">
              <div className="divide-y divide-border">
                {tiers.map((t, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-2 p-5 sm:p-6 items-center ${
                      t.highlight ? "bg-primary/10 border-t-2 border-primary" : ""
                    }`}
                  >
                    <div>
                      <p
                        className={`font-bold text-sm sm:text-base ${
                          t.highlight ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {t.range}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">{t.note}</p>
                    </div>
                    <div
                      className={`text-right font-extrabold ${
                        t.highlight ? "text-2xl sm:text-3xl text-primary" : "text-xl sm:text-2xl text-foreground"
                      }`}
                    >
                      {t.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold text-lg px-6 py-3 rounded-full mb-8">
                <TrendingUp className="w-5 h-5" /> You pay only for results!
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
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Pay as you grow
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHAT'S INCLUDED */}
        <section className="section-padding bg-background">
          <div className="container-main max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What's Included</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Full Campaign Setup & Tracking",
                  desc: "Pixel installation, conversions API, and campaign structure — built correctly from day one so every order is tracked back to the ad that drove it.",
                },
                {
                  title: "High-Intent Ad Campaigns",
                  desc: "We launch and manage campaigns built to drive real, paying orders — not vanity clicks.",
                },
                {
                  title: "Funnel & Landing Page Optimization",
                  desc: "We continuously test and fix the pages your ad traffic lands on, so more of that traffic converts into orders.",
                },
                {
                  title: "Weekly Reporting & Order Tracking",
                  desc: "Full visibility into exactly how many orders we've driven and what tier you're in — no surprises on the invoice.",
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
                    "D2C / e-commerce brands with a working product and checkout flow",
                    "Founders who want cost tied to real orders, not just ad spend",
                    "Brands ready to scale past their first 100+ orders",
                    "Teams willing to act on funnel & landing page fixes",
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
                    "Brand-new stores with zero traffic or sales history",
                    "Founders expecting guaranteed overnight results",
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
                  q: "How exactly is an \"order\" counted?",
                  a: "Every completed, paid order that comes through your store during the campaign, tracked via your store's order data plus our ad tracking. We agree on the exact tracking method with you before we start.",
                },
                {
                  q: "Why does the price drop as orders increase?",
                  a: "The heaviest lift is setup, testing, and getting the funnel to convert reliably. Once that foundation is proven, scaling further orders costs us less effort — so we pass that efficiency on to you.",
                },
                {
                  q: "What happens after 120 orders?",
                  a: "You move to a 5% of total sales fee — so as your revenue grows, our fee scales proportionally instead of jumping to an expensive flat retainer.",
                },
                {
                  q: "Is there a contract or lock-in?",
                  a: "No long-term contract. Since we only get paid as orders come in, there's no reason to lock you into anything.",
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
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Ready to pay only for results?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-xl">
              Tell us about your brand and get a custom quote in minutes.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openChatbot}
              className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-5 bg-primary text-white text-base md:text-xl font-bold rounded-2xl md:rounded-full shadow-xl hover:shadow-primary/50 transition-all inline-flex items-center justify-center gap-2 mb-8"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" /> Get My Custom Quote
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

      {/* Sticky Bottom CTA Banner for Mobile & Desktop */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] z-[100] flex justify-center items-center">
        <div className="container-main max-w-4xl flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="font-bold text-lg">Performance Growth Package</p>
            <p className="text-sm text-muted-foreground">Pay only for the orders we generate.</p>
          </div>
          <button
            onClick={openChatbot}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:shadow-primary/50 transition-all text-sm sm:text-base flex items-center justify-center gap-2"
          >
            Get My Custom Quote <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Auto-opening lead-capture chatbot */}
      <GrowthPackageChatbot />
    </div>
  );
};

export default GrowthPackage;
