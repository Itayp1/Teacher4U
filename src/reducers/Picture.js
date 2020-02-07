import { SAVE_PICTURE } from "../actions/types";

const INITIAL_STATE = "";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_PICTURE:
      return action.payload;
    default:
      return state;
  }
};
