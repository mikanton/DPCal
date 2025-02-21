import { NextResponse } from "next/server"
import executeQuery from "@/lib/db"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  try {
    const users = (await executeQuery({
      query: "SELECT * FROM Users WHERE Username = ?",
      values: [username],
    })) as any[]

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    const user = users[0]
    const passwordMatch = await bcrypt.compare(password, user.PasswordHash)

    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    // In a real-world scenario, you'd generate a JWT token here
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.UserID,
        username: user.Username,
        role: user.Role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}

