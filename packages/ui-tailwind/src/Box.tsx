import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "./utils/utils";

const boxVariants = cva("", {
  variants: {
    display: {
      block: "block",
      flex: "flex",
      "inline-flex": "inline-flex",
      inline: "inline",
      "inline-block": "inline-block",
      none: "hidden",
    },
    flexDirection: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    },
    alignItems: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justifyContent: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
    },
  },
  defaultVariants: {
    display: "block",
  },
});

export type BoxProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof boxVariants> & {
    /**
     * HTML要素タイプ
     */
    component?: React.ElementType;
    /**
     * マージン（Tailwind spacing scale）
     */
    m?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
    /**
     * マージントップ
     */
    mt?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
    /**
     * マージンボトム
     */
    mb?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
    /**
     * マージン左右
     */
    mx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
    /**
     * マージン上下
     */
    my?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
    /**
     * パディング（Tailwind spacing scale）
     */
    p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
    /**
     * パディングX（左右）
     */
    px?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
    /**
     * パディングY（上下）
     */
    py?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
  };

/**
 * レイアウト用Boxコンポーネント（shadcn/ui形式）
 * Material-UIのBoxの代替として使用
 */
const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      component = "div",
      display,
      flexDirection,
      alignItems,
      justifyContent,
      gap,
      m,
      mt,
      mb,
      mx,
      my,
      p,
      px,
      py,
      children,
      ...props
    },
    ref
  ) => {
    const Component = component as React.ElementType;

    // スペーシングクラスを生成
    const spacingClasses = cn(
      // マージン
      m !== undefined && `m-${m}`,
      mt !== undefined && `mt-${mt}`,
      mb !== undefined && `mb-${mb}`,
      mx !== undefined && `mx-${mx}`,
      my !== undefined && `my-${my}`,
      // パディング
      p !== undefined && `p-${p}`,
      px !== undefined && `px-${px}`,
      py !== undefined && `py-${py}`
    );

    return (
      <Component
        ref={ref}
        className={cn(
          boxVariants({
            display,
            flexDirection,
            alignItems,
            justifyContent,
            gap,
            className,
          }),
          spacingClasses
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Box.displayName = "Box";

export { Box, boxVariants };
