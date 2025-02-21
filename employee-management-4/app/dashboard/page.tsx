import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ship, Anchor } from "lucide-react"
import { WeekViewCalendar } from "@/components/week-view-calendar"

async function getShips() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ships`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch ships")
  }
  return res.json()
}

export default async function Dashboard() {
  const ships = await getShips()
  const shipsAtSea = ships.filter((ship: any) => ship.status === "At Sea").length
  const shipsDocked = ships.filter((ship: any) => ship.status === "Docked").length

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-ocean-dark">Ship Operations Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white border-ocean transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ocean">Total Ships</CardTitle>
            <Ship className="h-4 w-4 text-ocean" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ocean-dark">{ships.length}</div>
            <p className="text-xs text-muted-foreground">Fleet overview</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-ocean transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ocean">Ships at Sea</CardTitle>
            <Ship className="h-4 w-4 text-ocean" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ocean-dark">{shipsAtSea}</div>
            <p className="text-xs text-muted-foreground">Currently on voyage</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-ocean transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ocean">Ships in Port</CardTitle>
            <Anchor className="h-4 w-4 text-ocean" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ocean-dark">{shipsDocked}</div>
            <p className="text-xs text-muted-foreground">Currently docked</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-ocean-dark">This Week's Schedule</h2>
        <WeekViewCalendar />
      </div>
    </div>
  )
}

