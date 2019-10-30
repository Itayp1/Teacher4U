import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/navigationRef";
import SigninScreen from "./src/screens/Sign/SigninScreen";
import FacebookSigninScreen from "./src/screens/Sign/FacebookSigninScreen";
import GoogleSigninScreen from "./src/screens/Sign/GoogleSigninScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import SelectProfileScreen from "./src/screens/signup/SelectProfileScreen";
import RegistrationScreen from "./src/screens/signup/RegistrationScreen";
import MenuScreen from "./src/screens/MenuScreen";
import MessageScreen from "./src/screens/MessagesScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import ScheduleLessionsScreen from "./src/screens/ScheduleLessionsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SearchTeacherScreen from "./src/screens/SearchTeacherScreen";

const switchNavigator = createSwitchNavigator(
  {
    start: ScheduleLessionsScreen,
    Welcome: WelcomeScreen,
    loginFlow: createStackNavigator({
      Signin: SigninScreen,
      FacebookSignin: FacebookSigninScreen,
      GoogleSignin: GoogleSigninScreen,
      SelectProfile: SelectProfileScreen
    }),
    SignupFlow: createStackNavigator({
      SelectProfile: SelectProfileScreen,
      Registration: RegistrationScreen
    }),
    StudentMenu: createBottomTabNavigator({
      Message: MessageScreen,
      SearchTeacher: SearchTeacherScreen,
      ScheduleLessions: ScheduleLessionsScreen,
      Profile: ProfileScreen
    }),
    TeacherMenu: createBottomTabNavigator({
      Message: MessageScreen,
      Review: ReviewScreen,
      ScheduleLessions: ScheduleLessionsScreen,
      Profile: ProfileScreen
    })
  },

  {
    initialRouteName: "StudentMenu"
  }
);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App
      ref={navigator => {
        setNavigator(navigator);
      }}
    />
  );
};
