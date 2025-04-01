import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Settings, Bell } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { CountdownTimer } from "@/components/countdown-timer"
import { AlbumGrid } from "@/components/dashboard/album-grid"
import { GuestList } from "@/components/dashboard/guest-list"
import { TimelineView } from "@/components/dashboard/timeline-view"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 md:p-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Sofia & Marco!</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            <Card className="border-primary/10">
              <CardHeader className="pb-3">
                <CardTitle>Wedding Countdown</CardTitle>
                <CardDescription>Your special day is approaching!</CardDescription>
              </CardHeader>
              <CardContent>
                <CountdownTimer targetDate="2024-06-15T16:00:00" />
              </CardContent>
            </Card>

            <Tabs defaultValue="album" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="album">Photo Album</TabsTrigger>
                <TabsTrigger value="guests">Guest List</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="honeymoon">Honeymoon</TabsTrigger>
              </TabsList>

              <TabsContent value="album" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Your Wedding Album</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Photos
                  </Button>
                </div>
                <AlbumGrid />
              </TabsContent>

              <TabsContent value="guests" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Guest Management</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Guest
                  </Button>
                </div>
                <GuestList />
              </TabsContent>

              <TabsContent value="timeline" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Wedding Day Timeline</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </div>
                <TimelineView />
              </TabsContent>

              <TabsContent value="honeymoon" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Honeymoon Planning</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Destination
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Maldives</CardTitle>
                      <CardDescription>June 20 - June 30, 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video rounded-md overflow-hidden bg-muted mb-4">
                        <div className="w-full h-full bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center"></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Enjoy crystal clear waters and white sandy beaches in this tropical paradise.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Santorini</CardTitle>
                      <CardDescription>July 1 - July 7, 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video rounded-md overflow-hidden bg-muted mb-4">
                        <div className="w-full h-full bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center"></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Experience breathtaking sunsets and beautiful white architecture.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

