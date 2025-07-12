"use client";

import * as React from "react";
import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import { Circle } from "lucide-react";
import { cn } from "./utils/utils";

export type RadioGroupProps = {
  /**
   * 選択された値
   */
  value?: string;
  /**
   * 値変更時のコールバック
   */
  onValueChange?: (value: string) => void;
  /**
   * 無効状態
   */
  disabled?: boolean;
  /**
   * 子要素
   */
  children: React.ReactNode;
  /**
   * 追加のクラス名
   */
  className?: string;
  /**
   * アクセシビリティ用のラベル
   */
  "aria-label"?: string;
  /**
   * グループ名
   */
  name?: string;
};

/**
 * RadioGroupコンポーネント（Headless UI使用）
 */
const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, disabled, children, ...props }, ref) => {
    return (
      <HeadlessRadioGroup
        value={value}
        onChange={onValueChange || (() => {})}
        disabled={disabled || false}
        className={cn("grid gap-2", className)}
        {...props}
      >
        <div ref={ref}>
          {children}
        </div>
      </HeadlessRadioGroup>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export type RadioProps = {
  /**
   * Radio の値
   */
  value: string;
  /**
   * 無効状態
   */
  disabled?: boolean;
  /**
   * 追加のクラス名
   */
  className?: string;
  /**
   * 子要素
   */
  children?: React.ReactNode;
};

/**
 * Radioコンポーネント（Headless UI使用）
 */
const Radio = React.forwardRef<HTMLDivElement, RadioProps>(
  ({ className, value, disabled, children, ...props }, ref) => {
    return (
      <HeadlessRadioGroup.Option
        value={value}
        disabled={disabled || false}
        className={({ active, checked, disabled }) =>
          cn(
            "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            active && "ring-2 ring-ring ring-offset-2",
            checked && "border-primary bg-primary text-primary-foreground",
            disabled && "cursor-not-allowed opacity-50",
            className
          )
        }
        {...props}
      >
        {({ checked }) => (
          <div ref={ref} className="flex items-center justify-center h-full w-full">
            {checked && <Circle className="h-2.5 w-2.5 fill-current text-current" />}
            {children}
          </div>
        )}
      </HeadlessRadioGroup.Option>
    );
  }
);
Radio.displayName = "Radio";

/**
 * FormControlLabelコンポーネントのプロパティ型
 */
export type FormControlLabelProps = {
  /** ラベルテキスト */
  label: string;
  /** コントロール要素 */
  control: React.ReactElement;
  /** ラベルの位置 */
  labelPlacement?: "start" | "end" | "top" | "bottom";
  /** 無効状態 */
  disabled?: boolean;
  /** 値 */
  value?: string;
  /** クリックハンドラ */
  onClick?: () => void;
  /** 追加のクラス名 */
  className?: string;
};

/**
 * フォームコントロールにラベルを追加するコンポーネント
 */
export function FormControlLabel({
  label,
  control,
  labelPlacement = "end",
  disabled = false,
  value,
  onClick,
  className,
}: FormControlLabelProps) {
  const isVertical = labelPlacement === "top" || labelPlacement === "bottom";
  const isReversed = labelPlacement === "start" || labelPlacement === "top";

  const labelElement = (
    <span
      className={cn(
        "select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        disabled && "opacity-50",
        isVertical ? "text-center" : ""
      )}
    >
      {label}
    </span>
  );

  // TypeScript strict mode requires careful handling of cloneElement
  const existingClassName = 
    typeof control.props === 'object' && control.props && 'className' in control.props 
      ? (control.props.className as string) 
      : '';
  
  const controlElement = React.cloneElement(control as React.ReactElement<any>, {
    ...(value !== undefined && { value }),
    className: cn(existingClassName, "peer"),
  });

  return (
    <label
      className={cn(
        "flex items-center gap-2 cursor-pointer",
        isVertical && "flex-col",
        isReversed && !isVertical && "flex-row-reverse",
        isReversed && isVertical && "flex-col-reverse",
        disabled && "cursor-not-allowed",
        className
      )}
      onClick={onClick}
    >
      {isReversed ? (
        <>
          {labelElement}
          {controlElement}
        </>
      ) : (
        <>
          {controlElement}
          {labelElement}
        </>
      )}
    </label>
  );
}

export { RadioGroup, Radio };