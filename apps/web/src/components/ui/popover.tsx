"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

// A simplified Popover bypassing Radix UI dependency for rapid frontend design mockup
export const Popover = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div 
      className="relative" 
      onMouseEnter={() => setOpen(true)} 
      onMouseLeave={() => setOpen(false)}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { open, setOpen } as any);
        }
        return child;
      })}
    </div>
  );
}

export const PopoverTrigger = React.forwardRef<HTMLDivElement, any>(
  ({ children, asChild, open, setOpen, ...props }, ref) => {
    return <div ref={ref} className="cursor-pointer" {...props}>{children}</div>;
  }
);
PopoverTrigger.displayName = "PopoverTrigger"

export const PopoverContent = React.forwardRef<HTMLDivElement, any>(
  ({ children, className, align = "center", open, setOpen, ...props }, ref) => {
    if (!open) return null;
    
    return (
      <div 
        ref={ref} 
        className={cn(
          "absolute top-full right-0 z-50 mt-2 bg-background data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
PopoverContent.displayName = "PopoverContent"
