"use server"

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"

interface GetBookingProps {
    serviceId: string,
    date: Date,

}

export const getBookings = ({ serviceId, date }: GetBookingProps ) => {
    return db.booking.findMany({
        where: {
            serviceId: serviceId,
            date: {
                lte: endOfDay(date), 
                gte: startOfDay(date),
            }
        }
    })
}