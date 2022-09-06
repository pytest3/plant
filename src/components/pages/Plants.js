import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { getAllPlants, refreshPlantData } from "../../lib/api";
import PlantList from "../plants/PlantList";
import LoadingSpinner from "../ui/LoadingSpinner";

let initialRun = true;

const Plants = (props) => {
  const { data: allPlantsData, sendRequest, status } = useHttp();

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
    sendRequest(getAllPlants);
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
