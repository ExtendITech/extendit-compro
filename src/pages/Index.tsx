import { motion } from "framer-motion";
import { BookOpen, Calculator, Camera, Code2, Cpu, ExternalLink, Github, Mail, Palette, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPortfolio, STRAPI_URL } from "@/lib/api";
import { BudgetEstimator } from "@/components/BudgetEstimator";
import { CodeBackground } from "@/components/CodeBackground";
import { TerminalOverlay } from "@/components/TerminalOverlay";
import { ThreeCanvas } from "@/components/ThreeCanvas";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const { data: portfolioData, isLoading } = useQuery({
		queryKey: ["portfolio"],
		queryFn: fetchPortfolio,
	});

	const services = [
		{
			icon: Code2,
			title: "Tech Solution",
			description:
				"Custom software development with cutting-edge technologies. From web to mobile, we build scalable solutions.",
			tags: ["React", "Node.js", "Cloud"],
		},
		{
			icon: Cpu,
			title: "AI Solution",
			description:
				"Intelligent automation and machine learning integration. Transform your business with AI-powered insights.",
			tags: ["ML", "NLP", "Automation"],
		},
		{
			icon: Palette,
			title: "Product & Design (UI/UX)",
			description:
				"Beautiful, intuitive interfaces that users love. Research-driven design that converts.",
			tags: ["Figma", "Prototyping", "Testing"],
		},
		{
			icon: TrendingUp,
			title: "Performance Marketing",
			description:
				"Data-driven campaigns that drive real results. SEO, SEM, and growth hacking strategies.",
			tags: ["Analytics", "Growth", "ROI"],
		},
		{
			icon: Calculator,
			title: "Prompt & Budget Estimator",
			description:
				"Get instant project estimates and AI-powered prompts. Plan smarter, ship faster.",
			tags: ["Estimation", "Planning", "Insights"],
		},
	];

	const partners = [
		{
			name: "ATF",
			logo: "/clients/ATF(Advanced Technology Facility).png",
		},
		{ name: "Akar Partner", logo: "/clients/Akar Partner.png" },
		{ name: "Anima Foundry", logo: "/clients/Anima Foundry.png" },
		{ name: "Bumi Kinar", logo: "/clients/Bumi Kinar.png" },
		{ name: "Dillco Chocolate", logo: "/clients/Dillco Chocolate.jpeg" },
		{ name: "Huawei", logo: "/clients/Huawei.png" },
		{ name: "Kata Boost", logo: "/clients/Kata Boost.png" },
		{ name: "Kata Consulting", logo: "/clients/Kata Consulting.png" },
		{ name: "Mierakigai", logo: "/clients/Mierakigai.png" },
		{ name: "Nomad Fight Club", logo: "/clients/Nomad Fight Club.png" },
		{ name: "Restart Co", logo: "/clients/Restart Co.png" },
		{ name: "Vinfast", logo: "/clients/Vinfast.png" },
	];

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
		console.log("Form submitted:", formData);
		// TODO: Connect to backend API
	};

	return (
		<div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
			<CodeBackground />

			{/* Navigation */}
			<nav className="relative z-50 border-b border-border/50 bg-background/50 backdrop-blur-md">
				<div className="max-w-7xl mx-auto px-4 py-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 font-mono">
							<Logo className="h-10" />
							<span className="text-xs text-muted-foreground hidden md:inline">
								~/projects/digital-future
							</span>
						</div>
						<div className="flex items-center gap-4">
							<div className="hidden md:flex items-center gap-2 text-xs">
								<div className="flex items-center gap-1.5">
									<span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
									<span className="text-secondary">Live</span>
								</div>
								<span className="text-muted-foreground">|</span>
								<span className="text-muted-foreground">Build: #1247</span>
							</div>
							<Button
								size="sm"
								className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
							>
								{">"} Get Started
							</Button>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="relative min-h-screen flex items-center justify-center px-4 py-20">
				<div className="absolute inset-0 z-0">
					<ThreeCanvas className="w-full h-full" />
					<div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
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
							Architects of the{" "}
							<span className="text-primary glow-primary glitch-text">
								Digital Future
							</span>
						</h1>

						<p className="text-lg md:text-xl text-muted-foreground mb-8 font-mono">
							We craft experiences that redefine the future. From innovative
							software to groundbreaking hardware, we're dedicated to shaping a
							connected world where innovation knows no bounds.
						</p>

						<div className="flex flex-wrap gap-4 mb-8">
							<Button
								size="lg"
								className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
							>
								{">"} Ship MVP
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
							>
								{">"} Open Terminal
							</Button>
						</div>

						<div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-secondary" />
								<span>100+ Projects</span>
							</div>
							<span>|</span>
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-primary" />
								<span>50+ Clients</span>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="hidden lg:block"
					>
						<TerminalOverlay />
					</motion.div>
				</div>

				{/* Scan line effect */}
				<div className="absolute inset-0 pointer-events-none z-20">
					<div className="scan-line absolute w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
				</div>
			</section>

			{/* About Section */}
			<section className="relative py-20 px-4 bg-gradient-to-b from-background to-muted/20">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<span className="text-primary font-mono text-sm glow-primary">
							$ cat about.txt
						</span>
						<h2 className="text-3xl md:text-5xl font-bold mt-2 mb-6">
							We Are{" "}
							<span className="text-primary glow-primary">Extend IT</span>
						</h2>
						<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							A dynamic tech company creating innovative solutions that solve
							real-world challenges. We craft experiences that redefine the
							future, building a connected world where innovation knows no
							bounds. From groundbreaking software to revolutionary hardware,
							we're your partners in digital transformation.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Services Section */}
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
							$ ls services/
						</span>
						<h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
							Our{" "}
							<span className="text-secondary glow-secondary">Services</span>
						</h2>
						<p className="text-muted-foreground max-w-2xl">
							Full-stack solutions for the modern digital landscape.
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
								<Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:box-glow-primary group cursor-pointer">
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
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Partners Section */}
			<section className="relative py-20 px-4 bg-gradient-to-b from-transparent to-muted/20">
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

					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-16 items-center">
						{partners.map((partner, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.05 }}
								className="flex justify-center"
							>
								<img
									src={partner.logo}
									alt={partner.name}
									className="h-24 w-auto object-contain"
								/>
							</motion.div>
						))}
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
								<Card className="p-0 h-full bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:box-glow-primary group overflow-hidden">
									{/* Image/Visual area */}
									<div className={`aspect-video relative overflow-hidden ${project.image ? 'bg-background' : `bg-gradient-to-br ${project.gradient}`}`}>
										{project.image ? (
											<>
												<img
													src={project.image}
													alt={project.name}
													className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
											</>
										) : (
											<>
												<div className="absolute inset-0 flex items-center justify-center">
													<div className="w-20 h-20 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border group-hover:scale-110 transition-transform duration-300">
														<project.icon className="w-10 h-10 text-primary" />
													</div>
												</div>
												<div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
											</>
										)}
										<div className="absolute top-4 right-4">
											<span className="text-xs px-3 py-1 bg-background/80 backdrop-blur-sm border border-primary/30 rounded-full font-mono text-primary">
												{project.category}
											</span>
										</div>
									</div>									{/* Content */}
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
												<a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
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
												<a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
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
			<BudgetEstimator />

			{/* Contact Section */}
			<section className="relative py-20 px-4">
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

						<Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-primary/20 box-glow-primary">
							<form onSubmit={handleSubmit} className="space-y-6">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-mono mb-2 text-foreground"
									>
										{">"} Name
									</label>
									<Input
										id="name"
										value={formData.name}
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
										placeholder="John Doe"
										required
										className="bg-background border-border focus:border-primary"
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-sm font-mono mb-2 text-foreground"
									>
										{">"} Email
									</label>
									<Input
										id="email"
										type="email"
										value={formData.email}
										onChange={(e) =>
											setFormData({ ...formData, email: e.target.value })
										}
										placeholder="john@example.com"
										required
										className="bg-background border-border focus:border-primary"
									/>
								</div>

								<div>
									<label
										htmlFor="message"
										className="block text-sm font-mono mb-2 text-foreground"
									>
										{">"} Message
									</label>
									<Textarea
										id="message"
										value={formData.message}
										onChange={(e) =>
											setFormData({ ...formData, message: e.target.value })
										}
										placeholder="Tell us about your project..."
										rows={5}
										required
										className="bg-background border-border focus:border-primary resize-none"
									/>
								</div>

								<Button
									type="submit"
									className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
								>
									{">"} Send Message
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
								GitHub
							</a>
							<a href="#" className="hover:text-primary transition-colors">
								LinkedIn
							</a>
							<a href="#" className="hover:text-primary transition-colors">
								Twitter
							</a>
						</div>
					</div>

					<div className="mt-6 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground font-mono">
						<p>© 2025 Extend IT. All rights reserved. | Version 1.0.0</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Index;
