# Extend IT - IDE-Themed Landing Page

A stunning dark IDE/terminal-themed landing page with interactive 3D network visualization, built with React, TypeScript, Tailwind CSS, and Three.js.

## Features

- 🎨 **Dark IDE Theme**: Terminal/code editor aesthetics with monospace typography
- 🌐 **Interactive 3D Canvas**: Procedural network visualization with mouse/device tilt response
- ✨ **Animated Elements**: Framer Motion powered smooth transitions and micro-interactions
- 🖥️ **Terminal Overlay**: Typewriter effect with live status indicators
- 📊 **Budget Estimator**: Interactive project cost calculator with live results
- 🎯 **Responsive Design**: Mobile-optimized with fallback SVG for low-performance devices
- ♿ **Accessible**: Semantic HTML, ARIA labels, keyboard navigation support
- 🚀 **Performance Optimized**: BufferGeometry, LOD ready, requestAnimationFrame throttling

## Tech Stack

- **React 18.3+** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first styling
- **Three.js** - 3D graphics
- **Framer Motion** - Animation library
- **Shadcn UI** - Component library

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Dependencies

Required packages (already installed):
- `three@latest` - 3D rendering
- `framer-motion@latest` - Animations
- All other dependencies are included in the template

## Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── ThreeCanvas.tsx  # 3D network visualization
│   ├── CodeBackground.tsx  # Matrix-style code rain
│   ├── TerminalOverlay.tsx # Animated terminal
│   └── BudgetEstimator.tsx # Project cost calculator
├── pages/
│   └── Index.tsx        # Main landing page
├── index.css           # Design system tokens
└── main.tsx
```

## Customization Guide

### 1. Content & Copy

**Hero Section** (`src/pages/Index.tsx` line ~95):
```tsx
<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
  Architects of the{' '}
  <span className="text-primary glow-primary glitch-text">Digital Future</span>
</h1>
```

**Services** (`src/pages/Index.tsx` line ~220):
Update the `services` array with your offerings.

**Partners** (`src/pages/Index.tsx` line ~253):
Replace partner logos in the `partners` array.

### 2. Design System

All colors are defined in `src/index.css`:

```css
:root {
  --background: 240 10% 4%;        /* Deep black */
  --primary: 187 100% 50%;          /* Electric blue */
  --secondary: 142 100% 50%;        /* Neon green */
  --accent: 28 100% 70%;            /* Terminal amber */
  /* ... more tokens */
}
```

**To change brand colors:**
1. Edit HSL values in `src/index.css`
2. Update corresponding entries in `tailwind.config.ts`
3. Keep HSL format: `hue saturation% lightness%`

### 3. Typography

Current font: **JetBrains Mono**

To change font:
1. Update Google Fonts link in `index.html`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet">
   ```
2. Update `tailwind.config.ts`:
   ```ts
   fontFamily: {
     mono: ['Source Code Pro', 'monospace'],
   }
   ```

### 4. Three.js Scene

**Basic Customization** (`src/components/ThreeCanvas.tsx`):

```tsx
// Line 36: Node count
const nodeCount = 30; // Increase for more nodes

// Line 41-43: Node colors
const nodeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00d9ff, // Change hex color
  transparent: true,
  opacity: 0.8
});

// Line 66-72: Connection distance
if (distance < 8) { // Adjust for more/fewer connections
```

**Replace with GLTF Model** (commented example in `ThreeCanvas.tsx`):

```tsx
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// In useEffect:
const loader = new GLTFLoader();
loader.load('/models/scene.gltf', (gltf) => {
  scene.add(gltf.scene);
  
  // Animate model
  const animate = () => {
    gltf.scene.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
});
```

### 5. Budget Estimator Logic

**Customize Pricing** (`src/components/BudgetEstimator.tsx` line ~25):

