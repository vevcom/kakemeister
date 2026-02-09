"use client"
import styles from "./page.module.scss"
import { useState, FormEvent, ChangeEvent } from "react"
import login from "./login"
import { useRouter } from "next/navigation"
import { add_cake } from "@/services/adding-cake/actions"
import { get_users_by_name } from "@/services/user/actions"
import prisma from "../prisma"

type bruker = {
  brukernavn: string
}



export default function LoginPage() {
  const [tekst, setTekst] = useState("")

  return (
    <div>
      <label htmlFor="login">Skriv inn brukernavnet ditt for å logge inn:</label>
      <input type="text" id="login" name="username" value={tekst} onChange={(e) => setTekst(e.target.value)}/>
      <button onClick={() => login(tekst)}>Send inn vurdering</button>
    </div>
  )
}
