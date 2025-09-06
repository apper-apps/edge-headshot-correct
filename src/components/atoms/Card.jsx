import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  children, 
  hover = false,
  gradient = false,
  glass = false,
  ...props 
}, ref) => {
  const baseClasses = "rounded-xl transition-all duration-200";
  const hoverClasses = hover ? "hover:shadow-strong hover:scale-[1.02]" : "";
  
  const backgroundClasses = glass 
    ? "bg-white/20 backdrop-blur-md border border-white/30"
    : gradient
    ? "bg-gradient-surface"
    : "bg-white shadow-soft";

  return (
    <div
      ref={ref}
      className={cn(baseClasses, backgroundClasses, hoverClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;