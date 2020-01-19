import axios from "axios";
import { AsyncStorage } from "react-native";

const url = "http://7c2a67d6.ngrok.io"; //https://teacher4u-test.herokuapp.com";

const instance = axios.create({
  baseURL: url
});
try {
  instance.interceptors.request.use(
    async config => {
      //console.log("token");

      const token = await AsyncStorage.getItem("token");

      if (token) {
        //console.log("token iss" + token);

        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
} catch (error) {
  //console.log("error api");
  //console.log(error);
}
export default instance;
