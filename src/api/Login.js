import axios from "axios";
import { AsyncStorage } from "react-native";

const url = "http://62ca9e76.ngrok.io";

const instance = axios.create({
  baseURL: url
});

// instance.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );

export default instance;
