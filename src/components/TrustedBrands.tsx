import { motion } from "framer-motion";
import { ArrowRight, MapPin, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const brands = [
  { name: "Varak Edible Luxury", logoBase: "VARAK", category: "Luxury F&B", location: "Global", url: "https://www.varakedibleluxury.com/", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  { name: "Prince Jewellers", logoBase: "PRINCE", category: "Premium Jewelry", location: "Australia", url: "https://www.princejewellers.com.au", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { name: "EVO Labs", logoBase: "EVO LABS", category: "Tech & Research", location: "Global", url: "https://www.evolabsresearch.co/", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  { name: "EvoVera", logoBase: "EVOVERA", category: "eCommerce", location: "Global", url: "https://evovera.store/", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  { name: "MotoBlox", logoBase: "MOTOBLOX", category: "Automotive", location: "Global", url: "https://motoblox.com/", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  { name: "Toy Collectors India", logoBase: "TOY COLLECTORS", category: "Retail", location: "India", url: "https://www.toycollectorsindia.com/", color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
  { name: "Purely Farm", logoBase: "PURELY", category: "Organic F&B", location: "India", url: "https://www.purelyfarm.in/", color: "bg-green-500/10 text-green-600 dark:text-green-400" },
  { name: "Nexpept", logoBase: "NEXPEPT", category: "Health & Nutrition", location: "Canada", url: "https://www.nexpept.ca/", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  { name: "Sanduk", logoBase: "SANDUK", category: "Fashion & Retail", location: "India", url: "https://sanduk.co", color: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400" },
  { name: "Nutty Village", logoBase: "NUTTY VILLAGE", category: "F&B Snacks", location: "India", url: "https://nuttyvillage.in", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
  { name: "The Fragrance Empire", logoBase: "FRAGRANCE EMPIRE", category: "Beauty", location: "Global", url: "https://thefragranceempire.com/", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  { name: "Ekatva Jewels", logoBase: "EKATVA", category: "Jewelry", location: "India", url: "https://ekatvajewels.com/", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400" },
  { name: "Alapco", logoBase: "ALAPCO", category: "Industrial", location: "India", url: "https://alapco.in/", color: "bg-slate-500/10 text-slate-600 dark:text-slate-400" },
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
              <div className={`w-full py-5 rounded-2xl font-display font-extrabold text-xl mb-4 tracking-tight ${brand.color} group-hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center`}>
                {brand.logoBase}
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
          <Link to="/contact" className="lg:col-span-3 bg-gradient-to-br from-primary/5 to-transparent border-2 border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 rounded-[24px] p-6 text-center flex flex-col items-center justify-center min-h-[240px] transition-all duration-300 group">
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
