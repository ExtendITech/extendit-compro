import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const fullText = "> INITIALIZING SYSTEM...\n> LOADING MODULES...\n> ESTABLISHING SECURE CONNECTION...\n> ACCESS GRANTED.";

  useEffect(() => {
    // Check if we've already shown the loading screen in this session
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    // Text typing effect
    let currentIndex = 0;
    const textInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(textInterval);
      }
    }, 100);

    // Progress bar effect (slower)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("hasLoaded", "true");
          }, 1000);
          return 100;
        }
        // Random increment between 1 and 3 for a more "real" feel
        return Math.min(prev + Math.random() * 3, 100);
      });
    }, 150); // Slower update rate

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center font-mono"
        >
          <div className="max-w-md w-full p-6">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Terminal className="w-6 h-6" />
              <span className="text-sm">TERMINAL_BOOT_SEQUENCE</span>
            </div>
            <div className="h-32 bg-black/50 rounded-lg p-4 border border-primary/20 font-mono text-sm text-green-500 whitespace-pre-line mb-4">
              {text}
              <span className="animate-pulse">_</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted/20 h-2 rounded-full overflow-hidden border border-primary/20">
              <motion.div 
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2 font-mono">
              <span>LOADING_ASSETS</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
