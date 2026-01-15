import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Award } from "lucide-react";
import { Button } from "./ui/button";

export const FinalCTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <motion.div 
      ref={sectionRef}
      className="min-h-[70vh] hero-gradient relative overflow-hidden flex items-start"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div 
        style={{ scale, y }}
        className="container-tight relative z-10 py-10 md:py-14"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Award Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-dark rounded-full px-5 py-2.5 mb-8"
            >
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary-foreground/90">
                IDC MarketScape '23 Leader
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight"
            >
              Large enterprises switch from legacy systems to tap into{" "}
              <span className="gradient-text">AI innovations</span> at disruptive prices
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-primary-foreground/70 mb-10"
            >
              Certinal Emerges as New 'eSign' Leader in IDC MarketScape '23.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-7 text-lg animate-pulse-glow"
              >
                <a
                  href="https://www.certinal.com/request-a-demo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Request a Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FinalCTA;