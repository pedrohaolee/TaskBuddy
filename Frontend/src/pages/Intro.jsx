import React from "react";

const Intro = () => {
  return (
    <h1>
      Gets an array of popular memes that may be captioned with the API. The API
      returned 100 memes ordered by how many times they were captioned in the
      last 30 days. The app will randomly choose 30 out of the 100.
    </h1>
  );
};

export default Intro;
