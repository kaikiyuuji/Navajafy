import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./_components/ui/dropdown-menu"
import { ChevronDown, ScissorsIcon } from "lucide-react"

const Home = async () => {
  // Call to database
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Header */}
      <Header />

      <div className="px-5 lg:container sm:px-6 md:px-8 lg:mx-auto lg:max-w-6xl">
        {/* User Greeting - With Animation */}
        <div
          className="animate-fade-in opacity-0"
          style={{ animationDelay: "0.1s", animationDuration: "0.5s" }}
        >
          <h2 className="mt-6 text-2xl font-bold">Olá, Kaiki!</h2>
          <p className="mb-3 text-sm text-gray-400">
            Segunda-feira, 08 de julho
          </p>
        </div>

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex h-11 w-full items-center gap-2 rounded-xl border-secondary/70 bg-secondary/30 transition-all duration-300 hover:border-primary/50 hover:bg-secondary/50 hover:shadow-md"
                  >
                    <ScissorsIcon size={16} className="text-primary" />
                    <span className="text-sm font-normal text-muted-foreground">
                      Selecione um serviço
                    </span>
                    <ChevronDown size={16} className="ml-auto opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[220px] rounded-xl border-secondary/70 bg-secondary/90 backdrop-blur-md"
                >
                  {quickSearchOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.title}
                      className="cursor-pointer gap-2 focus:bg-secondary/50 focus:text-foreground"
                    >
                      <div className="flex h-5 w-5 items-center justify-center">
                        <Image
                          src={option.imageUrl}
                          width={16}
                          height={16}
                          alt={option.title}
                          className="transition-transform duration-300"
                        />
                      </div>
                      {option.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Booking Section - With Animation */}
        <div
          className="animate-fade-in opacity-0"
          style={{ animationDelay: "0.3s", animationDuration: "0.5s" }}
        >
          <BookingItem />
        </div>

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
