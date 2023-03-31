import React from 'react';
import FaceRecognition from './FaceRecognition';
import styles from '../styles/Home.module.css';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className={styles.top}></div>
      <FaceRecognition />
      <div className={styles.bottom}>Face recognition, AI image generation, TTS, Face animaton and code (Python, Flask, Next.JS) - Andreas Ahlgren</div>
    </div>
  );
};

export default HomePage;