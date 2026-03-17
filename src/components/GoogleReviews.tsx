import { motion } from "framer-motion";
import { Star, StarHalf } from "lucide-react";

const reviews = [
  {
    name: "Rahul S.",
    role: "E-Commerce Founder",
    text: "DiziGroww transformed our online presence. Our ROI doubled within the first 3 months of their Meta Ads management.",
    rating: 5,
  },
  {
    name: "Priya M.",
    role: "Marketing Director",
    text: "Professional, transparent, and incredibly effective. Their CRO tweaks to our landing pages were game-changing.",
    rating: 5,
  },
  {
    name: "Vikram K.",
    role: "Business Owner",
    text: "Highly recommend them for anyone looking to scale. The e-commerce store they built is fast and converts beautifully.",
    rating: 5,
  },
];

const GoogleReviews = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-main">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={20} className="fill-[#FBBC05] text-[#FBBC05]" />
              ))}
              <StarHalf size={20} className="fill-[#FBBC05] text-[#FBBC05]" />
            </div>
            <h2 className="text-3xl md:text-4xl mb-3">Trusted by Brands</h2>
            <p className="text-muted-foreground text-sm max-w-lg">
              See what our clients have to say about our performance-driven approach. 
              We currently hold a 4.5-star rating across 11 reviews on Google.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a 
              href="https://share.google/5lOHRfK7veGba5vBe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-card hover:bg-[#f2f2f2] text-foreground px-6 py-3 rounded-full text-sm font-semibold shadow-card transition-colors border border-border"
            >
              {/* Simple Google "G" icon using SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Read more reviews on Google
            </a>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-6 rounded-2xl shadow-card border border-border"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={16} className="fill-[#FBBC05] text-[#FBBC05]" />
                ))}
              </div>
              <p className="text-sm italic mb-6 text-foreground/90">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold">{review.name}</h4>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
