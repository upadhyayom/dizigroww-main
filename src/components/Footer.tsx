import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-charcoal text-charcoal-foreground">
    <div className="container-main section-padding">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <img src="/logo.png" alt="DiziGroww Logo" className="h-12 w-auto bg-white/90 p-2 rounded" />
          </Link>
          <p className="text-sm text-charcoal-foreground/60 leading-relaxed">
            Leading India-based performance marketing agency. We deliver high ROI through Meta Ads, Google Ads, eCommerce store development, and CRO for global brands.
          </p>
          <p className="mt-3 text-xs text-charcoal-foreground/40 font-semibold uppercase tracking-wider">
            Registered Business
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-sm font-bold mb-4 uppercase tracking-wider text-charcoal-foreground/80">Services</h4>
          <ul className="space-y-2 text-sm text-charcoal-foreground/60">
            <li><Link to="/services" className="hover:text-primary transition-colors">Meta Ads Management</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Google Ads Management</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Conversion Rate Optimization</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Landing Page Design</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Shopify & Ecommerce</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">WordPress Development</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-display text-sm font-bold mb-4 uppercase tracking-wider text-charcoal-foreground/80">Company</h4>
          <ul className="space-y-2 text-sm text-charcoal-foreground/60">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link to="/#why-us" className="hover:text-primary transition-colors">About</Link></li>
            <li><a href="/#audit-form" className="hover:text-primary transition-colors">Contact</a></li>
            <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
          </ul>
        </div>

        {/* Contact & Legal */}
        <div>
          <h4 className="font-display text-sm font-bold mb-4 uppercase tracking-wider text-charcoal-foreground/80">Get In Touch</h4>
          <ul className="space-y-2.5 text-sm text-charcoal-foreground/60">
            <li className="flex items-start gap-2">
              <span className="font-semibold w-20 flex-shrink-0">Email:</span>
              <a href="mailto:dizigrowwofficial@gmail.com" className="hover:text-primary transition-colors word-break-all">dizigrowwofficial@gmail.com</a>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold w-20 flex-shrink-0">WhatsApp:</span>
              <a href="https://wa.me/919450010826" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">+91 9450010826</a>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold w-20 flex-shrink-0">Call:</span>
              <a href="tel:+919477440662" className="hover:text-primary transition-colors">+91 9477440662</a>
            </li>
            <li className="flex items-start gap-2 pt-2 border-t border-charcoal-foreground/10 mt-2">
              <span className="font-semibold w-20 flex-shrink-0">Address:</span>
              <span>Plot 19, KP, Greater Noida, Uttar Pradesh</span>
            </li>
            <li className="flex items-start gap-2 pt-1">
              <span className="font-semibold w-20 flex-shrink-0">GSTIN:</span>
              <span className="uppercase tracking-wider font-mono text-xs mt-0.5">09AMVPU5948E1Z4</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-charcoal-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-foreground/40">
        <span>© {new Date().getFullYear()} DiziGroww · Performance Marketing Agency</span>
        <span>Google & Meta Certified</span>
      </div>
    </div>
  </footer>
);

export default Footer;
