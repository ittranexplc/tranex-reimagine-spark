import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Truck, Plane, Ship, Warehouse, ShoppingCart, Thermometer, Package, Zap, ArrowRight, MapPin, Phone, Clock, Shield, Globe, Users, Star, SmilePlus, Briefcase, HeartHandshake, HardHat,
} from "lucide-react";
import Layout from "@/components/Layout";
import CompanyValues from "@/components/CompanyValues";
import accessBankLogo from "@/assets/logos/access-bank.png";
import heroImage from "@/assets/hero-logistics.jpg";
import warehouseImage from "@/assets/about-warehouse.jpg";
import oriflameLogo from "@/assets/logos/oriflame.svg";
import afrioneLogo from "@/assets/logos/afrione.png";
import airtelLogo from "@/assets/logos/airtel.png";
import ncdmbLogo from "@/assets/logos/ncdmb.png";
import bripanLogo from "@/assets/logos/bripan.jpg";
import phillipsHmoLogo from "@/assets/logos/phillips-hmo.png";
import ipnxLogo from "@/assets/logos/ipnx.png";
import pricewiseLogo from "@/assets/logos/pricewise.png";
import smartwaresLogo from "@/assets/logos/smartwares-n-products.png";
import npaLogo from "@/assets/logos/nigerian-ports-authority.jpg";
import kennediaLogo from "@/assets/logos/kennedia-consulting.png";
import aquilaLogo from "@/assets/logos/aquila-capital.png";
import swwipeLogo from "@/assets/logos/swwipe.png";
import dizengoffLogo from "@/assets/logos/dizengoff-nigeria.svg";
import perfettiLogo from "@/assets/logos/perfetti-van-melle.svg";
import chipharmaLogo from "@/assets/logos/chipharma.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  { icon: Truck, title: "Corporate Logistics", desc: "We help companies prove their impact, by providing efficient delivery solutions that match their specific needs." },
  { icon: ShoppingCart, title: "E-Commerce & SMEs", desc: "Specialized logistics services designed to optimize speedy retail support for e-commerce and SME market segments." },
  { icon: Globe, title: "International Logistics", desc: "Cross-border logistics services to help businesses execute expansion plans across Africa and beyond." },
  { icon: Package, title: "General Haulage", desc: "Trusted with any size of shipment regardless of complexity, we offer wholistic solutions." },
  { icon: Thermometer, title: "Cold Chain Delivery", desc: "Expert handling of diagnostic biological samples and clinical supplies with temperature-controlled shipments." },
  { icon: Zap, title: "Express Delivery", desc: "Same-day and next-day deliveries. We deliver to remote areas no matter how challenging the terrain." },
  { icon: Warehouse, title: "Warehousing", desc: "Safe and secure storage facilities nationwide with CCTV, physical security, and stock management." },
  { icon: Ship, title: "Air/Sea Freight", desc: "Well-established global network facilitating seamless freight operations to international destinations." },
];

const stats = [
  { value: "40+", label: "Years Experience" },
  { value: "200+", label: "Countries Served" },
  { value: "36+", label: "States Covered" },
  { value: "3,600+", label: "Shareholders" },
];

const counterStats = [
  { icon: SmilePlus, value: "500+", label: "Happy Clients" },
  { icon: Briefcase, value: "1,200+", label: "Projects" },
  { icon: HeartHandshake, value: "50,000+", label: "Hours Of Support" },
  { icon: HardHat, value: "150+", label: "Hard Workers" },
];

