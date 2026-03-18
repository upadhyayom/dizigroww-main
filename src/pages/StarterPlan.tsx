import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, XCircle, ChevronDown } from "lucide-react";
import LeadForm from "@/components/LeadForm";

const StarterPlan = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentLink = "https://payments.cashfree.com/forms/dizigroww-growth-starter-plan-99";
  // Adding 91 country code to the number ensures the link works correctly
  const whatsappLink = "https://wa.me/919450010826?text=Hi!%20I%20have%20a%20doubt%20about%20the%20Starter%20Plan.";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 lg:pt-32">
        {/* 1. HERO SECTION */}
        <section className="section-padding bg-gradient-to-b from-primary/5 to-background text-center">
          <div className="container-main max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                For Beginners & New D2C Brands
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                Running Ads But Not Getting Sales? Let’s Fix Your Foundation.
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Stop burning money on random testing. Our <span className="text-primary font-semibold">30-Day Starter Growth Plan</span> audits your setup, launches a proven campaign, and gives you a clear roadmap.
              </p>
              
              <div className="flex flex-col items-center gap-4 mb-10">
                <div className="text-5xl font-extrabold text-foreground tracking-tight">
                  ₹999 <span className="text-xl text-muted-foreground font-normal line-through ml-2">₹4,999</span>
                </div>
                <p className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  One-time payment. Zero long-term commitment.
                </p>
              </div>

              <div className="flex justify-center mb-6">
                <a
                  href={paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    if (typeof fbq !== "undefined") {
                      fbq('track', 'InitiateCheckout');
                    }
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-5 bg-primary text-white text-lg font-bold rounded-full shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2"
                  >
                    Start My 30-Day Growth Plan <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </a>
              </div>
              <p className="text-xs text-muted-foreground mb-6">Secure payment via Cashfree.</p>

              {/* NEW WHATSAPP BUTTON - HERO */}
              <div className="flex justify-center">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#25D366] font-semibold hover:text-[#20bd5a] transition-colors bg-[#25D366]/10 px-5 py-2.5 rounded-full border border-[#25D366]/30 hover:bg-[#25D366]/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  For any doubts connect us on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. PROBLEM SECTION */}
        <section className="section-padding bg-white">
          <div className="container-main max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">The "Agency" Trap is Bleeding Your Budget.</h2>
            <div className="grid gap-6">
              {[
                "You’re running ads but sales are stagnant, and you don’t know why.",
                "Agencies quote you ₹20,000+ per month minimum retainers, which you can't afford right now.",
                "You are confused by ROAS, CPAs, and pixel tracking jargon."
              ].map((text, i) => (
                <div key={i} className="flex gap-4 p-6 bg-red-50/50 rounded-2xl border border-red-100 items-start">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground font-medium">{text}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-10 text-xl font-semibold text-primary">
              That's exactly why we created the ₹999 Starter Plan.
            </p>
          </div>
        </section>

        {/* 3. WHAT YOU GET */}
        <section className="section-padding bg-charcoal text-white">
          <div className="container-main max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What You Actually Get for ₹999</h2>
            <p className="text-center text-charcoal-foreground mb-12 max-w-2xl mx-auto text-lg">
              No fluff. No empty promises. Just the exact foundation you need to start getting sales.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              {[
                { title: "Basic Meta/Google Ads Setup", desc: "We ensure your pixel, conversions, and ad accounts are structured correctly from day one." },
                { title: "1 Initial Campaign Launch", desc: "We will build and launch one highly-targeted testing campaign to gather data and initial sales." },
                { title: "Website Conversion Audit", desc: "We review your landing page/store and point out exactly why visitors might not be buying." },
                { title: "Next-Step Roadmap", desc: "A clear action plan on how to improve performance after the 30 days are up." }
              ].map((item, i) => (
                <div key={i} className="bg-charcoal-light/10 p-8 rounded-2xl border border-charcoal-foreground/10 hover:border-primary/50 transition-colors">
                  <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-charcoal-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-2xl text-center max-w-2xl mx-auto">
              <p className="text-yellow-200 font-medium">
                ⚠️ <span className="font-bold">IMPORTANT:</span> This is a 30-day starter pack designed for beginners to get off the ground. It is <span className="underline decoration-yellow-500">not full-scale, daily ad management</span> meant for multi-lakh budget scaling.
              </p>
            </div>
          </div>
        </section>

        {/* 4. WHY ₹999 & WHO IT'S FOR */}
        <section className="section-padding bg-background border-t border-border">
          <div className="container-main max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Is This Right For You?</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Who it's FOR */}
              <div className="bg-green-50/50 p-8 xl:p-10 rounded-3xl border border-green-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full -z-10 blur-xl"></div>
                <h3 className="text-2xl font-bold mb-6 text-green-800 flex items-center gap-2">
                  <CheckCircle2 className="text-green-600" /> PERFECT FOR:
                </h3>
                <ul className="space-y-4">
                  {[
                    "New D2C brands taking their first step in paid ads",
                    "Store owners testing the waters before committing to ₹20k+ retainers",
                    "Founders whose initial ad attempts failed to bring sales",
                    "Brands spending less than ₹50,000/month on ads"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-foreground font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who it's NOT FOR */}
              <div className="bg-red-50/50 p-8 xl:p-10 rounded-3xl border border-red-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-bl-full -z-10 blur-xl"></div>
                <h3 className="text-2xl font-bold mb-6 text-red-800 flex items-center gap-2">
                  <XCircle className="text-red-600" /> NOT FOR:
                </h3>
                <ul className="space-y-4">
                  {[
                    "Established brands expecting full daily campaign management",
                    "Founders who expect a 10x guaranteed ROAS overnight",
                    "Brands already spending lakhs per month (Check our advanced plans instead)",
                    "People who aren't willing to fix their website based on our audit"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-foreground font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. HOW IT WORKS */}
        <section className="section-padding bg-muted/30">
          <div className="container-main max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works (4 Simple Steps)</h2>
            <div className="grid sm:grid-cols-4 gap-6 relative">
              <div className="hidden sm:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0"></div>
              
              {[
                { step: "1", title: "Apply Below", desc: "Fill out the form. You only pay ₹999 if we accept you." },
                { step: "2", title: "Submit Details", desc: "We'll send a quick onboarding form for ad account access." },
                { step: "3", title: "Setup & Audit", desc: "We review your site and set up your initial campaign." },
                { step: "4", title: "Go Live!", desc: "We launch the ads and provide your growth roadmap." }
              ].map((item, i) => (
                <div key={i} className="relative z-10 bg-card p-6 rounded-2xl border border-border shadow-sm text-center">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border-4 border-background shadow-sm">
                    {item.step}
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ & OBJECTION HANDLING */}
        <section className="section-padding bg-background border-t border-border">
          <div className="container-main max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { 
                  q: "Why is it only ₹999 if agencies charge ₹20,000+?", 
                  a: "Agencies charge high retainers because of daily management, unlimited revisions, and multi-lakh budget scaling. This plan provides the foundational setup and 1 launching campaign, making it cheap and safe for beginners. If things go well, you might upgrade to our advanced tracking later—but there is zero pressure to do so!" 
                },
                { 
                  q: "Will this guarantee sales?", 
                  a: "No honest marketer can guarantee sales. What we do guarantee is that your pixel is firing correctly, your campaign is structured using current best practices, and you'll know exactly why your ads are (or aren't) working." 
                },
                { 
                  q: "Is this enough to get started?", 
                  a: "Yes! The biggest hurdle is just getting the first campaign live without messing up the technical setup. This skips the headache and gives you a solid springboard." 
                }
              ].map((faq, i) => (
                <div key={i} className="bg-muted/50 p-6 rounded-2xl border border-border">
                  <h3 className="font-bold text-lg mb-2 flex justify-between items-center group">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <div id="lead-form-section" className="bg-primary/5 border-t border-primary/10 pb-24">
          <div className="py-20 text-center">
             <h2 className="text-3xl md:text-4xl px-4 font-bold mb-6">Start Your 30-Day Growth Plan</h2>
            <p className="text-muted-foreground max-w-xl mx-auto px-4 mb-10 text-lg">
              We only accept <span className="font-bold text-foreground">5 starter clients per week</span> to ensure high quality execution. Secure your spot today for ₹999.
            </p>
            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof fbq !== "undefined") {
                  fbq('track', 'InitiateCheckout');
                }
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-primary text-white text-xl font-bold rounded-full shadow-lg hover:shadow-primary/50 transition-all inline-flex items-center gap-2 mb-6"
              >
                Pay ₹999 Now <ArrowRight className="w-6 h-6" />
              </motion.button>
            </a>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-10">
               <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500"/> Secured checkout</span>
            </div>

            {/* NEW WHATSAPP BUTTON - FOOTER */}
            <div className="flex justify-center mt-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-base font-semibold rounded-full shadow-lg hover:bg-[#20bd5a] transition-all hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                For any doubts connect us on WhatsApp
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
            <p className="font-bold text-lg">30-Day Starter Growth Plan</p>
            <p className="text-sm text-muted-foreground">₹999 One-time. No commitment.</p>
          </div>
          <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:shadow-primary/50 transition-all text-sm sm:text-base flex items-center justify-center gap-2"
            >
              Start Your 30 Days Plan <ArrowRight className="w-4 h-4" />
            </motion.button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StarterPlan;
