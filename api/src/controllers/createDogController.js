const axios = require("axios");
const { Dog, Temperament } = require("../db");

const createDog = async (body) => {
  const { name, height, weight, life_span, image, temperament } = body;
  const newDog = await Dog.create({
    name: name,
    height: height,
    weight: weight,
    life_span: life_span,
    image: image,
  });

  const allTemperaments = await Temperament.findAll({
    where: { name: temperament },
  });
  await newDog.addTemperament(allTemperaments);

  return newDog;
};

module.exports = {
  createDog,
};
