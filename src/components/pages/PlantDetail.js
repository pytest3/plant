import { useParams } from "react-router-dom";
import EditPlantForm from "../plants/EditPlantForm";
import useHttp from "../../hooks/use-http";
import { getSinglePlant, updateSinglePlant } from "../../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

const PlantDetail = (props) => {
  const { plantId } = useParams();
  const { data, sendRequest, status } = useHttp();

  useEffect(() => {
    sendRequest(getSinglePlant, plantId);
  }, [sendRequest, plantId]);

  const editPlantHandler = async (updatedPlant) => {
    await sendRequest(updateSinglePlant, updatedPlant);
    return;
  };

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <EditPlantForm
      plantInfo={data}
      onEditPlant={editPlantHandler}
    ></EditPlantForm>
  );
};

export default PlantDetail;
