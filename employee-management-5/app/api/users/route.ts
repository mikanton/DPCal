import { NextResponse } from "next/server"
import executeQuery from "@/lib/db"
import bcrypt from "bcrypt"

export async function GET() {
  try {
    const result = await executeQuery({
      query: "SELECT UserID, Username, Email, Role, LastLogin, CreatedAt, UpdatedAt FROM Users",
    })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { Username, Password, Email, Role } = await request.json()
    const hashedPassword = await bcrypt.hash(Password, 10)
    const result = await executeQuery({
      query: "INSERT INTO Users (Username, PasswordHash, Email, Role) VALUES (?, ?, ?, ?)",
      values: [Username, hashedPassword, Email, Role],
    })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 })
  }
}

