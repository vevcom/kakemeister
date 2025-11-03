"use server"

import prisma from "@/app/prisma"

// Get all users with the given name
export async function get_users_by_name(name: string) {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: name },
        { name: name }
      ]
    },
    select: {
      id: true,
      name: true,
      username: true
    }
  })
  return users
}
