// Cloudflare Pages Function — 사이트 전체 누적 방문자 수 카운터.
// GET  : 현재 누적 값을 증가시키지 않고 그대로 반환한다.
// POST : 누적 값을 1 증가시킨 뒤 반환한다(같은 브라우저 세션당 1회만 호출됨).
// KV 바인딩 이름: VISITOR_KV (saju-tarot Pages 프로젝트 설정에서 바인딩됨)

const COUNT_KEY = "total_visits";

function jsonResponse(count) {
  return new Response(JSON.stringify({ count }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export async function onRequestGet(context) {
  const raw = await context.env.VISITOR_KV.get(COUNT_KEY);
  const count = parseInt(raw || "0", 10) || 0;
  return jsonResponse(count);
}

export async function onRequestPost(context) {
  const raw = await context.env.VISITOR_KV.get(COUNT_KEY);
  const count = (parseInt(raw || "0", 10) || 0) + 1;
  await context.env.VISITOR_KV.put(COUNT_KEY, String(count));
  return jsonResponse(count);
}
