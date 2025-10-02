import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch(
      "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+top+100+pl_name,hostname,discoverymethod,disc_year,pl_orbper,pl_rade,st_teff,sy_dist+from+ps+where+disc_year+is+not+null+order+by+disc_year+desc&format=json",
      {
        headers: {
          "User-Agent": "ExoplanetHunter/1.0",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`NASA API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching exoplanet data:", error)
    return NextResponse.json({ error: "Failed to fetch exoplanet data" }, { status: 500 })
  }
}
