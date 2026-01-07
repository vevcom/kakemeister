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
        // Prisma schema currently has `pictureUrl` not `pictureBase64` and no user relation.
        // Store the base64 string in `pictureUrl` (nullable) so the rest of the app can render it.
        pictureUrl: pictureBase64 || null
      }
    })

    revalidatePath("/cake-page")
    return { success: true }
  } catch (error) {
    console.error("Error adding cake:", error)
    return { success: false, message: "Kunne ikke legge til kaken." }
  }
}
