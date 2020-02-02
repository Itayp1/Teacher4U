import { SELECTED_TEACHER } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECTED_TEACHER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
