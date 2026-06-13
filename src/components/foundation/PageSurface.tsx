import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PageSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

export function PageSurface({ className, padded = true, ...props }: PageSurfaceProps) {
  return (
    <div
      className={cn(
        "min-h-full bg-navy-50",
        padded && "p-6",
        className,
      )}
      {...props}
    />
  );
}
