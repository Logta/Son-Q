import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils/utils";

const appBarVariants = cva("w-full shadow-md relative", {
  variants: {
    position: {
      static: "relative",
      fixed: "fixed top-0 left-0 right-0 z-50",
      sticky: "sticky top-0 z-50",
      absolute: "absolute top-0 left-0 right-0",
    },
    color: {
      default: "bg-primary text-primary-foreground",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      transparent: "bg-transparent shadow-none",
    },
    elevation: {
      0: "shadow-none",
      1: "shadow-sm",
      2: "shadow",
      3: "shadow-md",
      4: "shadow-lg",
    },
  },
  defaultVariants: {
    position: "static",
    color: "primary",
    elevation: 2,
  },
});

const toolbarVariants = cva("flex items-center justify-between w-full px-4 py-2 min-h-16");

export type AppBarProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof appBarVariants> & {
    /**
     * HTML要素タイプ
     */
    component?: React.ElementType;
  };

export type ToolbarProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * 密度
   */
  variant?: "regular" | "dense";
  /**
   * ガター無効化
   */
  disableGutters?: boolean;
};

/**
 * AppBarコンポーネント（shadcn/ui形式）
 */
const AppBar = React.forwardRef<HTMLDivElement, AppBarProps>(
  ({ className, component = "header", position, color, elevation, children, ...props }, ref) => {
    const Component = component as React.ElementType;

    return (
      <Component
        ref={ref}
        className={cn(appBarVariants({ position, color, elevation }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
AppBar.displayName = "AppBar";

/**
 * Toolbarコンポーネント
 */
const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, variant = "regular", disableGutters = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        toolbarVariants(),
        variant === "dense" && "min-h-12 py-1",
        disableGutters && "px-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Toolbar.displayName = "Toolbar";

export { AppBar, Toolbar, appBarVariants, toolbarVariants };
