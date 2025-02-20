import { CalendarView } from "../calendar-view"

// This page component displays the calendar view
export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-ocean-dark">Voyage Schedule</h1>
      <CalendarView />
    </div>
  )
}

