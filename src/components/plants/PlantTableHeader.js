import classes from "./PlantTableHeader.module.css";
const PlantTableHeader = (props) => {
  return (
    <div className={classes.header}>
      <div
        onClick={props.onSortNames}
        className={`${classes["grid-item"]} ${classes["grid-item-1"]}`}
      >
        Plant name
      </div>
      <div
        onClick={props.onSortDates}
        className={`${classes["grid-item"]} ${classes["grid-item-2"]}`}
      >
        Last watered
      </div>
      <div
        onClick={props.onSortDays}
        className={`${classes["grid-item"]} ${classes["grid-item-3"]}`}
      >
        Days passed
      </div>
      <div className={`${classes["grid-item"]} ${classes["grid-item-4"]}`}>
        Freq
      </div>
      <div
        className={`${classes["grid-item"]} ${classes["grid-item-5"]}`}
      ></div>
    </div>
  );
};
export default PlantTableHeader;
