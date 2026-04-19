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

const reports = [
  { year: "2023", title: "Annual Report & Financial Statements", status: "Coming Soon" },
  { year: "2022", title: "Annual Report & Financial Statements", status: "Coming Soon" },
  { year: "2021", title: "Annual Report & Financial Statements", status: "Coming Soon" },
  { year: "2020", title: "Annual Report & Financial Statements", status: "Coming Soon" },
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

      {/* Annual Financial Statements */}
      <section className="section-padding bg-muted/40">
        <div className="container max-w-5xl">
          <div className="mb-12">
            <p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-3">Financials</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Annual Financial Statements
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Download our audited annual reports and financial statements. New filings are uploaded here as they are released to the Nigerian Stock Exchange.
            </p>
          </div>

          <div className="space-y-4">
            {reports.map((r, i) => (
              <motion.div
                key={r.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-lg p-3">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">FY {r.year}</p>
                      <h3 className="font-heading font-semibold text-foreground">{r.title}</h3>
                    </div>
                  </div>
                  <Button variant="outline" disabled className="md:self-center">
                    <Download className="w-4 h-4 mr-2" />
                    {r.status}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Documents will be made available for download as PDFs. To request a specific historical report, please contact Investor Relations below.
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
