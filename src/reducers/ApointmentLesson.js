import { APOINTMENT_lESSON } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APOINTMENT_lESSON:
      return action.payload;
    default:
      return state;
  }
};
