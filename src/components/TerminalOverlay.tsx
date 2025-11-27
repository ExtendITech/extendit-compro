import { useEffect, useState } from "react";

const terminalLines = [
	"$ npm run dev",
	"> extend-it@1.0.0 dev",
	"> vite",
	"",
	"  VITE v5.0.0  ready in 342 ms",
	"",
	"  ➜  Local:   http://localhost:8080/",
	"  ➜  Network: use --host to expose",
	"",
	"  ➜  press h + enter to show help",
	"✓ Connected to Extend IT services",
	"✓ AI modules loaded",
	"✓ System ready",
];

interface TerminalOverlayProps {
	theme?: "dark" | "light";
}

export const TerminalOverlay = ({ theme = "dark" }: TerminalOverlayProps) => {
	const [displayedLines, setDisplayedLines] = useState<string[]>([]);
	const [currentLineIndex, setCurrentLineIndex] = useState(0);

	useEffect(() => {
		if (currentLineIndex < terminalLines.length) {
			const timer = setTimeout(() => {
				setDisplayedLines((prev) => [...prev, terminalLines[currentLineIndex]]);
				setCurrentLineIndex((prev) => prev + 1);
			}, 100);

			return () => clearTimeout(timer);
		}
	}, [currentLineIndex]);

	const containerClass = theme === "light" 
		? "font-mono text-xs bg-white/80 backdrop-blur-md border border-gray-200 rounded p-4 max-w-md shadow-xl text-gray-800"
		: "font-mono text-xs bg-terminal-bg/80 backdrop-blur-md border border-primary/20 rounded p-4 max-w-md";

	const headerBorderClass = theme === "light"
		? "border-gray-200"
		: "border-primary/10";

	return (
		<div className={containerClass}>
			<div className={`flex items-center gap-2 mb-3 pb-2 border-b ${headerBorderClass}`}>
				<div className="flex gap-1.5">
					<div className="w-3 h-3 rounded-full bg-destructive/80" />
					<div className="w-3 h-3 rounded-full bg-accent/80" />
					<div className="w-3 h-3 rounded-full bg-secondary/80" />
				</div>
				<span className="text-muted-foreground">terminal</span>
			</div>
			<div className="space-y-1">
				{displayedLines.map((line, i) => (
					<div
						key={i}
						className={`${
							line.includes("✓")
								? theme === "light" ? "text-green-600" : "text-secondary"
								: line.includes("➜")
									? theme === "light" ? "text-blue-600" : "text-primary"
									: theme === "light" ? "text-gray-600" : "text-terminal-text"
						} ${i === displayedLines.length - 1 ? "animate-pulse" : ""}`}
					>
						{line || "\u00A0"}
					</div>
				))}
				{currentLineIndex < terminalLines.length && (
					<span className={`inline-block w-2 h-4 ${theme === "light" ? "bg-gray-400" : "bg-primary"} terminal-cursor`} />
				)}
			</div>
		</div>
	);
};
