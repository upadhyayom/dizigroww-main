import { motion } from "framer-motion";

const brands = [
  { name: "Varak Edible Luxury", url: "https://www.varakedibleluxury.com/" },
  { name: "Prince Jewellers", url: "https://www.princejewellers.com.au" },
  { name: "EVO Labs", url: "https://www.evolabsresearch.co/" },
  { name: "EvoVera", url: "https://evovera.store/" },
  { name: "MotoBlox", url: "https://motoblox.com/" },
  { name: "Toy Collectors India", url: "https://www.toycollectorsindia.com/" },
  { name: "Purely Farm", url: "https://www.purelyfarm.in/" },
  { name: "Nexpept", url: "https://www.nexpept.ca/" },
  { name: "Sanduk", url: "https://sanduk.co" },
  { name: "Nutty Village", url: "https://nuttyvillage.in" },
  { name: "The Fragrance Empire", url: "https://thefragranceempire.com/" },
  { name: "Ekatva Jewels", url: "https://ekatvajewels.com/" },
  { name: "Alapco", url: "https://alapco.in/" }
];

const TrustedBrands = () => {
  return (
    <section className="py-16 md:py-20 bg-background border-b border-border/40 overflow-hidden relative" id="trusted-brands">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>

      <div className="container-main text-center mb-12">
        <p className="text-sm font-bold text-primary uppercase tracking-[0.2em]">
          Brands We've Served
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold mt-3 text-foreground tracking-tight">
          Delivering Growth for Global D2C Leaders
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden group max-w-[100vw]">
        {/* Fade Out Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Track */}
        <div className="flex animate-marquee items-center gap-6 md:gap-8 whitespace-nowrap z-0 hover:[animation-play-state:paused]">
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <a
              key={index}
              href={brand.url.startsWith("http") ? brand.url : `https://${brand.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center px-8 py-5 md:px-10 md:py-6 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm text-foreground/80 font-display font-medium text-lg md:text-xl tracking-tight hover:-translate-y-1 hover:text-primary hover:bg-card hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-primary/30 transition-all duration-300 group-hover/btn:opacity-100 cursor-pointer"
            >
              {brand.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
