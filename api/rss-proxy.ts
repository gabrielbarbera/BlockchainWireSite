export const config = { runtime: "edge" };

const ALLOWED_HOSTS = [
  "coinjournal.net",
  "www.cryptobreaking.com",
  "rss.globenewswire.com",
  "api.blockchainwire.io",
];

export default async function handler(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) return new Response("Missing url parameter", { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return new Response("Invalid URL", { status: 400 });
  }

  if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
    return new Response("Host not allowed", { status: 403 });
  }

  const upstream = await fetch(url, {
    headers: { Accept: "application/rss+xml, application/xml, text/xml" },
  });

  if (!upstream.ok) return new Response("", { status: upstream.status });

  const xml = await upstream.text();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
