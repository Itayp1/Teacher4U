import { TEACHER_INFO_FEATCH } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEACHER_INFO_FEATCH:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
