import styles from "./page.module.scss"
import Link from "next/link"

export default function Nav() {
    return(
        <div id="Header">
            <ol>
                <li className="header_item"><Link href="/">Hjem</Link></li>
                <li className="header_item"><Link href="/">Hjem</Link></li>
                <li className="header_item"><Link href="/">Hjem</Link></li>
                <li className="header_item"><Link href="/">Hjem</Link></li>
                <li className="header_item"><Link href="/">Hjem</Link></li>
            </ol>
        </div>
    )
}