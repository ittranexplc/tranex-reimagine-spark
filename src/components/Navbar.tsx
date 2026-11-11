import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/tranex-logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Investor Relations", to: "/investor-relations" },
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
            <a
              href="tel:+2349058413864"
              aria-label="Call Customer Care: (234) 905-841-3864"
              className="flex items-center gap-1 hover:text-secondary transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3" aria-hidden="true" />
              <span>(234) 905-841-3864</span>
            </a>
            <a href="mailto:info@tranex-ng.com" className="hidden md:inline hover:text-secondary transition-colors">
              info@tranex-ng.com
            </a>
          </div>
          <span className="hidden sm:inline text-primary-foreground/70 text-xs">Mon - Fri: 8:00 AM - 5:00 PM</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Tranex Logo" className="h-10 w-auto object-contain" />
            <div className="hidden sm:block">
              <span className="block text-[10px] text-muted-foreground leading-none">Trans-Nationwide Express Plc</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
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
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="lg:hidden p-2 text-foreground"
          >
            {open ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-card border-t border-border"
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
