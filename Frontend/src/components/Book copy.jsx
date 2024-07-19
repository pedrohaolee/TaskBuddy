import React, { useState } from "react";
import styles from "./TopMemes.module.css";

const Book = (props) => {
  const [isFav, setIsFav] = useState(false);

  const favMeme = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_AIRTABLE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_APIKEY}`,
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Name: props.name,
                Url: props.url,
                Height: props.height,
                Width: props.width,
              },
            },
          ],
        }),
      });

      setIsFav(true);

      if (!res.ok) {
        throw new Error("fav meme error");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className={styles.memecard}>
        <div className={styles.memetitle}>{props.name}</div>
        <img className={styles.memeimage} src={props.url} alt={props.name} />
        <button className={styles.favoritebutton} onClick={favMeme}>
          {isFav ? <span>&#10003; Favorite</span> : <span>Favorite</span>}
        </button>
      </div>
    </>
  );
};

export default Book;
