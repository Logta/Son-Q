import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils/utils";

const formControlVariants = cva("flex flex-col space-y-2", {
  variants: {
    variant: {
      standard: "",
      outlined: "",
      filled: "",
    },
    size: {
      small: "",
      medium: "",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
    margin: {
      none: "",
      dense: "space-y-1",
      normal: "space-y-2",
    },
  },
  defaultVariants: {
    variant: "outlined",
    size: "medium",
    fullWidth: false,
    margin: "normal",
  },
});

const inputLabelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        standard: "",
        outlined: "",
        filled: "",
      },
      size: {
        small: "text-xs",
        medium: "text-sm",
      },
      error: {
        true: "text-destructive",
        false: "",
      },
      focused: {
        true: "text-primary",
        false: "",
      },
    },
    defaultVariants: {
      variant: "outlined",
      size: "medium",
      error: false,
      focused: false,
    },
  }
);

const selectVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        standard: "border-0 border-b rounded-none bg-transparent",
        outlined: "",
        filled: "bg-muted border-0 rounded-t-md",
      },
      size: {
        small: "h-8 px-2 py-1 text-xs",
        medium: "h-10 px-3 py-2 text-sm",
      },
      error: {
        true: "border-destructive focus:ring-destructive",
        false: "",
      },
    },
    defaultVariants: {
      variant: "outlined",
      size: "medium",
      error: false,
    },
  }
);

export type FormControlProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof formControlVariants> & {
    /**
     * エラー状態
     */
    error?: boolean;
    /**
     * 必須フィールド
     */
    required?: boolean;
    /**
     * 無効状態
     */
    disabled?: boolean;
  };

export type InputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> &
  VariantProps<typeof inputLabelVariants> & {
    /**
     * 必須マーク表示
     */
    required?: boolean;
  };

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  VariantProps<typeof selectVariants> & {
    /**
     * エラー状態
     */
    error?: boolean;
  };

export type MenuItemProps = React.OptionHTMLAttributes<HTMLOptionElement>;

/**
 * FormControlコンポーネント（shadcn/ui形式）
 */
const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      margin,
      error = false,
      required = false,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const formControlContext = React.useMemo(
      () => ({
        variant: variant || undefined,
        size: size || undefined,
        error,
        required,
        disabled,
      }),
      [variant, size, error, required, disabled]
    );

    return (
      <FormControlContext.Provider value={formControlContext}>
        <div
          ref={ref}
          className={cn(
            formControlVariants({ variant, size, fullWidth, margin }),
            disabled && "opacity-50",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </FormControlContext.Provider>
    );
  }
);
FormControl.displayName = "FormControl";

/**
 * InputLabelコンポーネント
 */
const InputLabel = React.forwardRef<HTMLLabelElement, InputLabelProps>(
  ({ className, variant, size, error, focused, required, children, ...props }, ref) => {
    const context = useFormControlContext();
    
    return (
      <label
        ref={ref}
        className={cn(
          inputLabelVariants({
            variant: variant || context?.variant,
            size: size || context?.size,
            error: error || context?.error,
            focused,
          }),
          className
        )}
        {...props}
      >
        {children}
        {(required || context?.required) && (
          <span className="ml-1 text-destructive">*</span>
        )}
      </label>
    );
  }
);
InputLabel.displayName = "InputLabel";

/**
 * Selectコンポーネント
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, size, error, children, ...props }, ref) => {
    const context = useFormControlContext();
    
    return (
      <select
        ref={ref}
        className={cn(
          selectVariants({
            variant: variant || context?.variant,
            size: size || context?.size,
            error: error || context?.error,
          }),
          className
        )}
        disabled={context?.disabled}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

/**
 * MenuItemコンポーネント
 */
const MenuItem = React.forwardRef<HTMLOptionElement, MenuItemProps>(
  ({ className, children, ...props }, ref) => (
    <option ref={ref} className={cn("", className)} {...props}>
      {children}
    </option>
  )
);
MenuItem.displayName = "MenuItem";

// FormControl Context
type FormControlContextType = {
  variant?: "standard" | "outlined" | "filled" | undefined;
  size?: "small" | "medium" | undefined;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
};

const FormControlContext = React.createContext<FormControlContextType | undefined>(undefined);

const useFormControlContext = () => {
  return React.useContext(FormControlContext);
};

export {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  formControlVariants,
  inputLabelVariants,
  selectVariants,
  useFormControlContext,
};