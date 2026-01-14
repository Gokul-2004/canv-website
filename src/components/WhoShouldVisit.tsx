import { motion, useInView } from "framer-motion";
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
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="section-padding hero-gradient relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-tight relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Built for Healthcare Leaders Who Own{" "}
            <span className="gradient-text">Risk, Experience, and Scale</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, index) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true, margin: "-50px" });

            return (
              <motion.div
                key={persona.title}
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
    </section>
  );
};

export default WhoShouldVisit;