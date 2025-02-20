import { ShiftSchedule } from "../shift-schedule"

// This page component displays the shift schedule table
export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-ocean-dark">Employee Shift Schedule</h1>
      <ShiftSchedule />
    </div>
  )
}

