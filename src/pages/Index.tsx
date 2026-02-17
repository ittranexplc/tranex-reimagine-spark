import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Truck, Plane, Ship, Warehouse, ShoppingCart, Thermometer, Package, Zap, ArrowRight, MapPin, Phone, Clock, Shield, Globe, Users,
} from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-logistics.jpg";
import warehouseImage from "@/assets/about-warehouse.jpg";

const services = [
  { icon: Truck, title: "Local Logistics", desc: "Multi-faceted logistics and transportation solutions across Nigeria." },
  { icon: Ship, title: "Sea Freight", desc: "Reliable sea freight through global carrier partnerships." },
  { icon: Plane, title: "Air Freight", desc: "Global deliveries across 200+ countries worldwide." },
  { icon: Warehouse, title: "Warehousing", desc: "Secure, managed storage facilities nationwide." },
  { icon: ShoppingCart, title: "E-Commerce", desc: "End-to-end order fulfillment for online businesses." },
  { icon: Thermometer, title: "Cold Chain", desc: "Temperature-controlled medical & pharma shipments." },
  { icon: Package, title: "Haulage", desc: "Fleet ranging from 1.5-ton vans to 30-ton trucks." },
  { icon: Zap, title: "Express Delivery", desc: "Same-day and next-day deliveries nationwide." },
];

const stats = [
  { value: "40+", label: "Years Experience" },
  { value: "200+", label: "Countries Served" },
  { value: "36+", label: "States Covered" },
  { value: "3,600+", label: "Shareholders" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Logistics fleet" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>
        <div className="container relative z-10 section-padding">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-secondary/30">
              Nigeria's Premier Logistics Partner
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6">
              Safe & Reliable <br />
              <span className="text-secondary">Logistics Solutions</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg">
              From express delivery to international freight, we move your world with speed, security, and precision since 1984.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://edge.tranex-ng.com/selfcare/shipmentrackpage.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-secondary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-orange-dark transition-colors"
              >
                Track Shipment
              </a>
              <Link
                to="/services"
                className="border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 py-10 px-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-heading font-bold text-secondary">{stat.value}</div>
              <div className="text-primary-foreground/70 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">Our Service Offerings</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Link
                  to="/services"
                  className="group block bg-card rounded-xl p-6 border border-border hover:border-secondary/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="section-padding bg-muted">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">About Tranex</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-6">
              Nigeria's Widest Logistics Coverage
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Trans-Nationwide Express Plc (TRANEX) is a leading logistics company engaged in domestic and international express delivery, haulage, freight and other ancillary transportation and storage services since 1984.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Listed on the Nigerian Stock Exchange, we operate from offices in all state capitals and major cities, supported by real-time tracking and a fleet of motorcycles, vans, buses, and trucks.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { icon: Shield, text: "Goods-in-Transit Insurance" },
                { icon: Globe, text: "200+ Countries" },
                { icon: Users, text: "3,600+ Shareholders" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-foreground">
                  <item.icon className="w-4 h-4 text-secondary" />
                  {item.text}
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-orange-dark transition-colors"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src={warehouseImage}
              alt="Tranex warehouse"
              className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground p-6 rounded-xl shadow-lg hidden md:block">
              <div className="text-3xl font-heading font-bold">40+</div>
              <div className="text-sm opacity-90">Years of Excellence</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-gradient section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="container text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
            Ready to Ship?
          </h2>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8">
            Get in touch with us today for a seamless logistics experience across Nigeria and beyond.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-secondary text-secondary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-orange-dark transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="tel:+2348123682573"
              className="flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="section-padding bg-background">
        <div className="container grid md:grid-cols-3 gap-8">
          {[
            { icon: MapPin, title: "Head Office", desc: "28, Oshodi Apapa Expressway, Oshodi Lagos" },
            { icon: Clock, title: "Working Hours", desc: "Monday – Friday: 8:00 AM – 5:00 PM" },
            { icon: Phone, title: "Customer Care", desc: "(234) 812-368-2573 | (234) 905-841-3864" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
