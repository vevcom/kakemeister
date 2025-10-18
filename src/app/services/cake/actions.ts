"use server"

import prisma from "@/app/prisma"

export async function get_all_cakes() {
    const data = await prisma.cake.findMany()

    if (!data) {
        return;
    }
    
        return data;

}