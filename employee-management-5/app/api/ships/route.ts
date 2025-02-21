import { NextResponse } from "next/server"
import executeQuery from "@/lib/db"

export async function GET() {
  try {
    const result = await executeQuery({
      query: "SELECT * FROM Schiffe",
    })
    return NextResponse.json(result)
  } catch (error) {
    console.error("Failed to fetch ships:", error)
    return NextResponse.json({ error: "Failed to fetch ships" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { Name, Kapazitaet } = await request.json()
    const result = await executeQuery({
      query: "INSERT INTO Schiffe (Name, Kapazitaet) VALUES (?, ?)",
      values: [Name, Kapazitaet],
    })
    return NextResponse.json(result)
  } catch (error) {
    console.error("Failed to add ship:", error)
    return NextResponse.json({ error: "Failed to add ship" }, { status: 500 })
  }
}

