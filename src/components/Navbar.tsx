import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/tranex-logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Investors", to: "/investor-relations" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+2348123682573" className="flex items-center gap-1 hover:text-secondary transition-colors">
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">(234) 812-368-2573</span>
            </a>
            <a href="mailto:info@tranex-ng.com" className="hidden md:inline hover:text-secondary transition-colors">
              info@tranex-ng.com
            </a>
          </div>
          <span className="text-primary-foreground/70 text-xs">Mon - Fri: 8:00 AM - 5:00 PM</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Tranex Logo" className="h-10 w-auto object-contain" />
            <span className="hidden sm:block text-[10px] text-muted-foreground leading-tight">Trans-Nationwide<br/>Express Plc</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  location.pathname === link.to ? "text-secondary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://edge.tranex-ng.com/selfcare/shipmentrackpage.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-secondary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-orange-dark transition-colors"
            >
              Track Shipment
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-card border-t border-border"
            >
              <div className="container py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`text-sm font-medium py-2 transition-colors ${
                      location.pathname === link.to ? "text-secondary" : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://edge.tranex-ng.com/selfcare/shipmentrackpage.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold text-center hover:bg-orange-dark transition-colors"
                >
                  Track Shipment
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
