"use client";

import { cn } from "./utils/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

/**
 * Listコンポーネントのバリアント定義
 */
export const listVariants = cva(
  "divide-y divide-border",
  {
    variants: {
      variant: {
        default: "",
        inset: "pl-6",
      },
      dense: {
        true: "divide-y-0",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      dense: false,
    },
  }
);

/**
 * ListItemコンポーネントのバリアント定義
 */
export const listItemVariants = cva(
  "flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        button: "cursor-pointer",
      },
      dense: {
        true: "py-1",
        false: "py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      dense: false,
    },
  }
);

/**
 * Listコンポーネントのプロパティ型
 */
export type ListProps = ComponentProps<"ul"> & 
  VariantProps<typeof listVariants>;

/**
 * ListItemコンポーネントのプロパティ型
 */
export type ListItemProps = {
  className?: string;
  variant?: "default" | "button";
  dense?: boolean;
  button?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & Omit<React.HTMLAttributes<HTMLElement>, "onClick">;

/**
 * ListItemTextコンポーネントのプロパティ型
 */
export type ListItemTextProps = ComponentProps<"div"> & {
  /** プライマリテキスト */
  primary?: React.ReactNode;
  /** セカンダリテキスト */
  secondary?: React.ReactNode;
  /** 無効状態 */
  disabled?: boolean;
};

/**
 * リスト表示用のListコンポーネント
 */
export function List({
  className,
  variant,
  dense,
  ...props
}: ListProps) {
  return (
    <ul
      className={cn(listVariants({ variant, dense }), className)}
      {...props}
    />
  );
}

/**
 * リストアイテム表示用のListItemコンポーネント
 */
export function ListItem({
  className,
  variant,
  dense,
  button = false,
  disabled = false,
  children,
  onClick,
  ...props
}: ListItemProps) {
  if (button) {
    return (
      <button
        className={cn(
          listItemVariants({ 
            variant: "button", 
            dense 
          }), 
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled}
        onClick={onClick}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
  
  return (
    <li
      className={cn(
        listItemVariants({ 
          variant, 
          dense 
        }), 
        className
      )}
      onClick={onClick}
      {...(props as React.LiHTMLAttributes<HTMLLIElement>)}
    >
      {children}
    </li>
  );
}

/**
 * リストアイテムのテキスト表示用のListItemTextコンポーネント
 */
export function ListItemText({
  primary,
  secondary,
  disabled = false,
  className,
  children,
  ...props
}: ListItemTextProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 min-w-0 flex-1",
        disabled && "opacity-50",
        className
      )}
      {...props}
    >
      {primary && (
        <span className="text-sm font-medium leading-none">
          {primary}
        </span>
      )}
      {secondary && (
        <span className="text-xs text-muted-foreground">
          {secondary}
        </span>
      )}
      {children}
    </div>
  );
}