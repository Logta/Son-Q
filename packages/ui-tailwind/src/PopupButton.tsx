import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "./Button";

type PopupButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * ボタンの内容
   */
  children: ReactNode;
  /**
   * クリック時のハンドラー
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * ポップアップに表示するテキスト
   */
  popup: string;
  /**
   * ポップアップを無効にするかどうか
   */
  popupDisable?: boolean;
  /**
   * ボタンが無効かどうか
   */
  disabled?: boolean;
  /**
   * ボタンのバリアント
   */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /**
   * ボタンのサイズ
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * 開始アイコン
   */
  startIcon?: ReactNode;
};

/**
 * ホバー時にツールチップが表示されるボタンコンポーネント（Headless UI使用）
 */
export const PopupButton = ({
  children,
  onClick,
  popup,
  popupDisable = false,
  disabled = false,
  variant = "primary",
  size = "md",
  startIcon,
  className,
  ...props
}: PopupButtonProps) => {
  return (
    <Popover className="relative inline-block">
      <PopoverButton as="div" className="inline-block">
        {({ hover }) => (
          <>
            <Button
              onClick={onClick}
              variant={variant}
              size={size}
              disabled={disabled}
              className={clsx(startIcon && "inline-flex items-center gap-2", className)}
              {...props}
            >
              {startIcon && <span className="shrink-0">{startIcon}</span>}
              {children}
            </Button>

            {/* ツールチップ */}
            {hover && !popupDisable && (
              <PopoverPanel
                static
                className={clsx(
                  // ベーススタイル
                  "absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none",
                  // サイズ調整（2行表示用）
                  "w-32 leading-relaxed text-center",
                  // 位置調整
                  "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
                  // アニメーション
                  "transition-opacity duration-200 opacity-100",
                  // ツールチップの矢印
                  'after:content-[""] after:absolute after:top-full after:left-1/2 after:transform after:-translate-x-1/2',
                  "after:border-4 after:border-transparent after:border-t-gray-900"
                )}
                role="tooltip"
                aria-label={popup}
              >
                {popup}
              </PopoverPanel>
            )}
          </>
        )}
      </PopoverButton>
    </Popover>
  );
};
