import * as React from "react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils/utils";

const dialogVariants = cva(
  "relative transform overflow-hidden rounded-lg bg-background text-left shadow-xl transition-all",
  {
    variants: {
      size: {
        xs: "sm:max-w-xs",
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        full: "sm:max-w-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type DialogProps = VariantProps<typeof dialogVariants> & {
  /**
   * ダイアログの表示状態
   */
  open: boolean;
  /**
   * ダイアログを閉じるときのコールバック
   */
  onClose: () => void;
  /**
   * 外側クリックで閉じるかどうか
   */
  disableBackdropClick?: boolean;
  /**
   * Escキーで閉じるかどうか
   */
  disableEscapeKeyDown?: boolean;
  /**
   * フルスクリーン表示
   */
  fullScreen?: boolean;
  /**
   * フルサイズ幅
   */
  fullWidth?: boolean;
  /**
   * 子要素
   */
  children: React.ReactNode;
  /**
   * 追加のクラス名
   */
  className?: string;
};

export type DialogTitleProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * 閉じるボタンを表示するか
   */
  showCloseButton?: boolean;
  /**
   * 閉じるボタンクリック時のコールバック
   */
  onClose?: () => void;
};

export type DialogContentProps = React.HTMLAttributes<HTMLDivElement>;

export type DialogContentTextProps = React.HTMLAttributes<HTMLParagraphElement>;

export type DialogActionsProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Dialogコンポーネント（shadcn/ui形式）
 */
const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      onClose,
      size,
      disableEscapeKeyDown = false,
      fullScreen = false,
      fullWidth = false,
      className,
      children,
    },
    ref
  ) => {
    return (
      <Transition appear show={open} as={React.Fragment}>
        <HeadlessDialog
          as="div"
          className="relative z-50"
          onClose={disableEscapeKeyDown ? () => {} : onClose}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <HeadlessDialog.Panel
                  ref={ref}
                  className={cn(
                    dialogVariants({ size }),
                    fullScreen && "h-screen w-screen max-w-none rounded-none",
                    fullWidth && "w-full",
                    className
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  {children}
                </HeadlessDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </HeadlessDialog>
      </Transition>
    );
  }
);
Dialog.displayName = "Dialog";

/**
 * DialogTitleコンポーネント
 */
const DialogTitle = React.forwardRef<HTMLDivElement, DialogTitleProps>(
  ({ className, children, showCloseButton = false, onClose, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between border-b border-border p-6", className)}
      {...props}
    >
      <HeadlessDialog.Title as="h3" className="text-lg font-semibold">
        {children}
      </HeadlessDialog.Title>
      {showCloseButton && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 hover:bg-accent hover:text-accent-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
);
DialogTitle.displayName = "DialogTitle";

/**
 * DialogContentコンポーネント
 */
const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6", className)} {...props} />
);
DialogContent.displayName = "DialogContent";

/**
 * DialogContentTextコンポーネント
 */
const DialogContentText = React.forwardRef<HTMLParagraphElement, DialogContentTextProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
DialogContentText.displayName = "DialogContentText";

/**
 * DialogActionsコンポーネント
 */
const DialogActions = React.forwardRef<HTMLDivElement, DialogActionsProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 border-t border-border p-6",
        className
      )}
      {...props}
    />
  )
);
DialogActions.displayName = "DialogActions";

export { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, dialogVariants };
