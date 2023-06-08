import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import Paged from "../../components/Paged/Paged";
import styles from "./Home.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";

import Card from "../../components/Card/Card";
import Form from "../../views/Form/Form";
import Modify from "../../views/Modify/Modify";
import { up } from "../../images/images.js";
import { banner } from "../../images/images.js";
import { create } from "../../images/images.js";
import { modify } from "../../images/images.js";
import { doggy } from "../../images/images.js";

import {
  getDogs,
  getTemp,
  FilterByTemp,
  FilterByCreated,
  orderByAZ,
  orderByWeight,
  getItemByName,
} from "../../redux/actions";

const Home = () => {
  const allDogs = useSelector((state) => state.dogs);

  const [isLoading2, setIsLoading2] = useState(false);

  const [order, setOrder] = useState("");

  const [search, setSearch] = useState("");

  const getTemps = useSelector((state) => state.temps);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(10);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getDogs()).then(() => {
        setIsLoading(false);
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  /* ---------- */

  const [displayButton, setDisplayButton] = useState(false);

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setDisplayButton(true);
    } else {
      setDisplayButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  /* ---------- */

  function handleSortTemperaments(e) {
    setIsLoading2(true); // Show loader

    setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      dispatch(FilterByTemp(e.target.value));

      setIsLoading2(false); // Hide loader
    }, 500);
  }

  useEffect(() => {
    dispatch(getTemp());
  }, [dispatch]);

  function handleSortCreated(e) {
    setIsLoading2(true); // Show loader

    setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      dispatch(FilterByCreated(e.target.value));

      setIsLoading2(false); // Hide loader
    }, 500);
  }

  function handleSort(e) {
    e.preventDefault();
    const sortOrder = e.target.value;

    setIsLoading2(true); // Show loader

    setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      console.log(sortOrder);
      dispatch(orderByAZ(sortOrder));

      setOrder(sortOrder);
      setIsLoading2(false); // Hide loader
    }, 500);
  }

  function handleSortWeight(e) {
    e.preventDefault();
    const sortOrder = e.target.value;

    setIsLoading2(true); // Show loader

    setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      console.log(sortOrder);
      dispatch(orderByWeight(sortOrder));

      setOrder(sortOrder);
      setIsLoading2(false); // Hide loader
    }, 500);
  }

  const handleClearSearch = () => {
    setIsLoading2(true);

    setTimeout(() => {
      dispatch(getItemByName("")).then(() => {
        setIsLoading2(false);
      });
      setSearch("");
    }, 600);
  };

  /*  if (isLoading) {
    return (
      <div>
        <span
          className={styles.loader}
          style={{ backgroundColor: "#ebcaca", width: "100%", height: "100%" }}
        ></span>
      </div>
    );
  } */

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {/* Scroll-up Button*/}
      <button
        type="button"
        className={`btn  btn-floating btn-lg ${styles.backToTop}`}
        id="btn-back-to-top"
        onClick={backToTop}
      >
        <img src={up} alt="up" className={styles.imageSide} />
      </button>
      {/* NavBar section */}
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <button
            /*  className="navbar-toggler" */

            className={`navbar-toggler ${styles.toggler}`}
            type="button"
            onClick={toggleCollapse}
            aria-expanded={!collapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${collapsed ? "" : "show"}`}
            id="navbarTogglerDemo01"
          >
            <ul
              className={`navbar-nav mr-auto mt-2 mt-lg-0 ${styles.linksNav}`}
            >
              <li className="nav-item active">
                <a className={`nav-link ${styles.btnNav}`} href="#dogsSection">
                  Dogs
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${styles.btnNav}`}
                  href="#createSection"
                >
                  Create Dog
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${styles.btnNav}`}
                  href="#modifySection"
                >
                  Modify Dog
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${styles.btnNav}`} href="/">
                  Landing
                </a>
              </li>
              <li className="nav-item">
                <SearchBar />
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* People Section */}

      <div
        className={styles.containerSection}
        style={{ paddingTop: "5em", zIndex: "2", position: "absolute" }}
      >
        <img src={banner} alt="banner" className={styles.imageBanner} />
      </div>

      {/* Content Section */}

      <div>
        {/* Filter Section */}
        <div>
          <div id="dogsSection" className={styles.containerFilter}>
            <div className={styles.box}>
              <select
                className={styles["style-dropdown"]}
                onChange={(e) => handleSortCreated(e)}
              >
                <option value="All">All Created</option>

                <option value="true">Data base</option>
                <option value="false">Api</option>
              </select>

              <select
                className={styles["style-dropdown"]}
                onChange={(e) => handleSortTemperaments(e)}
              >
                <option value="" disabled selected hidden>
                  Select Temperament
                </option>

                <option value="All"> Clear</option>

                <option value=""></option>
                {getTemps &&
                  getTemps
                    .sort((a, b) => {
                      if (a.name < b.name) return -1;
                      if (a.name > b.name) return 1;
                      return 0;
                    })
                    .map((temp) => {
                      return (
                        <option value={temp.name} key={temp.id}>
                          {temp.name}
                        </option>
                      );
                    })}
              </select>

              <select
                className={styles["style-dropdown"]}
                onChange={(e) => handleSort(e)}
              >
                <option value="" disabled selected hidden>
                  Select an Order
                </option>
                <option value="des">A - Z</option>
                <option value="asc">Z - A</option>
                <option value="clear">Clear</option>
              </select>

              <select
                className={styles["style-dropdown"]}
                onChange={(e) => handleSortWeight(e)}
              >
                <option value="" disabled selected hidden>
                  Select an Weight
                </option>
                <option value="asc">Higher Weight</option>
                <option value="des">Lower Weight</option>
                <option value="clear">Clear</option>
              </select>
            </div>
            <div className={styles.box}>
              <SearchBar />
            </div>
          </div>
        </div>
        {/* Cards Section */}
        <div
          style={{
            marginTop: "2em",
          }}
        >
          {currentDogs.length > 0 ? (
            <CardsContainer currentDogs={currentDogs} />
          ) : (
            <div>
              {" "}
              <p className={styles.p1} style={{ color: "#705757" }}>
                Dog not found...
              </p>
              <button onClick={handleClearSearch} className={styles.btnPrimary}>
                Try again!
              </button>
            </div>
          )}
        </div>
        {/* Paged Section */}
        <Paged
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Create Section */}
      <div
        className={styles.containerSection}
        style={{
          position: "relative",
        }}
      >
        {/* People Section */}

        <img
          id="createSection"
          src={create}
          alt="create"
          className={styles.imageCreate}
        />

        <Form style={{ zIndex: "2" }} />

        <img src={doggy} alt="doggy" className={styles.imageDoggy} />
      </div>

      {/* Modify Section */}
      <div className={styles.containerSection}>
        <img
          id="modifySection"
          src={modify}
          alt="modify"
          className={styles.imageModify}
        />

        <Modify />
      </div>

      {/* Create Footer */}
      <div
        className={styles.footer}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingTop: "5em",
          paddingTop: "5em",
        }}
      >
        <p className={styles.p5}>
          "©2023 This website was created by Jefry Valenco using the data from
          The Dog Api.""
        </p>
      </div>

      {isLoading2 && (
        <div>
          <span
            className={styles.loader}
            style={{
              backgroundColor: "rgba(224, 98, 98, 0.85)",
              width: "100%",
              height: "100%",
            }}
          ></span>
        </div>
      )}
    </div>
  );
};

export default Home;
