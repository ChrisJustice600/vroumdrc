"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    })

    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-2xl text-card-foreground">Envoyez-nous un message</CardTitle>
        <CardDescription className="text-muted-foreground">
          Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-card-foreground">
                Prénom *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Jean"
                required
                className="bg-background text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-card-foreground">
                Nom *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Dupont"
                required
                className="bg-background text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-card-foreground">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jean.dupont@example.com"
              required
              className="bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-card-foreground">
              Téléphone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              className="bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-card-foreground">
              Sujet *
            </Label>
            <Select name="subject" required>
              <SelectTrigger className="bg-background text-foreground">
                <SelectValue placeholder="Sélectionnez un sujet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Je souhaite acheter un véhicule</SelectItem>
                <SelectItem value="sell">Je souhaite vendre mon véhicule</SelectItem>
                <SelectItem value="info">Demande d'information</SelectItem>
                <SelectItem value="support">Support technique</SelectItem>
                <SelectItem value="partnership">Partenariat</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-card-foreground">
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Décrivez votre demande en détail..."
              required
              rows={6}
              className="resize-none bg-background text-foreground"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            size="lg"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
