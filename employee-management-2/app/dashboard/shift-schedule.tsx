"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface Employee {
  id: number
  name: string
}

interface Shift {
  employeeId: number
  day: string
  shift: string
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function ShiftSchedule() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [shifts, setShifts] = useState<Shift[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error)
        }
        setEmployees(data)
      })
      .catch((err) => {
        console.error("Error fetching employees:", err)
        setError("Failed to load employees. Please try again later.")
      })

    fetch("/api/shifts")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error)
        }
        setShifts(data)
      })
      .catch((err) => {
        console.error("Error fetching shifts:", err)
        setError("Failed to load shifts. Please try again later.")
      })
  }, [])

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Employee</TableHead>
            {DAYS.map((day) => (
              <TableHead key={day}>{day}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              {DAYS.map((day) => {
                const shift = shifts.find((s) => s.employeeId === employee.id && s.day === day)
                return <TableCell key={day}>{shift ? shift.shift : "-"}</TableCell>
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

