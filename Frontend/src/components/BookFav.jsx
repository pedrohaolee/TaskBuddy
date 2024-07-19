import React from "react";
import styles from "./TopMemes.module.css";

const BookFav = (props) => {
  const unfavMeme = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_AIRTABLE + `?records[]=${props.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_APIKEY}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("unfav meme error");
      }

      props.getMemesFav();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className={styles.memecard}>
        <div className={styles.memetitle}>{props.name}</div>
        <img className={styles.memeimage} src={props.url} />
        <button className={styles.unfavoritebutton} onClick={unfavMeme}>
          Unfavorite
        </button>
      </div>
    </>
  );
};

export default BookFav;
