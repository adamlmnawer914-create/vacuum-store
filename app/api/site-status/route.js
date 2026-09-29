export const dynamic = "force-dynamic";
export const revalidate = 0;

let lastFetchTime = 0;
let cachedResult = { active: true, message: "مرحبا" };
const CACHE_TTL = 1000; // 1 second in-memory cache to prevent any rate limit

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GIST_ID = "1f3b21eaaf65b90e0e21c7be4799ec76";

export async function GET() {
  const now = Date.now();

  // Return cached result if within TTL
  if (now - lastFetchTime < CACHE_TTL && cachedResult) {
    return Response.json(cachedResult, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        Pragma: "no-cache",
      },
    });
  }

  try {
    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "VacuumStore-StatusCheck",
    };
    if (GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers,
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      const rawContent = data.files?.["vacuum_store_status.json"]?.content;
      if (rawContent) {
        const cleanContent = rawContent.replace(/^\uFEFF/, "").trim();
        const parsed = JSON.parse(cleanContent);
        cachedResult = parsed;
        lastFetchTime = now;
        return Response.json(parsed, {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
            Pragma: "no-cache",
          },
        });
      }
    }
  } catch (err) {
    console.error("Error fetching site status:", err);
  }

  // Fallback to cached or default
  return Response.json(cachedResult, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      Pragma: "no-cache",
    },
  });
}

