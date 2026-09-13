import { motion } from "framer-motion";
import { FileText, Download, TrendingUp, Shield, Users, Mail } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

type Document = {
  title: string;
  url: string;
  tag: string;
};

type DocumentGroup = {
  title: string;
  docs: Document[];
};

const documentGroups: DocumentGroup[] = [
  {
    title: "Financial Reports",
    docs: [
      {
        title: "Tranex Q1 2023 Unaudited Annual Report & Accounts",
        url: "https://www.tranex-ng.com/docs/QUARTER%201%202023%20UNAUDITED%20REPORTS.pdf",
        tag: "Financial",
      },
      {
        title: "Inability to Meet the Deadline for Filing of Q2 2025 UFS",
        url: "https://www.tranex-ng.com/docs/INABILITY%20TO%20MEET%20THE%20DEADLINE%20FOR%20FILING%20OF%20Q2%202025%20UFS-signed.pdf",
        tag: "Notice",
      },
    ],
  },
  {
    title: "Shareholder Information",
    docs: [
      {
        title: "Tranex Unclaimed Dividend 2024",
        url: "https://www.tranex-ng.com/docs/TRANEX%20Unclaimed%20Dividend%202024.pdf",
        tag: "Dividend",
      },
    ],
  },
  {
    title: "Corporate Governance & Policies",
    docs: [
      {
        title: "Corporate Governance Return (SEC Public Companies)",
        url: "https://www.tranex-ng.com/docs/SECPublic-Companies-Return-on-Corporate-Governance.pdf",
        tag: "Governance",
      },
      {
        title: "NCCG 2020 Reporting Template",
        url: "https://www.tranex-ng.com/docs/NCCG%202020%20REPORTING%20TEMPLATE-TRANEX%20%20%20PLC.pdf",
        tag: "Compliance",
      },
      {
        title: "Complaint Management Policy",
        url: "https://www.tranex-ng.com/docs/COMPLAINT%20MANAGEMENT%20POLICY.pdf",
        tag: "Policy",
      },
      {
        title: "Securities Trading Policy",
        url: "https://www.tranex-ng.com/docs/SECURITY%20TRADING%20POLICY.pdf",
        tag: "Policy",
      },
    ],
  },
];

const highlights = [
  { icon: TrendingUp, label: "NSE Listed", value: "Since 1993" },
  { icon: Users, label: "Shareholders", value: "3,600+" },
  { icon: Shield, label: "Share Capital", value: "₦250M" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const InvestorRelations = () => {
  return (
    <Layout>
      <PageHeader
        title="Investor Relations"
        subtitle="Corporate governance, financial reports, and shareholder information"
      />

      {/* Intro */}
      <section className="section-padding bg-background">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">NSE Listed</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-6">
              Committed to Transparency & Shareholder Value
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Trans-Nationwide Express Plc is listed on the Nigerian Stock Exchange (1st tier) since 1993. With a share capital of ₦250,000,000 and over 3,600 shareholders, we remain one of only two indigenous logistics companies quoted on the Exchange.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are dedicated to maintaining the highest standards of corporate governance, timely disclosures, and sustainable value creation for all stakeholders.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
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
                <div className="text-xl font-heading font-bold text-foreground">{item.value}</div>
                <div className="text-muted-foreground text-sm mt-1">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="section-padding bg-muted">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">Downloads</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
              Annual Reports & Governance Documents
            </h2>
          </div>

          <div className="space-y-12">
            {documentGroups.map((group, groupIndex) => (
              <div key={group.title}>
                <h3 className="text-xl font-heading font-bold text-foreground mb-6">{group.title}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {group.docs.map((doc, i) => (
                    <motion.div
                      key={doc.title}
                      custom={i + groupIndex}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      className="bg-card rounded-xl p-6 border border-border hover:border-secondary/40 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                          <FileText className="w-6 h-6 text-secondary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="inline-block bg-secondary/10 text-secondary text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
                            {doc.tag}
                          </span>
                          <h4 className="font-heading font-semibold text-foreground text-sm leading-snug mb-3">
                            {doc.title}
                          </h4>
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-light transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Download PDF
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance note */}
      <section className="section-padding bg-navy-gradient text-center">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
            Corporate Governance
          </h2>
          <p className="text-primary-foreground/70 leading-relaxed mb-8">
            Our board and management are committed to ethical business practices, regulatory compliance, and continuous improvement in corporate governance in line with the Nigerian Code of Corporate Governance and SEC requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Transparency",
              "Accountability",
              "Sustainability",
              "Stakeholder Engagement",
            ].map((value) => (
              <span
                key={value}
                className="bg-primary-foreground/10 text-primary-foreground px-5 py-2.5 rounded-full font-semibold text-sm border border-primary-foreground/10"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 md:p-12 border border-border text-center"
          >
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5">
              <Mail className="w-7 h-7 text-secondary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
              Investor Enquiries
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              For shareholder information, dividend enquiries, or corporate governance matters, please reach out to our Investor Relations team.
            </p>
            <a
              href="mailto:info@tranex-ng.com"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-orange-dark transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Investor Relations
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default InvestorRelations;
