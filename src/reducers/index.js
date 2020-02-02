import { combineReducers } from "redux";
import RatingReducer from "./Rating";
import TeacherReducer from "./Teacher";
import TimeTableReducer from "./TimeTable";
import GetReviewsReducer from "./GetReviews";

export default combineReducers({
  Rating: RatingReducer,
  Teacher: TeacherReducer,
  TimeTable: TimeTableReducer,
  GetReviews: GetReviewsReducer
});
