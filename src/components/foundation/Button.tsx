import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm hover:shadow-md",
        secondary:
          "bg-navy-100 text-navy-900 hover:bg-navy-200 active:bg-navy-300 shadow-sm hover:shadow",
        ghost:
          "bg-transparent text-navy-700 hover:bg-navy-100/70 active:bg-navy-200/70",
        danger:
          "bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800 shadow-sm hover:shadow-md",
        outline:
          "border border-navy-200 bg-white text-navy-700 hover:bg-navy-50 active:bg-navy-100 shadow-sm hover:shadow",
        link:
          "bg-transparent text-brand-600 underline-offset-4 hover:underline p-0 h-auto font-medium",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-9 px-5",
        lg: "h-10 px-6",
        icon: "h-9 w-9 p-0 rounded-full",
        "icon-sm": "h-8 w-8 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
