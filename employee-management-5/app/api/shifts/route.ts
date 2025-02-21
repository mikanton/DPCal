import { NextResponse } from "next/server"
import { shifts } from "@/lib/placeholder-data"

export async function GET() {
  return NextResponse.json(shifts)
}

