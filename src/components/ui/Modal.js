import { Fragment } from "react";
import Card from "./Card";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <Fragment>
      <div className={classes.backdrop} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          {props.header}
          {props.icon}
        </header>
        <div className={classes.body}>{props.children}</div>
      </Card>
    </Fragment>
  );
};

export default Modal;
