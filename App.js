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
import SelectProfileScreen from "./src/screens/SelectProfileScreen";
import TeacherRegistrationScreen from "./src/screens/Teacher/TeacherRegistrationScreen";
import StudentRegistrationScreen from "./src/screens/Student/StudentRegistrationScreen";
//import MenuScreen from "./src/screens/other/MenuScreen";
import MessageScreen from "./src/screens/MessagesScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import ScheduleLessionsScreen from "./src/screens/Student/ScheduleLessionsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import StudentProfileScreen from "./src/screens/Student/StudentProfileScreen";
import SearchTeacherScreen from "./src/screens/Student/SearchTeacherScreen";
import TeacherListScreen from "./src/screens/Student/TeacherListScreen";
import TeacherProfileScreen from "./src/screens/Student/TeacherProfileScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
//import ResolveAuthScreen from "./src/screens/other/ResolveAuthScreen";

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
    TeacherRegistration: TeacherRegistrationScreen,
    loginFlow: createStackNavigator({
      Signin: SigninScreen,
      FacebookSignin: FacebookSigninScreen,
      GoogleSignin: GoogleSigninScreen,
      SelectProfile: SelectProfileScreen
    }),
    SignupFlow: createStackNavigator({
      SelectProfile: SelectProfileScreen,
      TeacherRegistration: TeacherRegistrationScreen,
      StudentRegistration: StudentRegistrationScreen
    }),
    StudentMenu: createBottomTabNavigator(
      {
        Message: MessageScreen,
        Profile: StudentProfileScreen,
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
    initialRouteName: "StudentMenu"
  }
);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App
        ref={navigator => {
          setNavigator(navigator);
        }}
      />
    </AuthProvider>
  );
};
