export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/gists/1f3b21eaaf65b90e0e21c7be4799ec76",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "VacuumStore-StatusCheck",
        },
        cache: "no-store",
      }
    );

    if (res.ok) {
      const data = await res.json();
      const rawContent = data.files?.["vacuum_store_status.json"]?.content;
      if (rawContent) {
        const cleanContent = rawContent.replace(/^\uFEFF/, "").trim();
        const parsed = JSON.parse(cleanContent);
        return Response.json(parsed, {
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        });
      }
    }
  } catch (err) {
    console.error("Error fetching site status:", err);
  }

  // Fallback default
  return Response.json(
    { active: true, message: "مرحبا" },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
