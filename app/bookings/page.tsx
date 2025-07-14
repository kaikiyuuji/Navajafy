import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import BookingItem from "../_components/booking-item";

const Bookings = async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return notFound();
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
    });
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
    });
    return ( 
    <>
    <Header />
      <div className="flex-1 px-5 lg:container sm:px-6 md:px-8 lg:mx-auto lg:max-w-6xl">  
        <div
            className="animate-fade-in mb-6 mt-6 flex items-center gap-2 opacity-0"
            style={{ animationDelay: "0.1s", animationDuration: "0.5s" }}
            >
            <h1 className="text-xl font-bold">
                Agendamentos Confirmados
            </h1>
            
        </div>
        <div className="space-y-4">
        {confirmedBookings.map(booking => (
                <BookingItem key={booking.id} booking={booking} />
        ))}
        </div>
    </div>      

    <div className="flex-1px-5 lg:container sm:px-6 md:px-8 lg:mx-auto lg:max-w-6xl">  
        <div
            className="animate-fade-in mb-6 mt-6 flex items-center gap-2 opacity-0"
            style={{ animationDelay: "0.1s", animationDuration: "0.5s" }}
            >
            <h1 className="text-xl font-bold">
                Agendamentos Finalizados
            </h1>
            
        </div>
        <div className="space-y-4">
        {concludedBookings.map(booking => (
                <BookingItem key={booking.id} booking={booking} />
        ))}
        </div>
    </div>      
    </>
     );
}
 
export default Bookings;