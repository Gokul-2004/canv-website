import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FileCheck, Shield, Settings, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const products = [
  {
    icon: FileCheck,
    name: "ConsentFlow",
    subtitle: "Consent Lifecycle Management",
    description:
      "Purpose-wise, multilingual clinical and privacy consent with complete lifecycle traceability and withdrawal control.",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Shield,
    name: "ConsentRights",
    subtitle: "Data Principal Rights Management",
    description:
      "Self-service rights execution with unified identity mapping and governed data processing across systems.",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: Settings,
    name: "ConsentGovern",
    subtitle: "Compliance & Governance Layer",
    description:
      "Regulator-ready audits, breach response workflows, and third-party consent governance—built in, not bolted on.",
    color: "from-primary/20 to-accent/5",
  },
];

const ProductCard = ({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 80, rotateX: 10 }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group relative"
      style={{ perspective: "1000px" }}
    >
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${product.color} p-[1px]`}>
        <div className="glass-card rounded-2xl p-8 h-full transition-all duration-500 group-hover:shadow-xl">
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6"
          >
            <product.icon className="w-7 h-7 text-primary-foreground" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-foreground mb-1">{product.name}</h3>
          <p className="text-primary font-medium text-sm mb-4">{product.subtitle}</p>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="mt-6 flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all"
          >
            <span className="text-sm">Learn more</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const BoothShowcase = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);

  return (
    <motion.div 
      ref={sectionRef}
      style={{ scale }}
      id="booth" 
      className="min-h-screen bg-background relative overflow-hidden flex items-center"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-tight py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Experience Certinal Live at{" "}
            <span className="gradient-text">Booth #A12</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A unified platform to operationalize consent, data rights, and regulatory
            governance across healthcare workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>

        {/* Floor Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass-card rounded-2xl p-8 mb-12"
        >
          <div className="aspect-[16/6] bg-muted rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="text-center z-10">
              <motion.div 
                className="w-20 h-20 rounded-2xl bg-primary mx-auto mb-4 flex items-center justify-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-primary-foreground font-bold text-xl">A12</span>
              </motion.div>
              <p className="text-muted-foreground">Floor Map with Certinal Booth Marked</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg"
          >
            <motion.a
              href="https://www.certinal.com/request-a-demo"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reserve a Walkthrough
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.a>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BoothShowcase;