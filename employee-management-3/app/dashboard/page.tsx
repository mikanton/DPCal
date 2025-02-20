import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ship, Anchor } from "lucide-react"
import { ships } from "@/lib/placeholder-data"

// This is the main dashboard page component
// It displays an overview of ship operations
export default function Dashboard() {
  const shipsAtSea = ships.filter((ship) => ship.status === "At Sea").length
  const shipsDocked = ships.filter((ship) => ship.status === "Docked").length

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-ocean-dark">Ship Operations Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Ships Card */}
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
        {/* Ships at Sea Card */}
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
        {/* Ships in Port Card */}
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
    </div>
  )
}

