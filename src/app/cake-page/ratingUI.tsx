import { get_rating, userratings } from "@/services/review/actions";
import styles from "./page.module.scss"


type UserInfo = {
    username: string;
    cakeid: number;
}

export default async function RatingUIen({username, cakeid}: UserInfo){

    const userRatings = await userratings(cakeid)

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
                    <p>{cakeData.bakerName} har bakt denne kaken. </p>
                    <p>Denne kaken har fått {ratingData.avgRating}/10 av {ratingData.countRating} anmeldelse(r)</p>
                     
        </div>
    );
}