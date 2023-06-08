const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { YOUR_API_KEY } = process.env;
const url = require("../dataDogs");
const url2 = require("../dataBreed");
/* const url = require("../data"); */

const cleanArray = (arr) =>
  arr.map((element) => {
    return {
      id: element.id,
      name: element.name,
      height: element.height.metric + " Cms",
      weight: element.weight.metric + " Kg",
      life_span: element.life_span,
      temperament: element.temperament,
      image: element.image.url,
      create: false,
    };
  });
/* 

*Pagination*
const getAllDogs = async (page, limit) => { */

const getAllDogs = async () => {
  const dataDB = await Dog.findAll({ include: Temperament });
  console.log(dataDB);

  const dataBaseDogs = dataDB?.map((element) => {
    const temperaments = element.dataValues.temperaments
      .flatMap((temperament) => temperament.name)
      .join(", ");

    return {
      id: element.dataValues.id,
      name: element.dataValues.name,
      height: element.dataValues.height,
      weight: element.dataValues.weight,
      life_span: element.dataValues.life_span,
      image: element.dataValues.image,
      temperament: temperaments,
      create: true,
    };
  });

  /*   const dataBaseDogs = await Dog.findAll({ include: Temperament });

  const formattedDogs = dataBaseDogs.map((dog) => {
    const temperament = dog.dataValues.map((t) => t.name).join(", ");
    return {
      id: dog.dataValues.id,
      name: dog.dataValues.name,
      height: dog.dataValues.height,
      weight: dog.dataValues.weight,
      life_span: dog.dataValues.life_span,
      image: dog.dataValues.image,
      temperament,
      create: true,
    };
  }); */

  /* --------------------------- */

  /*
   * Using Api: *
   */

  /*   const apiDog = (
    await axios.get(
      `https://api.thedogapi.com/v1/breeds?apiKey=${YOUR_API_KEY}`
    )
  ).data; 
  
   const apiDogs = cleanArray(apiDog);
   */

  /* --------------------------- */
  /*
   * Using Stored data from Api: *
   */

  const apiDogs = url;

  /* --------------------------- */
  /* 
*pagination*
const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const apiDogs = cleanArray(apiDog);
  const dataAndApi = [...dataBaseDogs, ...apiDogs];
  const dogPage = dataAndApi.slice(startIndex, endIndex);

  return dogPage; */

  return [...dataBaseDogs, ...apiDogs];
};

const getAllDogsByName = async (name) => {
  const dataBaseDogs = await Dog.findAll({ where: { name } });
  /* --------------------------- */

  /*
   * Using Api: *
   */

  /*    const apiDog = (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;
   */

  /* --------------------------- */
  /*
   * Using Stored data from Api: *
   */

  const apiDog = url2;

  /* --------------------------- */

  const apiDogs = cleanArray(apiDog);
  const filterDog = apiDogs.filter((element) =>
    element.name.toLowerCase().includes(name.toLowerCase())
  );

  return [...filterDog, ...dataBaseDogs];
};

const getAllDogsById = async (id, source) => {
  let dog;

  if (source === "api") {
    /* --------------------------- */

    /*
     * Using Api: *
     */

    /*    const apiDog = (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data;
     */

    /* --------------------------- */
    /*
     * Using Stored data from Api: *
     */

    const apiDog = url2;

    /* --------------------------- */
    const apiDogs = cleanArray(apiDog);
    dog = apiDogs.find((elemen) => elemen.id == Number(id));
  } else {
    dog = await Dog.findByPk(id, { include: Temperament });
  }

  return dog;
};

const updateDog = async (
  id,
  name,
  height,
  weight,
  life_span,
  image,
  temperament
) => {
  const dog = await getAllDogsById(id);

  if (!dog) return dog;

  dog.name = name || dog.name;
  dog.height = height || dog.height;
  dog.weight = weight || dog.weight;
  dog.life_span = life_span || dog.life_span;
  dog.image = image || dog.image;
  dog.temperament = temperament || dog.temperament;

  if (temperament) {
    // Find all existing temperaments associated with the dog
    const existingTemperaments = await dog.getTemperaments();

    // Remove the existing temperaments
    await dog.removeTemperaments(existingTemperaments);

    // Find the new temperaments to add
    const allTemperaments = await Temperament.findAll({
      where: { name: temperament },
    });

    // Add the new temperaments to the dog
    await dog.addTemperaments(allTemperaments);
  }

  await dog.save(); // save the changes to the database

  return dog;
};

module.exports = {
  getAllDogs,
  getAllDogsByName,
  getAllDogsById,
  updateDog,
};
