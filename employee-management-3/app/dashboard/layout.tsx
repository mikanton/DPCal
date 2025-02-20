import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Anchor, Users, Calendar, Table, User, LogOut } from "lucide-react"

// This is the layout component for the dashboard
// It provides a consistent structure for all dashboard pages
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-sand-light">
      {/* Sidebar navigation */}
      <aside className="w-64 bg-ocean text-white">
        <div className="p-4 flex items-center space-x-2">
          <Anchor className="h-8 w-8" />
          <span className="text-xl font-bold">Maritime Crew</span>
        </div>
        <nav className="mt-8">
          <Link
            href="/dashboard"
            className="flex items-center py-2 px-4 text-sand hover:bg-ocean-dark transition-colors duration-200"
          >
            <Users className="mr-3 h-5 w-5" />
            Overview
          </Link>
          <Link
            href="/dashboard/calendar"
            className="flex items-center py-2 px-4 text-sand hover:bg-ocean-dark transition-colors duration-200"
          >
            <Calendar className="mr-3 h-5 w-5" />
            Calendar View
          </Link>
          <Link
            href="/dashboard/schedule"
            className="flex items-center py-2 px-4 text-sand hover:bg-ocean-dark transition-colors duration-200"
          >
            <Table className="mr-3 h-5 w-5" />
            Schedule Table
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center py-2 px-4 text-sand hover:bg-ocean-dark transition-colors duration-200"
          >
            <User className="mr-3 h-5 w-5" />
            Crew Profile
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Button variant="ghost" className="w-full text-sand hover:bg-ocean-dark transition-colors duration-200">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>
      {/* Main content area */}
      <main className="flex-1 p-10 bg-sand-light overflow-auto">{children}</main>
    </div>
  )
}

