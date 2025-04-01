"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, ChevronRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "suggestion" | "navigation" | "anecdote" | "tip"
  actions?: {
    label: string
    path?: string
    action?: () => void
  }[]
}

export function FedinoChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [showProactiveModal, setShowProactiveModal] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessages = [
        {
          id: "1",
          content: "Ciao! Sono Fedino, il tuo assistente per WeddingSnapStory! 💍",
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        },
        {
          id: "2",
          content:
            "Posso aiutarti a scoprire tutte le funzionalità del nostro sito e darti consigli per il tuo matrimonio. Cosa vorresti sapere?",
          sender: "bot",
          timestamp: new Date(),
          type: "suggestion",
          actions: [
            {
              label: "Funzionalità del sito",
              action: () => handleSuggestionClick("Quali sono le funzionalità del sito?"),
            },
            {
              label: "Consigli per il matrimonio",
              action: () => handleSuggestionClick("Hai consigli per organizzare il matrimonio?"),
            },
            { label: "Come iniziare", action: () => handleSuggestionClick("Come posso iniziare a usare l'app?") },
          ],
        },
      ]
      setMessages(initialMessages)
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Proactive chat modal
  useEffect(() => {
    const checkInactivity = () => {
      const now = Date.now()
      if (now - lastActivity > 60000 && !isOpen && !showProactiveModal) {
        // 1 minute
        const randomChance = Math.random()
        if (randomChance < 0.7) {
          // 70% chance to show modal
          setShowProactiveModal(true)
        }
      }
    }

    const interval = setInterval(checkInactivity, 30000) // Check every 30 seconds

    const activityListener = () => {
      setLastActivity(Date.now())
    }

    window.addEventListener("mousemove", activityListener)
    window.addEventListener("click", activityListener)
    window.addEventListener("keypress", activityListener)

    return () => {
      clearInterval(interval)
      window.removeEventListener("mousemove", activityListener)
      window.removeEventListener("click", activityListener)
      window.removeEventListener("keypress", activityListener)
    }
  }, [isOpen, lastActivity, showProactiveModal])

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (input.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Process the message and generate a response
    setTimeout(() => {
      const botResponse = generateResponse(input.toLowerCase())
      setMessages((prev) => [...prev, botResponse])
    }, 500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: suggestion,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Process the suggestion and generate a response
    setTimeout(() => {
      const botResponse = generateResponse(suggestion.toLowerCase())
      setMessages((prev) => [...prev, botResponse])
    }, 500)
  }

  const generateResponse = (message: string): Message => {
    // Wedding anecdotes
    const anecdotes = [
      "Lo sapevi che la tradizione di lanciare il riso agli sposi simboleggia fertilità e prosperità? Oggi molti optano per alternative eco-friendly come bolle di sapone o petali di fiori!",
      "Un tempo, il velo della sposa serviva a proteggerla dagli spiriti maligni. Oggi è diventato un bellissimo accessorio di stile!",
      "La tradizione della torta nuziale risale all'antica Roma, dove si rompeva una focaccia sulla testa della sposa come simbolo di fertilità!",
      "Il 'qualcosa di blu' nella tradizione 'qualcosa di vecchio, nuovo, prestato e blu' rappresenta purezza, fedeltà e amore.",
      "Lo sapevi che il mese di giugno prende il nome dalla dea romana Giunone, protettrice del matrimonio? Per questo è considerato il mese ideale per sposarsi!",
    ]

    // Wedding tips
    const tips = [
      "Consiglio: Crea una lista di riproduzione con le tue canzoni preferite da condividere con il DJ. La musica giusta può trasformare completamente l'atmosfera della festa!",
      "Consiglio: Assegna un 'coordinatore del giorno' che si occupi di gestire i piccoli imprevisti, così tu potrai goderti ogni momento senza stress.",
      "Consiglio: Prepara un kit di emergenza con tutto il necessario: fazzoletti, cerotti, spille da balia, rossetto per ritocchi e una bottiglietta d'acqua.",
      "Consiglio: Fai delle pause durante il ricevimento per assorbire tutto. Il giorno passa in un lampo, prenditi dei momenti per te e il tuo partner.",
      "Consiglio: Considera di fare un 'first look' prima della cerimonia. È un momento intimo per voi due e permette di fare più foto prima che arrivino gli ospiti.",
    ]

    // Check for specific queries
    if (message.includes("funzionalità") || message.includes("cosa può fare") || message.includes("cosa offre")) {
      return {
        id: Date.now().toString(),
        content: "WeddingSnapStory offre numerose funzionalità per rendere il tuo matrimonio indimenticabile:",
        sender: "bot",
        timestamp: new Date(),
        type: "navigation",
        actions: [
          { label: "Album Digitale", path: "/dashboard/album" },
          { label: "Condivisione Foto", path: "/dashboard/sharing" },
          { label: "Gestione Ospiti", path: "/dashboard/guests" },
          { label: "Timeline Matrimonio", path: "/dashboard/timeline" },
          { label: "Pianificazione Luna di Miele", path: "/dashboard/honeymoon" },
        ],
      }
    } else if (message.includes("iniziare") || message.includes("registrarsi") || message.includes("creare account")) {
      return {
        id: Date.now().toString(),
        content: "Iniziare con WeddingSnapStory è semplicissimo! Ecco cosa devi fare:",
        sender: "bot",
        timestamp: new Date(),
        type: "navigation",
        actions: [
          { label: "Registrati", path: "/auth/register" },
          { label: "Accedi se hai già un account", path: "/auth/login" },
          { label: "Guarda la demo", path: "/demo" },
        ],
      }
    } else if (message.includes("consigli") || message.includes("suggerimenti") || message.includes("aiuto")) {
      return {
        id: Date.now().toString(),
        content: tips[Math.floor(Math.random() * tips.length)],
        sender: "bot",
        timestamp: new Date(),
        type: "tip",
      }
    } else if (message.includes("aneddoto") || message.includes("curiosità") || message.includes("tradizione")) {
      return {
        id: Date.now().toString(),
        content: anecdotes[Math.floor(Math.random() * anecdotes.length)],
        sender: "bot",
        timestamp: new Date(),
        type: "anecdote",
      }
    } else if (message.includes("chi sei") || message.includes("come ti chiami")) {
      return {
        id: Date.now().toString(),
        content:
          "Sono Fedino, il tuo assistente virtuale per WeddingSnapStory! Il mio nome deriva da 'fede nuziale' perché sono qui per aiutarti con tutto ciò che riguarda il tuo matrimonio. Sono stato creato da Il Vikingo del Web per rendere la tua esperienza sul sito ancora più speciale!",
        sender: "bot",
        timestamp: new Date(),
        type: "text",
      }
    } else if (message.includes("grazie") || message.includes("thank")) {
      return {
        id: Date.now().toString(),
        content:
          "È un piacere aiutarti! Se hai altre domande, sono qui per te. Ti auguro un matrimonio meraviglioso! 💍✨",
        sender: "bot",
        timestamp: new Date(),
        type: "text",
      }
    } else if (
      message.includes("ciao") ||
      message.includes("salve") ||
      message.includes("buongiorno") ||
      message.includes("buonasera")
    ) {
      return {
        id: Date.now().toString(),
        content:
          "Ciao! Sono felice di aiutarti oggi. Come posso rendere i preparativi del tuo matrimonio più semplici?",
        sender: "bot",
        timestamp: new Date(),
        type: "suggestion",
        actions: [
          {
            label: "Funzionalità del sito",
            action: () => handleSuggestionClick("Quali sono le funzionalità del sito?"),
          },
          {
            label: "Consigli per il matrimonio",
            action: () => handleSuggestionClick("Hai consigli per organizzare il matrimonio?"),
          },
        ],
      }
    } else if (message.includes("album") || message.includes("foto")) {
      return {
        id: Date.now().toString(),
        content:
          "Il nostro Album Digitale ti permette di raccogliere e organizzare tutte le foto del tuo matrimonio in un unico posto! Puoi creare album personalizzati, aggiungere descrizioni e condividerli con i tuoi ospiti. Vuoi vedere come funziona?",
        sender: "bot",
        timestamp: new Date(),
        type: "navigation",
        actions: [
          { label: "Vai all'Album Digitale", path: "/dashboard/album" },
          {
            label: "Scopri altre funzionalità",
            action: () => handleSuggestionClick("Quali sono le altre funzionalità?"),
          },
        ],
      }
    } else if (message.includes("ospiti") || message.includes("invitati") || message.includes("guest")) {
      return {
        id: Date.now().toString(),
        content:
          "La Gestione Ospiti ti aiuta a tenere traccia di tutti i tuoi invitati, gestire gli RSVP e organizzare i tavoli. Puoi anche inviare inviti digitali e aggiornamenti direttamente dall'app!",
        sender: "bot",
        timestamp: new Date(),
        type: "navigation",
        actions: [
          { label: "Gestisci i tuoi ospiti", path: "/dashboard/guests" },
          {
            label: "Scopri altre funzionalità",
            action: () => handleSuggestionClick("Quali sono le altre funzionalità?"),
          },
        ],
      }
    } else if (message.includes("timeline") || message.includes("programma") || message.includes("agenda")) {
      return {
        id: Date.now().toString(),
        content:
          "La Timeline del Matrimonio ti permette di pianificare ogni momento del tuo grande giorno! Puoi creare un programma dettagliato, impostare promemoria e condividerlo con il tuo wedding planner e i fornitori.",
        sender: "bot",
        timestamp: new Date(),
        type: "navigation",
        actions: [
          { label: "Vai alla Timeline", path: "/dashboard/timeline" },
          {
            label: "Scopri altre funzionalità",
            action: () => handleSuggestionClick("Quali sono le altre funzionalità?"),
          },
        ],
      }
    } else if (message.includes("luna di miele") || message.includes("honeymoon") || message.includes("viaggio")) {
      return {
        id: Date.now().toString(),
        content:
          "La sezione Luna di Miele ti permette di pianificare e documentare il vostro viaggio post-matrimonio! Puoi aggiungere destinazioni, creare un itinerario e condividere foto e ricordi con amici e familiari.",
        sender: "bot",
        timestamp: new Date(),
        type: "navigation",
        actions: [
          { label: "Pianifica la Luna di Miele", path: "/dashboard/honeymoon" },
          {
            label: "Scopri altre funzionalità",
            action: () => handleSuggestionClick("Quali sono le altre funzionalità?"),
          },
        ],
      }
    } else if (message.includes("vikingo") || message.includes("creatore") || message.includes("sviluppatore")) {
      return {
        id: Date.now().toString(),
        content:
          "WeddingSnapStory è stato creato da Il Vikingo del Web, un talentuoso sviluppatore web specializzato in applicazioni innovative e user-friendly. Puoi trovare il suo logo nel footer del sito!",
        sender: "bot",
        timestamp: new Date(),
        type: "text",
      }
    } else {
      // Generic response with a random anecdote or tip
      const randomResponse =
        Math.random() > 0.5
          ? anecdotes[Math.floor(Math.random() * anecdotes.length)]
          : tips[Math.floor(Math.random() * tips.length)]

      return {
        id: Date.now().toString(),
        content: `Non sono sicuro di aver capito completamente. Posso aiutarti con informazioni sulle funzionalità del sito, consigli per il matrimonio o navigazione nel sito. Nel frattempo, ecco qualcosa che potrebbe interessarti:\n\n${randomResponse}`,
        sender: "bot",
        timestamp: new Date(),
        type: Math.random() > 0.5 ? "anecdote" : "tip",
        actions: [
          {
            label: "Funzionalità del sito",
            action: () => handleSuggestionClick("Quali sono le funzionalità del sito?"),
          },
          {
            label: "Consigli per il matrimonio",
            action: () => handleSuggestionClick("Hai consigli per organizzare il matrimonio?"),
          },
        ],
      }
    }
  }

  const navigateTo = (path: string) => {
    router.push(path)

    // Add a navigation confirmation message
    const navigationMessage: Message = {
      id: Date.now().toString(),
      content: `Ti sto portando a ${path}...`,
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, navigationMessage])

    // Close the chat after navigation
    setTimeout(() => {
      setIsOpen(false)
    }, 1000)
  }

  return (
    <>
      {/* Chatbot button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => {
            setIsOpen(!isOpen)
            setShowProactiveModal(false)
          }}
          className="w-14 h-14 rounded-full shadow-lg relative"
          size="icon"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="relative">
              <FedinoIcon className="h-8 w-8" />
              {messages.length > 0 && !isOpen && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {messages.filter((m) => m.sender === "bot" && !m.content.includes("Ti sto portando")).length -
                    messages.filter((m) => m.sender === "user").length}
                </span>
              )}
            </div>
          )}
        </Button>
      </motion.div>

      {/* Proactive chat modal */}
      <AnimatePresence>
        {showProactiveModal && !isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 max-w-xs"
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.3 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Card className="p-4 shadow-lg border-primary/20 bg-card/95 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10 rounded-full bg-primary/10 p-1">
                  <FedinoIcon className="h-8 w-8" />
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Fedino</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ciao! Posso aiutarti a scoprire tutte le funzionalità di WeddingSnapStory?
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="default"
                      className="text-xs"
                      onClick={() => {
                        setIsOpen(true)
                        setShowProactiveModal(false)
                      }}
                    >
                      Parliamo!
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => setShowProactiveModal(false)}
                    >
                      Più tardi
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => setShowProactiveModal(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-full max-w-md"
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Card className="shadow-xl border-primary/20 overflow-hidden h-[500px] max-h-[80vh] flex flex-col">
              {/* Chat header */}
              <div className="p-4 border-b flex items-center justify-between bg-primary/5">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 rounded-full bg-primary/10 p-1">
                    <FedinoIcon className="h-8 w-8" />
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Fedino</h3>
                    <p className="text-xs text-muted-foreground">Il tuo assistente matrimoniale</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`max-w-[80%] ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}
                    >
                      {message.sender === "bot" && (
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="w-6 h-6 rounded-full bg-primary/10 p-0.5">
                            <FedinoIcon className="h-5 w-5" />
                          </Avatar>
                          <span className="text-xs font-medium">Fedino</span>
                        </div>
                      )}

                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                      {message.type === "anecdote" && (
                        <div className="mt-2 text-xs flex items-center text-muted-foreground">
                          <Info className="h-3 w-3 mr-1" />
                          <span>Curiosità sul matrimonio</span>
                        </div>
                      )}

                      {message.type === "tip" && (
                        <div className="mt-2 text-xs flex items-center text-muted-foreground">
                          <Info className="h-3 w-3 mr-1" />
                          <span>Consiglio per il matrimonio</span>
                        </div>
                      )}

                      {message.actions && message.actions.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant="secondary"
                              size="sm"
                              className="w-full justify-between text-xs"
                              onClick={() => {
                                if (action.path) {
                                  navigateTo(action.path)
                                } else if (action.action) {
                                  action.action()
                                }
                              }}
                            >
                              {action.label}
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          ))}
                        </div>
                      )}

                      <div className="mt-1 text-right">
                        <span className="text-[10px] opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Scrivi un messaggio..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Fedino Icon Component (Ring with eyes)
function FedinoIcon({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.2" />

        {/* Left eye */}
        <circle cx="9" cy="10" r="1.5" fill="currentColor" />

        {/* Right eye */}
        <circle cx="15" cy="10" r="1.5" fill="currentColor" />

        {/* Smile */}
        <path
          d="M9 14C9 14 10 16 12 16C14 16 15 14 15 14"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Sparkle */}
        <path d="M18 6L19 7M20 4L19 5M18 8L20 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  )
}

