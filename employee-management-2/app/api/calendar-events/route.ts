import { NextResponse } from "next/server"

const mockEvents = [
  {
    id: "1",
    summary: "Team Meeting",
    start: { dateTime: "2023-06-01T09:00:00" },
    end: { dateTime: "2023-06-01T10:00:00" },
  },
  {
    id: "2",
    summary: "Project Kickoff",
    start: { dateTime: "2023-06-02T14:00:00" },
    end: { dateTime: "2023-06-02T15:30:00" },
  },
  {
    id: "3",
    summary: "Client Presentation",
    start: { dateTime: "2023-06-03T11:00:00" },
    end: { dateTime: "2023-06-03T12:00:00" },
  },
]

export async function GET() {
  return NextResponse.json(mockEvents)
}

