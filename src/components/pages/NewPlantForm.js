import { addNewPlant } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { Fragment } from "react";
import classes from "./NewPlantForm.module.css";
import {
  capitalize,
  calculateDaysSinceLast,
  getRandomInt,
  checkIfDateLesserThanToday,
} from "../../utils/Utils";

const NewPlantForm = (props) => {
  const { status, sendRequest } = useHttp();
  const navigate = useNavigate();
  const clickBackHandler = () => {
    navigate(-1);
  };

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

  const formSubmitHandler = async (e) => {
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

    await sendRequest(addNewPlant, {
      id: getRandomInt(),
      name: capitalize(enteredName),
      lastWatered: enteredLastWatered,
      frequency: enteredFrequency,
      daysSinceLast: calculateDaysSinceLast(enteredLastWatered),
    });

    resetName();
    resetFrequency();
    resetLastWatered();
    resetLastFertilized();
    resetLastInsecticided();
    resetLastSprayed();
  };

  const nameClasses = !nameHasError
    ? `${classes.nameInput}`
    : `${classes.error}`;
  const dateClasses = !lastWateredHasError
    ? `${classes.dateInput}`
    : `${classes.error}`;
  const freqClasses = !frequencyHasError
    ? `${classes.freqInput}`
    : `${classes.error}`;
  const fertClasses = !lastFertilizedHasError
    ? `${classes.dateInput}`
    : `${classes.error}`;
  const insecticideClasses = !lastInsecticidedHasError
    ? `${classes.dateInput}`
    : `${classes.error}`;

  return (
    <Fragment>
      <form onSubmit={formSubmitHandler}>
        {status === "pending" && (
          <div>
            <h1>LOADING</h1>
          </div>
        )}
        <h2 className={classes.header}>Add a new plant!</h2>

        <label htmlFor="name">Name: </label>
        <input
          className={nameClasses}
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameTouchHandler}
          value={enteredName}
        ></input>
        {nameHasError && (
          <div className="warningTxt">Please enter a valid plant name</div>
        )}

        <label htmlFor="lastWatered">Last watered: </label>
        <input
          className={dateClasses}
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

        <label htmlFor="frequency">Frequency: </label>
        <input
          className={freqClasses}
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

        <label htmlFor="lastFertilized">
          Last fertilized: <span className={classes.optional}>(optional)</span>
        </label>
        <input
          className={fertClasses}
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

        <label htmlFor="lastInsecticided">
          Last insecticided:
          <span className={classes.optional}> (optional)</span>
        </label>
        <input
          className={insecticideClasses}
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

        <label htmlFor="lastSprayed">
          Last sprayed:
          <span className={classes.optional}> (optional)</span>
        </label>
        <input
          className={insecticideClasses}
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

        <button className="submitBtn" type="submit">
          Submit
        </button>
        <button className="backBtn" type="button" onClick={clickBackHandler}>
          Back
        </button>
      </form>
    </Fragment>
  );
};

export default NewPlantForm;
