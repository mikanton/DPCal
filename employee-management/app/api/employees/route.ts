import { NextResponse } from "next/server"
import { employees } from "@/lib/placeholder-data"

export async function GET() {
  return NextResponse.json(employees)
}

