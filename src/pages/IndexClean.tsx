import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Code2, Cpu, Globe, Laptop, Layout, MessageSquare, Palette, Rocket, Terminal, Zap, TrendingUp, Calculator, ExternalLink, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { useQuery } from "@tanstack/react-query";
import { fetchPortfolio, fetchPartners, STRAPI_URL } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const industries = {
  "Technology & Digital": ["Website Development", "Mobile App Development", "Software Development", "Digital Marketing", "SEO / SEM", "IT Services", "Cybersecurity", "Data & Analytics", "AI / Machine Learning", "Cloud Services"],
  "Design & Creative": ["Graphic Design", "UI/UX Design", "Branding & Identity", "Motion Graphics", "Video Production", "Photography"],
  "Business & Consulting": ["Business Consulting", "Finance & Accounting", "Legal Services", "HR & Recruitment", "Project Management", "Training & Education"],
  "Retail & Hospitality": ["E-Commerce", "Food & Beverage", "Travel & Hospitality", "Fashion & Apparel", "Consumer Goods"],
  "Industrial & Technical": ["Construction", "Architecture", "Engineering", "Manufacturing", "Automotive", "Energy & Utility"],
  "Health & Social": ["Healthcare", "Medical Services", "Non-Profit / NGO", "Government & Public Sector"],
  "Media & Communication": ["Advertising", "PR & Communications", "Journalism & Broadcasting"],
  "Real Estate": ["Property Development", "Real Estate Agency"],
  "Others": ["Other"]
};

