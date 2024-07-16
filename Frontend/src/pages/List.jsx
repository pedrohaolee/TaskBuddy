import React from "react";
import { Link } from "react-router-dom";

const List = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/members/a">A</Link>
        </li>
        <li>
          <Link to="/members/b">B</Link>
        </li>
        <li>
          <Link to="/members/c">C</Link>
        </li>
      </ul>
    </>
  );
};

export default List;
