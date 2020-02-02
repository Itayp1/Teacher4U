import { combineReducers } from "redux";
import RatingReducer from "./Rating";
import TeacherReducer from "./Teacher";
import TimeTableReducer from "./TimeTable";
import GetReviewsReducer from "./GetReviews";
import StudentReducer from "./Student";
import TeacherListReducer from "./TeacherList";
import SelectedTeacherReducer from "./SelectedTeacher";
export default combineReducers({
  Rating: RatingReducer,
  Teacher: TeacherReducer,
  TimeTable: TimeTableReducer,
  GetReviews: GetReviewsReducer,
  Student: StudentReducer,
  TeacherList: TeacherListReducer,
  SelectedTeacher: SelectedTeacherReducer
});
