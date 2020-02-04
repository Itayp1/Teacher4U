import axios from "axios";
import { AsyncStorage } from "react-native";

const url = "http://d566b477.ngrok.io"; //"https://teacher4u-test.herokuapp.com";

const instance = axios.create({
  baseURL: url
});
try {
  instance.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
} catch (error) {
  console.log("error api");
  console.log(error);
}
export default instance;
