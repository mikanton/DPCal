"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"

interface Ticket {
  id: number
  employeeName: string
  date: string
  reason: string
  status: "Pending" | "Approved" | "Rejected"
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 1, employeeName: "John Doe", date: "2023-06-15", reason: "Sick Leave", status: "Approved" },
    { id: 2, employeeName: "Jane Smith", date: "2023-06-20", reason: "Family Emergency", status: "Pending" },
  ])

  const [newTicket, setNewTicket] = useState({
    employeeName: "",
    date: "",
    reason: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ticket: Ticket = {
      id: tickets.length + 1,
      ...newTicket,
      status: "Pending",
    }
    setTickets([...tickets, ticket])
    setNewTicket({ employeeName: "", date: "", reason: "" })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-ocean-dark">Absence Tickets</h1>
      <Card>
        <CardHeader>
          <CardTitle>Submit New Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="employeeName"
              placeholder="Employee Name"
              value={newTicket.employeeName}
              onChange={handleInputChange}
              required
            />
            <Input name="date" type="date" value={newTicket.date} onChange={handleInputChange} required />
            <Input
              name="reason"
              placeholder="Reason for Absence"
              value={newTicket.reason}
              onChange={handleInputChange}
              required
            />
            <Button type="submit">Submit Ticket</Button>
          </form>
        </CardContent>
      </Card>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.employeeName}</TableCell>
                <TableCell>{ticket.date}</TableCell>
                <TableCell>{ticket.reason}</TableCell>
                <TableCell>{ticket.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  )
}

