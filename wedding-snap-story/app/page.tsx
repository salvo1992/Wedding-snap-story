"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Camera, Users, Calendar, Plane, Share2, Image, ArrowRight } from "lucide-react"
import Link from "next/link"
import { CountdownTimer } from "@/components/countdown-timer"
import { FeatureSection } from "@/components/feature-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { Footer } from "@/components/footer"
import { Logo } from "@/components/logo"
import { motion } from "framer-motion"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const moveX = clientX / innerWidth - 0.5
      const moveY = clientY / innerHeight - 0.5

      const hero = heroRef.current
      if (!hero) return

      hero.style.transform = `perspective(1000px) rotateY(${moveX * 5}deg) rotateX(${-moveY * 5}deg)`
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Logo />

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="hidden md:inline-flex">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/80 z-10"></div>

          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(221,214,254,0.4),transparent_40%)]"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(254,205,211,0.4),transparent_40%)]"></div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20 flex flex-col md:flex-row items-center gap-12 py-16">
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-1 mb-8 rounded-full bg-primary/10 text-primary">
              <Heart className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Capture Every Moment</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Your Wedding Story
              <br />
              <span className="text-foreground">Beautifully Captured</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto md:mx-0 mb-10">
              Create, share, and cherish your wedding memories with our all-in-one digital wedding album platform
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/auth/register">
                <Button size="lg" className="text-lg px-8 group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Demo
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              ref={heroRef}
              className="relative w-full max-w-md mx-auto transition-transform duration-200 ease-out"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary to-primary/50 opacity-70 blur"></div>
              <div className="relative bg-card rounded-2xl shadow-xl overflow-hidden">
                <div className="aspect-[4/3] bg-muted">
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt="Wedding couple"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Sofia & Marco</h3>
                  <p className="text-muted-foreground mb-4">June 15, 2024</p>
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium"
                        >
                          {i}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      View Album
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto py-12 px-4 md:py-24">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">Your Wedding Journey Starts Here</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create beautiful memories with our comprehensive wedding platform that brings together photos, planning, and
            sharing in one place.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {[
            {
              icon: <Heart className="h-8 w-8 text-primary mb-2" />,
              title: "Digital Wedding Album",
              description: "Create a stunning digital album with customizable styles and layouts",
            },
            {
              icon: <Camera className="h-8 w-8 text-primary mb-2" />,
              title: "Guest Photo Sharing",
              description: "Let guests capture and share moments instantly during your special day",
            },
            {
              icon: <Users className="h-8 w-8 text-primary mb-2" />,
              title: "Guest Management",
              description: "Easily manage your guest list and track RSVPs in one place",
            },
            {
              icon: <Calendar className="h-8 w-8 text-primary mb-2" />,
              title: "Wedding Day Timeline",
              description: "Plan your perfect day with a detailed schedule for all events",
            },
            {
              icon: <Plane className="h-8 w-8 text-primary mb-2" />,
              title: "Honeymoon Planning",
              description: "Document and share your honeymoon plans and memories",
            },
            {
              icon: <Share2 className="h-8 w-8 text-primary mb-2" />,
              title: "Social Sharing",
              description: "Share your wedding moments on your favorite social platforms",
            },
          ].map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-all h-full overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader>
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href={`/features/${feature.title.toLowerCase().replace(/\s+/g, "-")}`} className="w-full">
                    <Button variant="outline" className="w-full group">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-primary/5 py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight mb-4">Your Wedding Countdown</h2>
              <p className="text-muted-foreground mb-8">
                Track the days until your special moment and get excited as your wedding day approaches.
              </p>
              <div className="bg-card rounded-xl p-8 shadow-lg border border-primary/10">
                <CountdownTimer targetDate="2024-06-15T16:00:00" />
              </div>
            </motion.div>
            <motion.div
              className="relative aspect-square rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 z-10"></div>
              <Image
                className="absolute inset-0 w-full h-full object-cover"
                width={600}
                height={600}
                alt="Wedding couple"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <FeatureSection />
      <TestimonialSection />
      <Footer />
    </main>
  )
}

