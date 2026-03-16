import styles from "./page.module.scss"
import Link from "next/link"

export default function Nav() {
    return(
        <div className={styles.header}>
            <ol className={styles.navbar}>
                <li className={styles.header_item}><Link href="/">Hjem</Link></li>
                <li className={styles.header_item}><Link href="/Cake_review">Cake Review</Link></li>
                <li className={styles.header_item}><Link href="/">Hjem</Link></li>
                <li className={styles.header_item}><Link href="/">Hjem</Link></li>
                <li className={styles.header_item}><Link href="/">Hjem</Link></li>
            </ol>
        </div>
    )
}