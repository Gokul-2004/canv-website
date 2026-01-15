import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote, Shield, Award, Lock, ChevronLeft, ChevronRight } from "lucide-react";

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

const testimonials = [
  {
    quote: "Contracts signed digitally through the Certinal platform are simple, easy and traceable. We know where it is and we can push people to sign if they haven't done it. This has been quite a game changer for our organization.",
    name: "Neil Sigamoney",
    title: "Director Engineering & Corporate Services, At Monash Health",
    initials: "NS",
  },
  {
    quote: "Integrating Certinal eSign technology aligns with Bumrungrad's commitment to create seamless, secure, and patient-centered experiences through advanced solutions. By digitizing our workflows, we simplify the registration process, reduce wait times, and enhance overall patient satisfaction—all core to our mission of delivering world-class healthcare.",
    name: "Nipat Kulabkaw",
    title: "MD, Co-Chief Executive Officer, At Bumrungrad International Hospital",
    initials: "NK",
  },
];

export const Proof = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Auto-rotate every 6 seconds
    return () => clearInterval(interval);
  }, []);
  
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
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-16"
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

        {/* Testimonial Slider */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto relative"
        >
          <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            
            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Quote className="w-10 h-10 text-primary/30 mb-6" />
                
                <blockquote className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8 italic">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-primary font-bold">{testimonials[currentTestimonial].initials}</span>
                  </motion.div>
                  <div>
                    <p className="font-bold text-foreground">{testimonials[currentTestimonial].name}</p>
                    <p className="text-muted-foreground text-sm">
                      {testimonials[currentTestimonial].title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonial
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Proof;