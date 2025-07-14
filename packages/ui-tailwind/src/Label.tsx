import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "./utils/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "",
        required: "after:content-['*'] after:ml-0.5 after:text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> &
  VariantProps<typeof labelVariants> & {
    /**
     * 必須フィールドかどうか
     */
    required?: boolean;
  };

/**
 * ラベルコンポーネント（shadcn/ui形式）
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, required, children, ...props }, ref) => {
    return (
      /* biome-ignore lint/a11y/noLabelWithoutControl: Label component for use with inputs via htmlFor prop */
      <label
        ref={ref}
        className={cn(labelVariants({ variant: required ? "required" : variant, className }))}
        {...props}
      >
        {children}
      </label>
    );
  }
);
Label.displayName = "Label";

/**
 * 標準ラベル - フォントサイズとマージンを持つラベル
 */
const StandardLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("text-lg font-bold m-8", className)} {...props}>
        {children}
      </div>
    );
  }
);
StandardLabel.displayName = "StandardLabel";

/**
 * フォームラベル - 中央寄せで上部パディングを持つラベル
 */
const FormLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-lg pt-12 flex items-center justify-center", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FormLabel.displayName = "FormLabel";

/**
 * 回答フォームラベル - 小さめマージンを持つラベル
 */
const AnswerFormLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("text-lg m-4", className)} {...props}>
        {children}
      </div>
    );
  }
);
AnswerFormLabel.displayName = "AnswerFormLabel";

/**
 * サブラベル - 中央寄せで固定フォントサイズを持つラベル
 */
const SubLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-base m-4 flex items-center justify-center", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SubLabel.displayName = "SubLabel";

export { Label, StandardLabel, FormLabel, AnswerFormLabel, SubLabel, labelVariants };
