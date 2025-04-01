"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Heart, Home, Image, Users, Calendar, Plane, Mail, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DashboardNavProps {
  isSheet?: boolean
  setIsOpen?: (open: boolean) => void
}

export function DashboardNav({ isSheet, setIsOpen }: DashboardNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Photo Album",
      href: "/dashboard/album",
      icon: Image,
    },
    {
      title: "Guest List",
      href: "/dashboard/guests",
      icon: Users,
    },
    {
      title: "Timeline",
      href: "/dashboard/timeline",
      icon: Calendar,
    },
    {
      title: "Honeymoon",
      href: "/dashboard/honeymoon",
      icon: Plane,
    },
    {
      title: "Invitations",
      href: "/dashboard/invitations",
      icon: Mail,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <div
      className={cn("flex h-full w-full flex-col border-r border-primary/10 bg-card", isSheet ? "px-0" : "px-2 py-4")}
    >
      {isSheet && (
        <div className="flex h-16 items-center border-b border-primary/10 px-6">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setIsOpen?.(false)}>
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-bold">WeddingSnapStory</span>
          </Link>
        </div>
      )}

      <ScrollArea className="flex-1 px-2">
        <nav className="flex flex-col gap-1 py-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("justify-start", pathname === item.href && "bg-primary/10 text-primary")}
              asChild
              onClick={() => setIsOpen?.(false)}
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-5 w-5" />
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>

      <div className="mt-auto border-t border-primary/10 p-4">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground" asChild>
          <Link href="/logout">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )
}

