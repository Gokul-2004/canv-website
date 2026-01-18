import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const personas = [
  {
    role: "CIO / CTO",
    title: "Consent that integrates cleanly.",
    description: "Audit-ready, scalable, and built for long-term system integrity.",
  },
  {
    role: "CISO / Compliance / Legal",
    title: "Consent that stands up to DPDP scrutiny.",
    description: "Provable, traceable, and defensible—on demand.",
  },
  {
    role: "CMIO / Digital Health",
    title: "Consent that protects patients without slowing care.",
    description: "Clear, contextual, and experience-first.",
  },
  {
    role: "Hospital Leadership",
    title: "Consent that reduces regulatory risk.",
    description: "Built to protect trust, reputation, and continuity.",
  },
];

export const WhoShouldVisit = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <motion.div
      ref={sectionRef}
      id="audience"
      className="min-h-screen relative overflow-hidden flex items-center"
      style={{ backgroundColor: '#E6FAEB' }}
    >
      {/* Background elements */}
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="container-tight relative z-10 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#131720] mb-6">
            Built for Healthcare Leaders Who Own{" "}
            <span className="gradient-text">Risk, Experience, and Scale</span>
          </h2>
          <p className="text-lg text-[#131720]/70 leading-relaxed">
            Consent impacts different leaders in different ways.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {personas.map((persona, index) => {
            const cardRef = useRef(null);
            const cardInView = useInView(cardRef, { once: false, margin: "-50px" });

            return (
              <motion.div
                key={persona.role}
                ref={cardRef}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={cardInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group"
              >
                <div className="glass-card rounded-2xl p-6 h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30 mb-4">
                    {persona.role}
                  </span>
                  <h3 className="text-lg font-bold text-[#131720] mb-2">
                    {persona.title}
                  </h3>
                  <p className="text-[#131720]/60 text-sm leading-relaxed">
                    {persona.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default WhoShouldVisit;
