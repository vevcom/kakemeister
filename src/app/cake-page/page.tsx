"use server"

import { get_all_cakes } from "@/services/cake/actions"
import styles from "./page.module.scss"

export default async function CakePage(){
    const cakes = await get_all_cakes()

    if (!cakes){
        return (
            <h1>Noe gitt feil, å nei!</h1>
        );
    }

     if (cakes.length == 0){
        return (
            <h1>Det er ingen kaker. Å nei!</h1>
        );
    }

    return (
        <div>
            {cakes.map((data,index) => (
                <div key={index}>
                    <h2>{data.name}</h2>
                    <p>{data.bakerName} har bakt denne kaken</p>
                    {
                        !data.pictureURL? //Er det en bildelenke?
                        <></> //Hvis nei, ikke legg inn et bilde
                        :
                        <img className={styles.cakePicture} src={data.pictureURL}></img> //Hvis ja, legg inn bildet
                    }
                </div>
                )
            )}
        </div>

    );
}