import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text", 
  error = false,
  ...props 
}, ref) => {
  const baseClasses = "w-full px-4 py-3 border rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200";
  const errorClasses = error ? "border-red-300 focus:border-red-400 focus:ring-red-200" : "border-slate-300";

  return (
    <input
      type={type}
      className={cn(baseClasses, errorClasses, className)}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;