import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/navigationRef";
import SigninScreenScreen from "./src/screens/Sign/SigninScreenScreen";
import FacebookSigninScreen from "./src/screens/Sign/FacebookSigninScreen";
import GoogleSigninScreen from "./src/screens/Sign/GoogleSigninScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Welcome: WelcomeScreen,
    Signin: SigninScreenScreen,
    FacebookSignin: FacebookSigninScreen,
    GoogleSignin: GoogleSigninScreen
  })

  // mainFlow: createBottomTabNavigator({
  //   trackListFlow: trackListFlow,
  //   TrackCreate: TrackCreateScreen,
  //   Account: AccountScreen
  // })
});

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
