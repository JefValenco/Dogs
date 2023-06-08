import Card from "../Card/Card";
import styles from "./CardsContainer.module.css";
import { Link } from "react-router-dom";

const CardsContainer = ({ currentDogs }) => {
  return (
    <div className={styles.container}>
      {currentDogs.map((dog) => {
        return (
          <div key={dog.id}>
            <Link to={`/dogs/${dog.id}`} key={dog.id}>
              <Card
                name={dog.name}
                image={dog.image}
                temperament={dog.temperament}
                key={dog.id}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CardsContainer;
