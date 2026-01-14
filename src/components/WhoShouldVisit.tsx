import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Monitor, Scale, Rocket, Users } from "lucide-react";

const personas = [
  {
    icon: Monitor,
    title: "Hospital CIOs / IT Heads",
    description: "Replace fragmented workflows without disrupting HIS/EMR.",
  },
  {
    icon: Scale,
    title: "Compliance & Legal Leaders",
    description: "Prove informed consent—every time, for every patient.",
  },
  {
    icon: Rocket,
    title: "Digital Health & Innovation Teams",
    description: "Launch patient-friendly workflows in weeks, not quarters.",
  },
  {
    icon: Users,
    title: "Operations & Admin Heads",
    description: "Reduce paperwork, queues, and staff burnout.",
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
      className="min-h-screen hero-gradient relative overflow-hidden flex items-center"
    >
      {/* Background elements */}
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="container-tight relative z-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Built for Healthcare Leaders Who Own{" "}
            <span className="gradient-text">Risk, Experience, and Scale</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, index) => {
            const cardRef = useRef(null);
            const cardInView = useInView(cardRef, { once: false, margin: "-50px" });

            return (
              <motion.div
                key={persona.title}
                ref={cardRef}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={cardInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="group"
              >
                <div className="glass-dark rounded-2xl p-6 h-full text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4"
                  >
                    <persona.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-primary-foreground mb-3">
                    {persona.title}
                  </h3>
                  <p className="text-primary-foreground/60 text-sm leading-relaxed">
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