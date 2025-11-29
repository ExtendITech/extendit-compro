import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronRight, Terminal, Cpu, Globe, Smartphone, Rocket, User, Building2, Briefcase, TrendingUp, Server, Zap, Brain, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBackground } from "@/components/CodeBackground";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";

type WizardData = {
  identity: string;
  mission: string;
  aiIntegration: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  whatsapp: string;
};

const initialData: WizardData = {
  identity: "",
  mission: "",
  aiIntegration: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  whatsapp: "",
};

export const ContactWizard = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateData = (key: keyof WizardData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      await fetch('https://script.google.com/macros/s/AKfycbxruXgcRjsnIT2LNcKdAydSvxysc7XB-SqznvEBi05-nisK1C1gX3chmF6hG-MQmGy3/exec', {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    enter: { x: 20, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden font-mono">
      <CodeBackground />

      {/* Navigation */}
      <nav className="relative z-50 border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-mono">
              <Logo className="h-10" />
              <span className="text-xs text-muted-foreground hidden md:inline">
                ~/projects/init
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

      <main className="relative z-10 py-20 px-4">
        {isSuccess ? (
          <Card className="w-full max-w-4xl mx-auto p-8 bg-black/80 border-primary/50 backdrop-blur-md min-h-[400px] flex flex-col items-center justify-center text-center box-glow-primary rounded-3xl">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto border border-primary">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary font-mono">
                {">"} TRANSMISSION_RECEIVED
              </h3>
              <p className="text-muted-foreground max-w-md">
                Your digital entity configuration has been logged. Our architects will establish a secure connection shortly.
              </p>
              <Button 
                onClick={() => { setIsSuccess(false); setStep(1); setData(initialData); }}
                variant="outline" 
                className="rounded-full border-primary text-primary hover:bg-primary/10"
              >
                {">"} Initialize New Protocol
              </Button>
            </motion.div>
          </Card>
        ) : (
          <div className="w-full max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <span className="text-primary font-mono text-sm glow-primary">
                $ ./init_project.sh
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                Initialize Your <span className="text-primary glow-primary">Digital Entity</span>
              </h2>
              <p className="text-muted-foreground">
                Configure your project parameters to begin the transformation.
              </p>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 overflow-hidden relative min-h-[500px] flex flex-col rounded-3xl">
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-muted">
                <motion.div 
                  className="h-full bg-primary box-glow-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="p-6 md:p-10 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-8 font-mono text-sm">
                  <span className="text-primary">STEP {step}/5</span>
                  <span className="text-muted-foreground">
                    {step === 1 && "IDENTITY_VERIFICATION"}
                    {step === 2 && "MISSION_OBJECTIVE"}
                    {step === 3 && "INTELLIGENCE_LAYER"}
                    {step === 4 && "SYSTEM_PARAMETERS"}
                    {step === 5 && "ESTABLISH_CONNECTION"}
                  </span>
                </div>

                <div className="flex-1 relative">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl font-bold mb-6">Who is initiating this protocol?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { id: "startup", label: "Startup Founder", icon: Rocket },
                            { id: "sme", label: "SME Owner", icon: Building2 },
                            { id: "enterprise", label: "Enterprise Manager", icon: Briefcase },
                            { id: "personal", label: "Personal Brand", icon: User },
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => { updateData("identity", item.id); nextStep(); }}
                              className={cn(
                                "p-6 rounded-2xl border border-border bg-background/50 hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center gap-4 group",
                                data.identity === item.id && "border-primary bg-primary/10 box-glow-primary"
                              )}
                            >
                              <div className={cn(
                                "w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors",
                                data.identity === item.id && "bg-primary/20 text-primary"
                              )}>
                                <item.icon className="w-5 h-5" />
                              </div>
                              <span className="font-mono font-bold group-hover:text-primary transition-colors">{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl font-bold mb-6">Select your mission parameters.</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { id: "internal", label: "Internal Tech Infrastructure", icon: Server, desc: "ERP, CRM, HRIS for internal use." },
                            { id: "growth", label: "Growth & AIO Ecosystem", icon: TrendingUp, desc: "SEO, AIO, & Digital Marketing." },
                            { id: "product", label: "Web & Mobile Experience", icon: LayoutGrid, desc: "Custom Websites & Mobile Apps." },
                            { id: "other", label: "Custom / Other", icon: Zap, desc: "Unique solutions & consultation." },
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => { updateData("mission", item.id); nextStep(); }}
                              className={cn(
                                "p-6 rounded-2xl border border-border bg-background/50 hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center gap-4 group",
                                data.mission === item.id && "border-primary bg-primary/10 box-glow-primary"
                              )}
                            >
                              <div className={cn(
                                "w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0",
                                data.mission === item.id && "bg-primary/20 text-primary"
                              )}>
                                <item.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="block font-mono font-bold group-hover:text-primary transition-colors">{item.label}</span>
                                <span className="text-xs text-muted-foreground mt-1 block">{item.desc}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl font-bold mb-2">Intelligence Layer Integration</h3>
                        <p className="text-muted-foreground mb-6">Do you want to infuse your project with AI capabilities?</p>
                        
                        <div className="space-y-4">
                          <button
                            onClick={() => { updateData("aiIntegration", "yes"); nextStep(); }}
                            className={cn(
                              "w-full p-6 rounded-2xl border border-border bg-background/50 hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center justify-between group",
                              data.aiIntegration === "yes" && "border-primary bg-primary/10 box-glow-primary"
                            )}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <Brain className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="block font-mono font-bold group-hover:text-primary transition-colors">YES, ENABLE AI INTELLIGENCE</span>
                                <span className="text-xs text-muted-foreground">Add Chatbots, Automation, or AIO.</span>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                          </button>

                          <button
                            onClick={() => { updateData("aiIntegration", "no"); nextStep(); }}
                            className={cn(
                              "w-full p-6 rounded-2xl border border-border bg-background/50 hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center justify-between group",
                              data.aiIntegration === "no" && "border-primary bg-primary/10 box-glow-primary"
                            )}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                <Terminal className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="block font-mono font-bold group-hover:text-primary transition-colors">NO, STANDARD ARCHITECTURE</span>
                                <span className="text-xs text-muted-foreground">Focus on robust, traditional code.</span>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div
                        key="step4"
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl font-bold mb-6">Define constraints.</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-mono mb-2 text-primary">
                              {">"} ESTIMATED_BUDGET (IDR)
                            </label>
                            <Input 
                              value={data.budget}
                              onChange={(e) => updateData("budget", e.target.value)}
                              placeholder="e.g. 50.000.000 (Avg. for Custom Apps)"
                              className="bg-background/50 border-primary/30 focus:border-primary font-mono rounded-2xl"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              *Market Avg: Landing Page (5-15M), Custom App (35M+), ERP (100M+)
                            </p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-mono mb-2 text-primary">
                              {">"} TIMELINE_EXPECTATION
                            </label>
                            <Input 
                              value={data.timeline}
                              onChange={(e) => updateData("timeline", e.target.value)}
                              placeholder="e.g. 2 Months"
                              className="bg-background/50 border-primary/30 focus:border-primary font-mono rounded-2xl"
                            />
                          </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                          <Button 
                            onClick={nextStep}
                            disabled={!data.budget || !data.timeline}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary rounded-full"
                          >
                            Next Step {">"}
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {step === 5 && (
                      <motion.div
                        key="step5"
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl font-bold mb-6">Establish secure connection.</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-mono mb-2 text-primary">
                              {">"} AGENT_NAME
                            </label>
                            <Input 
                              value={data.name}
                              onChange={(e) => updateData("name", e.target.value)}
                              placeholder="Your Name"
                              className="bg-background/50 border-primary/30 focus:border-primary font-mono rounded-2xl"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-mono mb-2 text-primary">
                              {">"} EMAIL_OR_BUSINESS_PROFILE
                            </label>
                            <Input 
                              value={data.email}
                              onChange={(e) => updateData("email", e.target.value)}
                              placeholder="name@company.com or LinkedIn URL"
                              className="bg-background/50 border-primary/30 focus:border-primary font-mono rounded-2xl"
                            />
                          </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                          <Button 
                            onClick={handleSubmit}
                            disabled={!data.name || !data.email || isSubmitting}
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary rounded-full"
                          >
                            {isSubmitting ? "TRANSMITTING..." : "INITIALIZE PROJECT >"}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation Buttons (Back) */}
                {step > 1 && (
                  <div className="mt-8 pt-4 border-t border-border/30 flex justify-start">
                    <Button 
                      onClick={prevStep}
                      variant="ghost"
                      className="text-sm text-muted-foreground hover:text-primary font-mono flex items-center gap-2 rounded-full hover:bg-primary/10"
                    >
                      {"<"} BACK
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};


