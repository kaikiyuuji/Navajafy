import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { CalendarIcon } from "lucide-react"

interface ServiceItemProps {
  service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card className="overflow-hidden border-secondary/50 transition-all duration-300 hover:border-primary/30">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative h-[140px] sm:h-auto sm:max-h-[110px] sm:min-h-[110px] sm:min-w-[110px] sm:max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="object-cover sm:rounded-l-lg"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
            <div>
              <h3 className="text-base font-semibold">{service.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Button
                size="sm"
                variant="secondary"
                className="group transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <CalendarIcon size={14} className="mr-2" />
                <span>Reservar</span>
                <span className="ml-1 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  →
                </span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
