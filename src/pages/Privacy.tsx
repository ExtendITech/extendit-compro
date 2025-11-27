import { CodeBackground } from "@/components/CodeBackground";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden font-mono">
      <CodeBackground />
      
      <nav className="relative z-50 border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-mono">
              <Logo className="h-10" />
              <span className="text-xs text-muted-foreground hidden md:inline">
                ~/legal/privacy
              </span>
            </Link>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <Link to="/">{"<"} Return Home</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 py-20 px-4 max-w-4xl mx-auto">
        <Card className="p-8 md:p-12 bg-card/50 backdrop-blur-md border-primary/20 rounded-3xl">
          <div className="max-w-none text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">Privacy Policy</h1>
            <p className="text-muted-foreground mb-12 font-mono text-sm">Last updated: November 2025</p>

            <div className="space-y-8 font-sans">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">01.</span> Information We Collect
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information you provide directly to us, such as when you use our "Contact Wizard," fill out a form, or communicate with us. This may include your name, email address, phone number, and project details.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">02.</span> How We Use Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Provide, maintain, and improve our services.</li>
                  <li>Communicate with you about your project inquiries.</li>
                  <li>Send you technical notices and support messages.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">03.</span> Data Sharing
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not share your personal information with third parties except as described in this policy or with your consent. We may share information with vendors and consultants who need access to such information to carry out work on our behalf.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">04.</span> Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">05.</span> Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies to improve your experience on our website. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">06.</span> Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us.
                </p>
              </section>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Privacy;
