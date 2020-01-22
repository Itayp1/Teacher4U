import axios from "axios";
import { AsyncStorage } from "react-native";

const url = "https://teacher4u-test.herokuapp.com"; //"http://7c2a67d6.ngrok.io"; //

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
