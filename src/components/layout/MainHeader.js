import React from "react";
import classes from "./MainHeader.module.css";
import { useLocation, Link } from "react-router-dom";

const MainHeader = () => {
  const location = useLocation();
  return (
    <header className={classes.header}>
      <h1>Plants</h1>
      {location.pathname === "/plants" && (
        <Link to="/new-plant">
          <button className={classes.headerButton}>Add plant</button>
        </Link>
      )}
    </header>
  );
};

export default MainHeader;
