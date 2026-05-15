import { motion } from "framer-motion";

const FounderSection = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container-main max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative"
          >
            <div className="absolute inset-0 bg-primary rounded-2xl rotate-3"></div>
            <img
              src="https://api.dicebear.com/7.x/initials/svg?seed=Om%20Upadhyay&backgroundColor=cb201f&fontFamily=Poppins&fontWeight=700"
              alt="Om Upadhyay, Founder of DiziGroww"
              className="w-full h-full object-cover rounded-2xl relative z-10 shadow-lg bg-white"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-2">Meet the Founder</h2>
            <h3 className="text-xl text-primary font-semibold mb-4">Om Upadhyay</h3>
            <p className="text-foreground text-lg mb-4 font-medium italic">
              "Led teams managing $4M+ in ad spend across Meta &amp; Google — for D2C and service brands worldwide."
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I started DiziGroww after watching countless D2C founders burn their runway on agencies that optimized for clicks, not profit margins. Our philosophy is simple: we treat your ad budget like our own money.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              No hand-offs. No jargon. We fix what's broken in your funnel and scale what works.
            </p>

            <a href="/contact">
              <button className="bg-primary hover:bg-primary-deep text-white px-8 py-3.5 rounded-full text-base font-bold shadow-lg transition-all hover:scale-105">
                Book a Fast Consultation
              </button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
