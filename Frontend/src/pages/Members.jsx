import React from "react";
import { useParams } from "react-router-dom";

const Members = () => {
  const params = useParams();

  return <h1>Members {params.chicken}</h1>;
};

export default Members;
