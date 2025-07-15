import Header from "./_components/header"
import { Button } from "./_components/ui/button"  
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import ServiceDropdownClient from "./_components/service-dropdown-client"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { Carousel, CarouselContent, CarouselItem } from "./_components/ui/carousel" // Import Carousel components
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"

const Home = async () => {
  // Call to database
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const bookings = session?.user ? await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  }) : []
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      <div className="px-5 lg:container sm:px-6 md:px-8 lg:mx-auto lg:max-w-6xl">
        {/* User Greeting - With Animation */}
        {session?.user ? (
        <div
          className="animate-fade-in opacity-0"
          style={{ animationDelay: "0.1s", animationDuration: "0.5s" }}
        >
          <h2 className="mt-6 text-2xl font-bold">Olá, {session?.user?.name}!</h2>
          <p className="mb-3 text-sm text-gray-400">
            {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
          </p>
        </div>) : (
        <div
          className="animate-fade-in opacity-0"
          style={{ animationDelay: "0.1s", animationDuration: "0.5s" }}
        >
        <div className="flex items-center mt-6">
        <h2 className="text-2xl font-bold ">Olá, Faça seu {" "}
          <Link href="/login" className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80">
            Login!
          </Link>
        </h2>
        </div>
          <p className="mb-3 text-sm text-gray-400">
            {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
          </p>
        </div>
        )}

        {/* Search and Filter Section */}
        <div className="mb-6">
          <div className="flex flex-col gap-3 md:flex-row">
            {/* Search - With Animation */}
            <div
              className="animate-fade-in flex-1 opacity-0"
              style={{ animationDelay: "0.2s", animationDuration: "0.5s" }}
            >
              <Search />
            </div>

            {/* Fast Search Categories - With Dropdown */}
            <div
              className="animate-fade-in mt-3 opacity-0 md:mt-0 md:w-[220px]"
              style={{ animationDelay: "0.25s", animationDuration: "0.5s" }}
            >
              <ServiceDropdownClient quickSearchOptions={quickSearchOptions} />
            </div>
          </div>
        </div>

        {/* Booking Section - With Animation */}
        {/* Render only if there are bookings */}
        {bookings.length > 0 && (
          <div
            className="animate-fade-in opacity-0"
            style={{ animationDelay: "0.3s", animationDuration: "0.5s" }}
          >
            <h2 className="relative mb-3 inline-block text-sm font-bold uppercase text-gray-400">
              Agendamentos
              <span className="absolute -bottom-1 left-0 h-0.5 w-10 bg-primary"></span>
            </h2>
            
            {/* Use Carousel for bookings */}
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {bookings.map((booking) => (
                  <CarouselItem key={booking.id} className="pl-4 pr-2 pt-4 basis-full">
                    <BookingItem booking={booking} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Add CarouselPrevious and CarouselNext if needed */}
              {/* <CarouselPrevious /> */}
              {/* <CarouselNext /> */}
            </Carousel>
            {/* Indicador moderno de arraste */}
            <div className="flex flex-col items-center mt-1">
              <div className="flex items-center gap-1">
                <span className="animate-bounce-left-right text-gray-400 text-lg select-none">←</span>
                <div className="w-8 h-1 rounded-full bg-gray-300 opacity-70 animate-pulse" />
                <div className="w-10 h-2 rounded-full bg-gray-300 opacity-70 animate-pulse" />
                <div className="w-8 h-1 rounded-full bg-gray-300 opacity-70 animate-pulse" />
                <span className="animate-bounce-right-left text-gray-400 text-lg select-none">→</span>
              </div>
            </div>
          </div>
        )}


        {/* Recommended Section - With Animation */}
        <div
          className="animate-fade-in mt-8 opacity-0"
          style={{ animationDelay: "0.35s", animationDuration: "0.5s" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="relative text-sm font-bold uppercase text-gray-400">
              Recomendados
              <span className="absolute -bottom-1 left-0 h-0.5 w-10 bg-primary"></span>
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary hover:text-primary/80"
            >
              Ver todos
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {barbershops.map((barbershop) => (
              <div
                key={barbershop.id}
                className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <BarbershopItem barbershop={barbershop} />
              </div>
            ))}
          </div>
        </div>

        {/* Popular Section - With Animation */}
        <div
          className="animate-fade-in mt-8 opacity-0"
          style={{ animationDelay: "0.4s", animationDuration: "0.5s" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="relative text-sm font-bold uppercase text-gray-400">
              Populares
              <span className="absolute -bottom-1 left-0 h-0.5 w-10 bg-primary"></span>
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary hover:text-primary/80"
            >
              Ver todos
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {popularBarbershops.map((barbershop) => (
              <div
                key={barbershop.id}
                className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <BarbershopItem barbershop={barbershop} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
