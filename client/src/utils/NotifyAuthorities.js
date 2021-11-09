const axios = require("axios");

export const notifyAuthorities = async () => {
  axios.get(
    "https://us-central1-aegis-5fd8e.cloudfunctions.net/notifyAuthorities"
  );
};
