import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Truck, Plane, Ship, Warehouse, ShoppingCart, Thermometer, Package, Zap, ArrowRight, BoxIcon,
} from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

const services = [
  {
    icon: Truck,
    title: "Local Logistics",
    desc: "Tranex is a prominent local logistics provider, specializing in tailored transportation solutions for diverse needs. As a leading player in the regional market, Tranex excels in addressing the unique intricacies of local logistics with a multifaceted approach.",
  },
  {
    icon: Ship,
    title: "Sea Freight",
    desc: "Our sea freight service has experienced substantial growth, facilitated by strategic partnerships with reliable sea carriers. We seamlessly transport goods to diverse global destinations, ensuring a dependable presence in every location.",
  },
  {
    icon: Plane,
    title: "Air Freight",
    desc: "TRANEX's global delivery prowess is amplified by our extensive international network, spanning across more than 200 countries worldwide. Swift and efficient deliveries on a global scale.",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    desc: "Tranex offers safe and secure storage facilities at warehouses nationwide. Full traceability, rack and floor locations, in-depth reports and controlled stock rotation using FIFO and batch management.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Fulfillment",
    desc: "End-to-end order fulfillment services for online procurement of all sizes. Turnkey solutions for e-commerce and catalogue companies with cost efficiencies and superior customer service.",
  },
  {
    icon: Thermometer,
    title: "Cold Chain Solutions",
    desc: "Tailored towards the transportation of sensitive medical and pharmaceutical shipments. Every consignment is handled on an individual priority basis with appropriate packaging and refrigerants.",
  },
  {
    icon: Package,
    title: "Haulage Services",
    desc: "Quality haulage and transportation services with vehicles ranging from small vans of 1.5 tons to delivery trucks of 30 tons. Our fleet is available 24/7 with professional drivers.",
  },
  {
    icon: Zap,
    title: "Express Delivery",
    desc: "With offices in all State Capitals and major cities, our domestic express delivery includes same day and next day options. International deliveries via major partners in 200+ countries.",
  },
  {
    icon: BoxIcon,
    title: "Removals & Packaging",
    desc: "Best-in-class removal solutions for corporate and personal needs — domestic, national and international border removals, full and part loads, packaging and labelling.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const Services = () => {
  return (
    <Layout>
      <PageHeader title="Our Services" subtitle="Comprehensive logistics solutions tailored to your needs" />

      <section className="section-padding bg-background">
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-card rounded-xl p-8 border border-border hover:border-secondary/40 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors">
                <service.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-lg mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-gradient text-center">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">Need a Custom Solution?</h2>
          <p className="text-primary-foreground/70 max-w-md mx-auto mb-8">
            We provide customized logistics solutions for every business need. Get in touch today.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-orange-dark transition-colors"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
