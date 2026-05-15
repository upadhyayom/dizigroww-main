import { Link } from "react-router-dom";

const Footer = () => (
  <>
    {/* SUPPORT CTA SECTION */}
    <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 sm:py-16 text-center border-t border-primary/10">
      <div className="container-main flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Need More Information?</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Have questions about our services or need help with a campaign? Book a free discovery call with our experts today.
        </p>
        <Link
          to="/contact"
          className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
        >
          Book a Discovery Call
        </Link>
      </div>
    </section>

    <footer className="bg-charcoal text-charcoal-foreground">
    <div className="container-main section-padding">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <img src="/logo.png" alt="DiziGroww Logo" className="h-12 w-auto bg-white/90 p-2 rounded" />
          </Link>
          <p className="text-sm text-charcoal-foreground/60 leading-relaxed">
            International Web Development and Performance Marketing Agency. Serving clients in India 🇮🇳 | UAE 🇦🇪 | Singapore 🇸🇬 | Philippines 🇵🇭
          </p>
          <p className="mt-4 text-xs text-charcoal-foreground/50 font-semibold uppercase tracking-wider flex items-center gap-2">
            <span>🕒 Available Mon–Sat, 10AM–7PM IST (GMT+5:30)</span>
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-sm font-bold mb-4 uppercase tracking-wider text-charcoal-foreground/80">Services</h4>
          <ul className="space-y-2 text-sm text-charcoal-foreground/60">
            <li><Link to="/services/performance-marketing" className="hover:text-primary transition-colors">Meta Ads Management</Link></li>
            <li><Link to="/services/performance-marketing" className="hover:text-primary transition-colors">Google Ads Management</Link></li>
            <li><Link to="/services/website-redesign-cro" className="hover:text-primary transition-colors">Conversion Rate Optimization</Link></li>
            <li><Link to="/services/landing-page-design" className="hover:text-primary transition-colors">Landing Page Design</Link></li>
            <li><Link to="/services/shopify-development" className="hover:text-primary transition-colors">Shopify & Ecommerce</Link></li>
            <li><Link to="/services/wordpress-development" className="hover:text-primary transition-colors">WordPress Development</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-display text-sm font-bold mb-4 uppercase tracking-wider text-charcoal-foreground/80">Company</h4>
          <ul className="space-y-2 text-sm text-charcoal-foreground/60">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
            <li><Link to="/web-development-dubai" className="hover:text-primary transition-colors">Web Dev Dubai</Link></li>
            <li><Link to="/web-development-singapore" className="hover:text-primary transition-colors">Web Dev Singapore</Link></li>
            <li><Link to="/web-development-philippines" className="hover:text-primary transition-colors">Web Dev Philippines</Link></li>
            <li><Link to="/#why-us" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
          </ul>
        </div>

        {/* Contact & Legal */}
        <div>
          <h4 className="font-display text-sm font-bold mb-4 uppercase tracking-wider text-charcoal-foreground/80">Get In Touch</h4>
          <ul className="space-y-2.5 text-sm text-charcoal-foreground/60">
            <li className="flex items-start gap-2">
              <span className="font-semibold w-20 flex-shrink-0">Email:</span>
              <a href="mailto:info@dizigroww.in" className="hover:text-primary transition-colors word-break-all">info@dizigroww.in</a>
            </li>
            <li className="flex items-start gap-2 pt-2 border-t border-charcoal-foreground/10 mt-2">
              <span className="font-semibold w-20 flex-shrink-0">Address:</span>
              <span>Plot 19, KP, Greater Noida, Uttar Pradesh</span>
            </li>
            <li className="flex items-start gap-2 pt-1">
              <span className="font-semibold w-20 flex-shrink-0">GSTIN:</span>
              <span className="uppercase tracking-wider font-mono text-xs mt-0.5">09AMVPU5948E1Z4</span>
            </li>
            <li className="flex items-center gap-4 pt-4 mt-2 border-t border-charcoal-foreground/10">
              <img src="/msme-logo.png" alt="MSME Registered" className="h-10 w-auto bg-white p-1 rounded-sm object-contain" />
              <img src="/digital-india-logo.png" alt="Digital India" className="h-10 w-auto bg-white p-1 rounded-sm object-contain" />
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-charcoal-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-foreground/40">
        <span>© {new Date().getFullYear()} DiziGroww · Performance Marketing Agency</span>
        <div className="flex gap-4 items-center">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors hover:underline">Privacy Policy</Link>
          <span>·</span>
          <span>Google & Meta Certified</span>
        </div>
      </div>
    </div>
    </footer>
  </>
);

export default Footer;
