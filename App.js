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
const switchNavigator = createSwitchNavigator(
  {
    Welcome: WelcomeScreen,
    loginFlow: createStackNavigator({
      Signin: SigninScreen,
      FacebookSignin: FacebookSigninScreen,
      GoogleSignin: GoogleSigninScreen,
      SelectProfile: SelectProfileScreen
    }),
    signupFlow: createStackNavigator({
      SelectProfile: SelectProfileScreen
    })
    // mainFlow: createBottomTabNavigator({
    //   trackListFlow: trackListFlow,
    //   TrackCreate: TrackCreateScreen,
    //   Account: AccountScreen
    // })
  },

  {
    initialRouteName: "signupFlow"
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
