"use client";

import { cn } from "./utils/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import type { ComponentProps } from "react";

/**
 * Chipコンポーネントのバリアント定義
 */
export const chipVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border",
        filled: "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      },
      size: {
        sm: "h-6 px-2 text-xs",
        md: "h-7 px-2.5 text-sm",
        lg: "h-8 px-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Chipコンポーネントのプロパティ型
 */
export type ChipProps = ComponentProps<"div"> & 
  VariantProps<typeof chipVariants> & {
    /** チップのラベル */
    label?: string;
    /** 削除可能かどうか */
    onDelete?: () => void;
    /** 削除ボタンのaria-label */
    deleteLabel?: string;
  };

/**
 * ラベルやステータスを表示するChipコンポーネント
 */
export function Chip({
  className,
  variant,
  size,
  label,
  onDelete,
  deleteLabel = "削除",
  children,
  ...props
}: ChipProps) {
  return (
    <div
      className={cn(chipVariants({ variant, size }), className)}
      {...props}
    >
      {label || children}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ml-1 h-4 w-4 rounded-full hover:bg-black/10 focus:bg-black/10 focus:outline-none dark:hover:bg-white/10 dark:focus:bg-white/10"
          aria-label={deleteLabel}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}