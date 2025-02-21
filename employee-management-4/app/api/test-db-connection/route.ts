import { NextResponse } from "next/server"
import executeQuery from "@/lib/db"

export async function GET() {
  try {
    const result = await executeQuery({
      query: "SELECT DATABASE() as database, USER() as user, VERSION() as version",
    })
    return NextResponse.json({ message: "Database connection successful", result })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json({ error: "Database connection failed", details: error }, { status: 500 })
  }
}

