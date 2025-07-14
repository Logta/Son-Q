import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "./utils/utils";

const appBarButtonVariants = cva(
  "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border-2 border-white text-white hover:bg-white hover:text-foreground",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

export type AppBarButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof appBarButtonVariants> & {
    /**
     * ボタンのバリアント
     */
    variant?: "primary" | "secondary" | "outline";
  };

/**
 * AppBar用のボタンコンポーネント（shadcn/ui形式）
 */
const AppBarButton = React.forwardRef<HTMLButtonElement, AppBarButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        className={cn(appBarButtonVariants({ variant, className }), "px-4 py-2")}
        ref={ref}
        {...props}
      />
    );
  }
);
AppBarButton.displayName = "AppBarButton";

export { AppBarButton };
