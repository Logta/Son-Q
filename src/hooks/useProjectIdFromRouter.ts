import { useRouter } from "next/router";
import { useEffect } from "react";
import { extractStringFromQuery, isValidProjectId } from "../utils/typeGuards";

/**
 * Next.jsルーターからprojectIdを安全に取得するフック
 * @param paramName - URLパラメータ名（デフォルト: "project_id"）
 * @returns projectId文字列またはnull
 */
export const useProjectIdFromRouter = (paramName = "project_id") => {
  const router = useRouter();
  const rawProjectId = router.query[paramName];
  const projectId = extractStringFromQuery(rawProjectId);

  // デバッグログ
  useEffect(() => {
    console.log("[useProjectIdFromRouter] Router ready:", router.isReady);
    console.log("[useProjectIdFromRouter] Router query changed:", router.query);
    console.log("[useProjectIdFromRouter] Raw projectId:", rawProjectId);
    console.log("[useProjectIdFromRouter] Extracted projectId:", projectId);
  }, [router.isReady, router.query, rawProjectId, projectId]);

  // ルーターが準備完了していない場合はnullを返す
  if (!router.isReady) {
    console.log("[useProjectIdFromRouter] Router not ready yet");
    return null;
  }

  // 型ガードによるバリデーション
  if (!isValidProjectId(projectId)) {
    console.warn("[useProjectIdFromRouter] Invalid projectId:", projectId);
    return null;
  }

  return projectId;
};
