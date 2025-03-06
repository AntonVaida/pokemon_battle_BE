export function getTokenFromRequest(req) {
  const urlParams = new URL(req.url, `http://${req.headers.host}`);
  return urlParams.searchParams.get("accessToken");
}