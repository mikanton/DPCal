"use client"

import { useState } from "react"
import { CalendarView } from "../calendar-view"
import { WeekViewCalendar } from "@/components/week-view-calendar"
import { Button } from "@/components/ui/button"

export default function CalendarPage() {
  const [view, setView] = useState<"week" | "month">("month")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-ocean-dark">Voyage Schedule</h1>
        <div>
          <Button variant={view === "week" ? "default" : "outline"} onClick={() => setView("week")} className="mr-2">
            Week
          </Button>
          <Button variant={view === "month" ? "default" : "outline"} onClick={() => setView("month")}>
            Month
          </Button>
        </div>
      </div>
      {view === "week" ? <WeekViewCalendar /> : <CalendarView />}
    </div>
  )
}

