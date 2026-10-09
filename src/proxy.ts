import { NextResponse, type NextRequest } from "next/server";
import { copy } from "@/lib/copy";
import { NAME_DISPLAY } from "@/lib/site";

/**
 * Password gate (brief 6.8 and 11.4), ported from
 * ~/structured-talent-demo/middleware.ts. Next 16 calls this file `proxy`.
 *
 * - `DEMO_GATE=off` disables it; on by default.
 * - Password 120226, cookie `demo-auth`, 30 days, httpOnly, secure in
 *   production, 303 back to the same URL on success.
 * - opengraph-image and the icons stay open so link previews render.
 * - The secure cookie does not stick on localhost in production mode; test the
 *   gate on a Vercel preview.
 */
const PASSWORD = "120226";
const COOKIE = "demo-auth";
const FIELD = "p";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function gatePage(error: boolean): NextResponse {
  const g = copy.gate;
  const body = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${escapeHtml(NAME_DISPLAY)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400&family=Newsreader:opsz,wght@6..72,400&display=swap">
<style>
  *,*::before,*::after{box-sizing:border-box}
  html,body{margin:0;min-height:100%}
  body{min-height:100vh;min-height:100svh;display:grid;place-items:center;padding:24px 16px;background:#FBF9F5;color:#2A2622;font-family:Newsreader,Georgia,serif;-webkit-font-smoothing:antialiased;position:relative}
  .bg{position:fixed;inset:0;background:#FBF9F5 url("/atmosphere/terrace-sea-pale-morning.jpg") center/cover no-repeat;opacity:.4}
  .panel{position:relative;width:100%;max-width:400px;background:#FBF9F5;padding:56px 40px 48px;text-align:center}
  .mark{font-family:Jost,sans-serif;font-weight:300;font-size:24px;line-height:1;letter-spacing:.34em;margin-right:-.34em;text-transform:uppercase;white-space:nowrap}
  .mark .apos{margin:0 -.06em 0 -.2em;letter-spacing:0}
  .eyebrow{margin:28px 0 36px;font-family:Jost,sans-serif;font-weight:400;font-size:11px;line-height:16px;letter-spacing:.22em;text-transform:uppercase;color:#8C8273}
  form{display:flex;flex-direction:column;align-items:center;gap:16px}
  input{display:block;width:100%;height:44px;padding:0 12px;background:transparent;color:#2A2622;border:1px solid #B8AD9C;font-family:Newsreader,Georgia,serif;font-size:17px;letter-spacing:0;text-align:center;-webkit-appearance:none;appearance:none;transition:border-color .4s}
  input:focus{outline:none;border-color:#2A2622}
  button{width:140px;height:42px;margin-top:8px;background:transparent;color:#2A2622;border:1px solid #2A2622;font-family:Jost,sans-serif;font-weight:400;font-size:12px;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;transition:color .4s,background-color .4s,border-color .4s}
  button:hover{background:#2A2622;color:#F6F2EB}
  button:focus-visible{outline:1px solid #2A2622;outline-offset:3px}
  .err{min-height:24px;margin:16px 0 0;font-size:15px;line-height:24px;color:#6B6258}
  .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
</style>
</head>
<body>
<div class="bg" aria-hidden="true"></div>
<main class="panel">
  <h1 style="margin:0;font-weight:inherit"><span class="sr">${escapeHtml(NAME_DISPLAY)}</span><span class="mark" aria-hidden="true">AUBE<span class="apos">’</span>MAR</span></h1>
  <p class="eyebrow">${escapeHtml(g.eyebrow)}</p>
  <form method="POST">
    <label class="sr" for="${FIELD}">${escapeHtml(g.password)}</label>
    <input id="${FIELD}" name="${FIELD}" type="password" autocomplete="current-password" autofocus required${error ? ' aria-describedby="err" aria-invalid="true"' : ""}>
    <button type="submit">${escapeHtml(g.enter)}</button>
  </form>
  <p class="err" id="err" role="status">${error ? escapeHtml(g.error) : ""}</p>
</main>
</body>
</html>`;
  return new NextResponse(body, {
    status: 401,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

export async function proxy(req: NextRequest) {
  if (process.env.DEMO_GATE === "off") return NextResponse.next();
  if (req.cookies.get(COOKIE)?.value === PASSWORD) return NextResponse.next();

  if (req.method === "POST") {
    const type = req.headers.get("content-type") ?? "";
    if (type.includes("application/x-www-form-urlencoded") || type.includes("multipart/form-data")) {
      const form = await req.formData();
      if (form.get(FIELD) === PASSWORD) {
        const url = new URL(req.nextUrl.pathname + req.nextUrl.search, req.url);
        const res = NextResponse.redirect(url, 303);
        res.cookies.set(COOKIE, PASSWORD, {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 30,
        });
        return res;
      }
    }
    return gatePage(true);
  }
  return gatePage(false);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|opengraph-image|icon|apple-icon|favicon\\.ico|.*\\..*).*)"],
};