const IndexClean = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    problem: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const { data: portfolioData } = useQuery({
    queryKey: ["portfolio"],
    queryFn: fetchPortfolio,
  });

  const { data: partnersData } = useQuery({
    queryKey: ["partners"],
    queryFn: fetchPartners,
  });

  const services = [
    {
      icon: Globe,
      title: "Simple Web App",
      description: "Fast, reliable static websites and simple CMS solutions. Perfect for portfolios, landing pages, and anyone who says “I just need something simple” (until they don’t).",
      tagLabel: "Tech Stack:",
      tags: ["Next.js", "React", "Headless CMS"],
    },
    {
      icon: Laptop,
      title: "Custom Web App",
      description: "Full-scale applications with real architecture — not the duct-taped backend your cousin’s freelancer made. Scalable, secure, and built to handle messy business logic you swear is “simple.”",
      tagLabel: "Tech Stack:",
      tags: ["Next.js", "Golang", "FastAPI", "Docker", "K8s"],
    },
    {
      icon: Cpu,
      title: "AI Solution / Automation",
      description: "Intelligent automation and machine learning that actually works — not the fake “AI inside” label people slap on spreadsheets. From simple bots to “holy shit this saves us 40 hours a week.”",
      tagLabel: "Tech Stack:",
      tags: ["ML", "NLP", "Automation", "Python"],
    },
    {
      icon: Palette,
      title: "Product & Design (UI/UX)",
      description: "Interfaces so clean your users will think you hired a Silicon Valley studio. Research-driven, delightful, and not the “designer’s cousin’s opinion” type of design.",
      tagLabel: "Tech Stack:",
      tags: ["Figma", "Prototyping", "Testing"],
    },
    {
      icon: TrendingUp,
      title: "Performance Marketing",
      description: "Data-driven campaigns that produce real numbers — not “reach” and “impressions” your last agency tried to sell you. SEO, SEM, growth hacking… basically the stuff that actually moves revenue.",
      tagLabel: "Tech Stack:",
      tags: ["Analytics", "Growth", "ROI"],
    },
    {
      icon: Calculator,
      title: "Prompt & Budget Estimator",
      description: "Instant project estimates and AI-powered prompts. Perfect for when you need a budget and a reality check — fast.",
      tagLabel: "Tech Stack:",
      tags: ["Smart Prompts", "Realistic Estimates", "Zero BS"],
    },
  ];

  const partners = partnersData?.map((item) => ({
    name: item.name,
    logo: item.image ? `${STRAPI_URL}${item.image.url}` : "",
  })) || [];

  const portfolio = portfolioData?.map((item) => ({
    icon: Code2,
    name: item.title,
    description: item.description,
    technologies: Array.isArray(item.techStack) ? item.techStack : [],
    category: item.category,
    projectUrl: item.projectLink,
    githubUrl: item.githubLink,
    image: item.image ? `${STRAPI_URL}${item.image.url}` : null,
    gradient: item.fallbackGradient || "from-blue-500/20 to-cyan-500/20",
  })) || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Extend IT, I work in *${formData.category} - ${formData.subCategory}* and I have this problem: *${formData.problem}*`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6287887755399?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background text-foreground theme-clean font-sans selection:bg-primary/10 selection:text-primary">
      {/* Entrance / Loading Overlay */}
      <motion.div
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        initial={{ y: 0 }}
        animate={{ y: isLoaded ? "-100%" : "0%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="text-white text-4xl md:text-6xl font-bold tracking-tighter overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Extend IT
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            Extend IT
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#partners" className="hover:text-foreground transition-colors">Partners</a>
            <a href="#work" className="hover:text-foreground transition-colors">Work</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <Button asChild className="rounded-full px-6">
            <Link to="/wizard">Start Project</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for new projects
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              We build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                digital excellence.
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Transforming complex problems into elegant, scalable digital solutions. We are the engineering partner you've been looking for.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full h-12 px-8 text-base" asChild>
                <Link to="/wizard">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base" asChild>
                <a href="#work">View Portfolio</a>
              </Button>
            </div>

            <div className="pt-8 flex items-center gap-8 text-muted-foreground">
              <div className="flex -space-x-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                    U{i}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold text-foreground">50+</span> Happy Clients
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity, scale }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-gradient-to-br from-blue-50 to-violet-50 rounded-3xl p-8 shadow-2xl border border-white/50 backdrop-blur-xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <div className="h-2 w-20 bg-gray-100 rounded mb-2" />
                    <div className="h-2 w-12 bg-gray-100 rounded" />
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-4">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div className="h-2 w-24 bg-gray-100 rounded mb-2" />
                    <div className="h-2 w-16 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                      <Layout className="w-5 h-5" />
                    </div>
                    <div className="h-2 w-20 bg-gray-100 rounded mb-2" />
                    <div className="h-2 w-12 bg-gray-100 rounded" />
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="h-2 w-24 bg-gray-100 rounded mb-2" />
                    <div className="h-2 w-16 bg-gray-100 rounded" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative blobs */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Expertise</h2>
            <p className="text-muted-foreground text-lg">
              We don't just write code. We build digital products that drive real business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full p-6 border-none shadow-lg transition-all duration-300 bg-background group hover:shadow-xl">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {service.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-12 text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">Trusted by Industry Leaders</h2>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16">
            {partners.map((partner, index) => (
              <div key={index} className="mx-4 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100">
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="text-xl font-bold">{partner.name}</span>
                )}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {partners.map((partner, index) => (
              <div key={`dup-${index}`} className="mx-4 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100">
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="text-xl font-bold">{partner.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Work</h2>
              <p className="text-muted-foreground text-lg">
                A showcase of our best projects, from enterprise platforms to cutting-edge AI solutions.
              </p>
            </div>
            <Button variant="outline" className="rounded-full" asChild>
              <Link to="/portfolio">View All Projects</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-background">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    {project.image ? (
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`} />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-xs font-medium text-primary mb-2 block">{project.category}</span>
                        <h3 className="text-xl font-bold">{project.name}</h3>
                      </div>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {project.projectUrl && (
                          <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6 line-clamp-3 text-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.slice(0, 3).map((tech: string) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Talk Business</h2>
            <p className="text-muted-foreground text-lg">
              Tell us about your project and we'll help you build it.
            </p>
          </div>

          <Card className="p-8 shadow-2xl border-none bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select onValueChange={(val) => setFormData({ ...formData, category: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(industries).map((key) => (
                        <SelectItem key={key} value={key}>{key}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Service Type</Label>
                  <Select onValueChange={(val) => setFormData({ ...formData, subCategory: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Service" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.category && industries[formData.category as keyof typeof industries]?.map((sub) => (
                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                      ))}
                      {!formData.category && <SelectItem value="select-first" disabled>Select Industry First</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Project Details</Label>
                <Textarea 
                  placeholder="Describe your problem or project requirements..." 
                  className="min-h-[150px]"
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                />
              </div>
              <Button type="submit" size="lg" className="w-full rounded-full h-12 text-base">
                Send Message via WhatsApp
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            Extend IT
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 Extend IT. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexClean;
