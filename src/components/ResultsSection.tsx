import { motion } from "framer-motion";
import { TrendingUp, DollarSign, MousePointerClick, ShoppingCart } from "lucide-react";

const results = [
  {
    client: "E-Commerce Apparel Brand",
    roas: "6.8x",
    spend: "₹1,20,000",
    revenue: "₹8,16,000",
    purchases: 408,
    cpa: "₹294"
  },
  {
    client: "D2C Skincare",
    roas: "4.5x",
    spend: "₹2,50,000",
    revenue: "₹11,25,000",
    purchases: 852,
    cpa: "₹293"
  }
];

const ResultsSection = () => {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            Proven Results
          </span>
          <h2 className="text-3xl md:text-4xl mb-3">We Speak in ROAS.</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Real screenshots from our Meta Ads Manager. We turn ad spend into profitable, scalable revenue.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Left: The "Screenshot" Mockups */}
          <div className="space-y-6">
            {results.map((res, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-card border border-border rounded-xl shadow-card overflow-hidden"
              >
                {/* Meta Ads Manager Header Mock */}
                <div className="bg-secondary/50 border-b border-border px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="text-xs font-semibold text-foreground/80">{res.client} - Scale Campaign</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground bg-background px-2 py-0.5 rounded border border-border">Active</span>
                </div>
                
                {/* Meta Ads Manager Data Row Mock */}
                <div className="p-4 overflow-x-auto nice-scrollbar">
                  <div className="min-w-[500px] flex justify-between items-center text-left">
                    <div className="w-1/5">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">Results</p>
                      <p className="text-sm font-bold">{res.purchases}</p>
                      <p className="text-[10px] text-muted-foreground">Website Purchases</p>
                    </div>
                    <div className="w-1/5">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">Cost per result</p>
                      <p className="text-sm font-bold">{res.cpa}</p>
                      <p className="text-[10px] text-muted-foreground">Per Purchase</p>
                    </div>
                    <div className="w-1/5 border-l border-border pl-4">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">Amount spent</p>
                      <p className="text-sm font-bold text-foreground/90">{res.spend}</p>
                    </div>
                    <div className="w-1/5">
                      <p className="text-[10px] text-primary font-bold uppercase mb-1">ROAS</p>
                      <p className="text-lg font-black text-primary">{res.roas}</p>
                    </div>
                    <div className="w-1/5">
                      <p className="text-[10px] text-green-500 font-bold uppercase mb-1">Purchase Value</p>
                      <p className="text-sm font-bold text-green-500">{res.revenue}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <p className="text-xs text-muted-foreground italic text-center">
              * Replace these data rows with actual screenshots of your Meta Ad accounts if preferred.
            </p>
          </div>

          {/* Right: Metrics / Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Data-Backed Scaling</h3>
                <p className="text-sm text-muted-foreground">
                  We don't guess. We test creatives, audiences, and offers to find winning combinations that allow for aggressive, profitable scaling.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <ShoppingCart size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Lower CPA, Higher AOV</h3>
                <p className="text-sm text-muted-foreground">
                  By optimizing your landing pages and funnels (CRO) alongside your ads, we drop your Cost Per Acquisition while increasing the average order value.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <MousePointerClick size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">High-Intent Traffic</h3>
                <p className="text-sm text-muted-foreground">
                  We filter out window-shoppers. Our Meta and Google Ad strategies ensure your budget is spent only on users ready to pull out their credit cards.
                </p>
              </div>
            </div>

            <a href="/#audit-form" className="inline-block mt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-foreground text-background px-8 py-3.5 rounded-full text-sm font-semibold shadow-lg hover:bg-foreground/90 transition-colors"
              >
                Get Similar Results
              </motion.button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
