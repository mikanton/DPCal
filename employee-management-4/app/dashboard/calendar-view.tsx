"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"

interface Event {
  id: string
  summary: string
  start: { dateTime: string }
  end: { dateTime: string }
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetch("/api/calendar-events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error))
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = new Date(year, month + 1, 0).getDate()
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1))
  }

  const addDays = (date: Date, days: number) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  const prevMonth = () => setCurrentDate(addDays(currentDate, -30))
  const nextMonth = () => setCurrentDate(addDays(currentDate, 30))

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = daysInMonth[0].getDay()
  const lastDayOfMonth = daysInMonth[daysInMonth.length - 1].getDay()

  const prefixDays = Array.from({ length: firstDayOfMonth }, (_, i) => addDays(daysInMonth[0], -firstDayOfMonth + i))
  const suffixDays = Array.from({ length: 6 - lastDayOfMonth }, (_, i) =>
    addDays(daysInMonth[daysInMonth.length - 1], i + 1),
  )

  const allDays = [...prefixDays, ...daysInMonth, ...suffixDays]

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start.dateTime)
      return eventDate.toDateString() === day.toDateString()
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 rounded-lg shadow"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((day) => (
          <div key={day} className="text-center font-semibold text-gray-500">
            {day}
          </div>
        ))}
        {allDays.map((day, index) => {
          const dayEvents = getEventsForDay(day)
          const isCurrentMonth = day.getMonth() === currentDate.getMonth()
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`aspect-square p-1 border rounded cursor-pointer ${
                isCurrentMonth ? "bg-white" : "bg-gray-100"
              } ${day.toDateString() === new Date().toDateString() ? "border-blue-500" : ""}`}
              onClick={() => {
                setSelectedDay(day)
                setIsModalOpen(true)
              }}
            >
              <div className="text-right text-sm">{day.getDate()}</div>
              {dayEvents.length > 0 && (
                <div className="mt-1">
                  <div className="text-xs bg-blue-500 text-white rounded px-1 py-0.5">
                    {dayEvents.length} event{dayEvents.length > 1 ? "s" : ""}
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedDay?.toLocaleDateString("default", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedDay &&
              getEventsForDay(selectedDay).map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-2 p-2 bg-gray-100 rounded"
                >
                  <h3 className="font-semibold">{event.summary}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(event.start.dateTime).toLocaleTimeString()} -{" "}
                    {new Date(event.end.dateTime).toLocaleTimeString()}
                  </p>
                </motion.div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

