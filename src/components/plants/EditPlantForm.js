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
  const { plantInfo } = props;

  // const [editedLastFert, setEditedLastFertHandler] = useState(
  //   plantInfo.lastWatered
  // );

  const [editedLastWatered, setEditedLastWatered] = useState(
    plantInfo.lastWatered
  );
  const [editedName, setEditedName] = useState(plantInfo.name);

  // const editedLastFertHandler = (e) => {
  //   setEditedLastFertHandler(e.target.value);
  // };

  const editedLastWateredHandler = (e) => {
    setEditedLastWatered(e.target.value);
  };

  const editedNameHandler = (e) => {
    console.log(e.target.value);
    setEditedName(e.target.value);
  };

  const backBtnClickHandler = () => {
    dispatch(toggleModal("hide"));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editPlant({
        id: currPlantId,
        lastWatered: editedLastWatered,
        name: editedName,
      })
    );
    return;
  };
  return (
    <Fragment>
      <form onSubmit={formSubmitHandler}>
        <label className={classes.label} for="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={editedName}
          onChange={editedNameHandler}
          className={classes.editPlantFormInput}
        ></input>
        <label className={classes.label} for="lastWatered">
          Last watered:{" "}
        </label>
        <input
          type="date"
          id="lastWatered"
          value={editedLastWatered}
          onChange={editedLastWateredHandler}
          className={classes.editPlantFormInput}
        ></input>
        {/* <label className={classes.label}>Last fertilized: </label>
        <input
          type="date"
          id="date"
          value={editedLastFert}
          onChange={editedLastFertHandler}
          className={classes.editPlantFormInput}
        ></input> */}
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
