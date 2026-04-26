import { motion } from "framer-motion";
import { ArrowRight, MapPin, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const brands = [
  { name: "Varak Edible Luxury", logoUrl: "https://www.varakedibleluxury.com/cdn/shop/files/Varak_logo_nav_copy2.png?v=1712817801&width=500", category: "Luxury F&B", location: "Global", url: "https://www.varakedibleluxury.com/", color: "bg-amber-500/10" },
  { name: "Prince Jewellers", logoUrl: "https://www.princejewellers.com.au/cdn/shop/files/PJlogo6_f90fe273-0906-44b4-bcc5-1ff2dfbb2ed5.png", category: "Premium Jewelry", location: "Australia", url: "https://www.princejewellers.com.au", color: "bg-blue-500/10" },
  { name: "EVO Labs", logoUrl: "https://api.microlink.io?url=https://www.evolabsresearch.co/&embed=logo.url", category: "Tech & Research", location: "Global", url: "https://www.evolabsresearch.co/", color: "bg-indigo-500/10" },
  { name: "EvoVera", logoUrl: "https://evovera.store/cdn/shop/files/Untitled_design_-_2026-01-06T230016.860_100x@2x.png?v=1767720623", category: "eCommerce", location: "Global", url: "https://evovera.store/", color: "bg-emerald-500/10" },
  { name: "MotoBlox", logoUrl: "https://motoblox.com/cdn/shop/files/Screenshot_2025-01-08_171555.png", category: "Automotive", location: "Global", url: "https://motoblox.com/", color: "bg-rose-500/10" },
  { name: "Toy Collectors India", logoUrl: "https://www.toycollectorsindia.com/cdn/shop/files/2_9f7f04f4-813a-4f4d-8bd4-4e648002e89b.png", category: "Retail", location: "India", url: "https://www.toycollectorsindia.com/", color: "bg-cyan-500/10" },
  { name: "Purely Farm", logoUrl: "https://www.purelyfarm.in/cdn/shop/files/Purely_Farm_Logo_CC.png?v=1776247410&width=240", category: "Organic F&B", location: "India", url: "https://www.purelyfarm.in/", color: "bg-green-500/10" },
  { name: "Nexpept", logoUrl: "https://api.microlink.io?url=https://www.nexpept.ca/&embed=logo.url", category: "Health & Nutrition", location: "Canada", url: "https://www.nexpept.ca/", color: "bg-orange-500/10" },
  { name: "Sanduk", logoUrl: "https://cdn.shopify.com/s/files/1/0601/7961/1856/files/jpeg_shop_0c426d75-af5a-4e38-b90b-ddd05849ea5a.jpg", category: "Fashion & Retail", location: "India", url: "https://sanduk.co", color: "bg-fuchsia-500/10" },
  { name: "Nutty Village", logoUrl: "https://nuttyvillage.in/cdn/shop/files/nutty_village_wordmark.png?v=1755865924&width=180", category: "F&B Snacks", location: "India", url: "https://nuttyvillage.in", color: "bg-yellow-500/10" },
  { name: "The Fragrance Empire", logoUrl: "https://thefragranceempire.com/cdn/shop/files/TFE_GOLDEN_LOGO_Print_File_Updated_3.pdf.png", category: "Beauty", location: "Global", url: "https://thefragranceempire.com/", color: "bg-violet-500/10" },
  { name: "Ekatva Jewels", logoUrl: "https://api.microlink.io?url=https://ekatvajewels.com/&embed=logo.url", category: "Jewelry", location: "India", url: "https://ekatvajewels.com/", color: "bg-pink-500/10" },
  { name: "Alapco", logoUrl: "https://api.microlink.io?url=https://alapco.in/&embed=logo.url", category: "Industrial", location: "India", url: "https://alapco.in/", color: "bg-slate-500/10" },
  { name: "Stikrly", logoUrl: "https://stikrly.in/cdn/shop/files/Stikrly_png_Logo.png?height=106&v=1774538260", category: "Custom Accessories", location: "India", url: "https://stikrly.in", color: "bg-red-500/10" },
];

const TrustedBrands = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="trusted-brands">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Ambient glowing radial behind the content */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none"></div>

      <div className="container-main relative z-10 text-center mb-16">
        <span className="inline-flex px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
          Our Global Portfolio
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 text-foreground mb-6 tracking-tight">
          Brands That <span className="text-primary">Trust Us</span> With Their Growth
        </h2>
        <p className="text-muted-foreground md:text-lg mb-8 max-w-2xl mx-auto">
          Live campaigns, real results — click any logo to visit their site
        </p>
        <Link to="/contact" className="inline-block">
          <motion.button whileHover={{ scale: 1.05 }} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-lg shadow-primary/25 transition-all flex items-center gap-2 mx-auto">
            Your Brand Next <ArrowRight size={18} />
          </motion.button>
        </Link>
      </div>

      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, idx) => (
            <motion.a 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              href={brand.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-card border border-border/80 hover:border-primary/50 rounded-[24px] p-6 text-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 group flex flex-col items-center justify-between min-h-[240px]"
            >
              <div className={`w-full h-24 rounded-2xl mb-4 p-4 ${brand.color} group-hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center overflow-hidden`}>
                <img src={brand.logoUrl} alt={brand.name} className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" loading="lazy" />
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-foreground text-lg mb-1">{brand.name}</h3>
                <p className="text-sm text-muted-foreground">{brand.category}</p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary rounded-full text-xs font-semibold text-foreground/80 group-hover:text-primary transition-colors">
                <MapPin size={12} /> {brand.location}
              </div>
            </motion.a>
          ))}
          
          {/* Apply CTA Card */}
          <Link to="/contact" className="bg-gradient-to-br from-primary/5 to-transparent border-2 border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 rounded-[24px] p-6 text-center flex flex-col items-center justify-center min-h-[240px] transition-all duration-300 group">
            <div className="w-14 h-14 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-5 group-hover:rotate-90 group-hover:scale-110 transition-all duration-500">
              <Plus size={28} />
            </div>
            <h3 className="font-bold text-primary text-2xl mb-2">Your Brand</h3>
            <p className="text-sm text-foreground/70 mb-5">3 spots open this month</p>
            <span className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              Apply <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
