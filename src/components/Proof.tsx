import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Shield, Award, Lock } from "lucide-react";

const institutions = [
  { name: "Monash Health", logo: "M" },
  { name: "Bumrungrad International Hospital", logo: "B" },
  { name: "Apollo Hospitals", logo: "A" },
];

const badges = [
  { icon: Shield, label: "Enterprise-grade security" },
  { icon: Award, label: "Healthcare-ready compliance" },
  { icon: Lock, label: "Built for scale" },
];

export const Proof = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });
  
  return (
    <motion.div 
      ref={sectionRef}
      className="min-h-screen bg-background relative overflow-hidden flex items-center"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-tight py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted by{" "}
            <span className="gradient-text">Leading Healthcare Institutions</span>
          </h2>
        </motion.div>

        {/* Institutions */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-16"
        >
          {institutions.map((inst, index) => (
            <motion.div
              key={inst.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <span className="text-xl font-bold text-foreground">{inst.logo}</span>
              </div>
              <span className="text-lg font-medium text-muted-foreground hidden sm:block">
                {inst.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-10"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card"
            >
              <badge.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            
            <Quote className="w-10 h-10 text-primary/30 mb-4" />
            
            <blockquote className="text-lg md:text-xl text-foreground font-medium leading-relaxed mb-6 italic">
              "Contracts signed digitally through the Certinal platform are simple, easy and traceable. We know where it is and we can push people to sign if they haven't done it. This has been quite a game changer for our organization."
            </blockquote>
            
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-primary font-bold">NS</span>
              </motion.div>
              <div>
                <p className="font-bold text-foreground">Neil Sigamoney</p>
                <p className="text-muted-foreground text-sm">
                  Director Engineering & Corporate Services, At Monash Health
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Proof;