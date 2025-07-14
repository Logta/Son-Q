import { Switch as HeadlessSwitch } from "@headlessui/react";
import * as React from "react";
import { cn } from "./utils/utils";

export type SwitchProps = {
  /**
   * スイッチの状態
   */
  checked?: boolean;
  /**
   * 状態変更時のコールバック
   */
  onChange?: (checked: boolean) => void;
  /**
   * 無効状態
   */
  disabled?: boolean;
  /**
   * 追加のクラス名
   */
  className?: string;
  /**
   * アクセシビリティ用のラベル
   */
  "aria-label"?: string;
};

/**
 * スイッチコンポーネント（Headless UI Switch使用）
 */
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onChange, disabled = false, className, ...props }, ref) => {
    return (
      <HeadlessSwitch
        ref={ref}
        checked={checked}
        onChange={
          onChange ||
          (() => {
            // No-op function
          })
        }
        disabled={disabled}
        className={cn(
          // ベーススタイル
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          // 状態による色変更
          checked ? "bg-primary" : "bg-input",
          // 無効状態
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            // トグルボタンのスタイル
            "inline-block h-4 w-4 transform rounded-full bg-background shadow-sm transition-transform",
            // 位置の変更
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </HeadlessSwitch>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
