"use client"

import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { CalendarIcon, ClockIcon, CheckCircleIcon } from "lucide-react"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { useState } from "react"
import { deleteBooking } from "../_actions/delete-booking"
import { toast } from "sonner"

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
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao cancelar reserva. Tente novamente.")
    }
  }
  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }
  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild className="w-full">
        {/* Booking Card */}
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

                <h3 className="text-lg font-semibold">
                  {booking.service.name}
                </h3>

                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-primary/20">
                    <AvatarImage src={booking.service.barbershop.imageUrl} />
                  </Avatar>
                  <p className="text-sm font-medium">
                    {booking.service.barbershop.name}
                  </p>
                </div>
              </div>

              {/* Booking Right */}
              <div className="flex items-center justify-between border-t border-secondary/20 bg-secondary/30 p-4 sm:flex-col sm:items-center sm:justify-center sm:border-l sm:border-t-0 sm:p-5">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <CalendarIcon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs capitalize text-muted-foreground">
                      {format(booking.date, "MMM", { locale: ptBR })}
                    </p>
                    <p className="text-base font-bold">
                      {format(booking.date, "dd", { locale: ptBR })}
                    </p>
                  </div>
                </div>

                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <ClockIcon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Horário</p>
                    <p className="text-base font-bold">
                      {format(booking.date, "HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[85%]">
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-semibold">
            Detalhes do Agendamento
          </SheetTitle>
        </SheetHeader>
        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
            src="/map.png"
            fill
            className="rounded-xl object-cover"
          />

          <Card className="z-50 mx-5 mb-3 w-full rounded-xl bg-card/80 backdrop-blur-sm">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="text-sm font-bold">
                  {booking.service.barbershop.name}
                </h3>
                <p className="text-xs">{booking.service.barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4">
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
          <Card className="mt-4 border-2 border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-primary">
                  Resumo da Reserva
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {booking.service.name}
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number(booking.service.price))}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Data</span>
                    <span className="text-sm font-medium">
                      {booking.date.toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Horário
                    </span>
                    <span className="text-sm font-medium">
                      {booking.date.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 space-y-2">
            {booking.service.barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>
        <SheetFooter className="mt-6 w-full">
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button
                    variant="destructive"
                    className="shine-effect hover:animation-none w-full duration-300 hover:shadow-lg hover:shadow-destructive/40"
                  >
                    Cancelar Reserva
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <DialogHeader>
                    <DialogTitle>
                      Você deseja cancelar seu agendamento?
                    </DialogTitle>
                    <DialogDescription>
                      Ao cancelar, você perderá seu agendamento e não poderá
                      recuperá-lo. Essa ação é irreversível.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button variant="secondary" className="w-full">
                        Voltar
                      </Button>
                    </DialogClose>
                    <DialogClose className="w-full">
                      <Button
                        variant="destructive"
                        onClick={handleCancelBooking}
                        className="shine-effect hover:animation-none w-full duration-300 hover:shadow-lg hover:shadow-destructive/40"
                      >
                        Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
