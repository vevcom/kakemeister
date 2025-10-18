import { get_rating } from "@/services/review/actions";
import styles from "./page.module.scss"

type cakeType = {
    name: string;
    bakerName: string;
    pictureURL: string | null;
    id: number;
}

export default async function CakeSlot({cakeData}:{cakeData:cakeType}){

    const ratingData = await get_rating(cakeData.id)

    if(!ratingData){
        return (
            <div>
                    <h2>{cakeData.name}</h2>
                    <p>{cakeData.bakerName} har bakt denne kaken</p>
                    <p>Kunne ikke hente denne anmeldelsen :(</p>
                    {
                        !cakeData.pictureURL? //Er det en bildelenke?
                        <></> //Hvis nei, ikke legg inn et bilde
                        :
                        <img className={styles.cakePicture} src={cakeData.pictureURL}></img> //Hvis ja, legg inn bildet
                    }
                </div>
        );
    }

     if(ratingData.countRating == 0){
        return (
            <div>
                    <h2>{cakeData.name}</h2>
                    <p>{cakeData.bakerName} har bakt denne kaken</p>
                    <p>Denne kaken har ikke fått noen anmeldelser ennå</p>
                    {
                        !cakeData.pictureURL? //Er det en bildelenke?
                        <></> //Hvis nei, ikke legg inn et bilde
                        :
                        <img className={styles.cakePicture} src={cakeData.pictureURL}></img> //Hvis ja, legg inn bildet
                    }
                </div>
        );
    }

    return(
        <div>
                    <h2>{cakeData.name}</h2>
                    <p>{cakeData.bakerName} har bakt denne kaken</p>
                    <p>Denne kaken har fått {ratingData.avgRating}/6 ({ratingData.countRating})</p>
                    {
                        !cakeData.pictureURL? //Er det en bildelenke?
                        <></> //Hvis nei, ikke legg inn et bilde
                        :
                        <img className={styles.cakePicture} src={cakeData.pictureURL}></img> //Hvis ja, legg inn bildet
                    }
                </div>
    )
}