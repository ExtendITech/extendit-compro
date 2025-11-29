import { CodeBackground } from "@/components/CodeBackground";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden font-mono">
      <CodeBackground />
      
      <nav className="relative z-50 border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-mono">
              <Logo className="h-10" />
              <span className="text-xs text-muted-foreground hidden md:inline">
                ~/help/faq
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
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">
            Common queries about our protocols and operations.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border border-primary/20 rounded-2xl bg-card/50 px-4">
            <AccordionTrigger className="hover:text-primary">What services do you offer?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We provide comprehensive digital solutions including Custom Software Development, AI Integration, UI/UX Design, and Performance Marketing. Our "Company Starter" package is perfect for new businesses needing a full digital infrastructure.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-primary/20 rounded-2xl bg-card/50 px-4">
            <AccordionTrigger className="hover:text-primary">How does the "Contact Wizard" work?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              The Contact Wizard is our gamified project estimation tool. It guides you through a series of questions about your identity, mission, and constraints to help us understand your needs before we even hop on a call.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-primary/20 rounded-2xl bg-card/50 px-4">
            <AccordionTrigger className="hover:text-primary">What is "AI Optimization" (AIO)?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              AIO is our specialized service to ensure your digital presence is optimized not just for traditional search engines like Google, but also for AI agents like ChatGPT, Gemini, and Perplexity. We structure your data so AI can understand and recommend you.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-primary/20 rounded-2xl bg-card/50 px-4">
            <AccordionTrigger className="hover:text-primary">Do you work with international clients?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes, while we are based in Indonesia and have a strong focus on the local market, we work with clients globally. Our team is fluent in English and accustomed to remote collaboration.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border border-primary/20 rounded-2xl bg-card/50 px-4">
            <AccordionTrigger className="hover:text-primary">What is the typical timeline for a project?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Timelines vary by complexity. A "Static Website" (Package A) can be delivered in 3-5 days. A "Website + Admin" (Package B) takes 7-9 days. Custom solutions (Package C) depend on the scope and are discussed during the consultation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
};

export default FAQ;
