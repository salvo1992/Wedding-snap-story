import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="bg-card py-12 border-t border-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-muted-foreground mb-4 max-w-md">
              Create, share, and cherish your wedding memories with our all-in-one digital wedding album platform.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://instagram.com">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://facebook.com">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/features/album" className="text-muted-foreground hover:text-foreground transition-colors">
                  Digital Album
                </Link>
              </li>
              <li>
                <Link
                  href="/features/sharing"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Photo Sharing
                </Link>
              </li>
              <li>
                <Link href="/features/guests" className="text-muted-foreground hover:text-foreground transition-colors">
                  Guest Management
                </Link>
              </li>
              <li>
                <Link
                  href="/features/timeline"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Wedding Timeline
                </Link>
              </li>
              <li>
                <Link
                  href="/features/honeymoon"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Honeymoon Planning
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} WeddingSnapStory. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-sm mr-2">Developed by</span>
            <Link href="https://vikingodiweb.com" className="flex items-center hover:text-primary transition-colors">
              <VikingLogo className="h-6 w-6 mr-1" />
              <span className="font-medium">Il Vikingo del Web</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function VikingLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 3L4 10L6 20L12 22L18 20L20 10L12 3Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path d="M8 10L12 14L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 15H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 7V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

