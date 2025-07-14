import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "./utils/utils";

const paperVariants = cva("bg-background rounded-lg border border-border shadow-sm", {
  variants: {
    variant: {
      elevation: "shadow-md",
      outlined: "border-2 shadow-none",
    },
    elevation: {
      0: "shadow-none",
      1: "shadow-sm",
      2: "shadow",
      3: "shadow-md",
      4: "shadow-lg",
      8: "shadow-xl",
      12: "shadow-2xl",
    },
  },
  defaultVariants: {
    variant: "elevation",
    elevation: 1,
  },
});

export type PaperProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof paperVariants> & {
    /**
     * HTML要素タイプ
     */
    component?: React.ElementType;
    /**
     * 正方形にする
     */
    square?: boolean;
  };

/**
 * Paper（紙）コンポーネント（shadcn/ui形式）
 * Material-UIのPaperの代替として使用
 */
const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
  ({ className, component = "div", variant, elevation, square, children, ...props }, ref) => {
    const Component = component as React.ElementType;

    return (
      <Component
        ref={ref}
        className={cn(paperVariants({ variant, elevation, className }), square && "rounded-none")}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Paper.displayName = "Paper";

export { Paper, paperVariants };
