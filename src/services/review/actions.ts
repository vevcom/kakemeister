"use server"

import prisma from "@/app/prisma"


export async function get_rating(cakeId:number) {
    const rating = await prisma.review.aggregate({
        where:{
            cakeId:cakeId
        },
        _avg:{
            rating:true
        },
        _count:{
            rating:true
        }
    })

    if(!rating){
        return;
    }

    return {
        avgRating: rating._avg.rating,
        countRating: rating._count.rating
    }

}

export async function userratings(cakeId: number) {
    const reviews = await prisma.review.findMany({
        where: {
        cakeId: cakeId
        },
        select: {
            rating: true,
            userId: true
        }
    })

    if (!reviews || reviews.length === 0) {
        return {
            avgRating: null,
            countRating: 0,
            userIds: []
        }
    }

    const countRating = reviews.length

    const avgRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        countRating

    const userIds = reviews.map(review => review.userId)

    return {
        avgRating,
        countRating,
        userIds
    }
}

type AddReviewInput = {
  rating: number
  cakeId: number
  userId?: string | null
}

export async function add_review({
  rating,
  cakeId,
  userId,
}: {
  rating: number
  cakeId: number
  userId?: string | null
}) {
  try {
    const review = await prisma.review.create({
      data: {
        rating,
        cakeId,
        userId: userId ?? null,
      },
    })

    return { success: true, review }
  } catch (error: any) {
    console.error("🔥 PRISMA ERROR 🔥")
    console.error(error)

    return {
      success: false,
      message: error.message, // 👈 vis ekte feilmelding
    }
  }
}