import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarView } from "./calendar-view"
import { ShiftSchedule } from "./shift-schedule"
import { Ship, Anchor } from "lucide-react"
import { ships } from "@/lib/placeholder-data"

export default function Dashboard() {
  const shipsAtSea = ships.filter((ship) => ship.status === "At Sea").length
  const shipsDocked = ships.filter((ship) => ship.status === "Docked").length

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-ocean-dark">Ship Operations Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white border-ocean">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ocean">Total Ships</CardTitle>
            <Ship className="h-4 w-4 text-ocean" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ocean-dark">{ships.length}</div>
            <p className="text-xs text-muted-foreground">Fleet overview</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-ocean">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ocean">Ships at Sea</CardTitle>
            <Ship className="h-4 w-4 text-ocean" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ocean-dark">{shipsAtSea}</div>
            <p className="text-xs text-muted-foreground">Currently on voyage</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-ocean">
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
        <h2 className="text-2xl font-semibold mb-4 text-ocean-dark">Voyage Schedule</h2>
        <CalendarView />
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-ocean-dark">Employee Shift Schedule</h2>
        <ShiftSchedule />
      </div>
    </div>
  )
}

