import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
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
  
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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