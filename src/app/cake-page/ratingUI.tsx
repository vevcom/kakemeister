import { get_rating, userratings } from "@/services/review/actions";
import styles from "./page.module.scss"


type UserInfo = {
    username: string;
    cakeid: number;
}

export default async function RatingUIen({username, cakeid}: UserInfo){

    const userRatings = await userratings(cakeid)

    if (!userRatings){
        return(
            <div className={styles.anmeld}>
                <h3>Hva rater du kaken?</h3>
                <div className={styles.radioknapper}>
                    <input type="radio" id="1" name="fav_language" value="HTML"/>
                    <label for="html">1</label>
                    <input type="radio" id="2" name="fav_language" value="CSS"/>
                    <label for="css">2</label>
                    <input type="radio" id="3" name="fav_language" value="JavaScript"/>
                    <label for="javascript">3</label>
                    <input type="radio" id="4" name="fav_language" value="HTML"/>
                    <label for="html">4</label>
                    <input type="radio" id="5" name="fav_language" value="CSS"/>
                    <label for="css">5</label>
                    <input type="radio" id="6" name="fav_language" value="JavaScript"/>
                    <label for="javascript">6</label>
                    <input type="radio" id="7" name="fav_language" value="HTML"/>
                    <label for="html">7</label>
                    <input type="radio" id="8" name="fav_language" value="CSS"/>
                    <label for="css">8</label>
                    <input type="radio" id="9" name="fav_language" value="JavaScript"/>
                    <label for="javascript">9</label>
                    <input type="radio" id="10" name="fav_language" value="HTML"/>
                    <label for="html">10</label>
                </div>
                <label for="tilbakemelding">Tilbakemelding (valgfritt):</label>
                <input type="text" id="tilbakemelding" name="Tilbakemelding"></input>
            </div>
        ); 
    }

   
    if (userRatings.countRating == 0){
        return(
            <div className={styles.kake}>
                    <h2>{username}</h2>
                    {
                        //!cakeData.pictureUrl ?  // Er det en bildelenke?
                        <></> // hvis nei, ikke legg inn bilde.                        

                    } 
                    <p>{username} har bakt denne kaken.2</p>
                    <p>Denne kaken har ikke fått noen anmeldelser ennå. </p>
                    
        </div>

        ); 
    }


    
    
    return(
        <div className={styles.kake}>
                    <h2>{username}</h2>
                    {
                        //!cakeData.pictureUrl ?  // Er det en bildelenke?
                        <></> // hvis nei, ikke legg in bilde.
                        
                        
                    }
                    <p>{username} har bakt denne kaken. </p>
                    <p>Denne kaken har fått {userRatings.avgRating}/10 av {userRatings.countRating} anmeldelse(r)</p>
                     
        </div>
    );
}