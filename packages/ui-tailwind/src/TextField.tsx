import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "./utils/utils";

const textFieldVariants = cva("flex flex-col space-y-2", {
  variants: {
    variant: {
      standard: "",
      outlined: "",
      filled: "",
    },
    size: {
      small: "",
      medium: "",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    variant: "outlined",
    size: "medium",
    fullWidth: false,
  },
});

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        standard: "border-0 border-b rounded-none bg-transparent",
        outlined: "",
        filled: "bg-muted border-0 rounded-t-md",
      },
      size: {
        small: "h-8 px-2 py-1 text-xs",
        medium: "h-10 px-3 py-2 text-sm",
      },
      error: {
        true: "border-destructive focus-visible:ring-destructive",
        false: "",
      },
    },
    defaultVariants: {
      variant: "outlined",
      size: "medium",
      error: false,
    },
  }
);

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * ラベルテキスト
   */
  label?: string;
  /**
   * ヘルパーテキスト
   */
  helperText?: string;
  /**
   * エラー状態
   */
  error?: boolean;
  /**
   * バリアント
   */
  variant?: "standard" | "outlined" | "filled";
  /**
   * サイズ
   */
  size?: "small" | "medium";
  /**
   * 全幅表示
   */
  fullWidth?: boolean;
  /**
   * 複数行入力
   */
  multiline?: boolean;
  /**
   * 行数（multiline時）
   */
  rows?: number;
  /**
   * 最大行数（multiline時）
   */
  maxRows?: number;
}

/**
 * TextFieldコンポーネント（shadcn/ui形式）
 * Material-UIのTextFieldの代替として使用
 */
const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      variant = "outlined",
      size = "medium",
      fullWidth = false,
      label,
      helperText,
      error = false,
      multiline = false,
      rows,
      maxRows,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const Component = multiline ? "textarea" : "input";

    return (
      <div className={cn(textFieldVariants({ variant, size, fullWidth }), className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              error && "text-destructive"
            )}
          >
            {label}
          </label>
        )}
        <Component
          id={inputId}
          ref={ref as any}
          className={cn(inputVariants({ variant, size, error }))}
          rows={multiline ? rows : undefined}
          style={
            multiline && maxRows
              ? { maxHeight: `${maxRows * 1.5}em`, resize: "vertical" }
              : undefined
          }
          {...(props as any)}
        />
        {helperText && (
          <p className={cn("text-sm text-muted-foreground", error && "text-destructive")}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
TextField.displayName = "TextField";

export { TextField, textFieldVariants, inputVariants };
