import api from "../api/api";
import { SAVE_PICTURE, IMAGE_SAVED } from "./types";
import ImgurApi from "../api/api";
export const savePicture = image => {
  return async dispatch => {
    const response = await ImgurApi.put("/api/information/replacepic", {
      image
    });
    dispatch({ type: SAVE_PICTURE, payload: response.data.link });
  };
};

export const pictureSaved = status => {
  return async dispatch => {
    dispatch({ type: IMAGE_SAVED, payload: status });
  };
};
