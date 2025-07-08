"use client"

import { Smartphone, Copy, CheckCircle } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { useState } from "react"
import { Card, CardContent } from "./ui/card"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    setCopied(true)
    toast.success("Telefone copiado com sucesso!")

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Card className="overflow-hidden border-secondary/50 transition-all duration-300 hover:border-primary/30">
      <CardContent className="flex items-center justify-between p-3 sm:p-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Smartphone className="text-primary" size={16} />
          </div>
          <p className="text-sm font-medium">{phone}</p>
        </div>

        {/* Right */}
        <Button
          size="sm"
          variant={copied ? "default" : "outline"}
          onClick={() => handleCopyPhoneClick(phone)}
          className="group transition-all duration-300"
        >
          {copied ? (
            <>
              <CheckCircle size={14} className="mr-1" />
              <span>Copiado</span>
            </>
          ) : (
            <>
              <Copy
                size={14}
                className="mr-1 transition-transform duration-300 group-hover:scale-110"
              />
              <span>Copiar</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export default PhoneItem
