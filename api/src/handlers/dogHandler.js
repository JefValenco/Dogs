const {
  getAllDogs,
  getAllDogsByName,
  getAllDogsById,
  updateDog,
} = require("../controllers/dogControllers");
const { createDog } = require("../controllers/createDogController");
const { Dog } = require("../db");

/* 
*pagination*
const getDogHandler = async (req, res) => {
  const { name, page, limit } = req.query;
  try {
    const results = name
      ? await getAllDogsByName(name)
      : await getAllDogs(page, limit);

    if (results.length === 0) {
      throw new Error("No dog found");
    }
    res.status(200).json(results);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error getDogHandler", message: error.message });
  }
}; */
const getDogHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name ? await getAllDogsByName(name) : await getAllDogs();

    if (results.length === 0) {
      throw new Error("No dog found");
    }
    res.status(200).json(results);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error getDogHandler", message: error.message });
  }
};

const getDogHandlerId = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "db" : "api";
  try {
    const dog = await getAllDogsById(id, source);
    res.status(201).json(dog);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error getDogHandlerId", message: error.message });
  }
};

const postDogHandler = async (req, res) => {
  try {
    const newDog = await createDog(req.body);
    res.status(201).json(newDog);
  } catch (error) {
    console.log(req.body);
    res
      .status(400)
      .json({ error: "Error postDogHandler", message: error.message });
  }
};

const EndDogHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const dogToDelete = await Dog.findOne({
      where: {
        name: name,
      },
    });

    if (!dogToDelete) {
      throw new Error("Dog not found");
    }

    await dogToDelete.destroy();

    res.status(200).json({ message: "Dog deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error deleting dog", message: error.message });
  }
};

const UpdateDogHandler = async (req, res) => {
  try {
    const { id, name, height, weight, life_span, image, temperament } =
      req.body;

    if (!id) throw Error("Id must be provided");

    const dog = updateDog(
      id,
      name,
      height,
      weight,
      life_span,
      image,
      temperament
    );

    if (dog.error) throw Error(dog.error);

    return res.status(200).json({ message: "Dog updated successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating Dog", message: error.message });
  }
};

module.exports = {
  getDogHandler,
  getDogHandlerId,
  postDogHandler,
  EndDogHandler,
  UpdateDogHandler,
};
