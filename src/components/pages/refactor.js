import { addNewPlant } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { Fragment, useState } from "react";
import classes from "./NewPlantForm.module.css";
import {
  capitalize,
  calculateDaysSinceLast,
  getRandomInt,
} from "../../utils/Utils";

const NewPlantForm = (props) => {
  const navigate = useNavigate();
  const { status, sendRequest } = useHttp();
  const [isNameValid, setIsNameValid] = useState(true);
  const [isFreqValid, setIsFreqValid] = useState(true);
  const [isDateValid, setIsDateValid] = useState(true);
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isFreqTouched, setIsFreqTouched] = useState(false);
  const [isLastWateredTouched, setIsLastWateredTouched] = useState(false);

  const clickBackHandler = () => {
    navigate(-1);
  };

  const nameTouchedHandler = (e) => {
    setIsNameTouched(true);
  };

  const freqTouchedHandler = (e) => {
    setIsFreqTouched(true);
  };

  const lastWateredTouchedHandler = (e) => {
    setIsLastWateredTouched(true);
  };

  const nameChangeHandler = (e) => {
    if (e.target.value < 1) {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
    }
  };

  const freqChangeHandler = (e) => {
    if (e.target.value < 1) {
      setIsFreqValid(false);
    } else {
      setIsFreqValid(true);
    }
  };

  const lastWateredChangeHandler = (e) => {
    if (e.target.value < 1) {
      setIsDateValid(false);
    } else {
      setIsDateValid(true);
    }
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const { name, lastWatered, freq } = e.target.elements;

    if (!isNameTouched || (isNameTouched && name.value.length < 1)) {
      setIsNameValid(false);
    }
    if (!isFreqTouched || (isFreqTouched && freq.value.length < 1)) {
      setIsFreqValid(false);
    }
    if (
      !isLastWateredTouched ||
      (isLastWateredTouched && lastWatered.value.length < 1)
    ) {
      setIsDateValid(false);
    }

    if (
      name.value.length < 1 ||
      lastWatered.value.length < 1 ||
      freq.value.length < 1
    ) {
      return;
    }

    await sendRequest(addNewPlant, {
      id: getRandomInt(),
      name: capitalize(name.value),
      lastWatered: lastWatered.value,
      daysSinceLast: calculateDaysSinceLast(lastWatered.value),
      frequency: freq.value,
    });

    navigate("/plants");
    return;
  };

  const nameClasses = isNameValid ? `${classes.nameInput}` : `${classes.error}`;
  const dateClasses = isDateValid ? `${classes.dateInput}` : `${classes.error}`;
  const freqClasses = isFreqValid ? `${classes.freqInput}` : `${classes.error}`;

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
          onBlur={nameTouchedHandler}
        ></input>
        {!isNameValid && (
          <div className="warningTxt">Please enter a valid plant name</div>
        )}
        <label htmlFor="lastWatered">Last watered: </label>
        <input
          className={dateClasses}
          type="date"
          id="lastWatered"
          onChange={lastWateredChangeHandler}
          onBlur={lastWateredTouchedHandler}
        ></input>
        {!isDateValid && (
          <div className="warningTxt">
            Please enter a valid last watered date
          </div>
        )}

        <label htmlFor="freq">Frequency: </label>
        <input
          className={freqClasses}
          type="text"
          id="freq"
          onChange={freqChangeHandler}
          onBlur={freqTouchedHandler}
        ></input>
        {!isFreqValid && (
          <div className="warningTxt">
            Please enter a valid watering frequency
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
