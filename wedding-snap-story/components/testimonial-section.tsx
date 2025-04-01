"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Sofia & Marco",
      role: "Newlyweds",
      content:
        "WeddingSnapStory made our special day even more memorable. Our guests loved being able to contribute their photos, and we now have a beautiful digital album to cherish forever.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Giulia Rossi",
      role: "Wedding Photographer",
      content:
        "As a professional photographer, I appreciate how seamlessly I can collaborate with couples and share photos through this platform. It's revolutionized my workflow!",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Alessandro & Laura",
      role: "Newlyweds",
      content:
        "The planning features helped us stay organized, and the photo sharing was a hit with our guests. We couldn't imagine our wedding without WeddingSnapStory!",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
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
    <section className="py-16 md:py-24 bg-primary/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">What Couples Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from couples who have used WeddingSnapStory to capture their special day
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={item}>
              <Card className="bg-card border-primary/10 h-full hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-6 text-muted-foreground italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-primary/10">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

