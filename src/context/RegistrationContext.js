import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import loginApi from "../api/Login";
import { navigate } from "../../src/navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "login":
      return {
        platform: action.payload.platform,
        access_token: action.payload.access_token
      };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "student_signup":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("StudentMenu");
  } else {
    navigate("loginFlow");
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = dispatch => async ({ name, lastname }) => {
  try {
    const response = await loginApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });

    navigate("TrackList");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up"
    });
  }
};

const login = dispatch => async (platform, access_token) => {
  try {
    console.log("send req login");
    console.log(platform + "   " + access_token);
    const response = await loginApi.get("/api/login", {
      headers: { platform, access_token }
    });
    console.log("resss");

    console.log(response.data);
    // await AsyncStorage.setItem("token", response.data.jwt);
    dispatch({ type: "signin", payload: { platform, access_token } });
    // navigate("TrackList");
  } catch (err) {
    console.log("in err");
    console.log(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in"
    });
  }
};
const student_signup = dispatch => async (
  name,
  lastname,
  age,
  gender,
  city,
  phone,
  profile
) => {
  console.log(name, lastname, age, gender, city, phone, profile);
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { student_signup, signout, signup, clearErrorMessage, tryLocalSignin, login },
  { token: null, platform: "null", access_token: null, errorMessage: "" }
);
