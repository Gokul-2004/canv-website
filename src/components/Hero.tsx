import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-01-30T09:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-2 sm:gap-3 md:gap-4">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + index * 0.1 }}
          className="glass-card rounded-xl p-2 sm:p-3 md:p-4 min-w-[55px] sm:min-w-[70px] md:min-w-[80px] text-center"
        >
          <motion.span
            key={unit.value}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="block text-lg sm:text-2xl md:text-3xl font-bold text-foreground"
          >
            {String(unit.value).padStart(2, "0")}
          </motion.span>
          <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export const Hero = () => {
  return (
    <div className="relative min-h-screen hero-gradient overflow-hidden flex flex-col">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-tight relative z-10 pt-24 pb-20 md:pt-28 md:pb-24 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Sponsor Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-slate-100 to-cyan-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-900">
              Platinum Sponsor & Keynote Partner
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            Certinal at Apollo THIT 2026
          </motion.h1>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              CERTINAL'S <span className="gradient-text">HEALTHCARE</span>
            </p>
            <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              CONSENT & COMPLIANCE <span className="gradient-text">PLATFORM</span>
            </p>
          </motion.div>

          {/* Event Info Row - Left: Event Details, Right: Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-8"
          >
            {/* Left - Event Details */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-foreground/70 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary sm:w-[18px] sm:h-[18px]" />
                <span>January 30–31, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary sm:w-[18px] sm:h-[18px]" />
                <span>HICC, Hyderabad, India</span>
              </div>
            </div>

            {/* Right - Countdown Timer */}
            <div className="flex flex-col items-center">
              <p className="text-foreground/60 mb-3 text-sm uppercase tracking-wider">
                Event starts in
              </p>
              <CountdownTimer />
            </div>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-foreground/60 max-w-3xl mx-auto mb-10 leading-relaxed px-2 sm:px-0"
          >
            At Apollo THIT – Transforming Healthcare with IT 2026, Certinal leads the conversation on consent, compliance, and governance in the DPDP era.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 px-4 sm:px-0"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg animate-pulse-glow w-full sm:w-auto"
            >
              <motion.a
                href="#booth"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Meet Certinal at THIT 2026
              </motion.a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary/40 text-primary hover:bg-primary/10 hover:text-foreground rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
            >
              <motion.a
                href="https://www.certinal.com/request-a-demo"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Demo
              </motion.a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-foreground/40"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;