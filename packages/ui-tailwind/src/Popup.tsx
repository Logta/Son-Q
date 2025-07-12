import * as React from "react";
import { Tooltip, type TooltipProps } from "./Tooltip";

export type PopupProps = Omit<TooltipProps, 'content'> & {
  /**
   * ポップアップに表示するラベル
   */
  popupLabel: string;
  /**
   * ポップアップを無効にするかどうか
   */
  popupDisable?: boolean;
};

/**
 * Popupコンポーネント（既存のTooltipのエイリアス）
 * 下位互換性のために提供
 */
const Popup = React.forwardRef<HTMLDivElement, PopupProps>(
  ({ popupLabel, popupDisable = false, children, ...props }, ref) => {
    return (
      <Tooltip
        ref={ref}
        content={popupLabel}
        disabled={popupDisable}
        {...props}
      >
        {children}
      </Tooltip>
    );
  }
);
Popup.displayName = "Popup";

export { Popup };