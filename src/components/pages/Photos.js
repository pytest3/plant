import classes from "./Photos.module.css";
const Photos = (props) => {
  return props.images.map((image) => (
    <img
      className={classes.image}
      alt="plants"
      key={image.id}
      src={image.url}
    ></img>
  ));
};

export default Photos;
