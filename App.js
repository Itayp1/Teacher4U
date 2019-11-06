import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/navigationRef";
//import { AnimatedCircleBarComponent } from "react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent";
//import { FlexibleTabBarComponent } from "react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent";
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
import TeacherListScreen from "./src/screens/TeacherListScreen";
import TeacherProfileScreen from "./src/screens/TeacherProfileScreen";
import CalendarScreen from "./src/screens/CalendarScreen";

const SearchTeacher = createStackNavigator({
  SearchTeachers: SearchTeacherScreen,
  TeacherList: TeacherListScreen,
  TeacherProfile: TeacherProfileScreen,
  Review: ReviewScreen,
  Calender: CalendarScreen
});
SearchTeacher.navigationOptions = {
  title: "חיפוש מורה",
  tabBarIcon: <FontAwesome name="th-list" size={20} />
};

const switchNavigator = createSwitchNavigator(
  {
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
    StudentMenu: createBottomTabNavigator(
      {
        Message: MessageScreen,
        Profile: ProfileScreen,
        ScheduleLessions: ScheduleLessionsScreen,
        SearchTeacher: SearchTeacher
      },
      {
        //  tabBarComponent: FlexibleTabBarComponent
      }
    ),
    TeacherMenu: createBottomTabNavigator(
      {
        Message: MessageScreen,
        Review: ReviewScreen,
        ScheduleLessions: ScheduleLessionsScreen,
        Profile: ProfileScreen
      },
      {
        // tabBarComponent: FlexibleTabBarComponent
      }
    )
  },

  {
    initialRouteName: "loginFlow"
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
