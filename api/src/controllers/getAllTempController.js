const axios = require("axios");
const { Temperament } = require("../db");
const { YOUR_API_KEY } = process.env;

const url3 = require("../dataTemp");

const getAllTemperaments = async () => {
  /*
   * Using Api: *
   */

  /*  const url = `https://api.thedogapi.com/v1/breeds?apiKey=${YOUR_API_KEY}`;
  const get = await axios.get(url);
  const data = get.data.map((element) => {
    return { name: element.temperament || "" };
  });
  const uniqueTemperaments = [
    ...new Set(
      data.flatMap((item) => item.name.split(",").map((temp) => temp.trim()))
    ),
  ];

  console.log(uniqueTemperaments);
  const promises = uniqueTemperaments.map(async (name) => {
    const [Temp] = await Temperament.findOrCreate({
      where: { name },
    });
    return Temp;
  });
  const temperaments = await Promise.all(promises);
  return temperaments;
 */

  /*
   * Using Stored data from Api: *
   */

  const temperaments = url3;
  return temperaments;
};

module.exports = {
  getAllTemperaments,
};
