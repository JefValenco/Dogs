import styles from "./Card.module.css";

const Card = (props) => {
  let temperament = props.temperament;

  if (Array.isArray(temperament)) {
    temperament = temperament.join(" "); // join array elements with a space separator
  }
  return (
    <div className={styles.content}>
      <div className={styles["content-overlay"]}></div>
      <img className={styles["content-image"]} src={props.image} alt="img" />
      <div className={`${styles["content-details"]} fadeIn-bottom`}>
        <h3 className={styles["content-title"]}>{props.name}</h3>
        <h3 className={styles.p}>Nature: {temperament}</h3>
      </div>
    </div>
  );
};

export default Card;
