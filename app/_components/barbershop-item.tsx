import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { StarIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import Link from "next/link"

interface BarbershopItemsProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemsProps) => {
  return (
    <Card className="min-w-[167px] overflow-hidden rounded-2xl border border-secondary/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="p-0">
        {/* Image with overlay gradient */}
        <div className="group relative h-[159px] w-full">
          <Image
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

          <Badge
            className="pb-0.3 shine-effect absolute left-3 top-3 space-x-1 shadow-md"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="pr-1 text-xs">5.0</p>
          </Badge>
        </div>

        {/* Text Content */}
        <div className="px-3 py-3">
          <h3 className="truncate text-base font-semibold">
            {barbershop.name}
          </h3>
          <p className="truncate pb-3 text-sm text-gray-400">
            {barbershop.address}
          </p>
          <Button
            variant="secondary"
            className="pulse-animation group w-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link
              href={`/barbershops/${barbershop.id}`}
              className="flex items-center justify-center gap-2"
            >
              <span>Reservar</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
