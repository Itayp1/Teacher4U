import { TEACHER_RATING } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEACHER_RATING:
      return action.payload;
    default:
      return state;
  }
};
