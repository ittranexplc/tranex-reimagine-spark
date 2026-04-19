import { motion } from "framer-motion";
import { FileText, Download, TrendingUp, Building2, Users, Calendar, Mail } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const highlights = [
  { icon: Building2, label: "Listed On", value: "Nigerian Stock Exchange (1st Tier)" },
  { icon: Calendar, label: "Listed Since", value: "1993" },
  { icon: TrendingUp, label: "Share Capital", value: "₦250,000,000" },
  { icon: Users, label: "Shareholders", value: "3,600+" },
];

type Doc = { title: string; href: string; tag?: string };

const documentGroups: { category: string; description: string; docs: Doc[] }[] = [
  {
    category: "Financial Reports",
    description: "Quarterly and annual unaudited / audited financial statements.",
    docs: [
      {
        title: "Q1 2023 Unaudited Report & Accounts",
        href: "https://www.tranex-ng.com/docs/QUARTER%201%202023%20UNAUDITED%20REPORTS.pdf",
        tag: "Q1 2023",
      },
      {
        title: "Inability to Meet the Deadline for Filing of Q2 2025 UFS",
        href: "https://www.tranex-ng.com/docs/INABILITY%20TO%20MEET%20THE%20DEADLINE%20FOR%20FILING%20OF%20Q2%202025%20UFS-signed.pdf",
        tag: "Notice",
      },
    ],
  },
  {
    category: "Shareholder Information",
    description: "Information for current and prospective shareholders of Tranex Plc.",
    docs: [
      {
        title: "Tranex Unclaimed Dividend 2024",
        href: "https://www.tranex-ng.com/docs/TRANEX%20Unclaimed%20Dividend%202024.pdf",
        tag: "Dividend",
      },
    ],
  },
  {
    category: "Corporate Governance & Policies",
    description: "Policies and reports underpinning our governance framework.",
    docs: [
      {
        title: "Corporate Governance — SEC Public Companies Return",
        href: "https://www.tranex-ng.com/docs/SECPublic-Companies-Return-on-Corporate-Governance.pdf",
        tag: "SEC",
      },
      {
        title: "NCCG 2020 Reporting Template — Tranex Plc",
        href: "https://www.tranex-ng.com/docs/NCCG%202020%20REPORTING%20TEMPLATE-TRANEX%20%20%20PLC.pdf",
        tag: "NCCG",
      },
      {
        title: "Complaint Management Policy",
        href: "https://www.tranex-ng.com/docs/COMPLAINT%20MANAGEMENT%20POLICY.pdf",
        tag: "Policy",
      },
      {
        title: "Securities Trading Policy",
        href: "https://www.tranex-ng.com/docs/SECURITY%20TRADING%20POLICY.pdf",
        tag: "Policy",
      },
    ],
  },
];

const InvestorRelations = () => {
  return (
    <Layout>
      <PageHeader
        title="Investor Relations"
        subtitle="Trans-Nationwide Express Plc — listed on the Nigerian Stock Exchange since 1993. Transparency, governance and value for our shareholders."
      />

      {/* Highlights */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="p-6 h-full border-border/60 hover:border-secondary/50 transition-colors">
                  <h.icon className="w-8 h-8 text-secondary mb-3" />
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{h.label}</p>
                  <p className="font-heading font-semibold text-foreground">{h.value}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents & Filings */}
      <section className="section-padding bg-muted/40">
        <div className="container max-w-5xl">
          <div className="mb-12">
            <p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-3">Documents & Filings</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Reports, Policies & Disclosures
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Download our latest financial reports, shareholder notices and corporate governance documents. New filings are added here as they are released.
            </p>
          </div>

          <div className="space-y-12">
            {documentGroups.map((group) => (
              <div key={group.category}>
                <div className="mb-5">
                  <h3 className="text-xl font-heading font-bold text-foreground">{group.category}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                </div>

                <div className="space-y-3">
                  {group.docs.map((doc, i) => (
                    <motion.div
                      key={doc.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md hover:border-secondary/40 transition-all">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 text-primary rounded-lg p-3 shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            {doc.tag && (
                              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                {doc.tag} · PDF
                              </p>
                            )}
                            <h4 className="font-heading font-semibold text-foreground leading-snug">
                              {doc.title}
                            </h4>
                          </div>
                        </div>
                        <Button asChild variant="outline" className="md:self-center shrink-0">
                          <a href={doc.href} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            To request a specific historical report or further information, please contact Investor Relations below.
          </p>
        </div>
      </section>

      {/* Corporate Governance */}
      <section className="section-padding bg-background">
        <div className="container max-w-5xl grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-3">Governance</p>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Corporate Governance</h2>
            <p className="text-muted-foreground leading-relaxed">
              Tranex is committed to the highest standards of corporate governance, transparency and accountability. As a publicly quoted company, we comply with the rules of the Nigerian Exchange and the Securities & Exchange Commission.
            </p>
          </div>
          <div>
            <p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-3">Our Commitment</p>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Value for Shareholders</h2>
            <p className="text-muted-foreground leading-relaxed">
              We continuously demonstrate total commitment to quality service — leveraging speed, flexibility, reliability and value for money — to deliver sustainable returns for our shareholders.
            </p>
          </div>
        </div>
      </section>

      {/* Contact IR */}
      <section className="section-padding bg-navy-gradient text-primary-foreground">
        <div className="container max-w-3xl text-center">
          <Mail className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Investor Relations Contact</h2>
          <p className="text-primary-foreground/80 mb-8">
            For shareholder enquiries, dividend information or to request historical filings, please reach out to our Investor Relations team.
          </p>
          <a
            href="mailto:info@tranex-ng.com?subject=Investor%20Relations%20Enquiry"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-orange-dark transition-colors"
          >
            <Mail className="w-4 h-4" />
            info@tranex-ng.com
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default InvestorRelations;
