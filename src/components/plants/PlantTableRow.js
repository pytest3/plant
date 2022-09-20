import classes from "./PlantTableRow.module.css";
import { calculateDaysSinceLast, formatLastWatered } from "../../utils/Utils";
import { ReactComponent as WaterSVG } from "../../icons/droplet-solid.svg";
import { useDispatch } from "react-redux";
import {
  changeLastWateredToToday,
  setCurrentPlantId,
} from "../../store/plants-slice";
import { toggleModal } from "../../store/ui-slice";
import { useNavigate } from "react-router-dom";

const PlantTableRow = (props) => {
  const navigate = useNavigate();

  const { name, lastWatered, frequency, id } = props.plantInfo;
  const dispatch = useDispatch();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(changeLastWateredToToday(id));
    navigate("/plants");

    return;
  };

  const nameClickHandler = () => {
    dispatch(toggleModal("show"));
    dispatch(setCurrentPlantId(id));
    return;
  };

  return (
    <div className={classes.rows}>
      <div
        onClick={nameClickHandler}
        className={`${classes["grid-item"]} ${classes["grid-item-1"]}`}
      >
        {name}
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
            <WaterSVG className={classes.water} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlantTableRow;
