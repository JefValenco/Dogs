import styles from "./Card.module.css";

const Card = (props) => {
  let temperament = props.temperament;

  if (Array.isArray(temperament)) {
    temperament = temperament.join(" "); // join array elements with a space separator
  }
  return (
    <div className={styles.content}>
      <div className={styles.img["content-overlay"]}></div>
      <img className={styles["content-image"]} src={props.image} alt="img" />
      <div className={`${styles["content-details"]} fadeIn-bottom`}>
        <h3 className={styles.h2["content-title"]}>{props.name}</h3>
        <p className={styles.p["content-text"]}>
          <i className="fa fa-map-marker"></i> {styles.p}
        </p>
      </div>
    </div>
  );
};

export default Card;
