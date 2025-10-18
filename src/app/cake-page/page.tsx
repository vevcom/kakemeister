"use server"

import { get_all_cakes } from "@/services/cake/actions"
import styles from "./page.module.scss"


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
                    <h2>{data.name}</h2>
                    <p>{data.bakerName} har bakt denne kaken. </p>
                    {
                        !data.pictureUrl ?  // Er det en bildelenke?
                        <></> // hvis nei, ikke legg in bilde.
                        :
                        <img className={styles.cakePicture} src={data.pictureUrl}></img>   //hvis ja. legg inn et bilde
                    } 
                </div>
                

            ))}      
        </div>
    );
}
