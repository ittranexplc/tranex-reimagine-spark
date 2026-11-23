import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { contactDetails } from "@/data/contactInfo";

const lagosOffices = [
  { name: "Head Office", address: "28-30 Oshodi Apapa Expressway, Lagos" },
  { name: "Computer Village Office", address: "12, Simbiat Abiola Way, Computer Village, Ikeja" },
];

const otherLocations = [
  { name: "Abuja Station", address: "Suite B27, Area 11 Shopping Mall, Garki, Abuja" },
  { name: "Port Harcourt Station", address: "50, Mbomi Street, D-Line, Port Harcourt" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const Contact = () => {
  return (
    <Layout>
      <PageHeader title="Contact Us" subtitle="We're here to help with all your logistics needs" />

      {/* Contact Info */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-6 mb-16 max-w-md lg:max-w-5xl mx-auto">
            {contactDetails.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card rounded-xl p-6 border border-border text-center"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                {item.link ? (
                  <a href={item.link} className="text-muted-foreground text-sm hover:text-secondary transition-colors">
                    {item.info}
                  </a>
                ) : (
                  <p className="text-muted-foreground text-sm">{item.info}</p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Lagos Offices */}
          <div className="mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-secondary" /> Lagos Offices
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {lagosOffices.map((office, i) => (
                <motion.div
                  key={office.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-card rounded-lg p-5 border border-border"
                >
                  <h4 className="font-heading font-semibold text-foreground text-sm mb-1">{office.name}</h4>
                  <p className="text-muted-foreground text-sm">{office.address}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Other Locations */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-secondary" /> Nationwide Locations
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {otherLocations.map((loc, i) => (
                <motion.div
                  key={loc.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-card rounded-lg p-4 border border-border"
                >
                  <h4 className="font-heading font-semibold text-secondary text-sm mb-1">{loc.name}</h4>
                  <p className="text-muted-foreground text-xs">{loc.address}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Request Pickup CTA */}
      <section className="section-padding bg-navy-gradient text-center">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">Request a Pickup</h2>
          <p className="text-primary-foreground/70 max-w-md mx-auto mb-8">
            Schedule a convenient pickup for your packages today.
          </p>
          <Link
            to="/request-pickup"
            className="bg-secondary text-secondary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-orange-dark transition-colors inline-block"
          >
            Request Pickup
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
