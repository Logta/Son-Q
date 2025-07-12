import * as React from "react";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils/utils";

const circularProgressVariants = cva("animate-spin", {
  variants: {
    size: {
      small: "h-4 w-4",
      medium: "h-6 w-6", 
      large: "h-8 w-8",
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      inherit: "text-current",
    },
  },
  defaultVariants: {
    size: "medium",
    color: "primary",
  },
});

export type CircularProgressProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof circularProgressVariants>;

/**
 * CircularProgressコンポーネント（shadcn/ui形式）
 */
const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ className, size, color, ...props }, ref) => (
    <div ref={ref} className={cn("inline-flex", className)} {...props}>
      <Loader2 className={cn(circularProgressVariants({ size, color }))} />
    </div>
  )
);
CircularProgress.displayName = "CircularProgress";

export { CircularProgress, circularProgressVariants };