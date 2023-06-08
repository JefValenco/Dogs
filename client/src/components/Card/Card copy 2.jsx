import styles from "./Card.module.css";

const Card = (props) => {
  let temperament = props.temperament;

  if (Array.isArray(temperament)) {
    temperament = temperament.join(" "); // join array elements with a space separator
  }
  return (
    <div className={styles.card}>
      <h2 className={styles.h2}>{props.name}</h2>
      <p className={styles.p}>Nature: {temperament}</p>
      <img
        className={styles.img}
        src={props.image}
        width="150"
        height="150"
        alt="img"
      />
    </div>
  );
};

export default Card;
