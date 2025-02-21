"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface Employee {
  MitarbeiterID: number
  Vorname: string
  Nachname: string
  Geburtsdatum: string
  EMail: string
  Telefonnummer: string
  Adresse: string
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newEmployee, setNewEmployee] = useState({
    Vorname: "",
    Nachname: "",
    Geburtsdatum: "",
    EMail: "",
    Telefonnummer: "",
    Adresse: "",
  })

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    const response = await fetch("/api/employees")
    const data = await response.json()
    setEmployees(data)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    })
    if (response.ok) {
      fetchEmployees()
      setNewEmployee({
        Vorname: "",
        Nachname: "",
        Geburtsdatum: "",
        EMail: "",
        Telefonnummer: "",
        Adresse: "",
      })
    }
  }

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.Vorname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Nachname.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-ocean-dark">Employee Information</h1>
      <Input
        type="text"
        placeholder="Search employees..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Card>
        <CardHeader>
          <CardTitle>Add New Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="Vorname"
              placeholder="First Name"
              value={newEmployee.Vorname}
              onChange={handleInputChange}
              required
            />
            <Input
              name="Nachname"
              placeholder="Last Name"
              value={newEmployee.Nachname}
              onChange={handleInputChange}
              required
            />
            <Input
              name="Geburtsdatum"
              type="date"
              value={newEmployee.Geburtsdatum}
              onChange={handleInputChange}
              required
            />
            <Input
              name="EMail"
              type="email"
              placeholder="Email"
              value={newEmployee.EMail}
              onChange={handleInputChange}
              required
            />
            <Input
              name="Telefonnummer"
              placeholder="Phone Number"
              value={newEmployee.Telefonnummer}
              onChange={handleInputChange}
              required
            />
            <Input
              name="Adresse"
              placeholder="Address"
              value={newEmployee.Adresse}
              onChange={handleInputChange}
              required
            />
            <Button type="submit">Add Employee</Button>
          </form>
        </CardContent>
      </Card>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.MitarbeiterID}>
                <TableCell>{employee.Vorname}</TableCell>
                <TableCell>{employee.Nachname}</TableCell>
                <TableCell>{new Date(employee.Geburtsdatum).toLocaleDateString()}</TableCell>
                <TableCell>{employee.EMail}</TableCell>
                <TableCell>{employee.Telefonnummer}</TableCell>
                <TableCell>{employee.Adresse}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  )
}

