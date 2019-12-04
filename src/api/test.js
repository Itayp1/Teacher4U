const axios = require("axios");

const url = "https://teacher4u-test.herokuapp.com";

const instance = axios.create({
  baseURL: url
});

instance
  .get("/api/login", {
    headers: {
      access_token:
        "ya29.Il-0B_3m9nTKwmHblBTyx9bylipTM8cTdrSILoeCVexZqHlhKxhbM_83ae_BDaZCOPWXZHFBKJ3RxOgevpvq9efWOXSfO0gAwOBH3yUy8ygxPWRleUuwo7QaNMtHqfCkEQ",
      platform: "google"
    }
  })
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.log(err);
  });
