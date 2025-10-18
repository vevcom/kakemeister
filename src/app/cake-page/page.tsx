"use server"

import { get_all_cakes } from "../services/cake/actions"
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
                <div className={styles.cakeAllign} key={index}>
                    <h2>{data.name}</h2>
                    <p>{data.bakerName} har bakt denne kaken.</p>
                    {
                        !data.pictureUrl ? //Er det en bildelenk?
                        <></> // Hvis nei, ikke legg inn bilde
                        :
                        <img className={styles.cakePicture} src={data.pictureUrl}></img> // Hvis ja, legg inn bilde
                    }


                </div>
                ) 
            )}

        </div>
    )
}