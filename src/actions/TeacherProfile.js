import api from "../api/api";
import {
  TEACHER_INFO_FEATCH,
  TEACHER_RATING,
  TIME_TABLE,
  CHANGE_STATUS,
  TEACHER_INFO_UPDATE,
  SAVE_PICTURE
} from "./types";
import axios from "axios";

export const teacherFetch = () => {
  return async dispatch => {
    const responseTeacher = api.get("/api/information/teacher");
    const responseTimeTable = api.get(`/api/lessons/timetable`);
    const responseReviews = api.get(`/api/rating`);
    const allresponsed = await axios.all([
      responseTeacher,
      responseTimeTable,
      responseReviews
    ]);
    dispatch({ type: TEACHER_INFO_FEATCH, payload: allresponsed[0].data });
    dispatch({ type: TIME_TABLE, payload: allresponsed[1].data });
    dispatch({ type: TEACHER_RATING, payload: allresponsed[2].data });
    dispatch({ type: SAVE_PICTURE, payload: allresponsed[0].data.pic });
  };
};

export const changeStatus = (id, status) => {
  return async dispatch => {
    const response = await api.put("/api/lessons/timetable", { id, status });
    dispatch({ type: CHANGE_STATUS, payload: response.data.updated });
  };
};

export const teacherUpdate = info => {
  return {
    type: TEACHER_INFO_UPDATE,
    payload: info
  };
};
