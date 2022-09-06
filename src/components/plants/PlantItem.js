import React, { Fragment } from "react";
import classes from "./PlantItem.module.css";
import Card from "../ui/Card";
import SmallCard from "../ui/SmallCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { updateLastWateredToToday } from "../../lib/api";
import { ReactComponent as Water } from "../../icons/droplet-solid.svg";
import { calculateDaysSinceLast, formatLastWatered } from "../../utils/Utils";

const PlantItem = (props) => {
  const { pathname } = useLocation();
  const { sendRequest } = useHttp();
  const navigate = useNavigate();

  const { id, name, lastWatered, frequency } = props.plantInfo;

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    await sendRequest(updateLastWateredToToday, id);
    props.onUpdatedToToday();
    navigate("/plants");
  };

  return (
    <Fragment>
      <Card className={classes.text}>
        <Link to={`${pathname}/${id}`} className={classes.plant}>
          <SmallCard>{name}</SmallCard>
        </Link>
        <SmallCard className={classes.lastWatered}>
          {formatLastWatered(lastWatered)}
        </SmallCard>
        <SmallCard className={classes.daysSince}>
          {calculateDaysSinceLast(lastWatered)}
        </SmallCard>
        <SmallCard className={classes.frequency}>{frequency}</SmallCard>

        <form onSubmit={formSubmitHandler}>
          <button className={classes.waterBtn}>
            <Water className={classes.water} />
          </button>
        </form>
      </Card>
    </Fragment>
  );
};

export default PlantItem;
