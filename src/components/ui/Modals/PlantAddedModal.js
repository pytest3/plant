import Button from "../Button";
import classes from "./PlantAddedModal.module.css";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../store/ui-slice";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Card from "../Card";

const ModalOverlay = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addBtnClickHandler = () => {
    dispatch(toggleModal());
    return;
  };
  const backBtnClickHandler = () => {
    dispatch(toggleModal("hide"));
    navigate(-1);
    return;
  };
  return (
    <Fragment>
      <div className={classes.backdrop}></div>
      <Card className={classes.modal}>
        <header className={classes.header}>{props.header}</header>
        <div className={classes.body}>{props.children}</div>
        <footer className={classes.footer}>
          <Button className={classes.addBtn} onClick={addBtnClickHandler}>
            Add another plant
          </Button>
          <Button className={classes.backBtn} onClick={backBtnClickHandler}>
            Back to all plants
          </Button>
        </footer>
      </Card>
    </Fragment>
  );
};

const PlantAddedModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay header={props.header}>{props.children}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default PlantAddedModal;
