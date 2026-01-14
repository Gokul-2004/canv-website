import { motion } from "framer-motion";
import { Calendar, MapPin, Mail, Phone, ExternalLink } from "lucide-react";

const quickLinks = [
  { name: "Homepage", href: "https://certinal.com" },
  { name: "Solutions", href: "https://certinal.com/solutions" },
];

export const Footer = () => {
  return (
    <footer id="contact" className="bg-secondary pt-20 pb-8">
      <div className="container-tight">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-secondary-foreground mb-4">
              Event Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-secondary-foreground/70">
                <Calendar className="w-5 h-5 text-primary" />
                <span>January 30–31, 2026</span>
              </div>
              <div className="flex items-center gap-3 text-secondary-foreground/70">
                <MapPin className="w-5 h-5 text-primary" />
                <span>HICC, Hyderabad, India</span>
              </div>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium text-primary">
                Platinum Sponsor & Keynote Partner
              </span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-secondary-foreground mb-4">
              Quick Links
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-secondary-foreground/70 hover:text-primary transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span>{link.name}</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-secondary-foreground mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:secretariat@transformhealth-it.org"
                className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" />
                <span>secretariat@transformhealth-it.org</span>
              </a>
              <a
                href="tel:+918971810271"
                className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span>+91 8971810271</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-secondary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">C</span>
              </div>
              <span className="font-bold text-secondary-foreground">Certinal</span>
            </div>
            <p className="text-secondary-foreground/60 text-sm">
              © 2026 Certinal. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;