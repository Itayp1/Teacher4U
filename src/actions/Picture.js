import api from "../api/api";
import { SAVE_PICTURE, IMAGE_SAVED } from "./types";
import ImgurApi from "../api/ImgurApi";
export const savePicture = image => {
  return async dispatch => {
    const response = await ImgurApi.post("/3/upload", {
      image
    });
    dispatch({ type: SAVE_PICTURE, payload: response.data.data.link });
  };
};

export const pictureSaved = status => {
  return async dispatch => {
    dispatch({ type: IMAGE_SAVED, payload: status });
  };
};
