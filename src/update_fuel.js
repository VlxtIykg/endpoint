const axios = require("axios");

const fuel = async () => {
  const currentFuel = await axios.get(`https://api.kami-x.tk/fuel`);
  axios.post("https://api.kami-x.tk/fuel", {
    id: 1,
    amount: currentFuel.data.amount - 1,
  });
};

fuel();

