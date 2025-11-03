import styles from "./page.module.scss";
import BackgroundVideo from "@/components/BackgroundVideo";

export default function Home() {
  return (
    <>
      <BackgroundVideo />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 className={styles.title}>Kakemeiser</h1>
      </div>
    </>
  );
}