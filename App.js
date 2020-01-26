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
import MessageScreen from "./src/screens/MessagesScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import ScheduleLessionsScreen from "./src/screens/Student/ScheduleLessionsScreen";
import StudentProfileScreen from "./src/screens/Student/StudentProfileScreen";
import TeacherProfileScreen from "./src/screens/Student/TeacherProfileScreen";
import TeacherProfileScreenMenu from "./src/screens/Teacher/TeacherProfileScreenMenu";
import TeacherMainProfileScreen from "./src/screens/Teacher/TeacherMainProfile";
import SearchTeacherScreen from "./src/screens/Student/SearchTeacherScreen";
import TeacherListScreen from "./src/screens/Student/TeacherListScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import Card from "./src/screens/Teacher/card";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./src/reducers";
//import Choseepic from "./src/components/Choseepic";
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
    //  Cameraa: Choseepic,
    Profilep: TeacherMainProfileScreen,
    cardppp: Card,
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
        Profile: createStackNavigator({
          SelectProfile: {
            screen: TeacherMainProfileScreen,
            navigationOptions: {
              header: null
            }
          },
          TeacherRegistrationProfile: {
            screen: TeacherRegistrationScreen,
            navigationOptions: {
              header: null
            }
          }
        })
      },
      {
        // tabBarComponent: FlexibleTabBarComponent
      }
    )
  },

  {
    initialRouteName: "Profilep"
  }
);

const App = createAppContainer(switchNavigator);

export default () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <App
        ref={navigator => {
          setNavigator(navigator);
        }}
      />
    </Provider>
  );
};
