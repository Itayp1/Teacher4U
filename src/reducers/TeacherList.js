import { FETCH_TEACHER_LIST } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TEACHER_LIST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
