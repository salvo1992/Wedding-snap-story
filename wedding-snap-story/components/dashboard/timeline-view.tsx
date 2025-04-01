"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Clock, MapPin } from "lucide-react"

type TimelineEvent = {
  id: number
  time: string
  title: string
  description: string
  location: string
  category: "ceremony" | "reception" | "preparation" | "other"
}

export function TimelineView() {
  // Sample timeline data
  const events: TimelineEvent[] = [
    {
      id: 1,
      time: "08:00 AM",
      title: "Bride & Groom Preparation",
      description: "Hair, makeup, and dressing for the wedding party",
      location: "Hotel Suite",
      category: "preparation",
    },
    {
      id: 2,
      time: "11:00 AM",
      title: "Photographer Arrival",
      description: "Photographer arrives to capture pre-ceremony moments",
      location: "Hotel Suite",
      category: "preparation",
    },
    {
      id: 3,
      time: "12:30 PM",
      title: "Transportation to Venue",
      description: "Wedding party travels to ceremony location",
      location: "From Hotel to Church",
      category: "other",
    },
    {
      id: 4,
      time: "2:00 PM",
      title: "Ceremony",
      description: "Wedding ceremony begins",
      location: "St. Maria Church",
      category: "ceremony",
    },
    {
      id: 5,
      time: "3:00 PM",
      title: "Post-Ceremony Photos",
      description: "Group photos with family and friends",
      location: "Church Garden",
      category: "other",
    },
    {
      id: 6,
      time: "4:30 PM",
      title: "Cocktail Hour",
      description: "Guests enjoy drinks and appetizers",
      location: "Villa Bella Reception Hall",
      category: "reception",
    },
    {
      id: 7,
      time: "6:00 PM",
      title: "Dinner Service",
      description: "Formal dinner service begins",
      location: "Villa Bella Main Hall",
      category: "reception",
    },
    {
      id: 8,
      time: "8:00 PM",
      title: "First Dance",
      description: "Bride and groom's first dance as married couple",
      location: "Villa Bella Dance Floor",
      category: "reception",
    },
    {
      id: 9,
      time: "9:00 PM",
      title: "Cake Cutting",
      description: "Ceremonial cutting of the wedding cake",
      location: "Villa Bella Main Hall",
      category: "reception",
    },
    {
      id: 10,
      time: "11:30 PM",
      title: "Send-Off",
      description: "Guests bid farewell to the newlyweds",
      location: "Villa Bella Entrance",
      category: "reception",
    },
  ]

  const getCategoryColor = (category: TimelineEvent["category"]) => {
    switch (category) {
      case "ceremony":
        return "border-blue-500/50 bg-blue-500/10"
      case "reception":
        return "border-purple-500/50 bg-purple-500/10"
      case "preparation":
        return "border-amber-500/50 bg-amber-500/10"
      case "other":
        return "border-gray-500/50 bg-gray-500/10"
    }
  }

  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:left-9 before:border-l-2 before:border-dashed before:border-muted-foreground/20 before:ml-[9px] before:h-full before:z-0">
      {events.map((event) => (
        <div key={event.id} className="relative grid grid-cols-[60px_1fr] gap-6 items-start">
          <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium h-[50px] w-[50px] text-sm z-10">
            {event.time.split(" ")[0]}
          </div>

          <Card className={`border ${getCategoryColor(event.category)}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit event</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Timeline Event</DialogTitle>
                    </DialogHeader>
                    {/* Edit form would go here */}
                    <div className="py-4">
                      <p className="text-muted-foreground">Edit form placeholder</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span className="mr-3">{event.time}</span>
                <MapPin className="h-3 w-3 mr-1" />
                <span>{event.location}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

