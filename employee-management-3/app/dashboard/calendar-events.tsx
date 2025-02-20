"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Event {
  id: string
  summary: string
  start: { dateTime: string }
  end: { dateTime: string }
}

export function CalendarEvents() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetch("/api/calendar-events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {events.map((event) => (
            <li key={event.id} className="bg-gray-100 p-2 rounded">
              <h3 className="font-semibold">{event.summary}</h3>
              <p className="text-sm text-gray-600">
                {new Date(event.start.dateTime).toLocaleString()} - {new Date(event.end.dateTime).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

