import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils/utils";

const containerVariants = cva("mx-auto px-4", {
  variants: {
    minWidth: {
      xs: "min-w-xs",
      sm: "min-w-sm",
      md: "min-w-md",
      lg: "min-w-lg",
      xl: "min-w-xl",
      "2xl": "min-w-2xl",
      "3xl": "min-w-3xl",
      "4xl": "min-w-4xl",
      "5xl": "min-w-5xl",
      "6xl": "min-w-6xl",
      "7xl": "min-w-7xl",
      full: "min-w-full",
    },
    maxWidth: {
      xs: "max-w-xs",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
      full: "max-w-full",
    },
    disableGutters: {
      true: "px-0",
      false: "px-4",
    },
    fixed: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    maxWidth: "lg",
    disableGutters: false,
    fixed: false,
  },
});

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariants> & {
    /**
     * HTML要素タイプ
     */
    component?: React.ElementType;
  };

/**
 * Containerコンポーネント（shadcn/ui形式）
 * Material-UIのContainerの代替として使用
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      component = "div",
      maxWidth,
      minWidth,
      disableGutters,
      fixed,
      children,
      ...props
    },
    ref
  ) => {
    const Component = component as React.ElementType;

    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants({
            maxWidth,
            minWidth,
            disableGutters,
            fixed,
            className,
          })
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Container.displayName = "Container";

export { Container, containerVariants };
