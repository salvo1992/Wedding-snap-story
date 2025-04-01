"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Camera, Share, Users, Calendar, Palette, Gift } from "lucide-react"
import { motion } from "framer-motion"

export function FeatureSection() {
  const features = [
    {
      icon: <Camera className="h-10 w-10 text-primary" />,
      title: "Instant Photo Capture",
      description: "Take photos directly in the app or upload from your gallery",
    },
    {
      icon: <Share className="h-10 w-10 text-primary" />,
      title: "Easy Sharing",
      description: "Share photos instantly with guests and on social media",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Guest Collaboration",
      description: "Let guests contribute their photos to your wedding album",
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Event Timeline",
      description: "Plan your wedding day schedule down to the minute",
    },
    {
      icon: <Palette className="h-10 w-10 text-primary" />,
      title: "Custom Designs",
      description: "Personalize your album with custom themes and layouts",
    },
    {
      icon: <Gift className="h-10 w-10 text-primary" />,
      title: "Digital Invitations",
      description: "Create and send beautiful digital wedding invitations",
    },
  ]

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
    <section className="py-16 md:py-24 container mx-auto px-4 overflow-hidden">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight mb-4">Everything You Need</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          WeddingSnapStory combines all the tools you need to plan, capture, and share your wedding journey
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={item}>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-all h-full group">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <motion.div
                  className="mb-4 p-3 rounded-full bg-primary/10 relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="absolute inset-0 rounded-full bg-primary/5 blur-md"></div>
                  <div className="relative">{feature.icon}</div>
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

