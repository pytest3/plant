import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../store/ui-slice";
import classes from "./DeleteConfirmationForm.module.css";
import { Fragment } from "react";
import { deletePlant } from "../../store/plants-slice";

const DeleteConfirmationForm = (props) => {
  const dispatch = useDispatch();

  const backBtnClickHandler = () => {
    dispatch(toggleModal("hide"));
  };

  const formSubmitHandler = (e) => {
    dispatch(deletePlant(props.id));
    dispatch(toggleModal("hide"));
    return;
  };

  return (
    <Fragment>
      <form onSubmit={formSubmitHandler}>
        <p>Are you sure you want to delete {props.name}?</p>
        <button type="submit" className={classes.submitBtn}>
          Delete
        </button>
        <button
          type="button"
          onClick={backBtnClickHandler}
          className={classes.backBtn}
        >
          Back
        </button>
      </form>
    </Fragment>
  );
};

export default DeleteConfirmationForm;
