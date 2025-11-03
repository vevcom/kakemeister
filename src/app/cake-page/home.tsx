import BackgroundVideo from "@/components/BackgroundVideo";

export default function HomePage() {
  return (
    <>
      <BackgroundVideo />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1>Velkommen til siden!</h1>
        <p>Alt innhold vises oppå videoen.</p>
      </div>
    </>
  );
}
