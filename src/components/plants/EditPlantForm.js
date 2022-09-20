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
  const [editedLastWatered, setEditedLastWatered] = useState(
    plantInfo.lastWatered
  );
  const [editedName, setEditedName] = useState(plantInfo.name);

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

  const uploadPhotoHandler = (e) => {
    const uploadedPhoto = e.target.files[0];

    return;
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
        <img
          className={classes.image}
          alt={plantInfo.name}
          src="https://www.thespruce.com/thmb/R156pwCZJEoT3prZsBP_PX-n0gM=/941x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/alocasia-frydek-plant-profile-ce6a16be606948a8a87217d335a6816f.jpg"
        ></img>
        <label className={classes.label} htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={editedName}
          onChange={editedNameHandler}
          className={classes.editPlantFormInput}
        ></input>
        <label className={classes.label} htmlFor="lastWatered">
          Last watered:{" "}
        </label>
        <input
          type="date"
          id="lastWatered"
          value={editedLastWatered}
          onChange={editedLastWateredHandler}
          className={classes.editPlantFormInput}
        ></input>
        <label className={classes.label} htmlFor="uploadPhoto">
          Upload photo:{" "}
        </label>
        <input
          type="file"
          id="uploadPhoto"
          onChange={uploadPhotoHandler}
          className={classes.uploadPhoto}
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
