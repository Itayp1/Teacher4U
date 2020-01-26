import api from "../api/api";
import {
  TEACHER_INFO_FEATCH,
  TEACHER_RATING,
  TIME_TABLE

} from './types';

export const teacherFetch = () => {
return (dispatch)=>{
  const responseTeacher = await api.get("/api/information/teacher");
  const responseTimeTable = await api.get(`/api/lessons/timetable`);
  const responseReviews = await api.get(`/api/rating`);

    dispatch({ type: TEACHER_INFO_FEATCH, payload: responseTeacher.data });
    dispatch({ type: TIME_TABLE, payload: responseTimeTable.data });
    dispatch({  type:TEACHER_RATING , payload:responseReviews.data})

}
};

