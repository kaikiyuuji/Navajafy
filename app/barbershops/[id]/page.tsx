import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SidebarButton from "@/app/_components/sidebar-button"
import { Button } from "@/app/_components/ui/button"
import { SheetTrigger, Sheet } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import {
  ChevronLeftIcon,
  MapPinIcon,
  MenuIcon,
  StarIcon,
  InfoIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopDetailsParams {
  id: string
}

interface BarbershopDetailsProps {
  params: BarbershopDetailsParams
}

const BarbershopPage = async ({ params }: BarbershopDetailsProps) => {
  // Call to database
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  const serializedBarbershop = {
    ...barbershop,
    services: barbershop.services.map((service) => ({
      ...service,
      price: service.price.toString(),
    })),
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/95">
      {/* Hero Image */}
      <div className="relative h-[250px] w-full sm:h-[350px] md:h-[400px]">
        <Image
          src={serializedBarbershop.imageUrl}
          alt={serializedBarbershop.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4 z-10 shadow-md transition-all duration-300 hover:shadow-lg"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="absolute right-4 top-4 z-10 shadow-md transition-all duration-300 hover:shadow-lg"
              variant="outline"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarButton></SidebarButton>
        </Sheet>
      </div>

      <div className="relative z-10 -mt-10 px-5 lg:container sm:px-6 md:px-8 lg:mx-auto lg:max-w-6xl">
        <div
          className="animate-scale-in overflow-hidden rounded-2xl bg-card opacity-0 shadow-lg"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Barbershop Info */}
          <div className="space-y-2 border-b border-secondary/20 p-5 sm:p-6">
            <h1 className="text-xl font-bold sm:text-2xl">
              {serializedBarbershop.name}
            </h1>

            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center gap-1">
                <MapPinIcon className="text-primary" size={18} />
                <p className="text-sm">{serializedBarbershop?.address}</p>
              </div>

              <div className="flex items-center gap-1">
                <StarIcon className="fill-primary text-primary" size={18} />
                <p className="text-sm">5,0 (100 Avaliações)</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div
            className="animate-fade-in space-y-3 border-b border-secondary/20 p-5 opacity-0 sm:p-6"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="relative inline-block text-xs font-bold uppercase text-gray-400">
              Sobre nós
              <span className="absolute -bottom-1 left-0 h-0.5 w-8 bg-primary"></span>
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {serializedBarbershop?.description}
            </p>
          </div>

          {/* Services */}
          <div
            className="animate-fade-in space-y-4 border-b border-secondary/20 p-5 opacity-0 sm:p-6"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="relative inline-block text-xs font-bold uppercase text-gray-400">
              Serviços
              <span className="absolute -bottom-1 left-0 h-0.5 w-8 bg-primary"></span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              {serializedBarbershop.services.map((service) => (
                <div
                  key={service.id}
                  className="transform transition-all duration-300 hover:scale-[1.01] hover:shadow-md"
                >
                  <ServiceItem
                    service={{ ...service, price: parseFloat(service.price) }}
                    barbershop={serializedBarbershop}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div
            className="animate-fade-in space-y-4 p-5 opacity-0 sm:p-6"
            style={{ animationDelay: "0.4s" }}
          >
            <h2 className="relative inline-block text-xs font-bold uppercase text-gray-400">
              Contato
              <span className="absolute -bottom-1 left-0 h-0.5 w-8 bg-primary"></span>
            </h2>
            <div className="space-y-3">
              {serializedBarbershop.phones &&
              serializedBarbershop.phones.length > 0 ? (
                serializedBarbershop.phones.map((phone) => (
                  <PhoneItem key={phone} phone={phone} />
                ))
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <InfoIcon size={16} />
                  <p className="text-sm">Nenhum telefone cadastrado</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage
