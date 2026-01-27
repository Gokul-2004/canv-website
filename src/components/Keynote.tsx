import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CalendarPlus, Download } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const speakers = [
  {
    name: "Mr. Ashokkan Somuveerappan",
    title: "Panel Chair",
    organization: "CIO, Apollo Hospitals",
    bio: "Leading digital transformation and IT strategy across Apollo Hospitals network.",
  },
  {
    name: "Ms. Shahana Chatterji",
    title: "Partner",
    organization: "Shardul Amarchand Mangaldas & Co.",
    bio: "Expert in healthcare law, data privacy regulations, and corporate legal advisory.",
  },
  {
    name: "Mr. Lalit Kalra",
    title: "Partner, Cybersecurity & National Leader – Data Privacy",
    organization: "EY India",
    bio: "Leading cybersecurity and data privacy practice, advising enterprises on DPDP compliance.",
  },
  {
    name: "Mr. Kinjal Saxena",
    title: "Chief Product & Technology Officer",
    organization: "AIG Hospitals",
    bio: "Driving product innovation and technology strategy in healthcare delivery.",
  },
  {
    name: "Mr. Jagadeesh Ramasamy",
    title: "Chief Digital & Information Officer (CDIO)",
    organization: "Narayana Health",
    bio: "Leading digital initiatives and information systems across Narayana Health network.",
  },
];

const agenda = [
  { time: "2:10 - 2:50 PM", title: "Panel Discussion", description: "DPDP Enforcement: What CIOs Must Be Ready For" },
  { time: "2:50 - 3:10 PM", title: "Certinal Product Showcase", description: "Live demonstration of consent automation" },
  { time: "3:10 - 3:20 PM", title: "Book Unveiling", description: "\"When the CIO Holds the Scalpel\"" },
  { time: "3:20 - 3:40 PM", title: "Q&A & Interaction", description: "Panelist interaction with audience" },
];

// Calendar event details
const eventDetails = {
  title: "Certinal Panel at THIT 2026: DPDP Enforcement - What CIOs Must Be Ready For",
  description: "Join Certinal at THIT 2026 for a panel discussion on DPDP enforcement readiness. Shifting the discussion from theoretical compliance to real-world enforcement readiness, focusing on operational, technical, and organizational preparedness.",
  location: "HICC, Hyderabad, India",
  startDate: "20260130T141000", // January 30, 2026, 2:10 PM
  endDate: "20260130T154000", // January 30, 2026, 3:40 PM
  timezone: "Asia/Kolkata",
};

// Generate calendar links
const generateCalendarLinks = () => {
  const { title, description, location } = eventDetails;

  // Google Calendar format: YYYYMMDDTHHMMSSZ (UTC)
  // January 30, 2026, 2:10 PM IST = 8:40 AM UTC
  const googleStart = "20260130T084000Z";
  const googleEnd = "20260130T101000Z";
  
  // Outlook Calendar format: ISO 8601
  const outlookStart = "2026-01-30T14:10:00";
  const outlookEnd = "2026-01-30T15:40:00";
  
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
  const icsStart = "20260130T141000";
  const icsEnd = "20260130T154000";
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
  link.download = "certinal-thit-2026-panel.ics";
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
        <h4 className="text-lg font-bold text-[#131720]">{speaker.name}</h4>
        <p className="text-primary text-sm font-medium">{speaker.title}</p>
        <p className="text-[#131720]/60 text-sm mb-3">{speaker.organization}</p>
        <p className="text-sm text-[#131720]/60 leading-relaxed">{speaker.bio}</p>
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
      className="min-h-screen relative overflow-hidden flex items-center"
      style={{ backgroundColor: '#E6FAEB' }}
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
            className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-6"
          >
            <span className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm font-medium text-[#131720]/90">
              Certinal Panel Discussion at THIT 2026
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#131720] mb-4 max-w-4xl mx-auto leading-tight">
            DPDP Enforcement:{" "}
            <span className="gradient-text">What CIOs Must Be Ready For</span>
          </h2>
          <p className="text-lg text-[#131720]/70 max-w-2xl mx-auto">
            Shifting the discussion from theoretical compliance to real-world enforcement readiness, focusing on operational, technical, and organizational preparedness.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Session Agenda */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -60, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card rounded-2xl p-8 h-full flex flex-col"
          >
            <h3 className="text-xl font-bold text-[#131720] mb-6">
              Session Agenda
            </h3>
            <div className="flex-1">
              {agenda.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/50 transition-colors">
                    <div className="text-primary font-semibold text-sm whitespace-nowrap min-w-[110px]">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-[#131720]">{item.title}</p>
                        <div className="flex-1 border-b border-dotted border-[#131720]/20" />
                      </div>
                      <p className="text-sm text-[#131720]/60 mt-1">{item.description}</p>
                    </div>
                  </div>
                  {index < agenda.length - 1 && (
                    <div className="border-b border-dashed border-primary/20 mx-4" />
                  )}
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
              className="text-xl font-bold text-[#131720] mb-6"
            >
              Panel Members
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