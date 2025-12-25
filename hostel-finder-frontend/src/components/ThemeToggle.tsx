import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  variant?: "default" | "floating" | "minimal";
  className?: string;
}

const ThemeToggle = ({ variant = "default", className = "" }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`h-10 w-10 rounded-full bg-muted animate-pulse ${className}`} />
    );
  }

  const isDark = theme === "dark";

  if (variant === "floating") {
    return (
      <Button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        size="icon"
        className={`fixed bottom-8 right-8 z-50 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-br from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover:scale-110 hover:shadow-primary/50 border-2 border-background/20 backdrop-blur-sm ${className}`}
        aria-label="Toggle theme"
      >
        <div className="relative h-6 w-6">
          <Sun
            className={`absolute inset-0 h-6 w-6 text-primary-foreground transition-all duration-500 ${
              isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <Moon
            className={`absolute inset-0 h-6 w-6 text-primary-foreground transition-all duration-500 ${
              isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </div>
      </Button>
    );
  }

  if (variant === "minimal") {
    return (
      <Button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        variant="ghost"
        size="icon"
        className={`h-9 w-9 rounded-lg hover:bg-muted transition-all duration-200 ${className}`}
        aria-label="Toggle theme"
      >
        <div className="relative h-5 w-5">
          <Sun
            className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
              isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <Moon
            className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
              isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </div>
      </Button>
    );
  }

  // Default variant
  return (
    <Button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      variant="outline"
      size="icon"
      className={`relative h-10 w-10 rounded-xl border-2 bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`}
      aria-label="Toggle theme"
    >
      <div className="relative h-5 w-5">
        <Sun
          className={`absolute inset-0 h-5 w-5 text-primary transition-all duration-500 ${
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          className={`absolute inset-0 h-5 w-5 text-primary transition-all duration-500 ${
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </Button>
  );
};

export default ThemeToggle;

