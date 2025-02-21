"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Event {
  id: string
  summary: string
  start: { dateTime: string }
  end: { dateTime: string }
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function WeekViewCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetch("/api/calendar-events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error))
  }, [])

  const getWeekDates = (date: Date) => {
    const week = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(date)
      day.setDate(date.getDate() - date.getDay() + i)
      week.push(day)
    }
    return week
  }

  const weekDates = getWeekDates(currentDate)

  const prevWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const nextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

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
          Week of {weekDates[0].toLocaleDateString()} - {weekDates[6].toLocaleDateString()}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((day, index) => (
          <div key={day} className="text-center">
            <div className="font-semibold text-gray-500 mb-1">{day}</div>
            <div className="text-sm">{weekDates[index].getDate()}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {weekDates.map((date, index) => {
          const dayEvents = getEventsForDay(date)
          return (
            <div key={index} className="border rounded p-1 h-32 overflow-y-auto">
              {dayEvents.map((event) => (
                <div key={event.id} className="text-xs bg-blue-100 rounded p-1 mb-1">
                  {event.summary}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

