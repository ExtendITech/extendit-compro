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

export const TerminalOverlay = () => {
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

	return (
		<div className="font-mono text-xs bg-terminal-bg/80 backdrop-blur-md border border-primary/20 rounded p-4 max-w-md">
			<div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary/10">
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
								? "text-secondary"
								: line.includes("➜")
									? "text-primary"
									: "text-terminal-text"
						} ${i === displayedLines.length - 1 ? "animate-pulse" : ""}`}
					>
						{line || "\u00A0"}
					</div>
				))}
				{currentLineIndex < terminalLines.length && (
					<span className="inline-block w-2 h-4 bg-primary terminal-cursor" />
				)}
			</div>
		</div>
	);
};
