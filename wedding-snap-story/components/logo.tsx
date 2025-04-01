import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  showText?: boolean
}

export function Logo({ size = "md", className, showText = true }: LogoProps) {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <Heart
          className={cn("text-primary fill-primary animate-pulse", sizes[size])}
          style={{ animationDuration: "3s" }}
        />
        <Heart
          className={cn("absolute inset-0 text-primary opacity-50 blur-sm animate-pulse", sizes[size])}
          style={{ animationDuration: "3s", animationDelay: "0.5s" }}
        />
      </div>

      {showText && (
        <span
          className={cn(
            "font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent",
            textSizes[size],
          )}
        >
          WeddingSnapStory
        </span>
      )}
    </div>
  )
}

