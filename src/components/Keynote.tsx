import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CalendarPlus, CheckCircle, User, Download } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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

// Calendar event details
const eventDetails = {
  title: "Certinal Keynote at THIT 2026: Unifying Consent - The Last Broken Step in Digital Care",
  description: "Join Certinal at THIT 2026 for a keynote on unifying consent in digital healthcare. Learn how to operationalize consent, data rights, and regulatory governance across healthcare workflows.",
  location: "HICC, Hyderabad, India",
  startDate: "20260130T090000", // January 30, 2026, 9:00 AM
  endDate: "20260130T103000", // January 30, 2026, 10:30 AM (assuming 1.5 hour keynote)
  timezone: "Asia/Kolkata",
};

// Generate calendar links
const generateCalendarLinks = () => {
  const { title, description, location } = eventDetails;
  
  // Google Calendar format: YYYYMMDDTHHMMSSZ (UTC)
  // January 30, 2026, 9:00 AM IST = 3:30 AM UTC
  const googleStart = "20260130T033000Z";
  const googleEnd = "20260130T050000Z";
  
  // Outlook Calendar format: ISO 8601
  const outlookStart = "2026-01-30T09:00:00";
  const outlookEnd = "2026-01-30T10:30:00";
  
  // Google Calendar
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${googleStart}/${googleEnd}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
  
  // Outlook Calendar
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&startdt=${outlookStart}&enddt=${outlookEnd}`;
  
  return { googleUrl, outlookUrl };
};

// Generate and download ICS file
const downloadICS = () => {
  const { title, description, location } = eventDetails;
  
  // ICS format: YYYYMMDDTHHMMSS
  const icsStart = "20260130T090000";
  const icsEnd = "20260130T103000";
  const icsStamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Certinal//THIT 2026//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:${icsStart}
DTEND:${icsEnd}
DTSTAMP:${icsStamp}
SUMMARY:${title}
DESCRIPTION:${description.replace(/\n/g, "\\n")}
LOCATION:${location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
  
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "certinal-thit-2026-keynote.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const SpeakerCard = ({
  speaker,
  index,
}: {
  speaker: (typeof speakers)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 60, scale: 0.95 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
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
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <div 
      ref={sectionRef}
      id="keynote" 
      className="min-h-screen hero-gradient relative overflow-hidden flex items-center"
    >
      {/* Background elements with parallax */}
      <motion.div 
        style={{ x: backgroundX }}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.div
          className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="container-tight relative z-10 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
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
        
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* What attendees will learn */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -60, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-dark rounded-2xl p-8 h-full flex flex-col"
          >
            <h3 className="text-xl font-bold text-primary-foreground mb-6">
              What Attendees Will Learn
            </h3>
            <div className="space-y-4 flex-1">
              {learnings.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                  >
                    <CalendarPlus className="w-5 h-5 mr-2" />
                    Add to Calendar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56">
                  <DropdownMenuItem asChild>
                    <a
                      href={generateCalendarLinks().googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center cursor-pointer"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                      Google Calendar
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href={generateCalendarLinks().outlookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center cursor-pointer"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.5 7.5h9v9h-9z"/>
                      </svg>
                      Outlook Calendar
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={downloadICS}
                    className="flex items-center cursor-pointer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download .ics file
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </motion.div>

          {/* Speakers */}
          <div className="space-y-4 h-full flex flex-col">
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-primary-foreground mb-6"
            >
              Featured Speakers
            </motion.h3>
            <div className="space-y-4 flex-1">
              {speakers.map((speaker, index) => (
                <SpeakerCard key={speaker.name} speaker={speaker} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Keynote;