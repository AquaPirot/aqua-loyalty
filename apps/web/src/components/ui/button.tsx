'use client';

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "px-4 py-2 rounded",
          {
            'bg-blue-600 text-white': variant === 'default',
            'border border-gray-300': variant === 'outline'
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
