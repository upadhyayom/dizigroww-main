import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustSection from "@/components/TrustSection";
import { useMeta } from "@/hooks/useMeta";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
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
  ExternalLink,
} from "lucide-react";

const philippinesBrands = [
  { name: "Mortantra", tagline: "Heritage jewellery, modern web", url: "https://mortantra.com/", stack: "Shopify" },
  { name: "Dring", tagline: "Wellness D2C storefront", url: "https://dring.in/", stack: "Shopify" },
  { name: "Varak Edible Luxury", tagline: "Premium edible luxury", url: "https://www.varakedibleluxury.com/", stack: "Shopify" },
  { name: "Prince Jewellers", tagline: "Cross-border jewellery", url: "https://www.princejewellers.com.au/", stack: "Shopify" },
  { name: "EVO Labs", tagline: "Research & supplements", url: "https://www.evolabsresearch.co/", stack: "Next.js" },
  { name: "EvoVera", tagline: "Wellness ecommerce", url: "https://evovera.store/", stack: "React" },
  { name: "MotoBlox", tagline: "Automotive parts portal", url: "https://motoblox.com/", stack: "WordPress" },
  { name: "Nexpept", tagline: "Health brand, scaled to Canada", url: "https://www.nexpept.ca/", stack: "Shopify Plus" },
  { name: "The Fragrance Empire", tagline: "Luxury fragrances", url: "https://thefragranceempire.com/", stack: "Shopify" },
  { name: "Toy Collectors India", tagline: "Collectibles retail", url: "https://www.toycollectorsindia.com/", stack: "Shopify" },
  { name: "Sanduk", tagline: "Modern traditional fashion", url: "https://sanduk.co/", stack: "WooCommerce" },
  { name: "Stikrly", tagline: "Storefront optimised", url: "https://stikrly.in/", stack: "Shopify & Web" },
];

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

        {/* BRANDS WE'VE BUILT */}
        <section className="section-padding bg-background">
          <div className="container-main">
            <div className="text-center mb-14">
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
                Brands We've Built &amp; Partnered With
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">20+ Brands. Live. Converting. Globally.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From heritage jewellery to D2C wellness — here's a snapshot of the conversion machines we've shipped for brands across India, the USA, Dubai and Asia-Pacific.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {philippinesBrands.map((brand) => (
                <a
                  key={brand.name}
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-primary/40 transition-all flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold font-display tracking-tight group-hover:text-primary transition-colors">
                      {brand.name}
                    </h3>
                    <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </div>
                  <p className="text-sm text-muted-foreground">{brand.tagline}</p>
                  <span className="mt-1 inline-block text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-full self-start">
                    {brand.stack}
                  </span>
                </a>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-10">
              Want to see the full portfolio? <a href="/portfolio" className="text-primary font-semibold hover:underline">View all projects →</a>
            </p>
          </div>
        </section>

        {/* PRICING */}
        <section className="section-padding bg-secondary/30 border-y border-border">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Flat-rate USD billing. PHP invoicing available on request. No retainers, no surprises.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-card p-8 rounded-2xl border border-border flex flex-col relative overflow-hidden">
                <h3 className="text-xl font-bold mb-1">Launch</h3>
                <p className="text-sm text-muted-foreground mb-6">Perfect for ad campaign landing pages.</p>
                <div className="text-4xl font-black mb-6">
                  $200<span className="text-xl ml-2 font-bold tracking-normal opacity-70">onwards</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> Single high-converting page
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> Mobile-first responsive build
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> Meta Pixel + GA4 setup
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> Lead form / WhatsApp CTA
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> Live in 7–10 days
                  </li>
                </ul>
                <a
                  href="/contact"
                  className="block text-center bg-secondary hover:bg-border text-foreground font-semibold py-3 rounded-xl transition-colors"
                >
                  Start Project
                </a>
              </div>

              <div className="bg-foreground text-background p-8 rounded-2xl border flex flex-col relative shadow-xl transform md:-translate-y-4">
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-wider uppercase">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold mb-1">Conversion Store</h3>
                <p className="text-sm text-gray-400 mb-6">Full Shopify store, ad-ready.</p>
                <div className="text-4xl font-black mb-6">
                  $799<span className="text-xl ml-2 font-bold tracking-normal opacity-70">onwards</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> Full Shopify store (up to 30 products)
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> COD + GCash + Maya gateways
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> Pixel + CAPI + GA4 + TikTok pixel
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> CRO-optimised product pages
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> Live in 14 days
                  </li>
                </ul>
                <a
                  href="/contact"
                  className="block text-center bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  Start Project
                </a>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border flex flex-col relative">
                <h3 className="text-xl font-bold mb-1">Scale</h3>
                <p className="text-sm text-muted-foreground mb-6">For brands ready to scale ads.</p>
                <div className="text-4xl font-black mb-6">
                  $1,799<span className="text-xl ml-2 font-bold tracking-normal opacity-70">onwards</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> Custom Shopify or headless build
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> Up to 100 products + collections
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> Conversion audit + A/B framework
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> Email + SMS automation setup
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> 30-day post-launch support
                  </li>
                </ul>
                <a
                  href="/contact"
                  className="block text-center bg-secondary hover:bg-border text-foreground font-semibold py-3 rounded-xl transition-colors"
                >
                  Start Project
                </a>
              </div>
            </div>
          </div>
        </section>

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
