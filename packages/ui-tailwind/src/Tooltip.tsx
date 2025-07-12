import * as React from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { cn } from "./utils/utils";

export type TooltipProps = {
  /**
   * ツールチップのトリガーとなる要素
   */
  children: React.ReactNode;
  /**
   * ツールチップに表示する内容
   */
  content: string;
  /**
   * ツールチップを無効にするかどうか
   */
  disabled?: boolean;
  /**
   * ツールチップの配置
   */
  placement?: "top" | "bottom" | "left" | "right";
  /**
   * 追加のクラス名
   */
  className?: string;
};

/**
 * Headless UIのPopoverを使用したツールチップコンポーネント
 */
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, content, disabled = false, placement = "top", className }, ref) => {
    if (disabled) {
      return <>{children}</>;
    }

    const getPlacementClasses = () => {
      switch (placement) {
        case "top":
          return {
            panel: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
            arrow:
              'after:content-[""] after:absolute after:top-full after:left-1/2 after:transform after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-900',
          };
        case "bottom":
          return {
            panel: "top-full left-1/2 transform -translate-x-1/2 mt-2",
            arrow:
              'before:content-[""] before:absolute before:bottom-full before:left-1/2 before:transform before:-translate-x-1/2 before:border-4 before:border-transparent before:border-b-gray-900',
          };
        case "left":
          return {
            panel: "right-full top-1/2 transform -translate-y-1/2 mr-2",
            arrow:
              'after:content-[""] after:absolute after:left-full after:top-1/2 after:transform after:-translate-y-1/2 after:border-4 after:border-transparent after:border-l-gray-900',
          };
        case "right":
          return {
            panel: "left-full top-1/2 transform -translate-y-1/2 ml-2",
            arrow:
              'before:content-[""] before:absolute before:right-full before:top-1/2 before:transform before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-gray-900',
          };
      }
    };

    const placementClasses = getPlacementClasses();

    return (
      <Popover className="relative inline-block" ref={ref}>
        <PopoverButton as="div" className="inline-block cursor-pointer">
          {({ hover }) => (
            <>
              {children}
              {hover && (
                <PopoverPanel
                  static
                  className={cn(
                    // ベーススタイル
                    "absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none",
                    // サイズとテキスト調整
                    "w-32 leading-relaxed text-center",
                    // 配置
                    placementClasses.panel,
                    // アニメーション
                    "transition-opacity duration-200 opacity-100",
                    // 矢印
                    placementClasses.arrow,
                    className
                  )}
                  role="tooltip"
                  aria-label={content}
                >
                  {content}
                </PopoverPanel>
              )}
            </>
          )}
        </PopoverButton>
      </Popover>
    );
  }
);
Tooltip.displayName = "Tooltip";

// 下位互換性のために、以前のAPIも提供
const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

const TooltipTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ children, asChild, ...props }, ref) => {
  if (asChild) {
    return <>{children}</>;
  }
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
});
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-50 overflow-hidden rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent };
