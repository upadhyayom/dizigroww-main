import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  CalendarCheck,
  Sparkles,
} from "lucide-react";

// DiziGroww's WhatsApp business number (with country code for reliable wa.me links)
const WHATSAPP_NUMBER = "919450010826";
const CALENDLY_URL = "https://calendly.com/dizigrowwofficial/30min";
const STORAGE_KEY = "dizi_gp_chatbot_dismissed_v1";

const BUDGET_OPTIONS = [
  "Under ₹10,000/mo",
  "₹10,000 – ₹30,000/mo",
  "₹30,000 – ₹1,00,000/mo",
  "₹1,00,000+/mo",
  "Not running ads yet",
];

type Step = "intro" | "whatsapp" | "budget" | "product" | "sending" | "done";

interface LeadData {
  whatsapp: string;
  budget: string;
  product: string;
}

const BotBubble = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-end gap-2 max-w-[85%]"
  >
    <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold flex-shrink-0">
      DG
    </div>
    <div className="bg-secondary text-foreground rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed shadow-sm">
      {children}
    </div>
  </motion.div>
);

const UserBubble = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-end"
  >
    <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed shadow-sm max-w-[85%]">
      {children}
    </div>
  </motion.div>
);

const GrowthPackageChatbot = () => {
  const [open, setOpen] = useState(false);
  const [dismissedIntro, setDismissedIntro] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [data, setData] = useState<LeadData>({ whatsapp: "", budget: "", product: "" });
  const [whatsappInput, setWhatsappInput] = useState("");
  const [productInput, setProductInput] = useState("");
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasAutoOpenedRef = useRef(false);

  // Auto-open once per visit, a few seconds after landing on the page.
  useEffect(() => {
    if (hasAutoOpenedRef.current) return;
    if (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1") return;
    const t = setTimeout(() => {
      setOpen(true);
      hasAutoOpenedRef.current = true;
    }, 4500);
    return () => clearTimeout(t);
  }, []);

  // Allow CTA buttons elsewhere on the page to open the chat directly at the form.
  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setStep((s) => (s === "intro" || s === "done" ? "whatsapp" : s));
    };
    window.addEventListener("open-growth-chatbot", handler);
    return () => window.removeEventListener("open-growth-chatbot", handler);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [step, open]);

  const closeChat = () => {
    setOpen(false);
    if (step === "intro") {
      setDismissedIntro(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }
  };

  const submitWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = whatsappInput.replace(/[^\d+]/g, "");
    if (clean.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid WhatsApp number (with country code if outside India).");
      return;
    }
    setError("");
    setData((d) => ({ ...d, whatsapp: clean }));
    setStep("budget");
  };

  const pickBudget = (budget: string) => {
    setData((d) => ({ ...d, budget }));
    setStep("product");
  };

  const sendLead = async (lead: LeadData) => {
    // 1. Email — same Web3Forms mechanism already used across the site for lead delivery.
    try {
      if (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
            from_name: "DiziGroww Growth Package Chatbot",
            subject: "🔥 NEW GROWTH PACKAGE LEAD",
            whatsapp: lead.whatsapp,
            ad_budget: lead.budget,
            selling: lead.product,
            page: "Performance Growth Package landing page",
            message: `New lead from the Performance Growth Package landing page.\n\nWhatsApp: ${lead.whatsapp}\nAd budget: ${lead.budget}\nSelling: ${lead.product}`,
          }),
        });
      }
    } catch (err) {
      console.error("[GrowthPackageChatbot] Web3Forms submission failed:", err);
    }

    // 2. WhatsApp — opens a prefilled message addressed to DiziGroww's number in a new tab
    // (the visitor taps Send once it opens). This mirrors the same pattern already used by
    // LeadForm.tsx and the Starter Plan page elsewhere on this site.
    const text = `New Growth Package Lead!\n*WhatsApp:* ${lead.whatsapp}\n*Ad Budget:* ${lead.budget}\n*Selling:* ${lead.product}`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const submitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productInput.trim()) {
      setError("Tell us what you're selling so we can help.");
      return;
    }
    setError("");
    const finalData: LeadData = { ...data, product: productInput.trim() };
    setData(finalData);
    setStep("sending");
    await sendLead(finalData);
    // small delay so the "sending" bubble is legible before showing the result
    setTimeout(() => setStep("done"), 600);
  };

  return (
    <>
      {/* Floating toggle bubble */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground rounded-full shadow-xl px-4 py-3.5 font-semibold text-sm"
            aria-label="Get a custom quote"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Get a custom quote</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="fixed bottom-0 left-0 sm:bottom-6 sm:left-6 z-50 w-full sm:w-[380px] h-[80vh] sm:h-[540px] max-h-[600px] bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-4 py-3.5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  DG
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight">DiziGroww Assistant</p>
                  <p className="text-[11px] text-primary-foreground/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" /> Usually replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background/40">
              <BotBubble>
                👋 Hey! Since you're checking out the <strong>Performance Growth Package</strong>, want a quick custom quote? Takes about 20 seconds — no spam, just a real reply from our team.
              </BotBubble>

              {step !== "intro" && (
                <UserBubble>Sure, let's go 👍</UserBubble>
              )}

              {(step === "whatsapp" || (step !== "intro" && data.whatsapp)) && (
                <BotBubble>What's the best WhatsApp number to reach you on?</BotBubble>
              )}
              {data.whatsapp && <UserBubble>{data.whatsapp}</UserBubble>}

              {(step === "budget" || (step !== "intro" && step !== "whatsapp" && data.budget)) && (
                <BotBubble>Got it. What's your current (or planned) monthly ad budget?</BotBubble>
              )}
              {data.budget && <UserBubble>{data.budget}</UserBubble>}

              {(step === "product" || step === "sending" || step === "done") && (
                <BotBubble>Last one — what product or service are you selling?</BotBubble>
              )}
              {step !== "product" && data.product && <UserBubble>{data.product}</UserBubble>}

              {step === "sending" && (
                <BotBubble>
                  <span className="inline-flex items-center gap-1.5">
                    Sending this to our team
                    <span className="flex gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1 h-1 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1 h-1 rounded-full bg-muted-foreground animate-bounce" />
                    </span>
                  </span>
                </BotBubble>
              )}

              {step === "done" && (
                <>
                  <BotBubble>
                    🎉 Thanks! We've got your details — our team will message you on WhatsApp with a custom quote for the Growth Package shortly.
                  </BotBubble>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mt-2"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <p className="text-sm font-semibold">Want to skip the wait? (optional)</p>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Grab a free 30-min strategy call directly on our calendar — totally optional.
                    </p>
                    <div className="flex gap-2">
                      <a
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full px-3 py-2.5 hover:opacity-90 transition-opacity"
                      >
                        <CalendarCheck className="w-3.5 h-3.5" /> Book a call
                      </a>
                      <button
                        onClick={closeChat}
                        className="flex-1 text-xs font-semibold rounded-full px-3 py-2.5 border border-border hover:bg-secondary transition-colors"
                      >
                        Maybe later
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </div>

            {/* Input area */}
            <div className="flex-shrink-0 border-t border-border bg-card p-3">
              {error && <p className="text-xs text-destructive mb-2 px-1">{error}</p>}

              {step === "intro" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setStep("whatsapp")}
                    className="flex-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full py-2.5 hover:opacity-90 transition-opacity"
                  >
                    Sure, let's go
                  </button>
                  <button
                    onClick={closeChat}
                    className="px-4 text-sm font-medium rounded-full border border-border hover:bg-secondary transition-colors"
                  >
                    No thanks
                  </button>
                </div>
              )}

              {step === "whatsapp" && (
                <form onSubmit={submitWhatsapp} className="flex gap-2">
                  <input
                    autoFocus
                    type="tel"
                    inputMode="tel"
                    placeholder="e.g. 9450010826"
                    value={whatsappInput}
                    onChange={(e) => setWhatsappInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-full border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                    aria-label="Send"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

              {step === "budget" && (
                <div className="flex flex-wrap gap-2">
                  {BUDGET_OPTIONS.map((b) => (
                    <button
                      key={b}
                      onClick={() => pickBudget(b)}
                      className="text-xs font-medium px-3 py-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}

              {step === "product" && (
                <form onSubmit={submitProduct} className="flex gap-2">
                  <input
                    autoFocus
                    type="text"
                    placeholder="e.g. Skincare brand, SaaS tool..."
                    value={productInput}
                    onChange={(e) => setProductInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-full border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                    aria-label="Send"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

              {(step === "sending" || step === "done") && (
                <p className="text-center text-[11px] text-muted-foreground py-1">
                  We typically reply within a few business hours.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GrowthPackageChatbot;
