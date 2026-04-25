import { useState, useEffect } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Small delay after reaching 100% before completing
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="flex flex-col items-center justify-center gap-12">
        {/* Logo */}
        <img
          src="/Logo Horizontal Color White.svg"
          alt="Blockchain Wire"
          className="h-10 w-auto"
        />

        {/* Progress Bar */}
        <div className="w-80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-white/60 uppercase tracking-widest">Loading</span>
            <span className="sr-only">{Math.round(progress)}% complete</span>
            <span aria-hidden="true" className="text-xs font-mono text-white/60">{Math.round(progress)}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Loading page content"
            className="h-1 bg-white/10 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-primary rounded-full transition-all duration-100 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
