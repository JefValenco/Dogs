import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItemById } from "../../redux/actions";
import { useParams, Link } from "react-router-dom";
import styles from "./Detail.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const item = useSelector((state) => state.itemById);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getItemById(id)).then(() => {
        setIsLoading(false);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  console.log("Item:", item);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on component mount
  }, []);

  if (isLoading) {
    return (
      <div>
        <span
          className={styles.loader}
          style={{ backgroundColor: "#705757", width: "100%", height: "100%" }}
        ></span>
      </div>
    );
  }

  return (
    <div className={styles.contain}>
      {" "}
      <div className={styles.container}>
        <div className={styles["d-lg-flex"]}>
          <div className={`${styles.card} border-0 me-lg-4 mb-lg-0 mb-4`}>
            {" "}
            <div className={styles.pic}>
              <div className={styles.title}>
                <span className={styles.month}>{item.name}</span>
              </div>
            </div>
            <div className={styles.container} style={{ color: "#000000" }}>
              <div className={styles.box} style={{ paddingLeft: "2em" }}>
                <img
                  className=""
                  src={item.image}
                  alt="img"
                  style={{
                    borderRadius: "4px",
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
                <h3 className={styles.label}>Name: </h3>
                <p> {item.name}</p>
              </div>
              <div
                className={styles.box}
                style={{ paddingLeft: "9em", paddingRight: "2em" }}
              >
                <h3 className={styles.label}>ID: </h3>
                <p>{item.id}</p>

                <h3 className={styles.label}>Height: </h3>
                <p> {item.height}</p>
                <h3 className={styles.label}>Weight: </h3>
                <p>{item.weight}</p>
                <h3 className={styles.label}>Life_span: </h3>
                <p> {item.life_span}</p>
                <h3 className={styles.label}>Temperament:</h3>
                {Array.isArray(item.temperaments) ? (
                  <p>
                    {item.temperaments
                      .map((temperament) => temperament.name)
                      .join(", ")}
                  </p>
                ) : (
                  <p>{item.temperament}</p>
                )}
              </div>
            </div>
            <div className={styles.button}>
              <Link to="/dogs">
                <button className={styles.Submmit}>Back</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
