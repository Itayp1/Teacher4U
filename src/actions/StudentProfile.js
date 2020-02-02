import api from "../api/api";
import {
  STUDENT_INFO_FEATCH,
  TIME_TABLE,
  FETCH_TEACHER_LIST,
  SELECTED_TEACHER
} from "./types";
import axios from "axios";

export const studentFetch = () => {
  return async dispatch => {
    const responseTeacher = api.get("/api/information/student");
    const responseTimeTable = api.get(`/api/lessons/timetable`);
    const allresponsed = await axios.all([responseTeacher, responseTimeTable]);
    dispatch({ type: STUDENT_INFO_FEATCH, payload: allresponsed[0].data });
    dispatch({ type: TIME_TABLE, payload: allresponsed[1].data });
  };
};

export const fetchListOfTeachers = (city, course, navigation) => {
  return async dispatch => {
    try {
      const response = await api.get(`/api/searchTeacher`, {
        params: {
          city: city.name,
          course: course.name
        }
      });
      const listOfTeacherAndProffetion = {
        teacherList: response.data,
        profession: course
      };
      dispatch({
        type: FETCH_TEACHER_LIST,
        payload: listOfTeacherAndProffetion
      });
      navigation.navigate("TeacherList");
    } catch (error) {
      console.log(error);
    }
  };
};

export const selectTeacher = teacher => {
  return {
    type: SELECTED_TEACHER,
    payload: teacher
  };
};
