"use server"

import prisma from "@/app/prisma"
import { revalidatePath } from "next/cache"

export async function add_cake(data: {
  name: string
  bakerName: string
  pictureBase64?: string | null
}) {
  try {
    await prisma.cake.create({
      data: {
        name: data.name,
        bakerName: data.bakerName,
        pictureBase64: data.pictureBase64 || null,
      },
    })

    revalidatePath("/cake-page")
    return { success: true }
  } catch (error) {
    console.error("Error adding cake:", error)
    return { success: false, message: "Kunne ikke legge til kaken." }
  }
}
