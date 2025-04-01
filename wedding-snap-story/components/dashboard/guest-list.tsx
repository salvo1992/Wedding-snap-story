"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Check, X, MoreHorizontal, Search } from "lucide-react"

type Guest = {
  id: number
  name: string
  email: string
  status: "confirmed" | "pending" | "declined"
  plusOne: boolean
  table: number | null
}

export function GuestList() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample guest data
  const guests: Guest[] = [
    {
      id: 1,
      name: "Alessandro Bianchi",
      email: "alessandro@example.com",
      status: "confirmed",
      plusOne: true,
      table: 1,
    },
    { id: 2, name: "Giulia Rossi", email: "giulia@example.com", status: "confirmed", plusOne: false, table: 1 },
    { id: 3, name: "Marco Verdi", email: "marco@example.com", status: "pending", plusOne: true, table: null },
    { id: 4, name: "Francesca Russo", email: "francesca@example.com", status: "declined", plusOne: false, table: null },
    { id: 5, name: "Roberto Ferrari", email: "roberto@example.com", status: "confirmed", plusOne: true, table: 2 },
    { id: 6, name: "Laura Esposito", email: "laura@example.com", status: "pending", plusOne: false, table: null },
    { id: 7, name: "Giovanni Romano", email: "giovanni@example.com", status: "confirmed", plusOne: true, table: 3 },
    { id: 8, name: "Valentina Marino", email: "valentina@example.com", status: "confirmed", plusOne: false, table: 3 },
  ]

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: Guest["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "pending":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      case "declined":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guests..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Export</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plus One</TableHead>
              <TableHead>Table</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell className="font-medium">{guest.name}</TableCell>
                <TableCell>{guest.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(guest.status)}>
                    {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {guest.plusOne ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </TableCell>
                <TableCell>{guest.table || "-"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

