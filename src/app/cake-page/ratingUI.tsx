"use client";
import { get_rating, userratings } from "@/services/review/actions";
import styles from "./page.module.scss"
import { add_review } from "@/services/review/actions"



type UserInfo = {
    username: string;
    cakeid: number;
    userRatings: null | object;
}

export default async function RatingUIen({username, cakeid, userRatings}: UserInfo){
    
    const handleSubmit = async () => {
        var userId = "cmh9iaq2i0000mik1ckhbyqqb"; //bør initialiseres på annen måte
        const ratingvalue = document.querySelector(`input[name="${cakeid}"]:checked`)?.value;
        var feedback = (document.getElementById("tilbakemelding") as HTMLInputElement)?.value;
        feedback = 'balls'
        const rating = Number(ratingvalue)
        if (!rating) {
            alert("Du må velge en vurdering før du sender inn.");
            return;
        }

        //her kan du sende data til backend eller logge det
        console.log("Rating:", rating);
        console.log("Tilbakemelding:", feedback);
        console.log("cakeid", cakeid)
        console.log("userid", userId)

        try {
            const result = await add_review({
                rating,
                cakeId: cakeid,
                userId: userId ?? null,
        })

        if (result.success) {
            alert("Review lagret ⭐")
            console.log("Review:", result.review)
        if (feedback) console.log("Tilbakemelding:", feedback)
        } else {
            alert(result.message || "Noe gikk galt")
        }
        } catch (error) {
            console.error("Feil ved innsending av review:", error)
            alert("Noe gikk galt ved innsending")
        }
  }


    if (!userRatings){ //Hvis det ikke er noen ratings på kaken
        return(
            <div className={styles.anmeld}>
                <h3>Hva rater du kaken?</h3>
                <div className={styles.radioknapper}>
                    <input type="radio" id="1" name={String(cakeid)} value="1" />
                    <label htmlFor="1">1</label>

                    <input type="radio" id="2" name={String(cakeid)} value="2" />
                    <label htmlFor="2">2</label>

                    <input type="radio" id="3" name={String(cakeid)} value="3" />
                    <label htmlFor="3">3</label>

                    <input type="radio" id="4" name={String(cakeid)} value="4" />
                    <label htmlFor="4">4</label>

                    <input type="radio" id="5" name={String(cakeid)} value="5" />
                    <label htmlFor="5">5</label>

                    <input type="radio" id="6" name={String(cakeid)} value="6" />
                    <label htmlFor="6">6</label>

                    <input type="radio" id="7" name={String(cakeid)} value="7" />
                    <label htmlFor="7">7</label>

                    <input type="radio" id="8" name={String(cakeid)} value="8" />
                    <label htmlFor="8">8</label>

                    <input type="radio" id="9" name={String(cakeid)} value="9" />
                    <label htmlFor="9">9</label>

                    <input type="radio" id="10" name={String(cakeid)} value="10" />
                    <label htmlFor="10">10</label>
                </div>
                    <label htmlFor="tilbakemelding">Tilbakemelding (valgfritt):</label>
                    <input type="text" id="tilbakemelding" name="navn" />
                <button onClick={() => handleSubmit()}>Send inn vurdering</button>
            </div>
        ); 
    }


    if (userRatings.countRating == 0){ //hvis det ikke er noen anmeldelser
        return(
            <div className={styles.anmeld}>
                <h3>Hva rater du kaken?</h3>
                <div className={styles.radioknapper}>
                    <input type="radio" id="1" name={String(cakeid)} value="1" />
                    <label htmlFor="1">1</label>

                    <input type="radio" id="2" name={String(cakeid)} value="2" />
                    <label htmlFor="2">2</label>

                    <input type="radio" id="3" name={String(cakeid)} value="3" />
                    <label htmlFor="3">3</label>

                    <input type="radio" id="4" name={String(cakeid)} value="4" />
                    <label htmlFor="4">4</label>

                    <input type="radio" id="5" name={String(cakeid)} value="5" />
                    <label htmlFor="5">5</label>

                    <input type="radio" id="6" name={String(cakeid)} value="6" />
                    <label htmlFor="6">6</label>

                    <input type="radio" id="7" name={String(cakeid)} value="7" />
                    <label htmlFor="7">7</label>

                    <input type="radio" id="8" name={String(cakeid)} value="8" />
                    <label htmlFor="8">8</label>

                    <input type="radio" id="9" name={String(cakeid)} value="9" />
                    <label htmlFor="9">9</label>

                    <input type="radio" id="10" name={String(cakeid)} value="10" />
                    <label htmlFor="10">10</label>
                </div>
                    <label htmlFor="tilbakemelding">Tilbakemelding (valgfritt):</label>
                    <input type="text" id="tilbakemelding" name="navn" />
                <button onClick={() => handleSubmit()}>Send inn vurdering</button>
            </div>

        ); 
    }

    //var userid = 12
    //if (Array.isArray(userRatings)) {
    //    if (userRatings.includes(userid)) {
    //        return (
    //        <div><p>Du har ratet denne kaken:)</p></div>
    //        );
    //    }
    //}
    
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