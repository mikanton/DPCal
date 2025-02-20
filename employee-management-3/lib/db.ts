import { employees, shifts } from "./placeholder-data"

export async function query(sql: string, params: any[] = []) {
  console.log("Simulated query:", sql, params)

  // Simulate database queries with placeholder data
  if (sql.includes("FROM employees")) {
    return employees
  } else if (sql.includes("FROM shifts")) {
    return shifts
  }

  // For any other queries, return an empty array
  return []
}

