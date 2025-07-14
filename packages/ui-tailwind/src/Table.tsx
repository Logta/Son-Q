import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils/utils";

const tableVariants = cva("w-full caption-bottom text-sm");

const tableContainerVariants = cva("relative w-full overflow-auto");

const tableHeaderVariants = cva("[&_tr]:border-b");

const tableBodyVariants = cva("[&_tr:last-child]:border-0");

const tableFooterVariants = cva("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0");

const tableRowVariants = cva(
  "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
  {
    variants: {
      size: {
        small: "h-8",
        medium: "h-12",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

const tableCellVariants = cva("align-middle", {
  variants: {
    variant: {
      head: "h-12 px-4 text-left font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      body: "px-4 py-3 [&:has([role=checkbox])]:pr-0",
    },
    size: {
      small: "px-2 py-1",
      medium: "px-4 py-3",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body",
    size: "medium",
    align: "left",
  },
});

export type TableProps = React.HTMLAttributes<HTMLTableElement> &
  VariantProps<typeof tableVariants> & {
    /**
     * サイズ
     */
    size?: "small" | "medium";
    /**
     * ストライプ表示
     */
    stickyHeader?: boolean;
  };

export type TableContainerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof tableContainerVariants>;

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement> &
  VariantProps<typeof tableHeaderVariants>;

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement> &
  VariantProps<typeof tableBodyVariants>;

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement> &
  VariantProps<typeof tableFooterVariants>;

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> &
  VariantProps<typeof tableRowVariants> & {
    /**
     * 選択状態
     */
    selected?: boolean;
    /**
     * ホバー効果
     */
    hover?: boolean;
  };

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> &
  VariantProps<typeof tableCellVariants> & {
    /**
     * ヘッダーセル
     */
    component?: "td" | "th";
    /**
     * ソート方向
     */
    sortDirection?: "asc" | "desc" | false;
  };

export type TableHeadProps = TableCellProps;

/**
 * Tableコンポーネント（shadcn/ui形式）
 */
const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, size, stickyHeader, ...props }, ref) => (
    <table
      ref={ref}
      className={cn(tableVariants(), stickyHeader && "table-fixed", className)}
      {...props}
    />
  )
);
Table.displayName = "Table";

/**
 * TableContainerコンポーネント
 */
const TableContainer = React.forwardRef<HTMLDivElement, TableContainerProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(tableContainerVariants(), className)} {...props} />
  )
);
TableContainer.displayName = "TableContainer";

/**
 * TableHeaderコンポーネント
 */
const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn(tableHeaderVariants(), className)} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

/**
 * TableBodyコンポーネント
 */
const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn(tableBodyVariants(), className)} {...props} />
  )
);
TableBody.displayName = "TableBody";

/**
 * TableFooterコンポーネント
 */
const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn(tableFooterVariants(), className)} {...props} />
  )
);
TableFooter.displayName = "TableFooter";

/**
 * TableRowコンポーネント
 */
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, size, selected, hover = true, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        tableRowVariants({ size }),
        selected && "bg-muted",
        !hover && "hover:bg-transparent",
        className
      )}
      data-state={selected ? "selected" : undefined}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

/**
 * TableCellコンポーネント
 */
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, variant, size, align, component = "td", sortDirection, ...props }, ref) => {
    const Component = component;

    return (
      <Component
        ref={ref}
        className={cn(
          tableCellVariants({ variant: component === "th" ? "head" : variant, size, align }),
          className
        )}
        {...props}
      />
    );
  }
);
TableCell.displayName = "TableCell";

/**
 * TableHeadコンポーネント（th要素）
 */
const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <TableCell ref={ref} component="th" variant="head" className={cn("", className)} {...props} />
  )
);
TableHead.displayName = "TableHead";

export {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  tableVariants,
};
