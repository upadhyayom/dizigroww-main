import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle, ExternalLink } from "lucide-react";

const Internships = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-secondary/50">
        
        {/* Header */}
        <section className="section-padding bg-gradient-to-b from-primary/10 to-transparent">
          <div className="container-main text-center max-w-3xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
              Placement & Paid Internships
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-6">
              Launch Your Digital Career With Us
            </motion.h1>
            <p className="text-lg text-muted-foreground">
              We offer exclusive paid internship opportunities and placement assistance in reputed performance marketing and D2C companies. Top performers get a chance for full-time absorption.
            </p>
          </div>
        </section>

        {/* Benefits & Registration Details */}
        <section className="section-padding py-12">
          <div className="container-main max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10">
              
              {/* Left Column: What you get */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold mb-6">Why Join Our Program?</h2>
                <ul className="space-y-4">
                  {[
                    "Hands-on experience with real global ad budgets.",
                    "Live workshops on Meta Ads, Google Ads & CRO.",
                    "Performance-based stipend & paid internships.",
                    "Direct placement assistance in our partner network.",
                    "Certificate of completion and letter of recommendation."
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-primary mt-1 shrink-0" size={20} />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Right Column: Registration Card */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
                  <h3 className="text-2xl font-bold mb-2">Registration Details</h3>
                  <p className="text-muted-foreground mb-6">Secure your spot in our upcoming batch today. Limited seats available.</p>
                  
                  <div className="bg-secondary p-4 rounded-xl mb-6">
                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Registration Fee</div>
                    <div className="text-3xl font-bold">₹199</div>
                    <p className="text-xs text-muted-foreground mt-2">*Non-refundable processing fee</p>
                  </div>

                  <a 
                    href="https://forms.gle/nDBDaEfnMe16mXHY6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex justify-center items-center gap-2 w-full bg-gradient-to-r from-primary to-[hsl(0,100%,63%)] text-primary-foreground py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all"
                  >
                    Register Now <ExternalLink size={20} />
                  </a>

                  <p className="text-center text-xs text-muted-foreground mt-4">
                    You will be redirected to a secure Google Form for registration.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Internships;
