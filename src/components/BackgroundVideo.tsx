"use client";

import React from "react";
import styles from "./BackgroundVideo.module.scss";

const BackgroundVideo: React.FC = () => {
  return (
    <video autoPlay muted loop className={styles.backgroundVideo}>
      <source src="/videos/background.mp4" type="video/mp4" />
      (Din nettleser støtter ikke video.)
    </video>
  );
};

export default BackgroundVideo;