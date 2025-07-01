/**
 * 文字列型ガード関数
 * @param value - チェックする値
 * @returns valueが文字列の場合true
 */
export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

/**
 * 空でない文字列型ガード関数
 * @param value - チェックする値
 * @returns valueが空でない文字列の場合true
 */
export const isNonEmptyString = (value: unknown): value is string => {
  return isString(value) && value.trim().length > 0;
};

/**
 * 文字列配列型ガード関数
 * @param value - チェックする値
 * @returns valueが文字列または文字列配列の場合true
 */
export const isStringOrStringArray = (value: unknown): value is string | string[] => {
  return isString(value) || (Array.isArray(value) && value.every(isString));
};

/**
 * ルータークエリから文字列を安全に取得
 * @param value - ルータークエリの値
 * @returns 文字列またはnull
 */
export const extractStringFromQuery = (value: string | string[] | undefined): string | null => {
  if (isString(value)) {
    return value.trim() || null;
  }
  if (Array.isArray(value) && value.length > 0 && isString(value[0])) {
    return value[0].trim() || null;
  }
  return null;
};

/**
 * プロジェクトIDの妥当性をチェック
 * @param projectId - チェックするプロジェクトID
 * @returns 妥当なプロジェクトIDの場合true
 */
export const isValidProjectId = (projectId: unknown): projectId is string => {
  return isNonEmptyString(projectId) && projectId.length > 0;
};