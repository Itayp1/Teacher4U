import createDataContext from "./createDataContext";

const profileReducer = (state, action) => {
  switch (action.type) {
    case "save_info":
      return action.payload;

    default:
      return state;
  }
};

const save_info = dispatch => obj => {
  dispatch({ type: "save_info", payload: obj });
};

export const { Provider, Context } = createDataContext(
  profileReducer,
  { save_info },
  { ssss: null }
);
