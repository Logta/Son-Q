import * as React from "react";
import { Button, type ButtonProps } from "./Button";
import { Tooltip } from "./Tooltip";
import { cn } from "./utils/utils";

export type PopupButtonProps = ButtonProps & {
  /**
   * ポップアップに表示するテキスト
   */
  popup: string;
  /**
   * ポップアップを無効にするかどうか
   */
  popupDisable?: boolean;
  /**
   * 開始アイコン
   */
  startIcon?: React.ReactNode;
  /**
   * ツールチップの配置
   */
  placement?: "top" | "bottom" | "left" | "right";
};

/**
 * ホバー時にツールチップが表示されるボタンコンポーネント（Headless UI使用）
 */
const PopupButton = React.forwardRef<HTMLButtonElement, PopupButtonProps>(
  (
    { popup, popupDisable = false, startIcon, children, className, placement = "top", ...props },
    ref
  ) => {
    const buttonContent = (
      <Button ref={ref} className={cn(startIcon && "gap-2", className)} {...props}>
        {startIcon && <span className="shrink-0">{startIcon}</span>}
        {children}
      </Button>
    );

    if (popupDisable) {
      return buttonContent;
    }

    return (
      <Tooltip
        content={popup}
        placement={placement}
        className="w-32 text-center leading-relaxed bg-gray-900 text-white"
      >
        {buttonContent}
      </Tooltip>
    );
  }
);
PopupButton.displayName = "PopupButton";

export { PopupButton };
