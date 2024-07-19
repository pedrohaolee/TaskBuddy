import React, { useEffect, useRef, useState } from "react";
import BookFav from "./BookFav";
import styles from "./TopMemes.module.css";

const DisplayFav = () => {
  const [memesFav, setMemesFav] = useState([]);

  const getMemesFav = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_AIRTABLEGET, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APIKEY}`,
        },
      });
      if (!res.ok) {
        throw new Error("fetch fav memes error");
      }
      const data = await res.json();
      setMemesFav(data.records);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getMemesFav();
  }, []);

  return (
    <div className={styles.topmemes}>
      {Array.isArray(memesFav) &&
        memesFav.map((item) => {
          return (
            <BookFav
              key={item.id}
              id={item.id}
              name={item.fields.Name}
              url={item.fields.Url}
              height={item.fields.Height}
              width={item.fields.Width}
              getMemesFav={getMemesFav}
            ></BookFav>
          );
        })}
    </div>
  );
};

export default DisplayFav;
