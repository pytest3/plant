import React from "react";
import { Fragment } from "react";
import PlantList from "../plants/PlantList";
import Card from "../ui/Card";
import classes from "./Plants.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { searchPlantName } from "../../store/plants-slice";

import {
  faPlus,
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Plants = (props) => {
  const dispatch = useDispatch();

  const userSearchHandler = (e) => {
    const userInput = e.target.value;
    dispatch(searchPlantName(userInput));
  };
  return (
    <Fragment>
      <PlantList />

      {/* <Card className={classes.bar}> */}
      {/* <FontAwesomeIcon icon={faHouse} /> */}

      <form className={classes.searchBar}>
        <input
          className={classes.input}
          type="text"
          placeholder="Search. . ."
          onChange={userSearchHandler}
        ></input>
        <button className={classes.button}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>

      {/* <FontAwesomeIcon icon={faPlus} /> */}
      {/* </Card> */}
    </Fragment>
  );
};

export default Plants;
