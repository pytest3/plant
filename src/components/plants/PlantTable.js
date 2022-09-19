import { useSelector } from "react-redux";
import PlantDetailModal from "../ui/Modals/PlantDetailModal";
import classes from "./PlantTable.module.css";
import PlantTableHeader from "./PlantTableHeader";
import PlantTableRow from "./PlantTableRow";

const PlantTable = (props) => {
  const { sortedPlants } = props;
  const showModal = useSelector((state) => state.ui.isModalShown);

  return (
    <div className={classes["grid-container"]}>
      <PlantTableHeader
        onSortDays={props.onSortDays}
        onSortDates={props.onSortDates}
        onSortNames={props.onSortNames}
      />
      {showModal && <PlantDetailModal />}
      <ul className={classes.allRows}>
        {sortedPlants.map((item) => (
          <PlantTableRow key={item.id} plantInfo={item}></PlantTableRow>
        ))}
      </ul>
    </div>
  );
};
export default PlantTable;
