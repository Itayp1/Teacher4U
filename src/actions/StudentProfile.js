import api from "../api/api";

import {
  STUDENT_INFO_FEATCH,
  TIME_TABLE,
  FETCH_TEACHER_LIST,
  SELECTED_TEACHER,
  APOINTMENT_lESSON,
  TEACHER_RATING,
  STUDENT_INFO_UPDATE,
  SAVE_PICTURE,
  TEACHER_RATING_CHANGED
} from "./types";
import axios from "axios";

export const studentFetch = () => {
  return async dispatch => {
    const responseTeacher = api.get("/api/information/student");
    const responseTimeTable = api.get(`/api/lessons/timetable`);
    const allresponsed = await axios.all([responseTeacher, responseTimeTable]);
    dispatch({ type: STUDENT_INFO_FEATCH, payload: allresponsed[0].data });
    dispatch({ type: TIME_TABLE, payload: allresponsed[1].data });
    dispatch({ type: SAVE_PICTURE, payload: allresponsed[0].data.pic });
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
  api.get(`/api/information/teacher`, {
    params: {
      email: teacher.email
    }
  });

  return {
    type: SELECTED_TEACHER,
    payload: teacher
  };
};

export const apointmentLesson = (
  studentName,
  studentEmail,
  teacherName,
  teacherEmail,
  cource,
  date,
  time
) => {
  return async dispatch => {
    const response = await api.post("/api/lessons/appointmentLesson", {
      studentName,
      studentEmail,
      teacherName,
      teacherEmail,
      cource,
      date,
      time
    });
    dispatch({ type: APOINTMENT_lESSON, payload: response.data });
  };
};

export const getReviews = email => {
  return async dispatch => {
    const responseReviews = await api.get(`/api/rating`, {
      params: {
        email
      }
    });

    dispatch({ type: TEACHER_RATING, payload: responseReviews.data });
  };
};

export const studentUpdate = info => {
  return {
    type: STUDENT_INFO_UPDATE,
    payload: info
  };
};

export const addStudentReview = (
  rating,
  review,
  lessonId,
  teacherEmail,
  studentName,
  cource
) => {
  return async dispatch => {
    const responseReviews = await api.post(`/api/rating/add`, {
      rating,
      review,
      lessonId,
      teacherEmail,
      studentName,
      cource
    });

    dispatch({ type: TEACHER_RATING_CHANGED, payload: lessonId });
  };
};