const defaultLogoSize = "max-h-10 md:max-h-12 max-w-[85%]";
const clients: { name: string; logo?: string; size?: string }[] = [
  { name: "Oriflame", logo: oriflameLogo },
  { name: "Chipharma", logo: chipharmaLogo, size: "max-h-14 md:max-h-[4.5rem] max-w-[min(85%,174px)]" },
  { name: "Pricewise", logo: pricewiseLogo },
  { name: "Afrione", logo: afrioneLogo },
  { name: "Access Bank", logo: accessBankLogo, size: "max-h-10 md:max-h-12 max-w-[min(85%,124px)]" },
  { name: "Airtel", logo: airtelLogo, size: "max-h-8 md:max-h-9 max-w-[75%]" },
  { name: "Nigerian Content Development Board", logo: ncdmbLogo, size: "max-h-12 md:max-h-14 max-w-full" },
  { name: "Smartwares 'N' Products", logo: smartwaresLogo, size: "max-h-14 md:max-h-[4.5rem] max-w-[85%]" },
  { name: "Perfetti Van Melle", logo: perfettiLogo, size: "max-h-12 md:max-h-14 max-w-[85%]" },
  { name: "Nigerian Ports Authority", logo: npaLogo, size: "max-h-14 md:max-h-[4.5rem] max-w-[85%]" },
  { name: "Kennedia Consulting", logo: kennediaLogo, size: "max-h-12 md:max-h-14 max-w-full" },
  { name: "Bripan", logo: bripanLogo, size: "max-h-14 md:max-h-[4.5rem] max-w-[85%]" },
  { name: "Aquila Capital Limited", logo: aquilaLogo, size: "max-h-12 md:max-h-14 max-w-[85%]" },
  { name: "Philip Health Management Services Limited", logo: phillipsHmoLogo },
  { name: "Swwipe Financial Services Limited", logo: swwipeLogo },
  { name: "ipNX Nigeria Limited", logo: ipnxLogo },
  { name: "Dizengoff Nigeria", logo: dizengoffLogo, size: "max-h-12 md:max-h-14 max-w-[85%]" },
];

const testimonials = [
  {
    name: "Kwame Amoah",
    role: "CEO, Tech Innovate",
    text: "TRANEX's human-centered analytics have empowered our decision-making process and led to remarkable outcomes.",
  },
  {
    name: "Amina Soweto",
    role: "CTO, InnovateX",
    text: "Their predictive analysis techniques have provided us with valuable insights, enhancing our strategic planning and operational efficiency.",
  },
  {
    name: "Nadia Abou",
    role: "Director, ImpactAfrica",
    text: "TRANEX's engaging narratives have revolutionized how we communicate complex data, enabling us to connect with our audience on a deeper level.",
  },
];

