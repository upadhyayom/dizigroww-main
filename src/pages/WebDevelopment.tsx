import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustedBrands from "@/components/TrustedBrands";
import Pricing from "@/components/Pricing";
import { useMeta } from "@/hooks/useMeta";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MonitorSmartphone, ShoppingCart, LayoutTemplate, Layout, Calendar, Mail, MessageCircle, MapPin } from "lucide-react";


const WebDevelopment = () => {
  useMeta({
    title: "Top Web Development Agency | Shopify, WordPress, React, Next.js | DiziGroww",
    description: "Award-winning web development agency. We build high-converting Shopify stores, WordPress sites, React SPAs & Next.js platforms for D2C brands and startups across India, UAE & Singapore. 50+ clients served globally.",
    keywords: "web development agency, shopify development, wordpress development, react development, nextjs development, ecommerce development, web developer India, web developer Dubai, web developer Singapore",
    canonicalUrl: "https://dizigroww.in/web-development",
    ogImage: "https://dizigroww.in/logo.png"
  });

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "Singapore",
    service: "Shopify",
    budget: "$200–$500",
    brief: ""
  });

  const scrollToForm = () => {
    document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
            from_name: "DiziGroww Leads (Landing Page)",
            subject: "🚀 NEW LEAD - Web Dev Landing Page",
            ...formData,
            message: `New inquiry from ${formData.name}.\nEmail: ${formData.email}\nCountry: ${formData.country}\nService: ${formData.service}\nBudget: ${formData.budget}\nBrief: ${formData.brief}`
          })
        });
      }
    } catch (error) {
      console.error("Submission Failed:", error);
    } finally {
      setIsSubmitting(false);
      navigate("/thank-you");
    }
  };

  return (
    <>

      <Navbar />
      <main className="overflow-x-hidden">
        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] flex items-center px-4 sm:px-6 lg:px-8 py-20 pt-32 bg-background overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen"></div>

          <div className="container-main text-center relative z-10">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              International Web Development Agency
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold max-w-5xl mx-auto mb-6 leading-[1.1] tracking-tight">
              We Build Websites That Work <span className="text-primary italic">While You Sleep</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Shopify stores, React apps, WordPress sites & Next.js platforms — built fast, built to convert, built for growth.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button onClick={scrollToForm} whileHover={{ scale: 1.05 }} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full text-base font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all">
                Start Your Project <ArrowRight size={18} />
              </motion.button>
              <motion.button onClick={scrollToForm} whileHover={{ scale: 1.05 }} className="bg-secondary hover:bg-secondary/80 text-foreground px-8 py-4 rounded-full text-base font-bold border border-border shadow-sm flex items-center justify-center gap-2 transition-all">
                <Calendar size={18} /> Book Discovery Call
              </motion.button>
            </div>
            
            <div className="mt-14 pt-8 border-t border-border/50 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground max-w-4xl mx-auto">
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary"/> 50+ Clients Served Globally</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary"/> 6+ Countries Served</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary"/> 100% Client Satisfaction</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary"/> Avg. Delivery: 14 Days</span>
            </div>
          </div>
        </section>

        {/* TRUSTED BRANDS & PORTFOLIO INJECTED */}
        <div id="portfolio">
          <TrustedBrands />
        </div>

        {/* SERVICES OFFERED */}
        <section className="py-24 bg-secondary/20">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Build</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Enterprise-grade architectures tailored for growing international D2C brands and tech startups.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <div className="bg-card p-10 rounded-3xl border border-border/60 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"><ShoppingCart size={28} /></div>
                    <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-wider">Best for: D2C & eCommerce</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Shopify Store Development</h3>
                  <ul className="space-y-3 mb-8 text-muted-foreground">
                    <li className="flex gap-2 items-start"><ArrowRight size={18} className="text-primary mt-0.5 shrink-0"/> Custom theme development</li>
                    <li className="flex gap-2 items-start"><ArrowRight size={18} className="text-primary mt-0.5 shrink-0"/> Conversion-optimized layouts</li>
                    <li className="flex gap-2 items-start"><ArrowRight size={18} className="text-primary mt-0.5 shrink-0"/> App integrations & speed optimization</li>
                  </ul>
                  <div className="pt-6 border-t border-border flex justify-between items-center">
                    <span className="font-bold text-lg">Starts from <span className="text-primary">$299 onwards</span></span>
                    <button onClick={scrollToForm} className="text-primary font-semibold text-sm hover:underline flex items-center gap-1"><Calendar size={14}/> Book Call →</button>
                  </div>
                </div>

                <div className="bg-card p-10 rounded-3xl border border-border/60 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"><LayoutTemplate size={28} /></div>
                    <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-wider">Best for: Businesses & Blogs</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">WordPress / WooCommerce</h3>
                  <ul className="space-y-3 mb-8 text-muted-foreground">
                    <li className="flex gap-2 items-start"><ArrowRight size={18} className="text-primary mt-0.5 shrink-0"/> Custom WordPress sites</li>
                    <li className="flex gap-2 items-start"><ArrowRight size={18} className="text-primary mt-0.5 shrink-0"/> WooCommerce store setup</li>
                    <li className="flex gap-2 items-start"><ArrowRight size={18} className="text-primary mt-0.5 shrink-0"/> Plugin integrations & SEO structure</li>
                  </ul>
                  <div className="pt-6 border-t border-border flex justify-between items-center">
                    <span className="font-bold text-lg">Starts from <span className="text-primary">$199 onwards</span></span>
                    <button onClick={scrollToForm} className="text-primary font-semibold text-sm hover:underline flex items-center gap-1"><Calendar size={14}/> Book Call →</button>
                  </div>
                </div>

                <div className="bg-card p-10 rounded-3xl border border-border/60 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"><MonitorSmartphone size={28} /></div>
                    <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-wider">Best for: Startups & SaaS</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">React.js Development</h3>
                  <ul className="space-y-3 mb-8 text-muted-foreground">
                    <li className="flex gap-2 items-start"><ArrowRight size={18} className="text-primary mt-0.5 shrink-0"/> Custom web apps & SPAs</li>
                    <li className="flex gap-2 items-start"><ArrowRight size={18} className="text-primary mt-0.5 shrink-0"/> Interactive dashboards</li>
                    <li className="flex gap-2 items-start"><ArrowRight size={18} className="text-primary mt-0.5 shrink-0"/> Secure API integrations</li>
                  </ul>
                  <div className="pt-6 border-t border-border flex justify-between items-center">
                    <span className="font-bold text-lg">Starts from <span className="text-primary">$499 onwards</span></span>
                    <button onClick={scrollToForm} className="text-primary font-semibold text-sm hover:underline flex items-center gap-1"><Calendar size={14}/> Book Call →</button>
                  </div>
                </div>

                <div className="bg-card p-10 rounded-3xl border border-border/60 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"><Layout size={28} /></div>
                    <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-wider">Best for: High-Performance</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Next.js Development</h3>
                  <ul className="space-y-3 mb-8 text-muted-foreground">
                    <li className="flex gap-2 items-start"><ArrowRight size={18} className="text-primary mt-0.5 shrink-0"/> Full-stack Server Side Rendering</li>
                    <li className="flex gap-2 items-start"><ArrowRight size={18} className="text-primary mt-0.5 shrink-0"/> SEO-optimized web architectures</li>
                    <li className="flex gap-2 items-start"><ArrowRight size={18} className="text-primary mt-0.5 shrink-0"/> Headless CMS integrations</li>
                  </ul>
                  <div className="pt-6 border-t border-border flex justify-between items-center">
                    <span className="font-bold text-lg">Starts from <span className="text-primary">$599 onwards</span></span>
                    <button onClick={scrollToForm} className="text-primary font-semibold text-sm hover:underline flex items-center gap-1"><Calendar size={14}/> Book Call →</button>
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="py-20 bg-background text-center relative overflow-hidden">
          <div className="container-main relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
            <p className="text-muted-foreground mb-16 text-lg">A transparent, milestone-driven process designed for speed and quality.</p>
            
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4 relative max-w-5xl mx-auto">
              {/* Line connector */}
              <div className="hidden md:block absolute top-[28px] left-8 right-8 h-0.5 bg-border -z-10"></div>
              
              {[
                { step: "01", title: "Brief & Discovery", duration: "Day 1–2" },
                { step: "02", title: "Design Mockup", duration: "Day 3–5" },
                { step: "03", title: "Development", duration: "Day 6–18" },
                { step: "04", title: "Review & Revisions", duration: "Day 19–21" },
                { step: "05", title: "Launch & Handover", duration: "Day 22+" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center bg-card md:bg-transparent p-6 md:p-0 rounded-2xl border md:border-none border-border w-full md:w-40 relative group">
                  <div className="w-14 h-14 rounded-full bg-background border-4 border-card flex items-center justify-center font-bold text-primary text-xl mb-4 shadow-[0_0_0_2px_rgba(var(--primary),0.2)] md:shadow-none md:border-2 md:border-border group-hover:border-primary transition-colors">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-base mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground font-medium">{item.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING (shared component, USD default for international page) */}
        <Pricing defaultCurrency="USD" />

        {/* COMBINED CALENDLY + CONTACT FORM SECTION */}
        <section id="contact-section" className="py-24 bg-background border-t border-border/50">
          <div className="container-main max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Let's Discuss <span className="text-primary">Your Project</span></h2>
              <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">Book a strategy call directly with our tech leads below, or drop your project brief into the form and we'll reply within 4 hours.</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
              
              {/* LEFT COLUMN: Calendly (Top) + Address Details (Bottom) */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-xl min-h-[500px] flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 mb-1">Book a Strategy Call</h3>
                    <p className="text-muted-foreground text-sm">Select a convenient time below.</p>
                  </div>
                  <div className="w-full bg-secondary/20 rounded-2xl overflow-hidden border border-border flex-grow h-[450px]">
                    <div className="calendly-inline-widget w-full h-[450px]" data-url="https://calendly.com/dizigrowwofficial/30min?text_color=ffffff&primary_color=cb201f&background_color=1a1a1a"></div>
                  </div>
                </div>

                <div className="bg-secondary/30 p-6 md:p-8 rounded-3xl border border-border h-full flex flex-col justify-center">
                  <h3 className="font-bold text-lg mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary"><Mail size={18} /></div>
                      <div>
                        <p className="font-bold text-sm">Email Us</p>
                        <p className="text-muted-foreground text-sm">info@dizigroww.in</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary"><MessageCircle size={18} /></div>
                      <div>
                        <p className="font-bold text-sm">WhatsApp / Phone</p>
                        <p className="text-muted-foreground text-sm">+91 9450010826</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary"><MapPin size={18} /></div>
                      <div>
                        <p className="font-bold text-sm">Office Location</p>
                        <p className="text-muted-foreground text-sm">Greater Noida, UP, India</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Lead Capture Form */}
              <div className="lg:col-span-3">
                <div className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-xl h-full flex flex-col">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2">Send Your Project Brief</h3>
                    <p className="text-muted-foreground text-sm">Prefer typing? Fill in the details and we'll send a proposal.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5 flex-grow flex flex-col justify-between">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">Full Name *</label>
                        <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground" placeholder="Jane Doe" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">Email Address *</label>
                        <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground" placeholder="jane@company.com" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">Country</label>
                        <select value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground appearance-none">
                          <option value="India">India</option>
                          <option value="UAE">UAE</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Australia">Australia</option>
                          <option value="Canada">Canada</option>
                          <option value="US">US</option>
                          <option value="UK">UK</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">Service Needed</label>
                        <select value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground appearance-none">
                          <option value="Shopify">Shopify</option>
                          <option value="WordPress">WordPress / WooCommerce</option>
                          <option value="React">React.js</option>
                          <option value="Nextjs">Next.js</option>
                          <option value="Not Sure">Not Sure</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">Budget Range (USD)</label>
                      <select value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground appearance-none">
                        <option value="Under $200">Under $200</option>
                        <option value="$200–$500">$200–$500</option>
                        <option value="$500–$1000">$500–$1000</option>
                        <option value="$1000+">$1000+</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">Project Brief *</label>
                      <textarea required rows={4} value={formData.brief} onChange={(e) => setFormData({...formData, brief: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground resize-y" placeholder="Tell us about your project..."></textarea>
                    </div>

                    <div className="pt-2">
                      <button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl transition-colors shadow-lg shadow-primary/20 flex justify-center items-center gap-2">
                        {isSubmitting ? "Sending..." : <>Send My Brief & Get a Quote <ArrowRight size={18} /></>}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};
export default WebDevelopment;
