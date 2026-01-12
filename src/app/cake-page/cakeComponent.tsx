import { get_rating, userratings } from "@/services/review/actions";
import styles from "./page.module.scss";
import RatingUIen from "./ratingUI"

type cakeType = {
    id: number;
    name: string;
    bakerName: string;
    // DB currently has `pictureUrl` (nullable) and some parts of the app use `pictureBase64`.
    // Accept either so the component is tolerant to both shapes.
    pictureBase64?: string | null;
    pictureUrl?: string | null;
    // user relation may or may not be present depending on Prisma schema state
    userID?: string | null;
    user?: { username: string } | null;
}

export default async function CakeSlot({cakeData}:{cakeData:cakeType}){
    
    const ratingData = await get_rating(cakeData.id);
    const userRatings = await userratings(cakeData.id)

    // Hvis vi ikke får tak i rating-data
    if (!ratingData){
        return(
            <div>
                    <h2>{cakeData.name}</h2>
                    <p>{cakeData.bakerName} har bakt denne kaken. </p>
                    <p>Kunne ikke hente anmeldelser.</p>
                    {
                        !cakeData.pictureUrl ?  // Er det en bildelenke?
                        <></> // hvis nei, ikke legg inn bilde.
                        :
                        <img className={styles.cakePicture} src={cakeData.pictureUrl}></img>   //hvis ja. legg inn et bilde
                    } 
        </div>

        ); 
    }

    // Hvis ingen har anmeldt kaken
    if (ratingData.countRating == 0){
        return(
            <div>
                    <h2>{cakeData.name}</h2>
                    <p>{cakeData.bakerName} har bakt denne kaken. </p>
                    <p>Denne kaken har ikke fått noen anmeldelser ennå. </p>
                    {
                        !cakeData.pictureUrl ?  // Er det en bildelenke?
                        <></> // hvis nei, ikke legg inn bilde.
                        :
                        <img className={styles.cakePicture} src={cakeData.pictureUrl}></img>   //hvis ja. legg inn et bilde
                    } 
        </div>

        ); 
    }

    // Hvis kaken har anmeldelser
    return(
        <div>
                    <h2>{cakeData.name}</h2>
                    <p>{cakeData.bakerName} har bakt denne kaken. </p>
                    <p>Denne kaken har fått {ratingData.avgRating}/6 ({ratingData.countRating})</p>
                    {
                        !cakeData.pictureUrl ?  // Er det en bildelenke?
                        <></> // hvis nei, ikke legg in bilde.
                        :
                        <img className={styles.cakePicture} src={cakeData.pictureUrl}></img>   //hvis ja. legg inn et bilde
                    } 
        </div>
    );
}
