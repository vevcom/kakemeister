"use client"
import Link from "next/link"
import styles from "./page.module.scss"

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><Link href="/">Hovedside</Link></li>
        <li><Link href="/cake-page">Kakeliste</Link></li>
        <li><Link href="/add-cake-to-page">Legg til kake</Link></li>
      </ul>
    </nav>
  )
}