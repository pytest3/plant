import classes from "./PlantTableRow.module.css";
import { Link, useLocation } from "react-router-dom";
import { calculateDaysSinceLast, formatLastWatered } from "../../utils/Utils";
import { ReactComponent as Water } from "../../icons/droplet-solid.svg";
import { useDispatch } from "react-redux";
import { changeLastWateredToToday } from "../../store/plants-slice";

const PlantTableRow = (props) => {
  const { pathname } = useLocation();
  const { name, lastWatered, frequency, id } = props.plantInfo;
  const dispatch = useDispatch();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(changeLastWateredToToday(id));
  };

  return (
    <div className={classes.rows}>
      <div className={`${classes["grid-item"]} ${classes["grid-item-1"]}`}>
        <Link to={`${pathname}/${id}`} className={classes.plant}>
          {name}
        </Link>
      </div>
      <div className={`${classes["grid-item"]} ${classes["grid-item-2"]}`}>
        {formatLastWatered(lastWatered)}
      </div>
      <div className={`${classes["grid-item"]} ${classes["grid-item-3"]}`}>
        {calculateDaysSinceLast(lastWatered)}
      </div>
      <div className={`${classes["grid-item"]} ${classes["grid-item-4"]}`}>
        {frequency}
      </div>
      <div className={`${classes["grid-item"]} ${classes["grid-item-5"]}`}>
        <form onSubmit={formSubmitHandler}>
          <button className={classes.waterBtn}>
            <Water className={classes.water} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlantTableRow;
