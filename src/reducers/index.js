import { combineReducers } from "redux";
import RatingReducer from "./Rating";
import TeacherReducer from "./Teacher";
import TimeTableReducer from "./TimeTable";

export default combineReducers({
  Rating: RatingReducer,
  Teacher: TeacherReducer,
  TimeTable: TimeTableReducer
});
