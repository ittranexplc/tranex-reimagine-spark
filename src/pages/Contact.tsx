import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

const lagosOffices = [
  { name: "Head Office", address: "28 Oshodi Apapa Expressway, Lagos" },
  { name: "Victoria Island", address: "Plot 22, Idowu Taylor Street, Victoria Island" },
  { name: "Computer Village", address: "12, Simbiat Abiola Way, Computer Village, Ikeja" },
  { name: "Apapa", address: "25, Warehouse Road, Beside Noss Stores, Apapa" },
  { name: "Ogba", address: "3A, Ijayi Road, Beside Spootom Link Services, Aguda Ogba" },
];

const otherLocations = [
  { state: "Abuja", address: "Suite A35, Melita Plaza, Garki Area II" },
  { state: "Rivers", address: "50, Mbonu Street, D/Line Port-Harcourt" },
  { state: "Oyo", address: "75, MKO Abiola Way, Ring Road, Ibadan" },
  { state: "Abia", address: "13, Factory Road, Opposite Skyebank, Aba" },
  { state: "Anambra", address: "25, New Market Road, Onitsha" },
  { state: "Delta", address: "46, Effurun/Sapele Road, Warri" },
  { state: "Edo", address: "Benin City Office" },
  { state: "Kaduna", address: "Kaduna State Office" },
  { state: "Kano", address: "Kano State Office" },
  { state: "Cross Rivers", address: "30/32, Ndidem Usang Road, Calabar" },
  { state: "Bayelsa", address: "154, Mbiama-Yenagoa Road, Yenagoa" },
  { state: "Borno", address: "S27 Ramat Shopping Complex, Maiduguri" },
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Phone, title: "Customer Care", info: "(234) 812-368-2573", link: "tel:+2348123682573" },
              { icon: Phone, title: "Business Line", info: "(234) 905-841-3864", link: "tel:+2349058413864" },
              { icon: Mail, title: "Email", info: "info@tranex-ng.com", link: "mailto:info@tranex-ng.com" },
              { icon: Clock, title: "Working Hours", info: "Mon – Fri: 8AM – 5PM", link: null },
            ].map((item, i) => (
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
          <div className="mb-16">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-secondary" /> Lagos Offices
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-secondary" /> Nationwide Locations
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {otherLocations.map((loc, i) => (
                <motion.div
                  key={loc.state}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-card rounded-lg p-4 border border-border"
                >
                  <h4 className="font-heading font-semibold text-secondary text-sm mb-1">{loc.state}</h4>
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
          <a
            href="https://tranex-ng.com/Pickup.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-secondary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-orange-dark transition-colors inline-block"
          >
            Request Pickup
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
