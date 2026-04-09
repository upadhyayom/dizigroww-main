import { motion } from "framer-motion";
import { Search, PenTool, Rocket, PhoneCall } from "lucide-react";

const steps = [
  {
    icon: PhoneCall,
    title: "1. Discovery Call",
    desc: "Rigorous 30-min session to validate your digital ecosystem.",
  },
  {
    icon: Search,
    title: "2. The Audit",
    desc: "Find immediate revenue leaks in your landing pages & ads.",
  },
  {
    icon: PenTool,
    title: "3. Creation & Design",
    desc: "Deploy high-converting custom CRO pages.",
  },
  {
    icon: Rocket,
    title: "4. Scaling",
    desc: "Setup campaigns & aggressively scale your business.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.5 }
  },
};

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="process">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container-main max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-4 border border-primary/20">
             Process
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight">
            How We Execute
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            A transparent, 4-step process to end guesswork and build your conversion machinery.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-card border border-border/50 hover:border-primary/50 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all flex flex-col items-center text-center group relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <div className="w-20 h-20 bg-primary/10 group-hover:bg-primary border border-primary/20 group-hover:border-primary rounded-2xl flex items-center justify-center mb-8 transition-colors duration-300">
                <step.icon className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl font-black text-foreground mb-4">{step.title}</h3>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <a href="/contact">
            <button className="bg-foreground text-background px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:-translate-y-1 transition-all mx-auto uppercase tracking-widest">
              Get Started Now
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
