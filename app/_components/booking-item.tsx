import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { CalendarIcon, ClockIcon, CheckCircleIcon } from "lucide-react"

const BookingItem = () => {
  return (
    <>
      <h2 className="relative mb-3 inline-block text-xs font-bold uppercase text-gray-400">
        Agendamentos
        <span className="absolute -bottom-1 left-0 h-0.5 w-10 bg-primary"></span>
      </h2>

      <Card className="card-hover overflow-hidden border-secondary/50 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
        <CardContent className="p-0">
          <div className="flex flex-col justify-between sm:flex-row">
            {/* Booking Left */}
            <div className="flex flex-col gap-3 p-5">
              <Badge className="shine-effect w-fit items-center justify-center bg-emerald-500/10 font-bold text-emerald-500 transition-colors hover:bg-emerald-500/20">
                <CheckCircleIcon size={14} className="mr-1" />
                Confirmado
              </Badge>

              <h3 className="text-lg font-semibold">Corte de Cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-primary/20">
                  <AvatarImage src="https://utfs.io/f/0522fdaf-0357-4213-8f52-1d83c3dcb6cd-18e.png" />
                </Avatar>
                <p className="text-sm font-medium">Barbearia Nvj</p>
              </div>
            </div>

            {/* Booking Right */}
            <div className="flex items-center justify-between border-t border-secondary/20 bg-secondary/30 p-4 sm:flex-col sm:items-center sm:justify-center sm:border-l sm:border-t-0 sm:p-5">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <CalendarIcon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Agosto</p>
                  <p className="text-base font-bold">10</p>
                </div>
              </div>

              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ClockIcon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Horário</p>
                  <p className="text-base font-bold">20:00</p>
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
