import { NextResponse } from "next/server"
import executeQuery from "@/lib/db"

export async function GET() {
  try {
    const result = await executeQuery({
      query: "SELECT * FROM Mitarbeiter",
    })
    return NextResponse.json(result)
  } catch (error) {
    console.error("Failed to fetch employees:", error)
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { Vorname, Nachname, Geburtsdatum, EMail, Telefonnummer, Adresse } = await request.json()
    const result = await executeQuery({
      query:
        "INSERT INTO Mitarbeiter (Vorname, Nachname, Geburtsdatum, EMail, Telefonnummer, Adresse) VALUES (?, ?, ?, ?, ?, ?)",
      values: [Vorname, Nachname, Geburtsdatum, EMail, Telefonnummer, Adresse],
    })
    return NextResponse.json(result)
  } catch (error) {
    console.error("Failed to add employee:", error)
    return NextResponse.json({ error: "Failed to add employee" }, { status: 500 })
  }
}

