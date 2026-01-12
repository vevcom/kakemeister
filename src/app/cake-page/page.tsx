"use server";

import { get_all_cakes } from "@/services/cake/actions";
import CakeSlot from "./cakeComponent";
import BackgroundVideo from "@/components/BackgroundVideo";

export default async function CakePage() {
    const cakes = await get_all_cakes()

    if (!cakes) {
            return <h1>Det er ingen kaker her. Å nei!</h1>
    }

    if (cakes.length == 0){
        return (
            <h1>Det er ingen kaker. Å nei!!</h1>
        );
    }
    return (
        <div>
            {cakes.map((data, index) => (
                <div key={index}>
                    <CakeSlot cakeData={data}>
                    
                    </CakeSlot>
                </div>
                

            ))}      
        </div>
    );
}