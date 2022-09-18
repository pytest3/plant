import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PlantsTable from "./PlantTable";
import {
  sortDaysAsc,
  sortDaysDesc,
  sortDatesAsc,
  sortDatesDesc,
  sortNamesAsc,
  sortNamesDesc,
  searchPlantsByName,
} from "../../utils/Utils";

const PlantsList = () => {
  const allPlantsData = useSelector((state) => state.plants.allPlants);
  const searchTerm = useSelector((state) => state.plants.enteredSearchTerm);
  const [sortedPlantsData, setSortedPlantsData] = useState([]);
  const [daysAsc, setDaysAsc] = useState();
  const [datesAsc, setDatesAsc] = useState();
  const [namesAsc, setNamesAsc] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchParams = searchParams.get("sort");

  const sortDaysHandler = () => {
    if (daysAsc) {
      setSearchParams("sort=days-desc");
      setDaysAsc(false);
    } else if (!daysAsc) {
      setSearchParams("sort=days-asc");
      setDaysAsc(true);
    }
  };

  const sortDatesHandler = () => {
    if (datesAsc) {
      setSearchParams("sort=dates-desc");
      setDatesAsc(false);
    } else if (!datesAsc) {
      setSearchParams("sort=dates-asc");
      setDatesAsc(true);
    }
  };

  const sortNamesHandler = () => {
    if (namesAsc || namesAsc === null) {
      setSearchParams("sort=names-desc");
      setNamesAsc(false);
    } else if (!namesAsc) {
      setSearchParams("sort=names-asc");
      setNamesAsc(true);
    }
  };

  useEffect(() => {
    let sortedPlants;

    if (searchTerm) {
      sortedPlants = searchPlantsByName(allPlantsData, searchTerm);
    } else if (currentSearchParams === "days-desc") {
      sortedPlants = sortDaysDesc(allPlantsData);
    } else if (currentSearchParams === "days-asc") {
      sortedPlants = sortDaysAsc(allPlantsData);
    } else if (currentSearchParams === "dates-desc") {
      sortedPlants = sortDatesDesc(allPlantsData);
    } else if (currentSearchParams === "dates-asc") {
      sortedPlants = sortDatesAsc(allPlantsData);
    } else if (currentSearchParams === "names-desc") {
      sortedPlants = sortNamesDesc(allPlantsData);
    } else if (currentSearchParams === "names-asc") {
      sortedPlants = sortNamesAsc(allPlantsData);
    } else {
      sortedPlants = sortNamesAsc(allPlantsData);
    }
    setSortedPlantsData(sortedPlants);
  }, [allPlantsData, currentSearchParams, searchTerm]);

  return (
    <Fragment>
      <PlantsTable
        onSortDays={sortDaysHandler}
        onSortDates={sortDatesHandler}
        onSortNames={sortNamesHandler}
        sortedPlants={sortedPlantsData}
      ></PlantsTable>
    </Fragment>
  );
};

export default PlantsList;
