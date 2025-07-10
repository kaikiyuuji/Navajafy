"use client"

import { Barbershop } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose, // Import SheetFooter
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { cn } from "../_lib/utils"
import { isBefore, set, startOfToday } from "date-fns" // Import isBefore and startOfToday
import { CreateBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

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

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const {data} = useSession()

  const [open, setOpen] = useState(false)

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)

  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
    setSelectedTime(undefined)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setOpen(false)
    console.log(`Horário selecionado: ${time} no dia ${selectedDay?.toLocaleDateString()}`);
  }

  const handleCreateBooking = async () => {
    try { if (!selectedDay || !selectedTime) {
      console.error("Data ou horário não selecionados");
      return;
    }
    const hour = Number(selectedTime?.split(':')[0]);
    const minute = Number(selectedTime?.split(':')[1]);
    const newDate = set(selectedDay, {
      hours: hour,
      minutes: minute, 
    })
    await CreateBooking({
      serviceId: service.id,
      userId: (data?.user as any).id,
      date: newDate,
    })
    toast.success("Reserva criada com sucesso!")
  }catch (error) {
    console.log(error)
    toast.error("Erro ao criar reserva")
  }
    
  };

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

              <Sheet>
                <SheetTrigger asChild>
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
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="align-center flex flex-col items-center border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      className="w-full"
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      disabled={(date) => isBefore(date, startOfToday())}
                    />
                  </div>

                  <div className="align-center flex flex-col items-center border-b border-solid py-5">

                    {/* Combobox for time selection */}
                    <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                      variant="outline"
                      className="w-[190px] justify-between"
                      disabled={!selectedDay} // Disable if no day is selected
                      >
                      {/* Placeholder or selected time */}
                      {selectedTime ? selectedTime : "Selecione um horário"}
                      <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[190px] p-0">
                      <Command>
                      <CommandInput placeholder="Buscar horário..." />
                      <CommandList>
                        <CommandEmpty>Nenhum horário encontrado.</CommandEmpty>
                        <CommandGroup>
                        {TIME_LIST.map((time) => (
                          <CommandItem
                          key={time}
                          value={time}
                          onSelect={() => handleTimeSelect(time)} // Use handleTimeSelect
                          >
                          {time}
                          {/* Add check icon if selected */}
                          <Check
                            className={cn(
                            "ml-auto h-4 w-4",
                            selectedTime === time ? "opacity-100" : "opacity-0" // Check if this time is selected
                            )}
                          />
                          </CommandItem>
                        ))}
                        </CommandGroup>
                      </CommandList>
                      </Command>
                    </PopoverContent>
                    </Popover>
                  </div>
                    <Card className="mt-4">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <p className="text-sm font-semibold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="font-sm text-gray-400">Data</h2>
                          <p className="text-sm">
                            {selectedDay ? selectedDay.toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }) : 'Data não selecionada'}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="font-sm text-gray-400">Horário</h2>
                          <p className="text-sm">
                            {selectedTime ? selectedTime : 'Horário não selecionado'}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="font-sm text-gray-400">Barbearia</h2>
                          <p className="text-sm">
                            {barbershop.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    

                  <div className="flex w-full items-center">
                    {/* Add SheetFooter here */}
                    <SheetFooter className="flex w-full">
                      <SheetClose asChild>
                        <Button
                          className="w-full mt-4"
                          onClick={handleCreateBooking}
                          disabled={!selectedDay || !selectedTime}
                        >
                          Confirmar
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
