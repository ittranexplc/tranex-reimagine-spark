import { motion } from "framer-motion";
import { Shield, Globe, Users, Eye, Target, Heart, Lightbulb, Star } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import warehouseImage from "@/assets/about-warehouse.jpg";

const values = [
  { icon: Heart, title: "Integrity", desc: "We uphold the highest standards of honesty and transparency." },
  { icon: Users, title: "Team Work", desc: "Collaboration drives our success and innovation." },
  { icon: Lightbulb, title: "Innovation", desc: "We embrace technology to deliver cutting-edge solutions." },
  { icon: Star, title: "Excellence", desc: "We strive for the best in everything we do." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const About = () => {
  return (
    <Layout>
      <PageHeader title="About Tranex" subtitle="Nigeria's leading logistics company since 1984" />

      {/* Company Story */}
      <section className="section-padding bg-background">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Trans-Nationwide Express Plc (TRANEX) is a leading Logistics Company engaged in domestic and International Express delivery, haulage, freight and other ancillary transportation and storage services.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              It is a wholly owned Nigerian company established in 1984 as TNT Skypak Nigeria Limited. In 1992 the name was changed to Trans-Nationwide Express Plc. With a share capital of ₦250,000,000 and over 3,600 shareholders, it is listed on the Nigeria Stock Exchange (1st tier) since 1993.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              It is currently one of only two Logistic Companies in Nigeria quoted on the Nigerian Stock Exchange.
            </p>
          </motion.div>
          <motion.img
            src={warehouseImage}
            alt="Tranex operations"
            className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section-padding bg-muted">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Our Infrastructure</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Besides our network of offices nationwide, we have a fleet of motorcycles, delivery vans, buses and trucks ensuring seamless delivery of clients' consignments nationwide.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            TRANEX's Track and Trace ensures online tracking of all shipments, generating automatic proof of delivery records. All shipments in transit are covered by a Goods-in-transit insurance policy.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { icon: Shield, text: "Insured Shipments" },
              { icon: Globe, text: "200+ Countries" },
              { icon: Users, text: "NSE Listed" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm font-medium text-foreground">
                <item.icon className="w-5 h-5 text-secondary" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision, Mission, Commitment */}
      <section className="section-padding bg-background">
        <div className="container grid md:grid-cols-3 gap-8">
          {[
            { icon: Eye, title: "Our Vision", desc: "To be the preferred logistics company in Africa." },
            { icon: Target, title: "Our Mission", desc: "To exceed stakeholders' expectations by leveraging technology & our people to deliver the best-in-class logistics solutions." },
            { icon: Shield, title: "Our Commitment", desc: "To continuously demonstrate total commitment to quality service, leveraging speed, flexibility, reliability, and value for money." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-card rounded-xl p-8 border border-border text-center"
            >
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-3 text-lg">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-navy-gradient">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary-foreground">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/10 text-center"
              >
                <value.icon className="w-8 h-8 text-secondary mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-primary-foreground mb-2">{value.title}</h3>
                <p className="text-primary-foreground/60 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