```tsx
const baseByType: Record<ProjectType, number> = {
  Website: 3,        // 3M IDR base
  'Mobile app': 6,   // 6M IDR base
  API: 4,
  AI: 8,
};

const complexityFactor: Record<Complexity, number> = {
  Basic: 1,          // 1x multiplier
  Medium: 1.8,       // 1.8x multiplier
  Complex: 2.8,      // 2.8x multiplier
};
```

**Connect to Backend:**

```tsx
const handleSubmit = async () => {
  const response = await fetch('/api/estimate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectType, complexity, integrations })
  });
  
  const data = await response.json();
  setResult(data.estimate);
};
```

### 6. Contact Form Integration

**Connect to API** (`src/pages/Index.tsx` line ~425):

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      setFormData({ name: '', email: '', message: '' });
    }
  } catch (error) {
    toast({ title: "Error", description: "Failed to send message.", variant: "destructive" });
  }
};
```

## Performance Optimization

### Current Optimizations

1. **Three.js**:
   - BufferGeometry for nodes
   - Pixel ratio capped at 2
   - Mobile fallback to SVG
   - Pause button to stop animation

2. **React**:
   - Framer Motion viewport detection
   - Lazy animation triggers
   - Optimized re-renders

3. **CSS**:
   - Hardware-accelerated transforms
   - Will-change hints for animations

### Additional Optimizations

**LOD (Level of Detail)**:

```tsx
import { LOD } from 'three';

const lod = new LOD();
lod.addLevel(highDetailMesh, 0);
lod.addLevel(mediumDetailMesh, 50);
lod.addLevel(lowDetailMesh, 100);
scene.add(lod);
```

**Texture Compression**:

```tsx
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';

const ktx2Loader = new KTX2Loader();
ktx2Loader.setTranscoderPath('/basis/');
ktx2Loader.load('texture.ktx2', (texture) => {
  material.map = texture;
});
```

**Frame Throttling**:

```tsx
let lastFrame = 0;
const targetFPS = 30;
const frameInterval = 1000 / targetFPS;

const animate = (time: number) => {
  if (time - lastFrame < frameInterval) {
    requestAnimationFrame(animate);
    return;
  }
  lastFrame = time;
  
  // ... render logic
  requestAnimationFrame(animate);
};
```

## React Three Fiber Alternative

To use react-three-fiber instead of vanilla Three.js:

1. Install dependencies:
```bash
npm install @react-three/fiber@^8.18 @react-three/drei@^9.122.0
```

2. Replace `ThreeCanvas.tsx`:

```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

export const ThreeCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 15] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {[...Array(30)].map((_, i) => (
        <Sphere key={i} position={[
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        ]}>
          <meshStandardMaterial color="#00d9ff" />
        </Sphere>
      ))}
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};
```

## SEO Optimization

All pages include:
- Semantic HTML5 elements
- Meta tags (title, description, OG)
- Proper heading hierarchy (single H1)
- Alt text placeholders (update with real content)

**Update meta tags** in `index.html`:

```html
<title>Extend IT - Your Custom Title</title>
<meta name="description" content="Your custom description here" />
<meta property="og:image" content="URL_TO_YOUR_SHARE_IMAGE" />
```

## Accessibility Checklist

- ✅ Semantic HTML elements
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus indicators on all inputs
- ✅ Color contrast ratios meet WCAG AA
- ✅ Form validation with error messages
- 🔲 Screen reader testing (recommended)
- 🔲 Keyboard-only navigation testing (recommended)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Fallbacks**:
- SVG for 3D scene on mobile/low-power devices
- CSS animations for unsupported Framer Motion
- Standard fonts if Google Fonts fail to load

## Deployment

**Build:**
```bash
npm run build
```

**Deploy to Vercel:**
```bash
npm i -g vercel
vercel
```

**Deploy to Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## License

MIT License - feel free to use for commercial projects.

## Credits

- Design: Inspired by VS Code, terminal UIs, and cyberpunk aesthetics
- 3D: Three.js procedural generation
- UI Components: Shadcn UI

---

**Support:** For questions or issues, open a GitHub issue or contact the Extend IT team.
