"use server";

import { db } from "../_lib/prisma";

interface CreateBookingParams {
    serviceId: string;
    userId: string;
    date: Date;  
}

export const CreateBooking = async (params: CreateBookingParams) => {
    await db.booking.create({
        data: params
    })
}
