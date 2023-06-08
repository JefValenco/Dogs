import { useState } from "react";
import styles from "../../views/Form/Form.module.css";
import axios from "axios";
import { getTemp } from "../../redux/actions";
import { getDeleteDogs } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { validate } from "../../middleware/validate";

const Form = () => {
  const dispatch = useDispatch();

  //----------States----------//
  const [form, setForm] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  const [formDelete, setFormDelete] = useState({
    name: "",
  });

  //----------Reset States----------//

  const resetForm = () => {
    setForm({
      name: "",
      height: "",
      weight: "",
      life_span: "",
      image: "",
      temperament: [],
    });
  };

  const resetFormDelete = () => {
    setFormDelete({
      name: "",
    });
  };

  const [errors, setErrors] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  //----------Change Handlers----------//

  const changeHandler = (event, index) => {
    const property = event.target.name;
    const value = event.target.value;

    validate({ ...form, [property]: value }, errors, setErrors);
    setForm({ ...form, [property]: value });
  };

  const changeHandlerDelete = (event, index) => {
    const property = event.target.name;
    const value = event.target.value;

    setFormDelete({ ...formDelete, [property]: value });
  };

  const changeHandlerTemperament = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (!form.temperament.includes(value)) {
      setForm({ ...form, [property]: [...form.temperament, value] });
    }
  };

  //----------Summit Form Validation ----------//

  const requiredFields = [
    { field: "name", message: "Please enter a name for your dog." },
    {
      field: "height",
      message: "Please enter the height points for your dog.",
    },
    {
      field: "weight",
      message: "Please enter the weight points for your dog.",
    },

    {
      field: "life_span",
      message: "Please enter the life span points for your dog.",
    },
    { field: "image", message: "Please enter the image of your dog." },

    {
      field: "temperament",
      message: "Please select at least one temperament for your dog.",
    },
  ];

  //----------Summit Handlers----------//

  const submitHandler = (event) => {
    event.preventDefault();

    // Check if required fields are missing
    for (const { field, message } of requiredFields) {
      if (!form[field]) {
        alert(message);
        return;
      }
    }

    // Check if at least one tempereaments is selected
    if (form.temperament.length === 0 || form.temperament.includes("")) {
      alert("Please select at least one temperament for your Dog.");
      return;
    }

    // Send form data to server
    axios
      .post("/dog", form)
      .then((res) => {
        alert("Dog created!");
        resetForm();
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  const submitHandlerDelete = (event) => {
    event.preventDefault();
    axios
      .delete(`/dog?name=${formDelete.name}`)
      .then((res) => {
        alert("Dog deleted!");
        resetFormDelete();
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  //----------Dispatches Handlers----------//

  useEffect(() => {
    dispatch(getTemp());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDeleteDogs());
  }, [dispatch]);

  //---------- Selectors ----------//

  const dogs = useSelector((state) => state.deleteItem);

  const temperamentss = useSelector((state) => state.temps);

  //----------Complementary  fn ----------//

  const removeTemperament = (event, index) => {
    event.preventDefault(); // prevent form submission
    const newTemperament = [...form.temperament];
    newTemperament.splice(index, 1);
    setForm({ ...form, temperament: newTemperament });
  };

  //---------- Render  ----------//

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.container}>
          <div className={styles.box}>
            {" "}
            <h1 className={styles.h4}>Create Dog</h1>
            {/*    <form action="POST" onSubmit={submitHandler}>
  <div>
    <label>Name: </label>
    <input
      type="text"
      value={form.name}
      onChange={changeHandler}
      name="name"
    ></input>
    {errors.name && <span>{errors.name}</span>}
  </div>

  <div>
    <label>Height: </label>
    <select value={form.height} onChange={changeHandler} name="height">
      <option value="" disabled selected style={{ color: "gray" }}>
        Choose height
      </option>

      <option value="10">30 cms</option>
      <option value="20">30 cms</option>
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
    <label>Weight: </label>
    <select value={form.weight} onChange={changeHandler} name="weight">
      <option value="" disabled selected style={{ color: "gray" }}>
        Choose weight
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
    <label>Life Span: </label>
    <select
      value={form.life_span}
      onChange={changeHandler}
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
    <label>Image: </label>
    <select value={form.image} onChange={changeHandler} name="image">
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
  </div>

  <div>
    <label className={styles.label}>Temperament: </label>
    <select
      className={styles.input}
      placeholder="Choose a Temperament"
      recipe="text"
      onChange={changeHandlerTemperament}
      name="temperament"
    >
      <option value="" disabled selected>
        Choose temperament
      </option>
      <option value=""></option>
      {temperamentss &&
        temperamentss
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
      {form.temperament.map((temperament, index) => (
        <div key={index}>
          <span>{temperament}</span>
          <button onClick={(event) => removeTemperament(event, index)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  </div>

  <button className={styles.Submmit} type="submit">
    Create
  </button>
</form> */}
            <form onSubmit={submitHandler}>
              <div>
                <label className={styles.label}>Name: </label>
                <input
                  className={styles.input}
                  type="text"
                  value={form.name}
                  onChange={changeHandler}
                  name="name"
                ></input>
              </div>

              <div>
                <label className={styles.label}>Height: </label>
                <select
                  className={styles.input}
                  value={form.height}
                  onChange={changeHandler}
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
                  value={form.weight}
                  onChange={changeHandler}
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
                  value={form.life_span}
                  onChange={changeHandler}
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
                  value={form.image}
                  onChange={changeHandler}
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
                  {form.image && (
                    <img
                      src={form.image}
                      alt="Preview"
                      className={styles.img}
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
                  onChange={changeHandlerTemperament}
                  name="temperament"
                >
                  <option value="" disabled selected>
                    Choose temperament
                  </option>
                  <option value=""></option>
                  {temperamentss &&
                    temperamentss
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
                  {form.temperament.map((temperament, index) => (
                    <div key={index}>
                      <span className={styles.type}>{temperament}</span>
                      <button
                        className={styles.Submmit3}
                        onClick={(event) => removeTemperament(event, index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button className={styles.Submmit} type="submit">
                Create
              </button>
            </form>
          </div>
          <div className={styles.box}>
            {" "}
            <h1 className={styles.h4}>Delete Dog</h1>
            <form onSubmit={submitHandlerDelete}>
              <div>
                <label className={styles.label}>Name: </label>
                <select
                  className={styles.input}
                  placeholder="Choose a dog to delete..."
                  dog="text"
                  value={formDelete.name}
                  onChange={changeHandlerDelete}
                  name="name"
                >
                  <option value="dog"></option>
                  {dogs &&
                    dogs
                      .sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                      })
                      .map((dog) => {
                        return (
                          <option value={dog.name} key={dog.id}>
                            {dog.name}
                          </option>
                        );
                      })}
                </select>
              </div>

              <button
                className={`${styles.Submmit} ${
                  form.name ? "" : styles.disabled
                }`}
                disabled={!formDelete.name}
                type="submit"
              >
                Confirm Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
