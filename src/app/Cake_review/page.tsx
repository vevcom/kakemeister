import styles from "./page.module.scss"

type Review = {
    reviewString?: string
};

type Cake = {
    cakeType: string,
    cakeReviews: Review[],
    baker: string,
    bildeURL: string
};

const cakes: Cake[] = []

const review: Review = {
    reviewString: "Veldig god kake!"
};

const cake: Cake = {
    cakeType: "Brownies",
    cakeReviews: [review],
    baker: "Ludvig",
    bildeURL: "https://www.google.com/imgres?q=brownies&imgurl=https%3A%2F%2Fsugarspunrun.com%2Fwp-content%2Fuploads%2F2019%2F08%2FHomemade-Brownies-Recipe-1-of-1.jpg&imgrefurl=https%3A%2F%2Fsugarspunrun.com%2Fbrownies-from-scratch%2F&docid=SSN0U-GuLlTziM&tbnid=9UgJSqADYHU9dM&vet=12ahUKEwiSypTM4raTAxXNUXcKHTOFAbQQnPAOegQIGhAB..i&w=1200&h=1200&hcb=2&ved=2ahUKEwiSypTM4raTAxXNUXcKHTOFAbQQnPAOegQIGhAB"
};

cakes.push(cake)

export default function Cake_review() {
    return(
        <div className={styles.allReviews}>
            {
                cakes.map((cake, index)=>(
                    <div key={index} className={styles.cakeReview}>
                        <h2>{cake.cakeType}</h2>
                        <p>Laget av: {cake.baker}</p>
                        {
                            cake.cakeReviews.map((anmeldelse, j_index)=>(
                                <div key={j_index}>
                                    ssss
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

