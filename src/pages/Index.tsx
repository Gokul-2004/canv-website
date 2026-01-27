import { useRef, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyCertinal from "@/components/WhyCertinal";
import Keynote from "@/components/Keynote";
import BoothShowcase from "@/components/BoothShowcase";
import WhoShouldVisit from "@/components/WhoShouldVisit";
import Proof from "@/components/Proof";
import Footer from "@/components/Footer";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Handle hash navigation for custom scroll container
  useEffect(() => {
    const hash = location.hash;
    if (hash && containerRef.current) {
      // Small delay to ensure content is rendered
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element && containerRef.current) {
          const containerTop = containerRef.current.getBoundingClientRect().top;
          const elementTop = element.getBoundingClientRect().top;
          const scrollPosition = containerRef.current.scrollTop + (elementTop - containerTop);

          containerRef.current.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          });
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [location.hash]);

  return (
    <div className="relative bg-background">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <Header />

      {/* Scroll snap container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto scroll-container"
      >
        <main>
          <section className="snap-section">
            <Hero />
          </section>

          <section className="snap-section">
            <WhyCertinal />
          </section>

          <section className="snap-section">
            <Keynote />
          </section>

          <section className="snap-section">
            <BoothShowcase />
          </section>

          <section className="snap-section">
            <WhoShouldVisit />
          </section>

          <section className="snap-section">
            <Proof />
          </section>

          <section className="snap-section-auto">
            <Footer />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
