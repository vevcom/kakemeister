"use server"

import prisma from "@/app/prisma";

export async function get_all_cakes() {
  const data = await prisma.cake.findMany({
    include: {
      user: {
        select: {
          username: true
        }
      }
    }
  })

  return data
}
