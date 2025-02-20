import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Anchor, Users, Calendar, User, LogOut } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-sand-light">
      <aside className="w-64 bg-ocean text-white">
        <div className="p-4 flex items-center space-x-2">
          <Anchor className="h-8 w-8" />
          <span className="text-xl font-bold">Maritime Crew</span>
        </div>
        <nav className="mt-8">
          <Link href="/dashboard" className="flex items-center py-2 px-4 text-sand hover:bg-ocean-dark">
            <Users className="mr-3 h-5 w-5" />
            Crew Dashboard
          </Link>
          <Link href="/dashboard/schedule" className="flex items-center py-2 px-4 text-sand hover:bg-ocean-dark">
            <Calendar className="mr-3 h-5 w-5" />
            Ship Schedule
          </Link>
          <Link href="/dashboard/profile" className="flex items-center py-2 px-4 text-sand hover:bg-ocean-dark">
            <User className="mr-3 h-5 w-5" />
            Crew Profile
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Button variant="ghost" className="w-full text-sand hover:bg-ocean-dark">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-10 bg-sand-light">{children}</main>
    </div>
  )
}

