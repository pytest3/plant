import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./EditPlantForm.module.css";
import { calculateDaysSinceLast } from "../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../store/ui-slice";
import { editPlant } from "../../store/plants-slice";

const EditPlantForm = (props) => {
  const dispatch = useDispatch();
  const currPlantId = useSelector((state) => state.plants.currentPlantId);

  const { name, lastWatered } = props;
  const [dateInput, setDateInput] = useState(lastWatered);

  const [editedLastWatered, setEditedLastWatered] = useState("");
  useEffect(() => {
    setDateInput(lastWatered);
  }, [lastWatered]);

  const dateInputHandler = (e) => {
    setDateInput(e.target.value);
  };

  const editedLastWateredHandler = (e) => {
    setEditedLastWatered(e.target.value);
  };

  const backBtnClickHandler = () => {
    dispatch(toggleModal("hide"));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(editPlant({ id: currPlantId, lastWatered: editedLastWatered }));
    return;
  };
  return (
    <Fragment>
      <form onSubmit={formSubmitHandler}>
        <label className={classes.label}>Last watered: </label>
        <input
          type="date"
          id="date"
          value={editedLastWatered}
          onChange={editedLastWateredHandler}
          className={classes.editPlantFormInput}
        ></input>
        <label className={classes.label}>Last fertilized: </label>
        <input
          type="date"
          id="date"
          value={dateInput}
          onChange={dateInputHandler}
          className={classes.editPlantFormInput}
        ></input>
        <button type="submit" className={classes.submitBtn}>
          Update
        </button>
        <button
          type="button"
          onClick={backBtnClickHandler}
          className={classes.backBtn}
        >
          Back
        </button>
      </form>
    </Fragment>
  );
};

export default EditPlantForm;
