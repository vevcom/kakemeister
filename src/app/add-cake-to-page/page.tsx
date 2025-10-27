"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { add_cake } from "@/services/adding-cake/actions"
import { useRouter } from "next/navigation"

export default function AddCakePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [bakerName, setBakerName] = useState("")
  const [pictureBase64, setPictureBase64] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Optional: limit file size
    if (file.size > 1_000_000) { // 1MB
      alert("Bildet er for stort! Maks 1MB.")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPictureBase64(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = await add_cake({
      name,
      bakerName,
      pictureBase64,
    })

    if (result.success) {
      setMessage("Kaken ble lagt til 🍰")
      router.push("/cakes") // or wherever your cake list is
    } else {
      setMessage(result.message || "Noe gikk galt")
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h1>Legg til en ny kake 🍰</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Kakenavn</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="bakerName">Baker</label>
          <input
            id="bakerName"
            type="text"
            value={bakerName}
            onChange={(e) => setBakerName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="picture">Last opp bilde</label>
          <input
            id="picture"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {pictureBase64 && (
          <div style={{ marginTop: "1rem" }}>
            <p>Forhåndsvisning:</p>
            <img
              src={pictureBase64}
              alt="Forhåndsvisning av kake"
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        )}

        <button type="submit" style={{ marginTop: "1rem" }}>
          Legg til kake
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}
