import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const Progress = forwardRef(({ 
  className, 
  value = 0, 
  max = 100,
  showValue = false,
  variant = "default",
  ...props 
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const variants = {
    default: "bg-gradient-primary",
    accent: "bg-gradient-accent",
    success: "bg-gradient-to-r from-success to-emerald-500",
  };

  return (
    <div className={cn("w-full", className)} ref={ref} {...props}>
      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full transition-all duration-300", variants[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      {showValue && (
        <div className="text-sm text-slate-600 mt-2 text-center">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
});

Progress.displayName = "Progress";

export default Progress;