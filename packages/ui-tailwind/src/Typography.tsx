import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      body1: "text-base leading-relaxed",
      body2: "text-sm leading-relaxed",
      caption: "text-xs text-muted-foreground",
      overline: "text-xs uppercase tracking-wider text-muted-foreground",
      subtitle1: "text-base font-medium",
      subtitle2: "text-sm font-medium",
      button: "text-sm font-medium uppercase tracking-wide",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    color: {
      default: "",
      primary: "text-primary",
      secondary: "text-secondary",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
    },
    gutterBottom: {
      true: "mb-4",
      false: "",
    },
    noWrap: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    variant: "body1",
    align: "left",
    color: "default",
    gutterBottom: false,
    noWrap: false,
  },
});

export type TypographyProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    /**
     * HTML要素タイプ
     */
    component?: React.ElementType;
  };

/**
 * Typographyコンポーネント（shadcn/ui形式）
 * Material-UIのTypographyの代替として使用
 */
const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    { className, component, variant, align, color, gutterBottom, noWrap, children, ...props },
    ref
  ) => {
    // デフォルトのHTML要素を決定
    const getDefaultComponent = (): React.ElementType => {
      switch (variant) {
        case "h1":
          return "h1";
        case "h2":
          return "h2";
        case "h3":
          return "h3";
        case "h4":
          return "h4";
        case "h5":
          return "h5";
        case "h6":
          return "h6";
        case "p":
        case "body1":
        case "body2":
          return "p";
        case "caption":
        case "overline":
        case "subtitle1":
        case "subtitle2":
          return "span";
        case "button":
          return "span";
        default:
          return "p";
      }
    };

    const Component = component || getDefaultComponent();

    return (
      <Component
        ref={ref}
        className={cn(
          typographyVariants({
            variant,
            align,
            color,
            gutterBottom,
            noWrap,
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
Typography.displayName = "Typography";

export { Typography, typographyVariants };
