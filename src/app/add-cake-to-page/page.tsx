"use client"
import styles from "./page.module.scss"
import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { add_cake } from "@/services/adding-cake/actions"
import { get_users_by_name } from "@/services/user/actions"

type FoundUser = {
  id: string
  name: string
  username: string
}

export default function AddCakePage() {
  const router = useRouter()

  const [cakeName, setCakeName] = useState("")
  const [bakerSearch, setBakerSearch] = useState("")
  const [foundUsers, setFoundUsers] = useState<FoundUser[]>([])
  const [selectedUserID, setSelectedUserID] = useState<string | null>(null)
  const [pictureBase64, setPictureBase64] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 1_000_000) {
      alert("Bildet er for stort! Maks 1MB.")
      return
    }

    // Reads uploaded image as base64
    const reader = new FileReader()
    reader.onloadend = () => {
      setPictureBase64(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Search for users when baker name changes
  const handleBakerChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBakerSearch(value)
    setSelectedUserID(null)

    if (value.trim().length === 0) {
      setFoundUsers([])
      return
    }

    const users = await get_users_by_name(value)
    setFoundUsers(users)
    
    console.log("Fant brukere:", users)
    
    setFoundUsers(users)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedUserID && foundUsers.length > 1) {
      setMessage("Velg riktig bruker fra listen.")
      return
    }

    const userID = selectedUserID ?? (foundUsers.length === 1 ? foundUsers[0].id : null)

    if (!userID) {
      setMessage("Fant ingen bruker med det navnet.")
      return
    }

    const result = await add_cake({
      name: cakeName,
      bakerName: bakerSearch,
      pictureBase64,
      userID
    })

    if (result.success) {
      setMessage("Kaken ble lagt til 🍰")
      router.push("/cake-page")
    } else {
      setMessage(result.message || "Noe gikk galt")
    }
  }

  return (
    <div className={styles.cakeTitle}>
      <h1>Legg til en ny kake 🍰</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cakeName">Kakenavn</label>
          <input
            id="cakeName"
            type="text"
            value={cakeName}
            onChange={(e) => setCakeName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="bakerSearch">Baker (navn eller brukernavn)</label>
          <input
            id="bakerSearch"
            type="text"
            value={bakerSearch}
            onChange={handleBakerChange}
            required
          />
        </div>

        {/* Show dropdown only if multiple users are found */}
        {foundUsers.length > 1 && (
          <div>
            <label htmlFor="userSelect">Flere brukere funnet - velg riktig:</label>
            <select
              id="userSelect"
              value={selectedUserID ?? ""}
              onChange={(e) => setSelectedUserID(e.target.value)}
              required
            >
              <option value="">Velg bruker</option>
              {foundUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.username})
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="picture">Last opp bilde</label>
          <input id="picture" type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {pictureBase64 && (
          <div className={styles.base64cake}>
            <p>Forhåndsvisning:</p>
            <img
              src={pictureBase64}
              alt="Forhåndsvisning"
              className={styles.base64cakeAlt}
            />
          </div>
        )}

        <button type="submit" className={styles.submitButton}>
          Legg til kake
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}
