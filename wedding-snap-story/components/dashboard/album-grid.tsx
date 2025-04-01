"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Heart, Download, Share2, Trash2 } from "lucide-react"

export function AlbumGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Sample images for the grid
  const images = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    src: `/placeholder.svg?height=400&width=600`,
    alt: `Wedding photo ${i + 1}`,
    likes: Math.floor(Math.random() * 20),
    isLiked: false,
  }))

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card
            key={image.id}
            className="overflow-hidden group cursor-pointer hover:shadow-md transition-all"
            onClick={() => setSelectedImage(image.id)}
          >
            <CardContent className="p-0 relative">
              <div className="aspect-square bg-muted">
                <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="secondary" size="sm" className="text-xs">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Wedding Photo</DialogTitle>
            <DialogDescription>Captured on June 15, 2024</DialogDescription>
          </DialogHeader>

          {selectedImage !== null && (
            <div className="space-y-4">
              <div className="rounded-md overflow-hidden bg-muted">
                <img
                  src={images[selectedImage].src || "/placeholder.svg"}
                  alt={images[selectedImage].alt}
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Like ({images[selectedImage].likes})
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

