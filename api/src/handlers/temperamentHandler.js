const { getAllTemperaments } = require("../controllers/getAllTempController");

const temperamentHandler = async (req, res) => {
  try {
    const temperamentsTotal = await getAllTemperaments();
    res.status(200).json(temperamentsTotal);
  } catch {
    res
      .status(400)
      .send({ error: "Error temperamentHandler", message: error.message });
  }
};

module.exports = {
  temperamentHandler,
};
