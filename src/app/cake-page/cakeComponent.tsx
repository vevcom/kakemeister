import { get_rating } from "@/services/review/actions";
import styles from "./page.module.scss"
import RatingUIen from "./ratingUI"

type cakeType = {
    name: string;
    bakerName: string;
    pictureUrl: string | null;
    id: number;
}

export default async function CakeSlot({cakeData}:{cakeData:cakeType}){
    
    const ratingData = await get_rating(cakeData.id)

    if (!ratingData){
        return(
            <div className={styles.kake}>
                    <h2 className={styles.h22}>{cakeData.name}</h2>
                    {
                        !cakeData.pictureUrl ?  // Er det en bildelenke?
                        <></> // hvis nei, ikke legg inn bilde.
                        :
                        <img className={styles.cakePicture} src={cakeData.pictureUrl}></img>   //hvis ja. legg inn et bilde
                    }
                    <p>{cakeData.bakerName} har bakt denne kaken.1</p>
                    <p>Kunne ikke hente anmeldelser.</p> 
            </div>

        ); 
    }

   
    if (ratingData.countRating == 0){
        return(
            <div className={styles.kake}>
                    <h2>{cakeData.name}</h2>
                    {
                        !cakeData.pictureUrl ?  // Er det en bildelenke?
                        <></> // hvis nei, ikke legg inn bilde.
                        :
                        <img className={styles.cakePicture} src={cakeData.pictureUrl}></img>   //hvis ja. legg inn et bilde
                    } 
                    <p>{cakeData.bakerName} har bakt denne kaken.2</p>
                    <p>Denne kaken har ikke fått noen anmeldelser ennå. </p>
                    <RatingUIen cakeid={cakeData.id} username="23"/>
                    <p>{typeof 123}</p>
        </div>

        ); 
    }


    
    
    return(
        <div className={styles.kake}>
                    <h2>{cakeData.name}</h2>
                    {
                        !cakeData.pictureUrl ?  // Er det en bildelenke?
                        <></> // hvis nei, ikke legg in bilde.
                        :
                        <img className={styles.cakePicture} src={cakeData.pictureUrl}></img>   //hvis ja. legg inn et bilde
                    }
                    <p>{cakeData.bakerName} har bakt denne kaken.3 </p>
                    <p>Denne kaken har fått {ratingData.avgRating}/10 av {ratingData.countRating} anmeldelse(r)</p>
                    <RatingUIen cakeid={cakeData.id} username="23"/>
        </div>
    );
}