
import React from "react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Analyzing your currency...",
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <div className="relative">
        <div className="w-16 h-16 border-4 border-muted rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-primary rounded-full spinner"></div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-lg font-medium mb-2">{message}</p>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce-limited" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce-limited" style={{ animationDelay: "300ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce-limited" style={{ animationDelay: "600ms" }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
