import classes from "./PlantTable.module.css";
import PlantTableHeader from "./PlantTableHeader";
import PlantTableRow from "./PlantTableRow";

const PlantTable = (props) => {
  const { sortedPlants } = props;

  return (
    <div className={classes["grid-container"]}>
      <PlantTableHeader
        onSortDays={props.onSortDays}
        onSortDates={props.onSortDates}
        onSortNames={props.onSortNames}
      />
      {sortedPlants.map((item) => (
        <PlantTableRow key={item.id} plantInfo={item}></PlantTableRow>
      ))}
    </div>
  );
};
export default PlantTable;
