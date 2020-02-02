import { TIME_TABLE, CHANGE_STATUS } from "../actions/types";

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
    default:
      return state;
  }
};
