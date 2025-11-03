"use server"

import prisma from "@/app/prisma"
import { revalidatePath } from "next/cache"

export async function add_cake({
  name,
  bakerName,
  pictureBase64,
  userID
}: {
  name: string
  bakerName: string
  pictureBase64?: string | null
  userID: string
}) {
  try {
    await prisma.cake.create({
      data: {
        name,
        bakerName,
        pictureBase64: pictureBase64 || null,
        user: {
          connect: { id: userID }
        }
      }
    })

    revalidatePath("/cake-page")
    return { success: true }
  } catch (error) {
    console.error("Error adding cake:", error)
    return { success: false, message: "Kunne ikke legge til kaken." }
  }
}
