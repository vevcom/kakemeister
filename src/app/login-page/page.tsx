"use client"
import styles from "./page.module.scss"
import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { add_cake } from "@/services/adding-cake/actions"
import { get_users_by_name } from "@/services/user/actions"
import prisma from "../prisma"

type bruker = {
  brukernavn: string
}

const login = async (brukernavn) => {
    

    if (!brukernavn) {
        alert("Du må skrive inn et brukernavn.");
        return;
    }

    const user = await prisma.user.findFirst({
      where: {
        username:brukernavn
      }  
    })

    if (!user) {
      alert("Dette er ikke et gyldig brukernavn")
    } else {
      localStorage.setItem("brukernavn", brukernavn);
      alert("Du er logget inn")
      
  }

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
