import axios from "axios";

const url = "https://api.imgur.com";

const instance = axios.create({
  baseURL: url,
  headers: {
    Authorization: "Client-ID e09dcec3e15ddd3"
  }
});

export default instance;
