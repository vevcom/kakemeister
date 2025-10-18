"use server"

import { get_all_cakes } from "../services/cake/actions"
import CakeSlot from "./cakeComponent";
import styles from "./page.module.scss"

export default async function CakePage() {
    const cakes = await get_all_cakes()

    if (!cakes){
        return(
            <h1> Noe gikk feil! </h1>
        );
    }
    if (cakes.length == 0){
        return(
            <h1> Det er ingen kaker Åneiii!! </h1>
        );
    }

    return(
        <div>
            
            {cakes.map((data, index) =>(
                <div key={index}>
                    <CakeSlot cakeData={data}></CakeSlot>
                </div>
                ) 
            )}

        </div>
    )
}