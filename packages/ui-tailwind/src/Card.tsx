import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "./utils/utils";

const cardVariants = cva("rounded-lg border bg-card text-card-foreground shadow-sm", {
  variants: {
    variant: {
      default: "",
      outlined: "border-2 shadow-none",
      elevation: "shadow-md",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const cardHeaderVariants = cva("flex flex-col space-y-1.5 p-6");

const cardContentVariants = cva("p-6 pt-0");

const cardMediaVariants = cva("overflow-hidden");

export type CardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * ヘッダータイトル
   */
  title?: React.ReactNode;
  /**
   * サブヘッダーテキスト
   */
  subheader?: React.ReactNode;
};

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export type CardMediaProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * 背景画像URL
   */
  image?: string;
  /**
   * 高さ
   */
  height?: number;
  /**
   * HTML要素タイプ
   */
  component?: React.ElementType;
};

/**
 * Cardコンポーネント（shadcn/ui形式）
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant }), className)} {...props} />
  )
);
Card.displayName = "Card";

/**
 * CardHeaderコンポーネント
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subheader, children, ...props }, ref) => (
    <div ref={ref} className={cn(cardHeaderVariants(), className)} {...props}>
      {title && <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>}
      {subheader && <p className="text-sm text-muted-foreground">{subheader}</p>}
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

/**
 * CardContentコンポーネント
 */
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(cardContentVariants(), className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

/**
 * CardMediaコンポーネント（画像表示用）
 */
const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  ({ className, component = "div", image, height, style, ...props }, ref) => {
    const Component = component as React.ElementType;

    return (
      <Component
        ref={ref}
        className={cn(cardMediaVariants(), className)}
        style={{
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: height ? `${height}px` : undefined,
          ...style,
        }}
        {...props}
      />
    );
  }
);
CardMedia.displayName = "CardMedia";

export { Card, CardContent, CardHeader, CardMedia, cardVariants };
