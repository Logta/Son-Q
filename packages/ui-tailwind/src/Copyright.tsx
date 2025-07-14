import * as React from "react";
import { cn } from "./utils/utils";

export type CopyrightProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * 著作権表示の年
   */
  year?: string | number;
  /**
   * 著作権者名
   */
  owner?: string;
};

/**
 * 著作権表示コンポーネント（shadcn/ui形式）
 */
const Copyright = React.forwardRef<HTMLDivElement, CopyrightProps>(
  ({ className, year = "2021", owner = "Logta, _bazaar records", children, ...props }, ref) => {
    const displayText = children || `Copyright © ${year} ${owner}`;

    return (
      <div ref={ref} className={cn("flex items-center justify-center m-20", className)} {...props}>
        <small className="text-sm text-muted-foreground">{displayText}</small>
      </div>
    );
  }
);
Copyright.displayName = "Copyright";

export { Copyright };
