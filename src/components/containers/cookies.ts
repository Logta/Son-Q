import { parseCookies, setCookie } from "nookies";
import { NextPageContext } from "next";

// cookie取得
export function getCookies(ctx?: NextPageContext) {
  const cookie = parseCookies(ctx);
  // .cookie名と続ければ任意のキーの値が取れる
  // const cookie = parseCookies(ctx).cookie名;
}

// cookie設定
export function setCookies(ctx?: NextPageContext, token?: string) {
  setCookie(ctx, "cookie", token, {
    // 60秒 * 60 * 24 で1日間保存
    maxAge: 24 * 60 * 60,
  });
}
