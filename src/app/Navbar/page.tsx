import styles from "./page.module.scss"
import Link from "next/link"

export default function Nav() {
    return(
        <div className={styles.header}>
            <ol className={styles.navbar}>
                <Link href="/"><li className={styles.header_item}>Hjem</li></Link>
                <Link href="/Cake_review"><li className={styles.header_item}>Kakeanmeldelser</li></Link>
                <Link href="/Statistikk"><li className={styles.header_item}>Statistikk</li></Link>
                <Link href="/Login_page"><li className={styles.header_item}>Login</li></Link>
            </ol>
        </div>
    )
}