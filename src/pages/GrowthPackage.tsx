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
      title: "Retainer Ka Jaal",
      desc: (
        <>
          <strong className="text-foreground">₹20,000–₹50,000+ har mahine</strong> — chahe 5 order aaye ya 50. Bill
          toh aayega hi, result ho ya na ho.
        </>
      ),
    },
    {
      icon: Paintbrush,
      title: "Extra Cost, Extra Bill",
      desc: (
        <>
          Naya ad creative? Landing page change? Website fix? Zyada tar agencies inka{" "}
          <strong className="text-foreground">bill alag se</strong> bhejti hain — retainer ke upar.
        </>
      ),
    },
    {
      icon: FileWarning,
      title: "Koi Real Hisaab-Kitaab Nahi",
      desc: (
        <>
          Aap ek <strong className="text-foreground">monthly contract</strong> mein bandhe hote hain, jiska
          connection result se kam hi hota hai.
        </>
      ),
    },
  ];

  const journey = [
    {
      stage: "Stage 1",
      range: "Pehle 75 orders",
      price: "₹20,000",
      note: "Ek hi flat fee mein setup, ad creatives, tracking, aur aapke pehle real orders — kuch bhi extra bill nahi.",
    },
    {
      stage: "Stage 2",
      range: "Agle 45 orders (76–120)",
      price: "₹10,000",
      note: "System ab prove ho chuka hai — usko scale karna aasan hai, isliye fees kam ho jaati hai.",
    },
    {
      stage: "Stage 3",
      range: "120 orders ke baad",
      price: "Sales ka 5%",
      note: "Koi flat fee nahi — sirf sales ka chhota sa hissa. Jitna zyada bikega, utna zyada aap apne paas rakhenge.",
      highlight: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 lg:pt-32">
        {/* 1. HERO — pain pehle, price baad mein */}
        <section className="section-padding bg-gradient-to-b from-primary/5 to-background text-center relative overflow-hidden">
          <div className="container-main max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs tracking-wider uppercase font-semibold mb-6">
                <Zap className="w-3.5 h-3.5" /> Startups & Naye D2C Brands Ke Liye
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]">
                Growth Ke Liye Bhari Retainer Dena Zaroori Nahi Hai
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto font-medium">
                Zyada tar agencies har mahine <strong className="text-foreground">fixed fees</strong> lete hain —
                order aaye ya na aaye. Hum alag hain: <strong className="text-foreground">pay tabhi karein jab
                aapko real orders milein.</strong>
              </p>

              <div className="bg-primary/10 border border-primary/20 text-foreground px-4 py-3 md:px-6 md:py-3 rounded-2xl md:rounded-full inline-flex flex-col sm:flex-row items-center font-semibold text-sm md:text-base mb-8 shadow-sm">
                Bina retainer ke, aapke pehle 100+ orders tak ka poora plan — creatives aur website fixes sab
                included.
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
                Apni Growth Journey Shuru Karein <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* 2. PAIN POINTS */}
        <section className="pb-16 bg-background">
          <div className="container-main max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Ye Sab Suna-Suna Lagta Hai?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Isi wajah se zyada tar naye brands agency hire karne se pehle hi ruk jaate hain.
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
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Growth Ka Better Tareeka Hai</h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Performance Growth Package poora model badal deta hai. Aap sirf tab pay karte hain jab real orders
                aate hain — aur ad creatives, tracking, website/landing page fixes sab package mein included hain.
                Na koi surprise bill, na kisi kharab mahine ka bhaari invoice.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2.5 ROAS vs. ASLI PROFIT — hisaab, saaf saaf */}
        <section className="section-padding bg-muted/20 border-y border-border">
          <div className="container-main max-w-4xl">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" /> Wo Hisaab Jo Agencies Nahi Dikhati
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                ROAS Dekhne Mein Accha Lagta Hai. Profit Se Bill Bharta Hai.
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                3x ROAS (yani jo aapne ad pe kharcha kiya, uska 3 guna wapas) sunne mein zabardast lagta hai — lekin
                ye ye nahi batata ki aapko actually profit hua ya nahi. Ek simple example se samajhte hain.
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
                      <p className="font-semibold text-sm sm:text-base">Aapne Meta ads pe kharch kiya</p>
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
                      <p className="font-semibold text-sm sm:text-base">Meta ne wapas dikhaya 3x ROAS</p>
                      <p className="text-xs text-muted-foreground">Ye wahi number hai jo agencies dikhana pasand karti hain</p>
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
                      <p className="text-xs text-muted-foreground">Sirf example — agency ke hisaab se alag ho sakta hai</p>
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
                      <p className="font-semibold text-sm sm:text-base">Product, shipping, warehouse aur baaki costs</p>
                      <p className="text-xs text-muted-foreground">Yahi pe zyada tar brands hisaab bhool jaate hain (example: revenue ka ~40%)</p>
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
                      <p className="font-bold text-sm sm:text-base text-primary">Asli Profit</p>
                      <p className="text-xs text-muted-foreground">₹10 ke ad spend se, jeb mein actually kitna bacha</p>
                    </div>
                  </div>
                  <p className="font-extrabold text-2xl sm:text-3xl text-primary flex-shrink-0">₹8</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              Ye ek simplified example hai — aapke actual numbers aapke product margin, category aur stage pe
              depend karte hain. Baat wahi rehti hai: achha ROAS ka matlab achha profit nahi hota.
            </p>

            <div className="bg-card rounded-3xl border border-border shadow-sm p-8 md:p-10 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Hum Fixed Fees Kyun Nahi Lete</h3>
                  <p className="text-foreground font-semibold mb-2">
                    Normal agency pehle apni fees le leti hai — profit bacha ya nahi, unki problem nahi.
                  </p>
                  <ul className="text-muted-foreground leading-relaxed space-y-1.5 list-disc list-inside">
                    <li>ROAS achha ho ya na ho, unka bill same rehta hai</li>
                    <li>Aapke asli costs (product, shipping, warehouse) unki chinta nahi</li>
                    <li>
                      Growth Package alag hai: <strong className="text-foreground">hamari fees sirf aapke
                      actual orders ke saath badhti hai</strong> — aapke profit ke against nahi
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
                  <h3 className="text-xl font-bold mb-2">Pehle 100 Orders Itne Zaroori Kyun Hain</h3>
                  <p className="text-foreground font-semibold mb-2">
                    Meta ko seekhne ke liye real orders chahiye — jitni jaldi 100 orders, utni jaldi cost kam.
                  </p>
                  <ul className="text-muted-foreground leading-relaxed space-y-1.5 list-disc list-inside">
                    <li>Shuru mein cost per order zyada hoti hai — creative kitna bhi accha ho, ye normal hai</li>
                    <li>
                      Isliye <strong className="text-foreground">Stage 1 (pehle 75 orders)</strong> ek flat fee
                      pe hai — setup, testing aur creatives ka bhaari kaam yahin hota hai
                    </li>
                    <li>
                      Ek baar Meta ke paas data ho jaaye, cost per order kam ho jaati hai — isliye{" "}
                      <strong className="text-foreground">Stage 2 mein hamari fees bhi kam</strong> ho jaati hai
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
              Aapke Pehle 100+ Orders Tak Ka Safar
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              Teen simple stages. Koi retainer nahi. Koi chhupi hui creative ya website fees nahi — kabhi bhi.
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
                <TrendingUp className="w-5 h-5" /> Har sale ka zyada hissa hamesha aapke paas rehta hai.
              </div>
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openChatbot}
                  className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-5 bg-primary text-white text-base md:text-xl font-bold rounded-2xl md:rounded-full shadow-xl hover:shadow-primary/50 transition-all inline-flex items-center justify-center gap-2 mb-6"
                >
                  <span className="truncate">Dekhein Kya Mera Brand Qualify Karta Hai</span>{" "}
                  <ArrowRight className="w-5 h-5 flex-shrink-0" />
                </motion.button>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1 bg-secondary/30 px-3 py-1.5 rounded-md">
                  <ShieldCheck className="w-4 h-4 text-green-600" /> Koi fixed monthly retainer nahi
                </span>
                <span className="flex items-center gap-1 bg-secondary/30 px-3 py-1.5 rounded-md">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Koi chhupi hui creative/website fees nahi
                </span>
                <span className="flex items-center gap-1 bg-secondary/30 px-3 py-1.5 rounded-md">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Koi lock-in contract nahi
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHAT'S INCLUDED */}
        <section className="section-padding bg-background">
          <div className="container-main max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Sab Kuch Included — Koi Extra Bill Nahi</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              Journey ke har stage mein ye sab included hai. Baad mein kabhi alag se line item nahi aayega.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Poora Campaign Setup & Tracking",
                  desc: "Sahi tracking setup taaki pehle din se hi pata chale kaunsa ad order la raha hai.",
                },
                {
                  title: "Ad Creatives, Included",
                  desc: "Scroll rukwaane wale ad creatives, package ka hi hissa — zyada tar agencies ki tarah alag se quote nahi.",
                },
                {
                  title: "Website & Landing Page Fixes, Included",
                  desc: "Wo chhote fixes jo ad traffic ko order mein badalte hain, wo bhi included hain — mahine ke beech mein achanak extra bill nahi.",
                },
                {
                  title: "Weekly Reporting & Order Tracking",
                  desc: "Poori transparency — kitne orders aaye aur aap kaunsi stage mein hain, pay karte waqt koi surprise nahi.",
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

        {/* 5. PROOF — real results screenshots */}
        <DashboardResultsSection />
        <GoogleReviews />

        {/* 6. QUALIFICATION */}
        <section className="section-padding bg-background border-t border-border">
          <div className="container-main max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Kya Ye Aapke Liye Sahi Hai?</h2>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-card p-8 xl:p-10 rounded-3xl border border-border shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-primary text-xl" /> PERFECT HAI AGAR:
                </h3>
                <ul className="space-y-4">
                  {[
                    "Aapka D2C / e-commerce brand naya ya badh raha hai, aur product-checkout kaam kar raha hai",
                    "Aap abhi flat monthly retainer commit nahi karna chahte",
                    "Aap chahte hain ad creatives aur website fixes bina extra bill ke ho jaayein",
                    "Aap apne pehle 100+ orders ka target rakhte hain aur aage scale karna chahte hain",
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
                  <XCircle className="text-muted-foreground text-xl" /> YE NAHI HAI AGAR:
                </h3>
                <ul className="space-y-4">
                  {[
                    "Aapka store bilkul naya hai aur abhi tak koi traffic ya sales history nahi hai",
                    "Aap bina kisi effort ke turant result chahte hain",
                    "Aapke product/service ka koi clear per-unit \"order\" nahi hota",
                    "Aap tracking ke liye apna order/sales data share nahi karna chahte",
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
            <h2 className="text-3xl font-bold text-center mb-12">Aksar Poochhe Jaane Wale Sawaal</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Fixed retainer kyun nahi lete, jaisa doosri agencies leti hain?",
                  a: "Kyunki us model mein performance ka koi reward nahi hota — chahe hum 5 order laayein ya 500, aap same amount pay karte. Ye package aapki cost seedhe un orders se jodta hai jo hum actually laate hain.",
                },
                {
                  q: "Kya ad creatives aur website fixes sach mein included hain, ya wo extra hain?",
                  a: "Har stage mein included hain. Zyada tar agencies ki tarah hum creatives, tracking setup, ya landing page/website tweaks ka alag bill nahi bhejte — sab fees mein hi shaamil hai.",
                },
                {
                  q: "Orders badhne pe fees kam kyun ho jaati hai?",
                  a: "Sabse zyada mehnat shuruaat mein lagti hai — setup aur system ko reliably kaam karwana. Ek baar wo prove ho jaaye, aage orders badhana kam effort leta hai — isliye fees kam hoti hai, aur eventually sirf sales ka ek chhota percentage reh jaati hai.",
                },
                {
                  q: "120 orders ke baad kya hota hai?",
                  a: "Aap total sales ke 5% wale model mein chale jaate hain, taaki aapka revenue badhne ke saath hamari fees bhi proportionally badhe, na ki achanak ek mehenga flat retainer ban jaaye.",
                },
                {
                  q: "Koi lock-in contract hai?",
                  a: "Nahi. Kyunki aap sirf real orders aane pe pay karte hain, aapko kisi long-term contract mein bandhne ki koi wajah nahi hai.",
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
              Retainer Ke Bina Growth Shuru Karne Ke Liye Ready Hain?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-xl">
              Apne brand ke baare mein batayein aur dekhein Stage 1 aapke liye kaisa dikhta hai.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openChatbot}
              className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-5 bg-primary text-white text-base md:text-xl font-bold rounded-2xl md:rounded-full shadow-xl hover:shadow-primary/50 transition-all inline-flex items-center justify-center gap-2 mb-8"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" /> Apni Growth Journey Shuru Karein
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
                Sawaal Hai? WhatsApp Pe Poochein
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Sticky Bottom CTA Banner — chatbot khula ho toh chhupa dete hain taaki overlap na ho */}
      {!chatOpen && (
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] z-[100] flex justify-center items-center">
        <div className="container-main max-w-4xl flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="font-bold text-lg">Performance Growth Package</p>
            <p className="text-sm text-muted-foreground">Koi retainer nahi. Sirf real orders aane pe pay karein.</p>
          </div>
          <button
            onClick={openChatbot}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:shadow-primary/50 transition-all text-sm sm:text-base flex items-center justify-center gap-2"
          >
            Growth Journey Shuru Karein <ArrowRight className="w-4 h-4" />
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
