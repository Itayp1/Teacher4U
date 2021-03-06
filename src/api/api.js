import axios from "axios";
import { AsyncStorage } from "react-native";

const url = "https://teacher4u-production.herokuapp.com"; //https://teacher4u-test.herokuapp.com";

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
