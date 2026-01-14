import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, UserCheck, Scale } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Consent as Infrastructure",
    description:
      "Consent must move beyond static forms to become a governed, purpose-bound system embedded across every patient interaction.",
  },
  {
    icon: UserCheck,
    title: "Rights by Design",
    description:
      "Patient data rights should be executed through structured workflows—transparent, traceable, and enforceable by default.",
  },
  {
    icon: Scale,
    title: "Governance That Scales with Care",
    description:
      "Audit readiness, breach response, and third-party oversight must operate continuously, without slowing clinical or administrative teams.",
  },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative"
    >
      <div className="glass-card rounded-2xl p-8 h-full transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6"
        >
          <feature.icon className="w-7 h-7 text-primary" />
        </motion.div>
        <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
        
        {/* Hover gradient border effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        </div>
      </div>
    </motion.div>
  );
};

export const WhyCertinal = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="why-certinal" className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container-tight">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Shaping the{" "}
            <span className="gradient-text">Governance Layer</span> of Healthcare
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Healthcare leaders don't need more guidelines—they need systems that execute
            consent, rights, and governance reliably.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCertinal;