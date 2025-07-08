import BarbershopItem from "../_components/barbershop-item"
import { db } from "../_lib/prisma"
import Header from "../_components/header"
import { SearchIcon } from "lucide-react"
import Search from "../_components/search"

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const search = searchParams.search || "";
  let barbershops;

  if (search.toLowerCase().startsWith("serviço:")) {
    const serviceName = search.slice(8).trim();
    barbershops = await db.barbershop.findMany({
      where: {
        services: {
          some: {
            name: {
              contains: serviceName,
              mode: "insensitive",
            },
          },
        },
      },
      include: {
        services: true,
      },
    });
  } else {
    barbershops = await db.barbershop.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            address: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            services: {
              some: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      include: {
        services: true,
      },
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/95">
      <Header />

      <div className="flex-1 px-5 lg:container sm:px-6 md:px-8 lg:mx-auto lg:max-w-6xl">
        <div className="my-4">
          <Search/> 
        </div> 
        <div
          className="animate-fade-in mb-6 mt-6 flex items-center gap-2 opacity-0"
          style={{ animationDelay: "0.1s", animationDuration: "0.5s" }}
        >
          <SearchIcon className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">
            Resultados para &quot;{searchParams.search}&quot;
          </h1>
        </div>

        {barbershops.length > 0 ? (
          <div
            className="animate-fade-in grid grid-cols-1 gap-4 opacity-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            style={{ animationDelay: "0.2s", animationDuration: "0.5s" }}
          >
            {barbershops.map((barbershop) => (
              <div
                key={barbershop.id}
                className="card-hover transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <BarbershopItem barbershop={barbershop} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="animate-scale-in flex flex-col items-center justify-center py-16 opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            <SearchIcon className="mb-6 h-16 w-16 text-muted-foreground/30" />
            <h2 className="mb-2 text-xl font-semibold">
              Nenhum resultado encontrado
            </h2>
            <p className="max-w-md text-center text-muted-foreground">
              Não encontramos nenhuma barbearia com o termo &quot;
              {searchParams.search}&quot;. Tente buscar por outro termo.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BarbershopsPage
