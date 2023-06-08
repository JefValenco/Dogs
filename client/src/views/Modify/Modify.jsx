import { useState } from "react";
import styles from "../../views/Modify/Modify.module.css";
import axios from "axios";
import { getTemp } from "../../redux/actions";
import { getModifyDogs } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { validate } from "../../middleware/validate";
/* import SearchBar from "../../components/SearchBar/SearchBar";
 */
const Modify = () => {
  const dispatch = useDispatch();

  //----------States----------//

  const [formModify, setFormModify] = useState({
    id: "",
    name: "",
    height: "",
    weight: "",
    image: "",
    temperament: [],
  });

  //----------Reset States----------//

  const resetFormModify = () => {
    setFormModify({
      id: "",
      name: "",
      height: "",
      weight: "",
      image: "",
      temperament: [],
    });
  };

  //----------Change Handlers----------//

  const changeHandlerModify = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "name") {
      const selectedDog = dogs.find((dog) => dog.name === value);
      setFormModify({
        ...formModify,
        [property]: value,
        id: selectedDog?.id || "",
      });
    } else {
      setFormModify({ ...formModify, [property]: value });
    }
  };

  const changeHandlerTemp = (event) => {
    const value = event.target.value;

    if (!formModify.temperament.includes(value)) {
      setFormModify({
        ...formModify,
        temperament: [...formModify.temperament, value],
      });
    }
  };

  //----------Summit Form Validation ----------//

  const requiredFields = [
    { field: "name", message: "Please enter a name for your Dog." },
    { field: "height", message: "Please enter the height of your Dog." },
    { field: "weight", message: "Please enter the weight of your Dog." },
    { field: "life_span", message: "Please enter the life span of your Dog." },
    { field: "image", message: "Please enter the image URL for your Dog." },
    {
      field: "temperament",
      message: "Please enter the temperament for your Dog.",
    },
  ];

  //----------Summit Handlers----------//

  const submitHandlerModify = (event) => {
    event.preventDefault();

    // Check if required fields are missing
    for (const { field, message } of requiredFields) {
      if (!formModify[field]) {
        alert(message);
        return;
      }
    }

    // Check if at least one type is selected

    if (
      formModify.temperament.length === 0 ||
      formModify.temperament.includes("")
    ) {
      alert("Please select at least one temperament for your Dog.");
      return;
    }

    // Send formModify data to server
    axios
      .put("/dog", formModify)
      .then((res) => {
        alert("Dog updated!");
        resetFormModify();
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  //----------Dispatches Handlers----------//

  useEffect(() => {
    dispatch(getTemp());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getModifyDogs());
  }, [dispatch]);

  //---------- Selectors ----------//

  const dogs = useSelector((state) => state.modifyItem);

  const temps = useSelector((state) => state.temps);

  //----------Complementary fn ----------//

  const removeTemp = (event, index) => {
    event.preventDefault(); // prevent form submission
    const newTemp = [...formModify.temperament];
    newTemp.splice(index, 1);
    setFormModify({ ...formModify, temperament: newTemp });
  };

  const [id, setId] = useState("");

  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [life_span, setLifeSpan] = useState("");
  const [image, setImage] = useState("");
  const [temperament, setTemperament] = useState("");

  //---------- Render  ----------//

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.box}>
          <h1 className={styles.h4}>Select Dog</h1>
          <div className={styles.container}>
            <div className={styles.box}>
              <label className={styles.label}>Name: </label>
              <select
                className={styles.input}
                placeholder="Choose a dog to Modify..."
                dogs="text"
                value={formModify.name}
                onChange={(event) => {
                  changeHandlerModify(event);
                  const selectedDog = dogs.find(
                    (dog) => dog.name === event.target.value
                  );
                  setId(selectedDog?.id || "");
                  setName(selectedDog?.name || "");
                  setHeight(selectedDog?.height || "");
                  setWeight(selectedDog?.weight || "");
                  setLifeSpan(selectedDog?.life_span || "");
                  setImage(selectedDog?.image || "");
                  setTemperament(selectedDog?.temperament || []);
                }}
                name="name"
              >
                <option value="dogs"></option>
                {dogs &&
                  dogs
                    .sort((a, b) => {
                      if (a.name < b.name) return -1;
                      if (a.name > b.name) return 1;
                      return 0;
                    })
                    .map((dogs) => {
                      return (
                        <option value={dogs.name} key={dogs.id}>
                          {dogs.name}
                        </option>
                      );
                    })}
              </select>
              <div>
                {image && (
                  <img
                    className={styles.img}
                    src={image}
                    alt={name}
                    style={{ border: "none", objectFit: "cover" }}
                  />
                )}
              </div>
            </div>
            <div className={styles.box}>
              <div>
                <div className={styles.forml}>
                  <div>
                    <label className={styles.label}>id: </label>
                    <input
                      className={styles.input3}
                      type="text"
                      value={id}
                      name="id"
                      style={{ width: "310px" }}
                      disabled // added disabled attribute
                    />

                    <div>
                      <label className={styles.label}>Height: </label>
                      <input
                        className={styles.input3}
                        type="text"
                        value={height}
                        name="height"
                        disabled // added disabled attribute
                      />
                    </div>

                    <div>
                      <label className={styles.label}>Weight: </label>
                      <input
                        className={styles.input3}
                        type="text"
                        value={weight}
                        name="weight"
                        disabled // added disabled attribute
                      />
                    </div>

                    <div>
                      <label className={styles.label}>Life Span: </label>
                      <input
                        className={styles.input3}
                        type="text"
                        value={life_span}
                        name="life_span"
                        disabled // added disabled attribute
                      />
                    </div>

                    <div>
                      <div>
                        <label className={styles.label}>Nature: </label>
                        <input
                          className={styles.input3}
                          type="text"
                          value={temperament}
                          name="temperament"
                          disabled // added disabled attribute
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <h1 className={styles.h4}>Modify Dog</h1>
          <form onSubmit={submitHandlerModify}>
            <div>
              <label className={styles.label}>Name: </label>
              <input
                className={styles.input}
                type="text"
                value={formModify.name}
                onChange={changeHandlerModify}
                name="name"
              ></input>
            </div>

            <div>
              <label className={styles.label}>Height: </label>
              <select
                className={styles.input}
                value={formModify.height}
                onChange={changeHandlerModify}
                name="height"
              >
                <option value="" disabled selected>
                  {"0 cms"}
                </option>

                <option value="10">10 cms</option>
                <option value="20">20 cms</option>
                <option value="30">30 cms</option>
                <option value="40">40 cms</option>
                <option value="50">50 cms</option>
                <option value="60">60 cms</option>
                <option value="70">70 cms</option>
                <option value="80">80 cms</option>
                <option value="90">90 cms</option>
                <option value="100">100 cms</option>
              </select>
            </div>

            <div>
              <label className={styles.label}>Weight: </label>
              <select
                className={styles.input}
                value={formModify.weight}
                onChange={changeHandlerModify}
                name="weight"
              >
                <option value="" disabled selected>
                  {"0 kls"}
                </option>

                <option>5 kls</option>
                <option>10 kls</option>
                <option>15 kls</option>
                <option>30 kls</option>
                <option>35 kls</option>
                <option>40+ kls</option>
              </select>
            </div>

            <div>
              <label className={styles.label}>Life Span: </label>
              <select
                className={styles.input}
                value={formModify.life_span}
                onChange={changeHandlerModify}
                name="life_span"
              >
                <option value="" disabled selected style={{ color: "gray" }}>
                  Choose life span
                </option>

                <option>5 years</option>
                <option>10 years</option>
                <option>15 years</option>
                <option>20+ years</option>
              </select>
            </div>

            <div>
              <label className={styles.label}>Image: </label>
              <select
                className={styles.input}
                value={formModify.image}
                onChange={changeHandlerModify}
                name="image"
              >
                <option value="" disabled>
                  Choose image
                </option>

                <option value="https://cdn2.thedogapi.com/images/Hy3H7g94X.jpg">
                  img 1
                </option>
                <option value="https://cdn2.thedogapi.com/images/_Qf9nfRzL.png">
                  img 2
                </option>
              </select>
              <div>
                {formModify.image && (
                  <img
                    src={formModify.image}
                    alt="Preview"
                    className={styles.img}
                    style={{ border: "none", objectFit: "cover" }}
                  />
                )}
              </div>
            </div>

            <div>
              <label className={styles.label}>Nature: </label>
              <select
                className={styles.input}
                placeholder="Choose a Temperament"
                type="text"
                onChange={changeHandlerTemp}
                name="temperament"
                style={{ width: "150px" }}
              >
                <option value="" disabled selected>
                  Choose temperament
                </option>
                <option value=""></option>
                {temps &&
                  temps
                    .sort((a, b) => {
                      if (a.name < b.name) return -1;
                      if (a.name > b.name) return 1;
                      return 0;
                    })
                    .map((temperament) => {
                      return (
                        <option value={temperament.name} key={temperament.id}>
                          {temperament.name}
                        </option>
                      );
                    })}
              </select>

              <div>
                {formModify.temperament.map((temperament, index) => (
                  <div key={index}>
                    <span>{temperament}</span>
                    <button onClick={(event) => removeTemp(event, index)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className={styles.Submmit} type="submit">
              Modify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modify;
