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

export async function userratings(cakeId:number) {
    const ratings = await prisma.review.aggregate({
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
    const data = await prisma.cake.findUnique({
        where:{
            id:cakeId,
        },
        select:{
            reviews:{
                select:{
                    rating:true,
                }
            }
        }
    })

    const reviewerIDs = await prisma.review.findMany({
        where: {
            cakeId: cakeId
        },
        select: {
            reviewerID: true
        }
    })


    if(!data){
        return;
    }

    return {
        avgRating: ratings._avg.rating,
        countRating: ratings._count.rating
    }

}