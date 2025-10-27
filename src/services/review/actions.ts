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

export async function userratings(username:string) {
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

    if(!rating){
        return;
    }

    return {
        avgRating: rating._avg.rating,
        countRating: rating._count.rating
    }

}