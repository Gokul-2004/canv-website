import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Users, Lightbulb, Stethoscope } from "lucide-react";

const stats = [
  { icon: Users, value: "7000+", label: "Delegates" },
  { icon: Lightbulb, value: "200+", label: "Innovators" },
  { icon: Stethoscope, value: "150+", label: "Doctors" },
];

const regulations = [
  {
    tag: "DPDP Act, 2023",
    title: "Hospitals are now Data Fiduciaries.",
    description: "Consent must be explicit, purpose-specific, and provable.",
  },
  {
    tag: "NABH Standards",
    title: "Accreditation demands more than documentation.",
    description: "Consent records must be tamper-proof, traceable, and auditable.",
  },
  {
    tag: "Bharatiya Sakshya Adhiniyam, 2023",
    title: "Digital records must stand up in court.",
    description: "Authenticity, integrity, and evidence matter.",
  },
  {
    tag: "IT Act, 2000",
    title: "Electronic records and signatures must be legally valid.",
    description: "Execution must be verifiable.",
  },
  {
    tag: "ABDM / ABHA",
    title: "Patient-controlled data sharing is now foundational.",
    description: "Consent must be identity-linked and revocable.",
  },
  {
    tag: "State Medical Record Rules",
    title: "Retention is measured in years, not months.",
    description: "Consent must remain defensible over time.",
  },
];

const RegulationCard = ({
  regulation,
  index,
}: {
  regulation: (typeof regulations)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group"
    >
      <div className="glass-card rounded-2xl p-6 h-full transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
        {/* Tag */}
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-4"
        >
          {regulation.tag}
        </motion.span>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">
          {regulation.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          {regulation.description}
        </p>
      </div>
    </motion.div>
  );
};

export const WhyCertinal = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div
      ref={sectionRef}
      id="why-certinal"
      className="min-h-screen bg-background relative overflow-hidden flex items-center"
    >
      {/* Parallax background decoration */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="container-tight py-16 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why This <span className="gradient-text">Matters</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            India's healthcare landscape is governed by multiple mandates.{" "}
            <span className="text-foreground font-medium">Each one touches consent differently.</span>
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-8 sm:gap-12 md:gap-20 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Regulations Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {regulations.map((regulation, index) => (
            <RegulationCard key={regulation.tag} regulation={regulation} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyCertinal;
