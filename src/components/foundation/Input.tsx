import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-navy-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400">
              {leftIcon}
            </span>
          )}
          <input
            id={id}
            ref={ref}
            className={cn(
              "h-9 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-900",
              "placeholder:text-navy-400",
              "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-navy-50",
              error && "border-danger-400 focus:ring-danger-500",
              leftIcon && "pl-9",
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-danger-600">{error}</p>}
        {hint && !error && <p className="text-xs text-navy-500">{hint}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";
