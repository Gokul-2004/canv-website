import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { BookOpen, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// Check if Supabase is configured
if (!supabase) {
  console.error('❌ Supabase client not initialized - check environment variables');
}

const keyTakeaways = [
  "Why not all consent is reversible — and how DPDP changes clinical workflows",
  "How to design informed, defensible consent beyond signatures and forms",
  "Where DPDP conflicts with healthcare realities — and how to navigate them",
  'What "audit-ready" truly means in hospitals and health systems',
  "How governance, technology, and accountability intersect in patient data",
  "A framework to move from checkbox compliance to system-level orchestration",
];

export const Proof = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && title && phone && consent) {
      setIsSubmitting(true);
      setError(null);

      try {
        // Dynamically import supabase to avoid build issues
        const { supabase } = await import("@/lib/supabase");
        
        // Check if Supabase is configured
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
          throw new Error('Supabase is not configured. Please check environment variables.');
        }

        console.log('📤 Submitting form data:', { name, email, title, phone, consent });
        
        const { data, error: insertError } = await supabase
          .from('thit_registrations')
          .insert([
            {
              name,
              email,
              title,
              phone,
              consent,
              created_at: new Date().toISOString(),
            },
          ])
          .select();

        console.log('📥 Supabase response:', { data, error: insertError });

        if (insertError) {
          console.error('❌ Supabase insert error:', insertError);
          throw insertError;
        }

        console.log('✅ Form submitted successfully!', data);

        setSubmitted(true);
        // Reset form
        setName('');
        setEmail('');
        setTitle('');
        setPhone('');
        setConsent(false);
      } catch (err: any) {
        console.error('Error submitting form:', err);
        // Show more specific error messages
        if (err?.message?.includes('relation') || err?.message?.includes('does not exist')) {
          setError('Database table not found. Please contact support.');
        } else if (err?.message?.includes('Missing Supabase')) {
          setError('Configuration error. Please contact support.');
        } else {
          setError(err?.message || 'Failed to submit. Please try again.');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <motion.div
      ref={sectionRef}
      id="book"
      className="min-h-screen bg-background relative overflow-hidden flex items-center"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-tight py-16 md:py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20">
            <BookOpen className="w-4 h-4" />
            THIT Exclusive Book Release
          </span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            When the <span className="gradient-text">CIO Holds the Scalpel</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            As India's Digital Personal Data Protection (DPDP) Act reshapes how organizations handle personal data, healthcare faces a challenge unlike any other.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This book is a practical field guide for healthcare leaders navigating the collision between data protection laws, clinical realities, and institutional accountability.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 max-w-5xl mx-auto">
          {/* Form - comes first on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="glass-card rounded-2xl p-8 md:p-10">
              <h3 className="text-xl font-bold text-foreground mb-2">Get Access to the Book</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Enter your details to reserve your copy at the booth.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Work Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                      Title
                    </label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="e.g. CIO, CISO, Hospital Administrator"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      required
                      className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                      I agree to receive communications from Certinal about DPDP and healthcare compliance
                    </label>
                  </div>
                  {error && (
                    <div className="text-sm text-red-500 mb-2">{error}</div>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Get My Copy at the Booth'
                    )}
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-foreground mb-2">You're on the list!</h4>
                  <p className="text-muted-foreground text-sm">
                    Visit Booth #121 at THIT 2026 to collect your copy.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Key Takeaways - comes second on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="order-2 lg:order-1"
          >
            <h3 className="text-xl font-bold text-foreground mb-6">Key Takeaways</h3>
            <ul className="space-y-4">
              {keyTakeaways.map((takeaway, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">{takeaway}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Proof;
