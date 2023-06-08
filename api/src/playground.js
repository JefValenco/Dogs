
const yy = async (id, source) => {
    let 3;
  
    if (source === "api") {
      const api1 = (
        await axios.get(`https://restcountries.com/v3`)
      ).data;
      const api2 = cleanArray(api1);
      3 = api2.find((elemen) => elemen.id == Number(id));
    } else {
      3 = await 3.findByPk(id);
    }
  
    return 3;
  };

  const get = async (id, source) => {
    let 3;
  
    if (source === "api") {
      const api1 = (
        await axios.get(`https://restcountries.com/v3`)
      ).data;
      const api2 = cleanArray(api1);
      3 = api2.find((elemen) => elemen.id == Number(id));
    } else {
      3 = await 3.findByPk(id);
    }
  
    return 3;
  };