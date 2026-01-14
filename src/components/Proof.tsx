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
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-tight">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted by{" "}
            <span className="gradient-text">Leading Healthcare Institutions</span>
          </h2>
        </motion.div>

        {/* Institutions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-16"
        >
          {institutions.map((inst, index) => (
            <motion.div
              key={inst.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-16"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            
            <Quote className="w-10 h-10 text-primary/30 mb-6" />
            
            <blockquote className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8">
              "Certinal transformed how we handle patient consent across our 12 facilities. 
              What used to take days now happens in minutes, with complete audit trails."
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">SM</span>
              </div>
              <div>
                <p className="font-bold text-foreground">Dr. Sarah Mitchell</p>
                <p className="text-muted-foreground text-sm">
                  Chief Compliance Officer, Monash Health
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Proof;