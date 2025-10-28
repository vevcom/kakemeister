import { get_rating } from "@/services/review/actions";
import styles from "./page.module.scss";

type cakeType = {
  name: string;
  bakerName: string;
  pictureBase64: string | null;
  id: number;
  userID: string;
  user: { username: string } | null;
}

export default async function CakeSlot({cakeData}:{cakeData:cakeType}){
    
    const ratingData = await get_rating(cakeData.id);

    // Hvis vi ikke får tak i rating-data
    if (!ratingData){
        return(
            <div>
                <h2>{cakeData.name}</h2>
                <p>{cakeData.bakerName} {cakeData.user && ` (${cakeData.user.username})`} har bakt denne kaken. </p>
                <p>Kunne ikke hente anmeldelser.</p>
                {
                    !cakeData.pictureBase64 ?  // Er det lastet opp et bilde?
                    <></> // hvis nei, ikke legg inn bilde.
                    :
                    <img className={styles.cakePicture} src={cakeData.pictureBase64} alt={cakeData.name}></img>   // hvis ja, legg inn bilde
                } 
            </div>
        ); 
    }

    // Hvis ingen har anmeldt kaken
    if (ratingData.countRating == 0){
        return(
            <div>
                <h2>{cakeData.name}</h2>
                <p>{cakeData.bakerName} {cakeData.user && ` (${cakeData.user.username})`} har bakt denne kaken. </p>
                <p>Denne kaken har ikke fått noen anmeldelser ennå. </p>
                {
                    !cakeData.pictureBase64 ?  // Er det lastet opp et bilde?
                    <></> // hvis nei, ikke legg inn bilde.
                    :
                    <img className={styles.cakePicture} src={cakeData.pictureBase64} alt={cakeData.name}></img>   // hvis ja, legg inn bilde
                } 
            </div>
        ); 
    }

    // Hvis kaken har anmeldelser
    return(
        <div>
            <h2>{cakeData.name}</h2>
            <p>{cakeData.bakerName} {cakeData.user && ` (${cakeData.user.username})`} har bakt denne kaken. </p>
            <p>Denne kaken har fått {ratingData.avgRating}/6 ({ratingData.countRating})</p>
            {
                !cakeData.pictureBase64 ?  // Er det lastet opp et bilde?
                <></> // hvis nei, ikke legg inn bilde.
                :
                <img className={styles.cakePicture} src={cakeData.pictureBase64} alt={cakeData.name}></img>   // hvis ja, legg inn bilde
            } 
        </div>
    );
}
