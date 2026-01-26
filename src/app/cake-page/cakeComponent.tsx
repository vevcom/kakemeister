import { get_rating, userratings } from "@/services/review/actions";
import styles from "./page.module.scss"
import RatingUIen from "./ratingUI"

type cakeType = {
    name: string;
    bakerName: string;
    pictureUrl: string | null;
    id: number;
}

export default async function CakeSlot({cakeData}:{cakeData:cakeType}){
    
    const ratingData = await get_rating(cakeData.id) //henter average rating og antall ratings
    const userRatings = await userratings(cakeData.id) //

    //Kaken har ikke blitt anmeldt overhodet
    if (!ratingData){
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
                    <h2>Ratingdata finnes ikke enda</h2>
                    <p>Denne kaken har ikke fått noen anmeldelser ennå. </p>
                    <RatingUIen cakeid={cakeData.id} username="23" userRatings={userRatings}/>
                    <p>{typeof 123}</p>
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
                    <h2>Ratingdata finnes, men har ikke fått noen anmeldelser</h2>
                    <p>Denne kaken har ikke fått noen anmeldelser ennå. </p>
                    <RatingUIen 
                    cakeid={cakeData.id} 
                    username="23"
                    userRatings={userRatings}
                    />
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
                    <h2>Ingen av de to over var sanne</h2>
                    <p>Denne kaken har fått {ratingData.avgRating}/10 av {ratingData.countRating} anmeldelse(r)</p>
                    <RatingUIen cakeid={cakeData.id} username="23" userRatings={userRatings}/>
        </div>
    );
}