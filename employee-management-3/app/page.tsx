"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Anchor } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempted with:", email, password)
    router.push("/dashboard")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-ocean bg-opacity-90">
      <Card className="w-[350px] bg-sand shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <Anchor className="h-12 w-12 text-ocean-dark" />
          </div>
          <CardTitle className="text-center text-ocean-dark">Maritime Crew Login</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-sand-light border-ocean"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-sand-light border-ocean"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="bg-sand-light text-ocean-dark border-ocean">
            Cancel
          </Button>
          <Button onClick={handleLogin} className="bg-ocean text-white hover:bg-ocean-dark">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

