import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./EditPlantForm.module.css";
import { calculateDaysSinceLast } from "../../utils/Utils";

const EditPlantForm = (props) => {
  const navigate = useNavigate();

  const { name, lastWatered } = props.plantInfo || {};

  const [dateInput, setDateInput] = useState(lastWatered);

  useEffect(() => {
    setDateInput(lastWatered);
  }, [lastWatered]);

  const dateInputHandler = (e) => {
    setDateInput(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const updatedLastWatered = e.target.elements.date.value;
    const updatedDaysSinceLast = calculateDaysSinceLast(updatedLastWatered);
    await props.onEditPlant({
      ...props.plantInfo,
      lastWatered: updatedLastWatered,
      daysSinceLast: updatedDaysSinceLast,
    });
    navigate("/plants");
  };

  const clickBackHandler = () => {
    navigate(-1);
  };

  return (
    <Fragment>
      {!dateInput && <p>Still loading!</p>}
      <form onSubmit={formSubmitHandler}>
        <h2>
          <span className={classes.subHeader}>Updating </span>
          {name}
        </h2>
        <label>Last watered: </label>
        <input
          type="date"
          id="date"
          value={dateInput}
          onChange={dateInputHandler}
          className={classes.lastWateredInput}
        ></input>
       <label>Last fertilised: </label>
        <input
          type="date"
          id="date"
          value={dateInput}
          onChange={dateInputHandler}
          className={classes.lastWateredInput}
        ></input>
        <button type="submit" className="submitBtn">
          Submit
        </button>
        <button type="button" onClick={clickBackHandler} className="backBtn">
          Back
        </button>
      </form>
    </Fragment>
  );
};

export default EditPlantForm;
