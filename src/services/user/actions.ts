"use server"

import prisma from "@/app/prisma"

export async function get_users_by_name(name: string) {
  return prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: name, mode: "insensitive" } },
        { username: { contains: name, mode: "insensitive" } }
      ]
    },
    select: {
      id: true,
      name: true,
      username: true
    }
  })
}