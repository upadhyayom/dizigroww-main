import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Users, Star, Trophy, Globe, Target, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const networkData = [
  { icon: Target, label: "Ad Spend Managed", numeric: 4, prefix: "$", suffix: "M+", desc: "Across Meta & Google" },
  { icon: Star, label: "Average ROI", numeric: 350, prefix: "", suffix: "%", desc: "For D2C & Service clients" },
  { icon: Briefcase, label: "Websites Built", numeric: 80, prefix: "", suffix: "+", desc: "High-converting funnels" },
  { icon: Globe, label: "Countries Served", numeric: 6, prefix: "", suffix: "+", desc: "True global agency" },
];

const Counter = ({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => `${prefix}${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, to, { duration: 1.6, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [isInView, to, motionVal]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const NetworkStats = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-black/10 blur-3xl"></div>
      </div>

      <div className="container-main relative z-10">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest backdrop-blur-sm shadow-sm border border-white/10">
              Transform Your Growth
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-md">
              The Engine Room
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-medium italic mb-2">
              Our Track Record Separates Us:
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 text-center mb-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] max-w-5xl mx-auto flex flex-col items-center justify-center gap-4"
        >
          <Trophy className="w-12 h-12 text-white/80 mb-2" />
          <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            100% Client Satisfaction
          </h3>
          <p className="text-lg md:text-xl text-white/80 font-medium">
            We don't take on projects we can't scale. Our rigorous discovery phase guarantees success.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-16">
          {networkData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-black/30 transition-colors"
            >
              <item.icon className="w-8 h-8 text-white/70 mb-4" />
              <h4 className="text-2xl md:text-3xl font-black mb-1 tabular-nums">
                <Counter to={item.numeric} prefix={item.prefix} suffix={item.suffix} />
              </h4>
              <p className="text-sm font-bold text-white mb-1 uppercase tracking-wider">{item.label}</p>
              <p className="text-xs text-white/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/contact" className="inline-block">
            <button className="bg-white text-primary px-10 py-5 rounded-full text-lg font-bold shadow-[0_10px_40px_-5px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto uppercase tracking-widest border-2 border-transparent hover:border-primary/20">
              Start Scaling Today
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default NetworkStats;
