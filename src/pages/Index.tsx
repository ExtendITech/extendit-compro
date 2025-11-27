import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
	BookOpen,
	Calculator,
	Camera,
	Code2,
	Cpu,
	ExternalLink,
	Github,
	Globe,
	Instagram,
	Laptop,
	Linkedin,
	Mail,
	Palette,
	TrendingUp,
} from "lucide-react";


import Tilt from "react-parallax-tilt";
import { BudgetEstimator } from "@/components/BudgetEstimator";
import { CodeBackground } from "@/components/CodeBackground";
import { Logo } from "@/components/Logo";
import { TerminalOverlay } from "@/components/TerminalOverlay";
import { ThreeCanvas } from "@/components/ThreeCanvas";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { fetchPartners, fetchPortfolio, STRAPI_URL } from "@/lib/api";
import { Link } from "react-router-dom";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ParallaxCard } from "@/components/ParallaxCard";

const industries = {
	"Technology & Digital": [
		"Website Development",
		"Mobile App Development",
		"Software Development",
		"Digital Marketing",
		"SEO / SEM",
		"IT Services",
		"Cybersecurity",
		"Data & Analytics",
		"AI / Machine Learning",
		"Cloud Services",
	],
	"Design & Creative": [
		"Graphic Design",
		"UI/UX Design",
		"Branding & Identity",
		"Motion Graphics",
		"Video Production",
		"Photography",
	],
	"Business & Consulting": [
		"Business Consulting",
		"Finance & Accounting",
		"Legal Services",
		"HR & Recruitment",
		"Project Management",
		"Training & Education",
	],
	"Retail & Hospitality": [
		"E-Commerce",
		"Food & Beverage",
		"Travel & Hospitality",
		"Fashion & Apparel",
		"Consumer Goods",
	],
	"Industrial & Technical": [
		"Construction",
		"Architecture",
		"Engineering",
		"Manufacturing",
		"Automotive",
		"Energy & Utility",
	],
	"Health & Social": [
		"Healthcare",
		"Medical Services",
		"Non-Profit / NGO",
		"Government & Public Sector",
	],
	"Media & Communication": [
		"Advertising",
		"PR & Communications",
		"Journalism & Broadcasting",
	],
	"Real Estate": ["Property Development", "Real Estate Agency"],
	Others: ["Other"],
};

