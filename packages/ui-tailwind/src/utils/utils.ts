import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn/ui標準のクラス名結合ユーティリティ
 * clsxでクラス名を結合し、tailwind-mergeで重複を解決
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
