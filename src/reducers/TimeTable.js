import { TIME_TABLE } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TIME_TABLE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
