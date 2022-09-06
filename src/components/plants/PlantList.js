import PlantItem from "./PlantItem";
import classes from "./PlantList.module.css";
import { Fragment, useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import PlantListHeader from "./PlantListHeader";
import {
  sortDaysAsc,
  sortDaysDesc,
  sortDatesAsc,
  sortDatesDesc,
  sortNamesAsc,
  sortNamesDesc,
} from "../../utils/Utils";

const PlantsList = (props) => {
  const { allPlantsData } = props;
  const [sortedPlantsData, setSortedPlantsData] = useState([]);
  const [daysAsc, setDaysAsc] = useState();
  const [datesAsc, setDatesAsc] = useState();
  const [namesAsc, setNamesAsc] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchParams = searchParams.get("sort");

  const updatedToTodayHandler = () => {
    props.onUpdatedToToday();
    return;
  };

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
    if (currentSearchParams === "days-desc") {
      sortedPlants = sortDaysDesc(allPlantsData || []);
    } else if (currentSearchParams === "days-asc") {
      sortedPlants = sortDaysAsc(allPlantsData || []);
    } else if (currentSearchParams === "dates-desc") {
      sortedPlants = sortDatesDesc(allPlantsData || []);
    } else if (currentSearchParams === "dates-asc") {
      sortedPlants = sortDatesAsc(allPlantsData || []);
    } else if (currentSearchParams === "names-desc") {
      sortedPlants = sortNamesDesc(allPlantsData || []);
    } else if (currentSearchParams === "names-asc") {
      sortedPlants = sortNamesAsc(allPlantsData || []);
    } else {
      sortedPlants = sortNamesAsc(allPlantsData || []);
    }
    setSortedPlantsData(sortedPlants);
  }, [allPlantsData, currentSearchParams]);

  return (
    <Fragment>
      <PlantListHeader
        onSortDays={sortDaysHandler}
        onSortDates={sortDatesHandler}
        onSortNames={sortNamesHandler}
      />
      <ul className={classes.list}>
        {sortedPlantsData
          ? sortedPlantsData.map((item) => (
              <PlantItem
                key={item.id}
                plantInfo={item}
                onUpdatedToToday={updatedToTodayHandler}
              />
            ))
          : ""}
      </ul>
    </Fragment>
  );
};

export default PlantsList;
