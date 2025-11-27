import { useEffect, useRef } from "react";

interface CodeBackgroundProps {
	theme?: "dark" | "light";
}

export const CodeBackground = ({ theme = "dark" }: CodeBackgroundProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const codeChars =
			"01{}</>[]();const let var function => import export class extends implements interface type";
		const fontSize = 14;
		const columns = Math.floor(canvas.width / fontSize);
		const drops: number[] = Array(columns).fill(0);

		const draw = () => {
			// Background fade
			if (theme === "light") {
				ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
			} else {
				ctx.fillStyle = "rgba(10, 10, 15, 0.05)";
			}
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.font = `${fontSize}px JetBrains Mono, monospace`;

			for (let i = 0; i < drops.length; i++) {
				const text = codeChars[Math.floor(Math.random() * codeChars.length)];
				const x = i * fontSize;
				const y = drops[i] * fontSize;

				if (theme === "light") {
					// Blue/Violet for light theme
					ctx.fillStyle = Math.random() > 0.5 ? "#2563eb" : "#7c3aed";
				} else {
					// Cyan/Green for dark theme
					ctx.fillStyle = Math.random() > 0.5 ? "#00d9ff" : "#00ff88";
				}
				
				ctx.fillText(text, x, y);

				if (y > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}

				drops[i]++;
			}
		};

		const interval = setInterval(draw, 50);

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		window.addEventListener("resize", handleResize);

		return () => {
			clearInterval(interval);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 pointer-events-none opacity-10"
			style={{ zIndex: 0 }}
		/>
	);
};
