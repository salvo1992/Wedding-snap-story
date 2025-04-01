import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/80 z-10"></div>

      {/* Background image (placeholder) */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-30"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-center">
        <div className="inline-flex items-center justify-center p-1 mb-8 rounded-full bg-primary/10 text-primary">
          <Heart className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Capture Every Moment</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">WeddingSnapStory</h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Create, share, and cherish your wedding memories with our all-in-one digital wedding album platform
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="text-lg px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/demo">
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

