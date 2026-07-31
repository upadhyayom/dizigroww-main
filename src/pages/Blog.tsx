import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { posts } from "@/data/blog";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

const Blog = () => {
  useMeta({
    title: "Blog | Ecommerce, Performance Marketing & Web Dev Insights | DiziGroww",
    description:
      "Practical guides on Shopify, WooCommerce, Meta & Google Ads, CRO and D2C growth from the DiziGroww team. Actionable ecommerce and performance marketing insights.",
    keywords:
      "ecommerce blog, performance marketing blog, shopify tips, meta ads guide, D2C marketing India, CRO tips, DiziGroww blog",
    canonicalUrl: "https://dizigroww.in/blog",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "DiziGroww Blog",
      url: "https://dizigroww.in/blog",
      description:
        "Guides on ecommerce, performance marketing, and web development for growing brands.",
      publisher: { "@type": "Organization", name: "DiziGroww", url: "https://dizigroww.in/" },
    },
  });

  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-background">
        {/* Hero */}
        <section className="section-padding bg-secondary">
          <div className="container-main text-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-primary text-xs font-semibold uppercase tracking-wider"
            >
              DiziGroww Blog
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl mt-4 mb-6"
            >
              Grow Smarter: Ecommerce & Marketing Insights
            </motion.h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Practical, no-fluff guides on Shopify, ads, CRO, and D2C growth — the same playbook we
              use to scale our clients across India, UAE &amp; Singapore.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="section-padding">
          <div className="container-main">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.08 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col h-full bg-card border border-border rounded-2xl p-6 shadow-card hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">{formatDate(post.date)}</span>
                      <span className="text-sm font-semibold text-primary inline-flex items-center gap-1">
                        Read <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