const Index = () => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 2000);
		return () => clearTimeout(timer);
	}, []);
	const [formData, setFormData] = useState({
		category: "",
		subCategory: "",
		problem: "",
	});

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

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
			description:
				"Fast, reliable static websites and simple CMS solutions. Perfect for portfolios, landing pages, and anyone who says “I just need something simple” (until they don’t).",
			tagLabel: "Tech Stack:",
			tags: ["Next.js", "React", "Headless CMS"],
		},
		{
			icon: Laptop,
			title: "Custom Web App",
			description:
				"Full-scale applications with real architecture — not the duct-taped backend your cousin’s freelancer made. Scalable, secure, and built to handle messy business logic you swear is “simple.”",
			tagLabel: "Tech Stack:",
			tags: ["Next.js", "Golang", "FastAPI", "Docker", "K8s"],
		},
		{
			icon: Cpu,
			title: "AI Solution / Automation",
			description:
				"Intelligent automation and machine learning that actually works — not the fake “AI inside” label people slap on spreadsheets. From simple bots to “holy shit this saves us 40 hours a week.”",
			tagLabel: "Tech Stack:",
			tags: ["ML", "NLP", "Automation", "Python"],
		},
		{
			icon: Palette,
			title: "Product & Design (UI/UX)",
			description:
				"Interfaces so clean your users will think you hired a Silicon Valley studio. Research-driven, delightful, and not the “designer’s cousin’s opinion” type of design.",
			tagLabel: "Tech Stack:",
			tags: ["Figma", "Prototyping", "Testing"],
		},
		{
			icon: TrendingUp,
			title: "Performance Marketing",
			description:
				"Data-driven campaigns that produce real numbers — not “reach” and “impressions” your last agency tried to sell you. SEO, SEM, growth hacking… basically the stuff that actually moves revenue.",
			tagLabel: "Tech Stack:",
			tags: ["Analytics", "Growth", "ROI"],
		},
		{
			icon: Calculator,
			title: "Prompt & Budget Estimator",
			description:
				"Instant project estimates and AI-powered prompts. Perfect for when you need a budget and a reality check — fast.",
			tagLabel: "Tech Stack:",
			tags: ["Smart Prompts", "Realistic Estimates", "Zero BS"],
		},
	];

	const partners =
		partnersData?.map((item) => ({
			name: item.name,
			logo: item.image ? `${STRAPI_URL}${item.image.url}` : "",
		})) || [];

	const firstRow = partners.slice(0, Math.ceil(partners.length / 2));
	const secondRow = partners.slice(Math.ceil(partners.length / 2));

	const portfolio =
		portfolioData?.map((item) => ({
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
		<div className="relative min-h-screen bg-background text-foreground overflow-x-hidden theme-apple scrollbar-none">
			<CodeBackground />

			{/* Entrance / Loading Overlay */}
			<motion.div
				className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
				initial={{ y: 0 }}
				animate={{ y: isLoaded ? "-100%" : "0%" }}
				transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
			>
				<div className="text-white text-4xl md:text-6xl font-bold tracking-tighter overflow-hidden">
					<motion.div initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.5, delay: 0.2 }}>
						Extend IT
					</motion.div>
				</div>
			</motion.div>

			{/* Navigation */}
			<nav className="relative z-50 border-b border-border/50 bg-background/50 backdrop-blur-md">
				   <div className="max-w-7xl mx-auto px-4 py-3">
					   <div className="flex items-center justify-between">
						   <div className="flex items-center gap-2 font-mono">
							   <Logo className="h-16 md:-ml-4" />
							   <span className="text-xs text-muted-foreground hidden md:inline">
								   ~/projects/digital-future
							   </span>
						   </div>
					   </div>
				   </div>
		   </nav>

			{/* Hero Section */}
			<section className="relative min-h-screen flex items-center justify-center px-4 py-20">
				<div className="absolute inset-0 z-0">
					<ThreeCanvas className="w-full h-full" />
					<div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background" />
				</div>

				<div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
					>
						<div className="mb-4">
							<span className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 rounded text-primary text-xs font-mono mb-4">
								{">"} System Status: Operational
							</span>
						</div>

						<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
							Engineer your{" "}
							<span className="text-primary glow-primary glitch-text">
								Future
							</span>
						</h1>

						<p className="text-lg md:text-xl text-muted-foreground mb-8 font-mono">
							We build tech that actually behaves — from smart software to
							hardware that doesn’t need emotional support. The world’s moving
							forward; we’re just here to make sure you don’t get left behind.
						</p>

						<div className="flex flex-wrap gap-4 mb-8">
							<Button
								size="lg"
								className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
								asChild
							>
								<Link to="/wizard">Initialize Now</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
								onClick={() => scrollToSection("about")}
							>
								About the Brains
							</Button>
						</div>

						<div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-secondary" />
								<span>30+ Projects</span>
							</div>
							<span>|</span>
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-primary" />
								<span>20+ Clients</span>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="hidden lg:block"
					>
						<ParallaxCard>
							<TerminalOverlay />
						</ParallaxCard>
					</motion.div>
				</div>

				{/* Scan line effect */}
				<div className="absolute inset-0 pointer-events-none z-20">
					<div className="scan-line absolute w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
				</div>
			</section>

			{/* About Section */}
			<section
				id="about"
				className="relative min-h-screen flex items-center py-20 px-4 bg-linear-to-b from-background to-muted/20"
			>
				<div className="max-w-5xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center space-y-8"
					>
						<div className="text-center mb-12">
							<span className="text-primary font-mono text-sm glow-primary">
								$ cat about.txt
							</span>
							<h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
								We Are{" "}
								<span className="text-primary glow-primary">Extend IT</span>
							</h2>
						</div>

						<div className="space-y-16 text-lg md:text-xl text-muted-foreground leading-relaxed font-mono max-w-4xl mx-auto">
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
							>
								Established in 2020 — yes, we’ve been doing this long before “AI
								expert” became everyone’s LinkedIn title.
							</motion.p>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
							>
								We’re a dynamic tech company creating{" "}
								<span className="text-foreground font-bold">
									“innovative solutions”
								</span>{" "}
								— except ours actually work. Real-world challenges? We solve
								them. Dramatically overcomplicated problems? We simplify them.
								And those “future-ready digital transformations” everyone keeps
								talking about? Yeah, we’ve been doing that while others were
								still figuring out how to unmute themselves on Zoom.
							</motion.p>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.8 }}
								className="text-primary/80 font-bold"
							>
								We’re your partners in digital transformation, whether you’re
								ready for it or still pretending your spreadsheet system is
								“fine.” Let’s build the future — or at least drag you into it.
							</motion.p>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Services Section */}
			<section id="services" className="relative py-20 px-4">
				<div className="max-w-7xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="mb-12"
					>
						<span className="text-primary font-mono text-sm glow-primary">
							$ ls services/
						</span>
						<h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
							Our{" "}
							<span className="text-secondary glow-secondary">Services</span>
						</h2>
						<p className="text-muted-foreground max-w-2xl">
							Full-stack solutions for the modern digital landscape.
							<br />
							<span className="text-sm opacity-80">
								(Yes, the real modern one — not the “we just discovered React”
								kind.)
							</span>
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{services.map((service, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<ParallaxCard className="h-full">
									<Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer flex flex-col">
										<div className="flex-1">
											<div className="mb-4">
												<div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
													<service.icon className="w-6 h-6 text-primary" />
												</div>
												<h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
													{service.title}
												</h3>
											</div>
											<p className="text-muted-foreground mb-4 text-sm">
												{service.description}
											</p>
										</div>
										<div className="mt-auto">
											{service.tagLabel && (
												<p className="text-xs font-mono text-primary mb-2 opacity-80">
													{service.tagLabel}
												</p>
											)}
											<div className="flex flex-wrap gap-2">
												{service.tags.map((tag, i) => (
													<span
														key={i}
														className="text-xs px-2 py-1 bg-muted rounded font-mono text-muted-foreground"
													>
														{tag}
													</span>
												))}
											</div>
										</div>
									</Card>
								</ParallaxCard>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Partners Section */}
			<section className="relative py-20 px-4 bg-linear-to-b from-transparent to-muted/20">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<span className="text-primary font-mono text-sm glow-primary">
							$ git log partners
						</span>
						<h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
							Trusted{" "}
							<span className="text-primary glow-primary">Partners</span>
						</h2>
					</motion.div>

					<div className="relative w-full overflow-hidden space-y-0 py-12">
						{/* Row 1: Walks to Right */}
						<div className="flex w-full overflow-hidden mask-gradient-x py-6">
							<motion.div
								className="flex gap-8 items-center whitespace-nowrap"
								animate={{ x: ["-50%", "0%"] }}
								transition={{
									repeat: Infinity,
									duration: 100,
									ease: "linear",
								}}
							>
								{[...firstRow, ...firstRow, ...firstRow, ...firstRow].map((partner, index) => (
									<div key={`row1-${index}`} className="w-[240px] flex-shrink-0">
										<Tilt
											tiltMaxAngleX={2.5}
											tiltMaxAngleY={2.5}
											perspective={1000}
											scale={1.02}
											className="h-full"
										>
											<div className="relative h-40 flex items-center justify-center p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 group cursor-pointer overflow-hidden">
												{/* Neon Circuit Effect */}
												<div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
												<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2 border-primary/50 rounded-xl box-glow-primary" />
												
												<img
													src={partner.logo}
													alt={partner.name}
													className="max-h-full max-w-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 filter relative z-10"
												/>
											</div>
										</Tilt>
									</div>
								))}
							</motion.div>
						</div>

						{/* Row 2: Walks to Left */}
						<div className="flex w-full overflow-hidden mask-gradient-x py-6">
							<motion.div
								className="flex gap-8 items-center whitespace-nowrap"
								animate={{ x: ["0%", "-50%"] }}
								transition={{
									repeat: Infinity,
									duration: 100,
									ease: "linear",
								}}
							>
								{[...secondRow, ...secondRow, ...secondRow, ...secondRow].map((partner, index) => (
									<div key={`row2-${index}`} className="w-[240px] flex-shrink-0">
										<Tilt
											tiltMaxAngleX={2.5}
											tiltMaxAngleY={2.5}
											perspective={1000}
											scale={1.02}
											className="h-full"
										>
											<div className="relative h-40 flex items-center justify-center p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 group cursor-pointer overflow-hidden">
												{/* Neon Circuit Effect */}
												<div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
												<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2 border-primary/50 rounded-xl box-glow-primary" />

												<img
													src={partner.logo}
													alt={partner.name}
													className="max-h-full max-w-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 filter relative z-10"
												/>
											</div>
											</Tilt>
										</div>
									),
								)}
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* Portfolio Section */}
			<section className="relative py-20 px-4">
				<div className="max-w-7xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="mb-12"
					>
						<span className="text-primary font-mono text-sm glow-primary">
							$ ls portfolio/
						</span>
						<h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
							Featured{" "}
							<span className="text-secondary glow-secondary">Projects</span>
						</h2>
						<p className="text-muted-foreground max-w-2xl">
							Showcase of our latest work and innovative solutions.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 gap-8">
						{portfolio.map((project, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Card className="p-0 h-full bg-card/50 backdrop-blur-xs border-border hover:border-primary/50 transition-all duration-300 hover:box-glow-primary group overflow-hidden">
									{/* Image/Visual area */}
									<div
										className={`aspect-video relative overflow-hidden ${project.image ? "bg-background" : `bg-linear-to-br ${project.gradient}`}`}
									>
										{project.image ? (
											<>
												<img
													src={project.image}
													alt={project.name}
													className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
												/>
												<div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
											</>
										) : (
											<>
												<div className="absolute inset-0 flex items-center justify-center">
													<div className="w-20 h-20 rounded-xl bg-background/80 backdrop-blur-xs flex items-center justify-center border border-border group-hover:scale-110 transition-transform duration-300">
														<project.icon className="w-10 h-10 text-primary" />
													</div>
												</div>
												<div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
											</>
										)}
										<div className="absolute top-4 right-4">
											<span className="text-xs px-3 py-1 bg-background/80 backdrop-blur-xs border border-primary/30 rounded-full font-mono text-primary">
												{project.category}
											</span>
										</div>
									</div>{" "}
									{/* Content */}
									<div className="p-6">
										<h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
											{project.name}
										</h3>
										<p className="text-muted-foreground mb-4 text-sm leading-relaxed">
											{project.description}
										</p>

										{/* Technologies */}
										<div className="flex flex-wrap gap-2 mb-6">
											{project.technologies.map((tech, i) => (
												<span
													key={i}
													className="text-xs px-2 py-1 bg-muted rounded font-mono text-muted-foreground"
												>
													{tech}
												</span>
											))}
										</div>

										{/* Action Buttons */}
										<div className="flex gap-3">
											<Button
												size="sm"
												className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
												asChild
											>
												<a
													href={project.projectUrl}
													target="_blank"
													rel="noopener noreferrer"
												>
													<ExternalLink className="w-4 h-4 mr-2" />
													View Project
												</a>
											</Button>
											<Button
												size="sm"
												variant="outline"
												className="border-primary/30 text-primary hover:bg-primary/10"
												asChild
											>
												<a
													href={project.githubUrl}
													target="_blank"
													rel="noopener noreferrer"
												>
													<Github className="w-4 h-4" />
												</a>
											</Button>
										</div>
									</div>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Budget Estimator */}
			{/* <BudgetEstimator /> */}

			{/* Contact Section */}
			<section id="contact" className="relative py-20 px-4">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<div className="mb-8 text-center">
							<span className="text-primary font-mono text-sm glow-primary">
								$ ./contact.sh
							</span>
							<h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
								Let's{" "}
								<span className="text-secondary glow-secondary">
									Build Together
								</span>
							</h2>
							<p className="text-muted-foreground">
								Ready to transform your ideas into reality? Drop us a message.
							</p>
						</div>

						<Card className="p-6 md:p-8 bg-card/50 backdrop-blur-xs border-primary/20 box-glow-primary">
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid md:grid-cols-2 gap-4">
									<div>
										<label
											htmlFor="category"
											className="block text-sm font-mono mb-2 text-foreground"
										>
											{">"} Industry Category
										</label>
										<Select
											value={formData.category}
											onValueChange={(value) =>
												setFormData({
													...formData,
													category: value,
													subCategory: "",
												})
											}
										>
											<SelectTrigger className="bg-background border-border focus:ring-primary">
												<SelectValue placeholder="Select category" />
											</SelectTrigger>
											<SelectContent>
												{Object.keys(industries).map((category) => (
													<SelectItem key={category} value={category}>
														{category}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div>
										<label
											htmlFor="subCategory"
											className="block text-sm font-mono mb-2 text-foreground"
										>
											{">"} Specific Industry
										</label>
										<Select
											value={formData.subCategory}
											onValueChange={(value) =>
												setFormData({ ...formData, subCategory: value })
											}
											disabled={!formData.category}
										>
											<SelectTrigger className="bg-background border-border focus:ring-primary">
												<SelectValue placeholder="Select specific industry" />
											</SelectTrigger>
											<SelectContent>
												{formData.category &&
													industries[
														formData.category as keyof typeof industries
													].map((sub) => (
														<SelectItem key={sub} value={sub}>
															{sub}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
									</div>
								</div>

								<div>
									<label
										htmlFor="problem"
										className="block text-sm font-mono mb-2 text-foreground"
									>
										{">"} What do you need in details?
									</label>
									<Textarea
										id="problem"
										value={formData.problem}
										onChange={(e) =>
											setFormData({ ...formData, problem: e.target.value })
										}
										placeholder="Describe your needs..."
										rows={5}
										required
										className="bg-background border-border focus:border-primary resize-none"
									/>
								</div>

								<Button
									type="submit"
									className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
								>
									Send via WhatsApp
								</Button>
							</form>
						</Card>
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<footer className="relative border-t border-border/50 bg-muted/20 py-8 px-4">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<div className="font-mono">
							<span className="text-primary glow-primary font-bold">
								{"<Extend IT />"}
							</span>
							<p className="text-xs text-muted-foreground mt-1">
								Architects of the Digital Future
							</p>
						</div>

						<div className="flex items-center gap-6 text-sm text-muted-foreground font-mono">
							<a href="#" className="hover:text-primary transition-colors">
								<Github className="w-5 h-5" />
							</a>
							<a href="#" className="hover:text-primary transition-colors">
								<Linkedin className="w-5 h-5" />
							</a>
							<a href="#" className="hover:text-primary transition-colors">
								<Instagram className="w-5 h-5" />
							</a>
						</div>
					</div>

					<div className="mt-6 pt-6 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono">
						<p>© 2025 Extend IT. All rights reserved. | Version 0.0.1</p>
						<div className="flex gap-4">
							<Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
							<Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
							<Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Index;
