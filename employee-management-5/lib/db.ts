import mysql from "serverless-mysql"

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: Number.parseInt(process.env.MYSQL_PORT || "3306"),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
})

export default async function executeQuery({ query, values }: { query: string; values?: any[] }) {
  try {
    const results = await db.query(query, values)
    await db.end()
    return results
  } catch (error) {
    console.error("Database query error:", error)
    return { error }
  }
}

