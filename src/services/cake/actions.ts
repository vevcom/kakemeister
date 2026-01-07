"use server"

import prisma from "@/app/prisma";

export async function get_all_cakes() {
  // schema currently exposes: id, name, pictureUrl, bakerName, reviews
  // avoid including non-existent relations (user) to match Prisma schema
  const data = await prisma.cake.findMany({
    select: {
      id: true,
      name: true,
      pictureUrl: true,
      bakerName: true
    }
  })

  return data
}
