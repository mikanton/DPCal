"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

interface User {
  UserID: number
  Username: string
  Email: string
  Role: "Admin" | "Manager" | "Employee"
  LastLogin: string
  CreatedAt: string
  UpdatedAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({
    Username: "",
    Password: "",
    Email: "",
    Role: "Employee" as "Admin" | "Manager" | "Employee",
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await fetch("/api/users")
    const data = await response.json()
    setUsers(data)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const handleRoleChange = (value: "Admin" | "Manager" | "Employee") => {
    setNewUser({ ...newUser, Role: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
    if (response.ok) {
      fetchUsers()
      setNewUser({
        Username: "",
        Password: "",
        Email: "",
        Role: "Employee",
      })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-ocean-dark">User Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="Username"
              placeholder="Username"
              value={newUser.Username}
              onChange={handleInputChange}
              required
            />
            <Input
              name="Password"
              type="password"
              placeholder="Password"
              value={newUser.Password}
              onChange={handleInputChange}
              required
            />
            <Input
              name="Email"
              type="email"
              placeholder="Email"
              value={newUser.Email}
              onChange={handleInputChange}
              required
            />
            <Select onValueChange={handleRoleChange} value={newUser.Role}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Add User</Button>
          </form>
        </CardContent>
      </Card>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.UserID}>
                <TableCell>{user.Username}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{user.Role}</TableCell>
                <TableCell>{new Date(user.LastLogin).toLocaleString()}</TableCell>
                <TableCell>{new Date(user.CreatedAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(user.UpdatedAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  )
}

