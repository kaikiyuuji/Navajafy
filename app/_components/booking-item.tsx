import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { CalendarIcon, ClockIcon, CheckCircleIcon } from "lucide-react"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => { 
  const isConfirmed = isFuture(booking.date)
  return (
    <>
      <Card className="card-hover overflow-hidden border-secondary/50 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
        <CardContent className="p-0">
          <div className="flex flex-col justify-between sm:flex-row">
            {/* Booking Left */}
            <div className="flex flex-col gap-3 p-5">
              {isConfirmed ? (
                <Badge className="shine-effect w-fit items-center justify-center bg-emerald-500/10 font-bold text-emerald-500 transition-colors hover:bg-emerald-500/20">
                <CheckCircleIcon size={14} className="mr-1" />
                Confirmado
              </Badge>
              ) : (
                <Badge className="shine-effect w-fit items-center justify-center bg-zinc-500/10 font-bold text-zinc-500 transition-colors hover:bg-zinc-500/20">
                  <ClockIcon size={14} className="mr-1" />
                  Finalizado
                </Badge>
              )}

              <h3 className="text-lg font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-primary/20">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm font-medium">{booking.service.barbershop.name}</p>
              </div>
            </div>

            {/* Booking Right */}
            <div className="flex items-center justify-between border-t border-secondary/20 bg-secondary/30 p-4 sm:flex-col sm:items-center sm:justify-center sm:border-l sm:border-t-0 sm:p-5">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <CalendarIcon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground capitalize">{format(booking.date, "MMM", { locale: ptBR })}</p>
                  <p className="text-base font-bold">{format(booking.date, "dd", { locale: ptBR })}</p>
                </div>
              </div>

              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ClockIcon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Horário</p>
                  <p className="text-base font-bold">{format(booking.date, "HH:mm", { locale: ptBR })}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem