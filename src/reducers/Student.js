import { STUDENT_INFO_FEATCH } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STUDENT_INFO_FEATCH:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
