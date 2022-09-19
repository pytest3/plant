import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import React, { useState, Fragment } from "react";
import classes from "./NewPlantForm.module.css";
import {
  capitalize,
  calculateDaysSinceLast,
  getRandomInt,
  checkIfDateLesserThanToday,
} from "../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { addPlant } from "../../store/plants-slice";
import PlantAddedModal from "../ui/Modals/PlantAddedModal";
import { toggleModal } from "../../store/ui-slice";
import { useEffect } from "react";

let formIsValid = false;

const NewPlantForm = () => {
  const isModalVisible = useSelector((state) => state.ui.isModalShown);
  const { status } = useHttp();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickBackHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (formIsValid) {
      dispatch(toggleModal("show"));
      formIsValid = false;
    }
  }, [dispatch]);

  const {
    enteredValue: enteredName,
    hasError: nameHasError,
    valueIsValid: nameIsValid,
    inputTouchHandler: nameTouchHandler,
    inputChangeHandler: nameChangeHandler,
    resetInput: resetName,
  } = useInput((value) => value.trim().length > 2);
  const {
    enteredValue: enteredLastWatered,
    hasError: lastWateredHasError,
    valueIsValid: lastWateredIsValid,
    inputTouchHandler: lastWateredTouchHandler,
    inputChangeHandler: lastWateredChangeHandler,
    resetInput: resetLastWatered,
  } = useInput((value) => checkIfDateLesserThanToday(value));
  const {
    enteredValue: enteredFrequency,
    hasError: frequencyHasError,
    valueIsValid: frequencyIsValid,
    inputTouchHandler: frequencyTouchHandler,
    inputChangeHandler: frequencyChangeHandler,
    resetInput: resetFrequency,
  } = useInput((value) => value.trim().length > 2);
  const {
    enteredValue: enteredLastFertilized,
    hasError: lastFertilizedHasError,
    valueIsValid: lastFertilizedIsValid,
    inputTouchHandler: lastFertilizedTouchHandler,
    inputChangeHandler: lastFertilizedChangeHandler,
    resetInput: resetLastFertilized,
  } = useInput((value) => {
    checkIfDateLesserThanToday(value);
  }, true);
  const {
    enteredValue: enteredLastInsecticided,
    hasError: lastInsecticidedHasError,
    valueIsValid: lastInsecticidedIsValid,
    inputTouchHandler: lastInsecticidedTouchHandler,
    inputChangeHandler: lastInsecticidedChangeHandler,
    resetInput: resetLastInsecticided,
  } = useInput((value) => {
    checkIfDateLesserThanToday(value);
  }, true);
  const {
    enteredValue: enteredLastSprayed,
    hasError: lastSprayedHasError,
    valueIsValid: lastSprayedIsValid,
    inputTouchHandler: lastSprayedTouchHandler,
    inputChangeHandler: lastSprayedChangeHandler,
    resetInput: resetLastSprayed,
  } = useInput((value) => {
    checkIfDateLesserThanToday(value);
  }, true);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    nameTouchHandler();
    frequencyTouchHandler();
    lastWateredTouchHandler();
    lastFertilizedTouchHandler();
    lastInsecticidedTouchHandler();
    if (
      !nameIsValid ||
      !lastWateredIsValid ||
      !frequencyIsValid ||
      !lastFertilizedIsValid ||
      !lastInsecticidedIsValid ||
      !lastSprayedIsValid
    ) {
      return;
    }
    dispatch(
      addPlant({
        id: getRandomInt(),
        name: capitalize(enteredName),
        lastWatered: enteredLastWatered,
        frequency: enteredFrequency,
        daysSinceLast: calculateDaysSinceLast(enteredLastWatered),
      })
    );
    formIsValid = true;
    resetName();
    resetFrequency();
    resetLastWatered();
    resetLastFertilized();
    resetLastInsecticided();
    resetLastSprayed();
  };

  const nameClasses = !nameHasError
    ? `${classes.nameInput}`
    : `${classes.input}`;
  const dateClasses = !lastWateredHasError
    ? `${classes.dateInput}`
    : `${classes.input}`;
  const freqClasses = !frequencyHasError
    ? `${classes.freqInput}`
    : `${classes.input}`;
  const fertClasses = !lastFertilizedHasError
    ? `${classes.dateInput}`
    : `${classes.input}`;
  const insecticideClasses = !lastInsecticidedHasError
    ? `${classes.dateInput}`
    : `${classes.input}`;

  return (
    <Fragment>
      {isModalVisible && (
        <PlantAddedModal header="Plant added!">
          Plant successfully added!
        </PlantAddedModal>
      )}
      <div className={classes.form}>
        <form onSubmit={formSubmitHandler}>
          {status === "pending" && (
            <div>
              <h1>LOADING!!</h1>
            </div>
          )}
          {/* <h2 className={classes.header}>Add a new plant!</h2> */}

          <label className={classes.label} htmlFor="name">
            Name:{" "}
          </label>
          <input
            className={`${nameClasses} ${classes.input}`}
            type="text"
            id="name"
            onChange={nameChangeHandler}
            onBlur={nameTouchHandler}
            value={enteredName}
          ></input>
          {nameHasError && (
            <div className="warningTxt">Please enter a valid plant name</div>
          )}

          <label className={classes.label} htmlFor="lastWatered">
            Last watered:
          </label>
          <input
            className={`${dateClasses} ${classes.input}`}
            type="date"
            id="lastWatered"
            onChange={lastWateredChangeHandler}
            onBlur={lastWateredTouchHandler}
            value={enteredLastWatered}
          ></input>
          {lastWateredHasError && (
            <div className="warningTxt">
              Please enter a valid last watered date
            </div>
          )}

          <label className={`${classes.label}`} htmlFor="frequency">
            Frequency:
          </label>
          <input
            className={`${freqClasses} ${classes.input}`}
            type="text"
            id="frequency"
            onChange={frequencyChangeHandler}
            onBlur={frequencyTouchHandler}
            value={enteredFrequency}
          ></input>
          {frequencyHasError && (
            <div className="warningTxt">
              Please enter a valid watering frequency
            </div>
          )}

          <label className={classes.label} htmlFor="lastFertilized">
            Last fertilized:
            <span className={classes.optional}>(optional)</span>
          </label>
          <input
            className={`${fertClasses} ${classes.input}`}
            type="date"
            id="lastFertilized"
            onChange={lastFertilizedChangeHandler}
            onBlur={lastFertilizedTouchHandler}
            value={enteredLastFertilized}
          ></input>
          {lastFertilizedHasError && (
            <div className="warningTxt">
              Please enter a valid last fertilized date
            </div>
          )}

          <label className={classes.label} htmlFor="lastInsecticided">
            Last insecticided:
            <span className={classes.optional}> (optional)</span>
          </label>
          <input
            className={`${insecticideClasses} ${classes.input}`}
            type="date"
            id="lastInsecticided"
            onChange={lastInsecticidedChangeHandler}
            onBlur={lastInsecticidedTouchHandler}
            value={enteredLastInsecticided}
          ></input>
          {lastInsecticidedHasError && (
            <div className="warningTxt">
              Please enter a valid last insecticided date
            </div>
          )}

          <label className={classes.label} htmlFor="lastSprayed">
            Last sprayed:
            <span className={classes.optional}> (optional)</span>
          </label>
          <input
            className={`${insecticideClasses} ${classes.input}`}
            type="date"
            id="lastSprayed"
            onChange={lastSprayedChangeHandler}
            onBlur={lastSprayedTouchHandler}
            value={enteredLastSprayed}
          ></input>
          {lastSprayedHasError && (
            <div className="warningTxt">
              Please enter a valid last sprayed date
            </div>
          )}

          <button className={classes.submitBtn} type="submit">
            Submit
          </button>
          <button
            className={classes.backBtn}
            type="button"
            onClick={clickBackHandler}
          >
            Back
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default NewPlantForm;
