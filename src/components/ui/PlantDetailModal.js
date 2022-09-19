import { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../store/ui-slice";
import EditPlantForm from "../plants/EditPlantForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import classes from "./PlantDetailModal.module.css";
import { deletePlant } from "../../store/plants-slice";
import DeleteConfirmationForm from "../plants/DeleteConfirmationForm";

const PlantDetailModal = () => {
  const [askToDelete, setAskToDelete] = useState(false);

  const plantId = useSelector((state) => state.plants.currentPlantId);
  const plantData = useSelector((state) => state.plants.allPlants).find(
    (plant) => plant.id === plantId
  );
  const deletePlantHandler = () => {
    setAskToDelete(true);
  };

  const deleteIcon = (
    <FontAwesomeIcon
      icon={faTrashCan}
      className={classes.trash}
      onClick={deletePlantHandler}
    />
  );

  let plantDetailModalContent = (
    <Modal header={plantData.name} plantInfo={plantData} icon={deleteIcon}>
      <EditPlantForm name={plantData.name} />
    </Modal>
  );

  if (askToDelete) {
    plantDetailModalContent = (
      <Modal header="Delete plant">
        <DeleteConfirmationForm name={plantData.name} id={plantId} />
      </Modal>
    );
  }

  return ReactDOM.createPortal(
    plantDetailModalContent,
    document.getElementById("overlay-root")
  );
};

export default PlantDetailModal;
