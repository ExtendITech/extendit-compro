import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";

interface ThreeCanvasProps {
	className?: string;
}

export const ThreeCanvas = ({ className = "" }: ThreeCanvasProps) => {
	const canvasRef = useRef<HTMLDivElement>(null);
	const [isPaused, setIsPaused] = useState(false);
	const [useFallback, setUseFallback] = useState(false);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		nodes: THREE.Mesh[];
		lines: THREE.Line[];
		mouse: { x: number; y: number };
		tilt: { x: number; y: number };
		animationId: number | null;
	} | null>(null);

	useEffect(() => {
		if (!canvasRef.current || useFallback) return;

		// Performance check
		const isMobile =
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent,
			);
		if (isMobile) {
			setUseFallback(true);
			return;
		}

		// Setup scene
		const scene = new THREE.Scene();
		scene.fog = new THREE.FogExp2(0x0a0a0f, 0.05);

		const camera = new THREE.PerspectiveCamera(
			75,
			canvasRef.current.clientWidth / canvasRef.current.clientHeight,
			0.1,
			1000,
		);
		camera.position.z = 15;

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
			powerPreference: "high-performance",
		});
		renderer.setSize(
			canvasRef.current.clientWidth,
			canvasRef.current.clientHeight,
		);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		canvasRef.current.appendChild(renderer.domElement);

		// Create network nodes
		const nodes: THREE.Mesh[] = [];
		const nodeCount = 30;
		const nodeGeometry = new THREE.SphereGeometry(0.15, 16, 16);

		for (let i = 0; i < nodeCount; i++) {
			const nodeMaterial = new THREE.MeshBasicMaterial({
				color: i % 3 === 0 ? 0x00d9ff : i % 3 === 1 ? 0x00ff88 : 0xffb86c,
				transparent: true,
				opacity: 0.8,
			});

			const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
			node.position.set(
				(Math.random() - 0.5) * 20,
				(Math.random() - 0.5) * 20,
				(Math.random() - 0.5) * 20,
			);

			// Add glow effect
			const glowGeometry = new THREE.SphereGeometry(0.25, 16, 16);
			const glowMaterial = new THREE.MeshBasicMaterial({
				color: nodeMaterial.color,
				transparent: true,
				opacity: 0.2,
			});
			const glow = new THREE.Mesh(glowGeometry, glowMaterial);
			node.add(glow);

			scene.add(node);
			nodes.push(node);
		}

		// Create connecting lines
		const lines: THREE.Line[] = [];
		const lineMaterial = new THREE.LineBasicMaterial({
			color: 0x00d9ff,
			transparent: true,
			opacity: 0.2,
		});

		for (let i = 0; i < nodes.length; i++) {
			for (let j = i + 1; j < nodes.length; j++) {
				const distance = nodes[i].position.distanceTo(nodes[j].position);
				if (distance < 8) {
					const lineGeometry = new THREE.BufferGeometry().setFromPoints([
						nodes[i].position,
						nodes[j].position,
					]);
					const line = new THREE.Line(lineGeometry, lineMaterial);
					scene.add(line);
					lines.push(line);
				}
			}
		}

		// Mouse and tilt tracking
		const mouse = { x: 0, y: 0 };
		const tilt = { x: 0, y: 0 };

		const handleMouseMove = (event: MouseEvent) => {
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
		};

		const handleOrientation = (event: DeviceOrientationEvent) => {
			if (event.beta && event.gamma) {
				tilt.x = event.gamma / 90;
				tilt.y = event.beta / 90;
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("deviceorientation", handleOrientation);

		// Animation loop
		let animationId: number;
		const animate = () => {
			if (!isPaused) {
				animationId = requestAnimationFrame(animate);

				// Rotate scene based on mouse and tilt
				scene.rotation.y += (mouse.x * 0.1 - scene.rotation.y) * 0.05;
				scene.rotation.x +=
					(-mouse.y * 0.1 + tilt.y * 0.2 - scene.rotation.x) * 0.05;

				// Animate nodes
				nodes.forEach((node, i) => {
					node.rotation.x += 0.001;
					node.rotation.y += 0.001;

					// Subtle floating animation
					node.position.y += Math.sin(Date.now() * 0.001 + i) * 0.001;

					// Pulse glow
					const glow = node.children[0] as THREE.Mesh;
					if (glow) {
						const material = glow.material as THREE.MeshBasicMaterial;
						material.opacity = 0.1 + Math.sin(Date.now() * 0.002 + i) * 0.1;
					}
				});

				// Update line positions and opacity
				let lineIndex = 0;
				for (let i = 0; i < nodes.length; i++) {
					for (let j = i + 1; j < nodes.length; j++) {
						if (lineIndex >= lines.length) break;
						const line = lines[lineIndex];
						const distance = nodes[i].position.distanceTo(nodes[j].position);
						if (distance < 8) {
							const geometry = line.geometry as THREE.BufferGeometry;
							geometry.setFromPoints([nodes[i].position, nodes[j].position]);
							const material = line.material as THREE.LineBasicMaterial;
							material.opacity = Math.max(0, 0.3 - distance * 0.03);
						}
						lineIndex++;
					}
				}

				renderer.render(scene, camera);
			}
		};

		animate();

		sceneRef.current = {
			scene,
			camera,
			renderer,
			nodes,
			lines,
			mouse,
			tilt,
			animationId,
		};

		// Handle resize
		const handleResize = () => {
			if (!canvasRef.current || !sceneRef.current) return;
			const { camera, renderer } = sceneRef.current;
			camera.aspect =
				canvasRef.current.clientWidth / canvasRef.current.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(
				canvasRef.current.clientWidth,
				canvasRef.current.clientHeight,
			);
		};

		window.addEventListener("resize", handleResize);

		// Cleanup
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("deviceorientation", handleOrientation);
			window.removeEventListener("resize", handleResize);

			if (sceneRef.current) {
				if (sceneRef.current.animationId) {
					cancelAnimationFrame(sceneRef.current.animationId);
				}
				sceneRef.current.renderer.dispose();
				sceneRef.current.nodes.forEach((node) => {
					node.geometry.dispose();
					(node.material as THREE.Material).dispose();
				});
				sceneRef.current.lines.forEach((line) => {
					line.geometry.dispose();
					(line.material as THREE.Material).dispose();
				});
			}

			if (canvasRef.current && renderer.domElement.parentElement) {
				canvasRef.current.removeChild(renderer.domElement);
			}
		};
	}, [isPaused, useFallback]);

	if (useFallback) {
		return (
			<div className={`${className} relative flex items-center justify-center`}>
				<svg viewBox="0 0 800 600" className="w-full h-full opacity-30">
					{[...Array(20)].map((_, i) => (
						<g key={i}>
							<circle
								cx={Math.random() * 800}
								cy={Math.random() * 600}
								r="4"
								fill={
									i % 3 === 0 ? "#00d9ff" : i % 3 === 1 ? "#00ff88" : "#ffb86c"
								}
								opacity="0.6"
							/>
						</g>
					))}
					{[...Array(15)].map((_, i) => (
						<line
							key={`line-${i}`}
							x1={Math.random() * 800}
							y1={Math.random() * 600}
							x2={Math.random() * 800}
							y2={Math.random() * 600}
							stroke="#00d9ff"
							strokeWidth="1"
							opacity="0.2"
						/>
					))}
				</svg>
			</div>
		);
	}

	return (
		<div className={`${className} relative`}>
			<div ref={canvasRef} className="w-full h-full" />
			<Button
				onClick={() => setIsPaused(!isPaused)}
				variant="outline"
				size="sm"
				className="absolute bottom-4 right-4 text-xs border-primary/30 bg-background/50 backdrop-blur-sm"
			>
				{isPaused ? "▶ Resume" : "⏸ Pause"}
			</Button>
		</div>
	);
};
