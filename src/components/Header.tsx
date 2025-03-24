
import React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full py-6 px-4 sm:px-6 md:px-8", className)}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-medium tracking-tight">
            Fake Currency
            <span className="ml-1 font-bold">Detector</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
