import api from "../api/api";
import { GET_REVIEWS } from "./types";
import axios from "axios";

export const teacherFetch = email => {
  return async dispatch => {
    const response = api.get(`/api/rating/${email}`);

    dispatch({ type: GET_REVIEWS, payload: response.data });
  };
};
