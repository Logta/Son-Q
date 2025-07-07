import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type AppBarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * ボタンの内容
   */
  children: ReactNode;
  /**
   * クリック時のハンドラー
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * ボタンのバリアント
   */
  variant?: "primary" | "secondary" | "outline";
  /**
   * ボタンが無効かどうか
   */
  disabled?: boolean;
};

/**
 * AppBar用のボタンコンポーネント（Tailwind CSS使用）
 */
export const AppBarButton = ({
  children,
  onClick,
  variant = "outline",
  disabled = false,
  className,
  ...props
}: AppBarButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline: "border-2 border-white text-white hover:bg-white hover:text-gray-900 focus:ring-white",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyles, variantStyles[variant], disabled && disabledStyles, className)}
      {...props}
    >
      {children}
    </button>
  );
};
