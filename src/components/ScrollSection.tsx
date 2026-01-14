import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "scale" | "slide" | "fade";
}

export const ScrollSection = ({
  children,
  className = "",
  id,
  variant = "default",
}: ScrollSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);

  const variants = {
    default: {
      hidden: { opacity: 0, y: 80 },
      visible: { opacity: 1, y: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9, y: 60 },
      visible: { opacity: 1, scale: 1, y: 0 },
    },
    slide: {
      hidden: { opacity: 0, x: -100 },
      visible: { opacity: 1, x: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`snap-section relative ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        style={{
          opacity: variant === "default" ? opacity : 1,
          y: variant === "default" ? y : 0,
          scale: variant === "scale" ? scale : 1,
        }}
        className="h-full"
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

// Wrapper for the entire page with scroll snapping
export const ScrollContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="scroll-container">
      {children}
    </div>
  );
};

export default ScrollSection;