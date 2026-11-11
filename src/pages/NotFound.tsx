import { Link } from "react-router-dom";
import { Home, Phone } from "lucide-react";
import Layout from "@/components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <section className="bg-navy-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="container section-padding relative z-10 text-center">
          <p className="text-6xl md:text-8xl font-heading font-bold text-secondary mb-4">404</p>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-8">
            Sorry, the page you are looking for does not exist or may have been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-orange-dark transition-colors"
            >
              <Home className="w-5 h-5" aria-hidden="true" />
              Back to Home
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
