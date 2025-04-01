"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function AuthBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    const particles: Particle[] = []
    const particleCount = 20

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 15 + 5
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = `hsl(346.8, 77.2%, ${Math.random() * 30 + 40}%)`
        this.opacity = Math.random() * 0.5 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()

        // Draw heart shape
        const topCurveHeight = this.size * 0.3

        ctx.moveTo(this.x, this.y + topCurveHeight)
        // Left curve
        ctx.bezierCurveTo(
          this.x,
          this.y,
          this.x - this.size / 2,
          this.y,
          this.x - this.size / 2,
          this.y + topCurveHeight,
        )
        // Bottom left curve
        ctx.bezierCurveTo(
          this.x - this.size / 2,
          this.y + this.size * 0.7,
          this.x,
          this.y + this.size * 1.1,
          this.x,
          this.y + this.size * 1.1,
        )
        // Bottom right curve
        ctx.bezierCurveTo(
          this.x,
          this.y + this.size * 1.1,
          this.x + this.size / 2,
          this.y + this.size * 0.7,
          this.x + this.size / 2,
          this.y + topCurveHeight,
        )
        // Right curve
        ctx.bezierCurveTo(this.x + this.size / 2, this.y, this.x, this.y, this.x, this.y + topCurveHeight)

        ctx.fill()
        ctx.restore()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(253, 242, 248, 0.8)") // Light pink
      gradient.addColorStop(1, "rgba(254, 215, 226, 0.8)") // Darker pink

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full" />
      <div className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2 bg-gradient-to-br from-primary/10 to-primary/5 p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

        <div className="relative z-10 max-w-md text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <Heart className="h-20 w-20 mx-auto mb-6 text-primary fill-primary/20" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl font-bold tracking-tight mb-4"
          >
            Capture Your Perfect Day
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Create beautiful memories with our comprehensive wedding platform that brings together photos, planning, and
            sharing in one place.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { number: "1000+", label: "Weddings" },
              { number: "50k+", label: "Photos" },
              { number: "100%", label: "Happy Couples" },
            ].map((stat, index) => (
              <div key={index} className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <p className="text-2xl font-bold text-primary">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  )
}

