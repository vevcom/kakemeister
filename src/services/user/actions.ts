"use server"

import prisma from "@/app/prisma"

// Get all users with the given name
export async function get_users_by_name(name: string) {
  // The current Prisma schema does not define a `User` model. Return an empty
  // array so callers still receive a predictable result. If you add a `User`
  // model later, replace this implementation with a real DB query.
  return []
}
