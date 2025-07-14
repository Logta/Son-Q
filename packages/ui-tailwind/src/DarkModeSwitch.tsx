import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "./Switch";
import { cn } from "./utils/utils";

export type DarkModeSwitchProps = {
  /**
   * ダークモードの状態
   */
  darkMode: boolean;
  /**
   * ダークモードを有効にするコールバック
   */
  handleDarkModeOn: () => void;
  /**
   * ダークモードを無効にするコールバック
   */
  handleDarkModeOff: () => void;
  /**
   * 追加のクラス名
   */
  className?: string;
};

/**
 * ダークモードスイッチコンポーネント（shadcn/ui形式）
 */
const DarkModeSwitch = React.forwardRef<HTMLDivElement, DarkModeSwitchProps>(
  ({ darkMode, handleDarkModeOn, handleDarkModeOff, className, ...props }, ref) => {
    const handleChange = () => {
      !darkMode ? handleDarkModeOn() : handleDarkModeOff();
    };

    // darkModeがnullまたはundefinedの場合は何も表示しない
    if (darkMode == null) {
      return null;
    }

    return (
      <div ref={ref} className={cn("flex items-center gap-3", className)} {...props}>
        <div className="flex items-center">
          <Sun className="h-5 w-5 text-muted-foreground" />
        </div>

        <Switch checked={darkMode} onChange={handleChange} aria-label="ダークモード切り替え" />

        <div className="flex items-center">
          <Moon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    );
  }
);
DarkModeSwitch.displayName = "DarkModeSwitch";

export { DarkModeSwitch };
