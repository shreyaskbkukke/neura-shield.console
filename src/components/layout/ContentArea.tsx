import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function ContentArea({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 overflow-auto bg-navy-50 min-w-0", className)}
      {...props}
    />
  );
}
