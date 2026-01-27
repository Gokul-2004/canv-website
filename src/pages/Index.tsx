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

  // Scroll to hash helper function
  const scrollToHash = (hash: string, smooth = true) => {
    if (!hash || !containerRef.current) return;

    const element = document.getElementById(hash.replace("#", ""));
    if (element && containerRef.current) {
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const scrollPosition = containerRef.current.scrollTop + (elementTop - containerTop);

      containerRef.current.scrollTo({
        top: scrollPosition,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  // Handle initial page load with hash (for iframes, direct links, refresh)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for content to fully render before scrolling
      const timeoutId = setTimeout(() => {
        scrollToHash(hash, false); // Instant scroll on initial load
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, []); // Empty deps - only run on mount

  // Handle hash navigation for React Router changes
  useEffect(() => {
    if (location.hash) {
      const timeoutId = setTimeout(() => {
        scrollToHash(location.hash, true);
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
