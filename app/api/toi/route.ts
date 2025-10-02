import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch(
      "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+top+100+*+from+toi&format=json",
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
    console.error("Error fetching TOI data:", error)
    return NextResponse.json({ error: "Failed to fetch TOI data" }, { status: 500 })
  }
}
