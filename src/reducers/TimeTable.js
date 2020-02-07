import {
  TIME_TABLE,
  CHANGE_STATUS,
  APOINTMENT_lESSON,
  TEACHER_RATING_CHANGED
} from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TIME_TABLE:
      return { ...state, ...action.payload };
    case CHANGE_STATUS:
      const newstimeTable = state.timeTable.map(obj => {
        if (action.payload._id == obj.id) {
          obj.status = action.payload.status;
        }
        return obj;
      });
      return { timeTable: newstimeTable };
    case APOINTMENT_lESSON:
      return { timeTable: [...state.timeTable, action.payload] };
    case TEACHER_RATING_CHANGED:
      const ratingTimeTable = state.timeTable.map(obj => {
        if (action.payload == obj.id) {
          obj.hasReview = true;
        }
        return obj;
      });
      return { timeTable: ratingTimeTable };
    default:
      return state;
  }
};
