import { CodeBackground } from "@/components/CodeBackground";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden font-mono">
      <CodeBackground />
      
      <nav className="relative z-50 border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-mono">
              <Logo className="h-10" />
              <span className="text-xs text-muted-foreground hidden md:inline">
                ~/legal/terms
              </span>
            </Link>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <Link to="/"> Return Home</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 py-20 px-4 max-w-4xl mx-auto">
        <Card className="p-8 md:p-12 bg-card/50 backdrop-blur-md border-primary/20 rounded-2xl">
          <div className="max-w-none text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">Terms and Conditions</h1>
            <p className="text-muted-foreground mb-12 font-mono text-sm">Last updated: November 2025</p>

            <div className="space-y-8 font-sans">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">01.</span> Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to Extend IT. By accessing our website and using our services, you agree to be bound by these Terms and Conditions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">02.</span> Services
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We provide software development, AI integration, and design services. The specific scope of work for each project will be defined in a separate agreement or Statement of Work (SOW).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">03.</span> Intellectual Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Unless otherwise agreed in writing, all intellectual property rights in the software and designs we create for you will transfer to you upon full payment of the agreed fees. We retain the right to showcase the work in our portfolio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">04.</span> Payment Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Payment terms will be specified in your project proposal. Generally, we require a deposit to commence work, with the balance due upon completion or at specific milestones.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">05.</span> Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, Extend IT shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">06.</span> Governing Law
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of Indonesia.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">07.</span> Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms, please contact us via our website or email.
                </p>
              </section>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Terms;
