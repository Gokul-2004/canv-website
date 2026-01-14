import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CalendarPlus, CheckCircle, User } from "lucide-react";
import { Button } from "./ui/button";

const learnings = [
  "Why most digital health programs fail at the consent layer",
  "How mobile-first consent improves compliance and patient trust",
  "What hospitals must fix in 2026 to stay audit-ready",
];

const speakers = [
  {
    name: "Dr. Rajesh Kumar",
    title: "Chief Medical Information Officer",
    organization: "Apollo Hospitals",
    bio: "20+ years in healthcare IT transformation, leading digital health initiatives across 70+ hospitals.",
  },
  {
    name: "Priya Sharma",
    title: "VP of Product & Engineering",
    organization: "Certinal",
    bio: "Former Google Health engineer, pioneering consent infrastructure for enterprise healthcare systems.",
  },
  {
    name: "Dr. Michael Chen",
    title: "Director of Digital Compliance",
    organization: "Bumrungrad International Hospital",
    bio: "Expert in APAC healthcare regulations and cross-border patient data governance.",
  },
];

const SpeakerCard = ({
  speaker,
  index,
}: {
  speaker: (typeof speakers)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <div className="glass-card rounded-2xl p-6 h-full transition-all duration-500 hover:shadow-xl">
        <div className="flex items-start gap-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
          >
            <User className="w-8 h-8 text-primary" />
          </motion.div>
          <div>
            <h4 className="text-lg font-bold text-foreground">{speaker.name}</h4>
            <p className="text-primary text-sm font-medium">{speaker.title}</p>
            <p className="text-muted-foreground text-sm mb-3">{speaker.organization}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{speaker.bio}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Keynote = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="keynote" className="section-padding hero-gradient relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-tight relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-6"
          >
            <span className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm font-medium text-primary-foreground/90">
              Certinal Keynote at THIT 2026
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 max-w-4xl mx-auto leading-tight">
            Unifying Consent:{" "}
            <span className="gradient-text">The Last Broken Step</span> in Digital Care
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* What attendees will learn */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-dark rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-primary-foreground mb-6">
              What Attendees Will Learn
            </h3>
            <div className="space-y-4">
              {learnings.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-primary-foreground/80">{item}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8"
            >
              <Button
                asChild
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
              >
                <a href="#contact">
                  <CalendarPlus className="w-5 h-5 mr-2" />
                  Add to Calendar
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Speakers */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary-foreground mb-6">Featured Speakers</h3>
            {speakers.map((speaker, index) => (
              <SpeakerCard key={speaker.name} speaker={speaker} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Keynote;