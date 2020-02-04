import { STUDENT_INFO_FEATCH, STUDENT_INFO_UPDATE } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STUDENT_INFO_FEATCH:
      return action.payload;
    case STUDENT_INFO_UPDATE:
      return action.payload;
    default:
      return state;
  }
};
