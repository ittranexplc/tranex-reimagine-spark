import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/tranex-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="bg-white inline-block p-3 rounded-lg mb-4">
              <img src={logo} alt="Tranex Logo" className="h-8 w-auto object-contain" />
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Trans-Nationwide Express Plc — Nigeria's leading logistics company since 1984. Listed on the Nigerian Stock Exchange.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-secondary">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Our Services", to: "/services" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-primary-foreground/70 hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-secondary">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Local Logistics</li>
              <li>Air & Sea Freight</li>
              <li>Express Delivery</li>
              <li>Warehousing</li>
              <li>E-Commerce Fulfillment</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-secondary">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-secondary" />
                28, Oshodi Apapa Expressway, Oshodi Lagos
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-secondary" />
                <a href="tel:+2348123682573" className="hover:text-secondary transition-colors">(234) 812-368-2573</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-secondary" />
                <a href="mailto:info@tranex-ng.com" className="hover:text-secondary transition-colors">info@tranex-ng.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Trans-Nationwide Express Plc. All rights reserved.</p>
          <a
            href="https://edge.tranex-ng.com/selfcare/shipmentrackpage.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-orange-light transition-colors font-medium"
          >
            Track Your Shipment →
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
