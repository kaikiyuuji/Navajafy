import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import BookingItem from "../_components/booking-item"
import { redirect } from "next/navigation"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return redirect("/login")
  }
  const confirmedBookings = await db.booking.findMany({
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
  })
  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        lt: new Date(),
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
  })
  return (
    <>
      <Header />
      <div className="px-5 lg:container sm:px-6 md:px-8 lg:mx-auto lg:max-w-6xl">
        <div
          className="animate-fade-in mt-8 opacity-0"
          style={{ animationDelay: "0.35s", animationDuration: "0.5s" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="relative text-sm font-bold uppercase text-gray-400">
              Agendamentos Confirmados
              <span className="absolute -bottom-1 left-0 h-0.5 w-10 bg-primary"></span>
            </h2>
          </div>
          <div className="space-y-4">
            {confirmedBookings.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <span className="text-center text-muted-foreground">
                  Nenhum agendamento confirmado encontrado.
                </span>
              </div>
            ) : (
              confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))
            )}
          </div>
        </div>

        <div
          className="animate-fade-in mt-8 opacity-0"
          style={{ animationDelay: "0.35s", animationDuration: "0.5s" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="relative text-sm font-bold uppercase text-gray-400">
              Agendamentos Finalizados
              <span className="absolute -bottom-1 left-0 h-0.5 w-10 bg-primary"></span>
            </h2>
          </div>
          <div className="space-y-4">
            {concludedBookings.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <span className="text-center text-muted-foreground">
                  Nenhum agendamento finalizado encontrado.
                </span>
              </div>
            ) : (
              concludedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Bookings

