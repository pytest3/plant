import classes from "./SmallCard.module.css";

const SmallCard = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`${classes.container} ${props.className}`}
    >
      {props.children}
    </div>
  );
};
export default SmallCard;
