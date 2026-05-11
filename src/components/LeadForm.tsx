import { useState } from "react";
import { motion } from "framer-motion";

const LeadForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", service: "", country: "", budget: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const whatsappNumber = "9450010826";
    const text = `New Audit Request!
*Name:* ${form.name}
*Email:* ${form.email}
*Phone:* ${form.phone}
*Business:* ${form.business}
*Country:* ${form.country}
*Service:* ${form.service}
*Budget:* ${form.budget}`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    
    // Submit to Web3Forms
    try {
      if (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
            from_name: "DiziGroww Leads",
            subject: "🔥 NEW LEAD - DiziGroww Website",
            name: form.name,
            email: form.email,
            phone: form.phone,
            business: form.business,
            service: form.service,
            country: form.country,
            budget: form.budget,
            message: `You have received a new inquiry from ${form.name}. \nEmail: ${form.email} \nPhone: ${form.phone} \nCountry: ${form.country} \nBusiness: ${form.business} \nService Needed: ${form.service} \nBudget: ${form.budget}`
          })
        });
      }
    } catch (error) {
      console.error("Web3Forms Submission Failed:", error);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Always open WhatsApp after attempt, even if Webhook fails (e.g., 403 Forbidden)
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (submitted) {
    return (
      <section className="section-padding" id="audit-form">
        <div className="container-main max-w-2xl text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card rounded-2xl p-12 shadow-card">
            <h2 className="text-3xl mb-4 text-primary">Thank You! 🎉</h2>
            <p className="text-muted-foreground">We've received your request. Our team will reach out within 24 hours.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding" id="audit-form">
      <div className="container-main max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl text-center mb-4"
        >
          Ready to build something great?
        </motion.h2>
        <p className="text-center text-muted-foreground mb-10">Fill out the form below and our team will respond within 4 business hours.</p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-8 shadow-card space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <input
              required
              name="name"
              autoComplete="name"
              aria-label="Your Name"
              maxLength={80}
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              aria-label="Email Address"
              maxLength={120}
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              aria-label="Phone Number"
              maxLength={20}
              inputMode="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <select
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Business Type</option>
              <option>E-Commerce</option>
              <option>SaaS</option>
              <option>Local Business</option>
              <option>Corporate</option>
              <option>Startup</option>
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <select
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Country</option>
              <option>UAE</option>
              <option>Singapore</option>
              <option>India</option>
              <option>US</option>
              <option>Other</option>
            </select>
            <select
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Budget Range</option>
              <option>$500 - $1,000</option>
              <option>$1,000 - $3,000</option>
              <option>$3,000 - $5,000</option>
              <option>$5,000+</option>
            </select>
          </div>
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Service Needed</option>
            <option>Web Development (Shopify)</option>
            <option>Web Development (WordPress)</option>
            <option>Landing Pages</option>
            <option>Website Redesign & CRO</option>
            <option>Performance Marketing</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary to-[hsl(0,100%,63%)] text-primary-foreground py-4 rounded-full font-semibold shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Sending...</span>
            ) : (
              "Get Your Custom Quote"
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default LeadForm;
