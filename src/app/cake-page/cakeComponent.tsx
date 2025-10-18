
import { get_rating } from "../services/review/actions";
import styles from "./page.module.scss"

type cakeType = {
    name: string;
    bakerName: string;
    pictureUrl: string | null;
    id: number;
}

export default async function CakeSlot({cakeData}:{cakeData:cakeType}){
   
    const ratingData = await get_rating(cakeData.id)
   
    if (!ratingData){
        return (
            <div>
                    <h2>{cakeData.name}</h2>
                    <p>{cakeData.bakerName} har bakt denne kaken.</p>
                    <p>Kunne ikke hente anmeldelser</p>
                    {
                        !cakeData.pictureUrl ? //Er det en bildelenk?
                        <></> // Hvis nei, ikke legg inn bilde
                        :
                        <img className={styles.cakePicture} src={cakeData.pictureUrl}></img> // Hvis ja, legg inn bilde
                
                    }
        </div>
        )
    }

    if (ratingData.countRating == 0){
        return(
            <div>
                    <h2>{cakeData.name}</h2>
                    <p>{cakeData.bakerName} har bakt denne kaken.</p>
                    <p>Denne kaken har ingen anmeldelser enda</p>
                    {
                        !cakeData.pictureUrl ? //Er det en bildelenk?
                        <></> // Hvis nei, ikke legg inn bilde
                        :
                        <img className={styles.cakePicture} src={cakeData.pictureUrl}></img> // Hvis ja, legg inn bilde
                
                    }
        </div>
        );
    }

    return(
        <div>
                    <h2>{cakeData.name}</h2>
                    <p>{cakeData.bakerName} har bakt denne kaken.</p>
                    <p>Denne kaken har fått {ratingData.avgRating}/6 ({ratingData.countRating})</p>
                    {
                        !cakeData.pictureUrl ? //Er det en bildelenk?
                        <></> // Hvis nei, ikke legg inn bilde
                        :
                        <img className={styles.cakePicture} src={cakeData.pictureUrl}></img> // Hvis ja, legg inn bilde
                
                    }


        </div>
    );
}