import { motion } from "framer-motion";

const brandLogos = [
  "/trustbybrands/1.png",
  "/trustbybrands/2.png",
  "/trustbybrands/3.png",
  "/trustbybrands/4.png",
  "/trustbybrands/5.png",
  "/trustbybrands/6.png",
  "/trustbybrands/7.png",
  "/trustbybrands/8.png",
  "/trustbybrands/9.png",
  "/trustbybrands/10.png",
  "/trustbybrands/11.png",
  "/trustbybrands/12.png",
];

const TrustedBrands = () => {
  return (
    <section className="py-12 bg-background border-b border-border/40 overflow-hidden" id="trusted-brands">
      <div className="container-main text-center mb-8">
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
          Trusted by D2C Brands & Industry Leaders across UAE & India
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10"></div>

        <div className="flex animate-marquee items-center gap-12 whitespace-nowrap min-w-full z-0">
          
          {[...brandLogos, ...brandLogos].map((src, index) => (
            <div key={index} className="w-[120px] md:w-[150px] shrink-0 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <div className="w-full h-12 bg-muted/20 rounded-md"></div>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