const faqs = [
  { q: "What exactly does TRANEX do?", a: "TRANEX provides strategic Courier and logistics services including express delivery, haulage, freight, warehousing, and cold chain solutions." },
  { q: "Does Tranex offer international shipping services?", a: "Yes. Tranex can deliver to any destination across the globe, covering over 200 countries." },
  { q: "What is the difference between Tranex and others?", a: "With over 40 years in existence, Tranex brings more experience than the rest. We are one of only two indigenous logistics companies quoted on the Nigerian Stock Exchange." },
  { q: "How long does it take to deliver shipments?", a: "Delivery timelines depend strictly on your location. Let us know your location and we'll give you specifics. We offer same-day and next-day options." },
  { q: "What industries do you support?", a: "We work across Agriculture, FMCG & Retail, Technology & Digital Products, Energy, Oil & Gas, Health, Education, Real Estate, and Logistics & Distribution." },
  { q: "Can TRANEX support diaspora investors?", a: "Yes. Many of our clients operate from abroad. We provide the ground-level intelligence and support needed." },
  { q: "How do I get started?", a: "You can begin by visiting our office, sending an email to tranex@tranex-ng.com, or booking a strategy call." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const Index = () => {
  const reduceMotion = useReducedMotion();

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
              Empowering African Businesses
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6">
              We offer Premium <br />
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
                to="/about"
                className="border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                About Tranex
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
                  className="group block bg-card rounded-xl p-6 border border-border hover:border-secondary/50 hover:shadow-lg transition-all duration-300 h-full"
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
              Trans-Nationwide Express PLC
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Tranex is a wholly owned Nigerian company, established in 1984. Listed on the Nigeria Stock Exchange (1st tier) in 1993 with a share capital of N250,000,000 and over 3,600 shareholders. We are one of the only two indigenous Logistics Companies quoted on the Nigerian Stock Exchange.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At TRANEX, we see your business as our business. This ownership mindset ensures we serve you passionately with domestic and international express delivery, haulage, freight and other ancillary transportation and storage services.
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

      {/* Vision & Mission */}
      <section className="section-padding bg-background">
        <div className="container grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <h3 className="text-2xl font-heading font-bold text-foreground mb-3">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">To be the preferred logistics company in Africa.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <h3 className="text-2xl font-heading font-bold text-foreground mb-3">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">To exceed stakeholders' expectations by leveraging technology & our people to deliver the best-in-class logistics solutions.</p>
          </motion.div>
        </div>
        <div className="container mt-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-xl px-3 py-5 sm:p-8 border border-border"
          >
            <h3 className="text-2xl font-heading font-bold text-foreground mb-6 px-2 sm:px-0">Our Values</h3>
            <CompanyValues />
          </motion.div>
        </div>
      </section>

      {/* Counter Stats */}
      <section className="bg-navy-gradient section-padding">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
          {counterStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-7 h-7 text-secondary" />
              </div>
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">{stat.value}</div>
              <div className="text-primary-foreground/60 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Client Logos */}
      <section className="section-padding bg-muted">
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">Trusted By</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">Companies We Work With</h2>
          </div>
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {clients.map((client, i) => (
              <motion.li
                key={client.name}
                custom={i % 5}
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group grow-0 shrink-0 min-w-0 basis-[calc(50%-0.375rem)] sm:basis-[calc(33.333%-0.667rem)] md:basis-[calc(25%-0.75rem)] lg:basis-[calc(20%-0.8rem)] h-24 md:h-28 flex items-center justify-center bg-card rounded-xl border border-border p-2 sm:p-3 lg:p-4 hover:shadow-md hover:border-secondary/40 transition-[box-shadow,border-color] duration-300 motion-reduce:transition-none"
              >
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    title={client.name}
                    loading="lazy"
                    decoding="async"
                    className={`${client.size ?? defaultLogoSize} w-auto h-auto object-contain [@media(hover:hover)]:grayscale group-hover:grayscale-0 transition-[filter] duration-300 motion-reduce:transition-none`}
                  />
                ) : (
                  <span className="min-w-0 text-center font-heading font-semibold text-xs sm:text-[0.8125rem] xl:text-base leading-snug [overflow-wrap:anywhere] text-muted-foreground group-hover:text-primary transition-colors duration-300 motion-reduce:transition-none">
                    {client.name}
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">Feedback</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">What People Say About Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card rounded-xl p-8 border border-border relative"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="font-heading font-semibold text-foreground">{t.name}</div>
                  <div className="text-muted-foreground text-sm">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-muted">
        <div className="container max-w-3xl">
          <div className="text-center mb-14">
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">F.A.Q</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:border-secondary/40"
              >
                <AccordionTrigger className="text-foreground font-heading font-semibold text-left hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
              href="tel:+2349058413864"
              className="flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="section-padding bg-background">
        <div className="container grid gap-6 max-w-xl lg:max-w-none lg:grid-cols-3">
          {[
            { icon: MapPin, title: "Head Office", desc: "28, Oshodi Apapa Expressway, Oshodi Lagos" },
            { icon: Clock, title: "Working Hours", desc: "Monday – Friday: 8:00 AM – 5:00 PM" },
            { icon: Phone, title: "Customer Care", desc: "(234) 905-841-3864", href: "tel:+2349058413864" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex items-start gap-3 bg-card rounded-xl p-5 border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-secondary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                {item.href ? (
                  <a href={item.href} className="text-muted-foreground text-sm whitespace-nowrap hover:text-secondary transition-colors">
                    {item.desc}
                  </a>
                ) : (
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
