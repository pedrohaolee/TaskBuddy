import React, { useEffect, useRef, useState } from "react";
import Book from "./Book";
import styles from "./TopMemes.module.css";

const Display = () => {
  const [memes, setMemes] = useState([]);

  const getMemes = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER);
      if (!res.ok) {
        throw new Error("fetch memes error");
      }
      const data = await res.json();
      const selectedMemes = selectRandomMemes(data.data.memes, 30);
      setMemes(selectedMemes);
    } catch (err) {
      console.log(err.message);
    }
  };

  const selectRandomMemes = (memesArray, count) => {
    const shuffledMemes = memesArray.sort(() => 0.5 - Math.random());
    return shuffledMemes.slice(0, count);
  };

  useEffect(() => {
    getMemes();
  }, []);

  return (
    <div className={styles.topmemes}>
      {Array.isArray(memes) &&
        memes.map((item) => {
          return (
            <Book
              key={item.id}
              id={item.id}
              name={item.name}
              url={item.url}
              height={item.height}
              width={item.width}
            ></Book>
          );
        })}
    </div>
  );
};

export default Display;
