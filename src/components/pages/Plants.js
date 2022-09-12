import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useHttp from "../../hooks/use-http";
import { getAllPlants, refreshPlantData } from "../../lib/api";
import { changeLastWateredToToday } from "../../store/plants-slice";
import PlantList from "../plants/PlantList";
import LoadingSpinner from "../ui/LoadingSpinner";

let initialRun = true;

const Plants = (props) => {
  const { data: allPlantsData, sendRequest, status } = useHttp();
  const dispatch = useDispatch();

  // Re-calculate days since last watered when app first runs
  useEffect(() => {
    if (initialRun) {
      console.log("refreshing data..");
      sendRequest(refreshPlantData);
      initialRun = false;
    }
  }, [sendRequest]);

  useEffect(() => {
    sendRequest(getAllPlants);
  }, [sendRequest]);

  const updatedToTodayHandler = () => {
    // sendRequest(getAllPlants);
    return;
  };

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />;
      </div>
    );
  }

  return (
    <PlantList
      allPlantsData={allPlantsData}
      onUpdatedToToday={updatedToTodayHandler}
    />
  );
};

export default Plants;
