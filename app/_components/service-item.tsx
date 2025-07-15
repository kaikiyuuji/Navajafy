"use client"

import { Barbershop, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { CalendarIcon, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import { cn } from "../_lib/utils"
import { isBefore, set, startOfToday, addHours } from "date-fns"
import { CreateBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "../_actions/get-booking"
import { useRouter } from "next/navigation"

interface ServiceItemProps {
  service: {
    id: string
    name: string
    description: string
    imageUrl: string
    price: number
    barbershopId: string
  }
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const getTimeList = (bookings: Booking[]) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )
    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { status } = useSession()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
    setSelectedTime(undefined)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    setIsLoading(true)
    try {
      if (!selectedDay || !selectedTime) {
        console.error("Data ou horário não selecionados")
        return
      }
      const hour = Number(selectedTime?.split(":")[0])
      const minute = Number(selectedTime?.split(":")[1])
      const newDate = set(selectedDay, {
        hours: hour,
        minutes: minute,
        seconds: 0,
        milliseconds: 0,
      })

      // Verifica se a data/horário é pelo menos 1 hora no futuro
      const oneHourFromNow = addHours(new Date(), 1)
      if (isBefore(newDate, oneHourFromNow)) {
        toast.error("O horário da reserva deve ser pelo menos 1 hora no futuro")
        return
      }
      await CreateBooking({
        serviceId: service.id,
        date: newDate,
      })

      // Recarrega os dados do dia para atualizar horários disponíveis
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)

      toast.success("Reserva criada com sucesso!")
      setSelectedTime(undefined)
      setSelectedDay(undefined)
      setOpen(false) // Limpa o horário selecionado
    } catch (error) {
      console.log(error)
      toast.error("Erro ao criar reserva")
    } finally {
      setIsLoading(false)
    }
  }

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

              <Dialog
                open={open}
                onOpenChange={(isOpen) => {
                  if (status === "unauthenticated") {
                    router.push("/login")
                    return
                  }
                  setOpen(isOpen)
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="group transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                    onClick={(e) => {
                      if (status === "unauthenticated") {
                        e.preventDefault()
                        router.push("/login")
                      }
                    }}
                  >
                    <CalendarIcon size={14} className="mr-2" />
                    <span>Reservar</span>
                    <span className="ml-1 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent
                  aria-describedby={undefined}
                  className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]"
                >
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                      Fazer Reserva
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Calendar Section */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Selecione a data
                      </h3>
                      <div className="flex justify-center">
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          className="rounded-md border"
                          selected={selectedDay}
                          onSelect={handleDateSelect}
                          disabled={(date) => isBefore(date, startOfToday())}
                        />
                      </div>
                    </div>

                    {/* Time Selection */}
                    {selectedDay && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Selecione o horário
                        </h3>
                        <Command className="rounded-md border">
                          <CommandInput placeholder="Buscar horário..." />
                          <CommandList className="max-h-[120px]">
                            <CommandEmpty>
                              Nenhum horário encontrado.
                            </CommandEmpty>
                            <CommandGroup>
                              {getTimeList(dayBookings).map((time) => (
                                <CommandItem
                                  key={time}
                                  value={time}
                                  onSelect={() => handleTimeSelect(time)}
                                  className={cn(
                                    "cursor-pointer",
                                    (() => {
                                      const [hour, minute] = time
                                        .split(":")
                                        .map(Number)
                                      const selectedDateTime = set(
                                        selectedDay,
                                        { hours: hour, minutes: minute },
                                      )
                                      const oneHourFromNow = addHours(
                                        new Date(),
                                        1,
                                      )
                                      return isBefore(
                                        selectedDateTime,
                                        oneHourFromNow,
                                      )
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                    })(),
                                  )}
                                >
                                  {time}
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      selectedTime === time
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </div>
                    )}

                    {/* Booking Summary */}
                    {selectedDay && selectedTime && (
                      <Card className="border-2 border-primary/20 bg-primary/5">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <h3 className="text-base font-semibold text-primary">
                              Resumo da Reserva
                            </h3>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  {service.name}
                                </span>
                                <span className="text-sm font-semibold text-primary">
                                  {Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }).format(Number(service.price))}
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Data
                                </span>
                                <span className="text-sm font-medium">
                                  {selectedDay.toLocaleDateString("pt-BR", {
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
                                  {selectedTime}
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Barbearia
                                </span>
                                <span className="text-sm font-medium">
                                  {barbershop.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <DialogClose asChild>
                        <Button variant="outline" className="flex-1">
                          Cancelar
                        </Button>
                      </DialogClose>
                      <Button
                        onClick={handleCreateBooking}
                        disabled={!selectedDay || !selectedTime || isLoading}
                        className="flex-1"
                      >
                        {isLoading ? "Confirmando..." : "Confirmar Reserva"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
