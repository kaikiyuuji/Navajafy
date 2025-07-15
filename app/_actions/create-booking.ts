"use server"

import { getServerSession } from "next-auth"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"

interface UserSession {
  id: string
}

interface CreateBookingParams {
  serviceId: string
  date: Date
}

export const CreateBooking = async (params: CreateBookingParams) => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    throw new Error("Usuário não autenticado")
  }

  const user = session.user as UserSession
  if (!user) {
    throw new Error("Usuário não autenticado")
  }
  await db.booking.create({
    data: { ...params, userId: user.id },
  })
}
