import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/navigationRef";
//import { AnimatedCircleBarComponent } from "react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent";
import { FlexibleTabBarComponent } from "react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent";
import SigninScreen from "./src/screens/Sign/SigninScreen";
import FacebookSigninScreen from "./src/screens/Sign/FacebookSigninScreen";
import GoogleSigninScreen from "./src/screens/Sign/GoogleSigninScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import SelectProfileScreen from "./src/screens/SelectProfileScreen";
import TeacherRegistrationScreen from "./src/screens/Teacher/TeacherRegistrationScreen";
import StudentRegistrationScreen from "./src/screens/Student/StudentRegistrationScreen";
import MessageScreen from "./src/screens/MessagesScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import TeacherReviewScreen from "./src/screens/Teacher/TeacherReviewScreen";
import TeacherScheduleLessionsScreen from "./src/screens/Teacher/TeacherScheduleLessionsScreen";
import StudentMainProfileScreen from "./src/screens/Student/StudentMainProfile";
import ScheduleLessionsScreen from "./src/screens/Student/ScheduleLessionsScreen";
import StudentProfileScreen from "./src/screens/Student/StudentProfileScreen";
import TeacherProfileScreen from "./src/screens/Student/TeacherProfileScreen";
import TeacherMainProfileScreen from "./src/screens/Teacher/TeacherMainProfile";
import SearchTeacherScreen from "./src/screens/Student/SearchTeacherScreen";
import TeacherListScreen from "./src/screens/Student/TeacherListScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
// import Cards from "./src/screens/Teacher/card";
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
    MessageTest: MessageScreen,

    Profilep: TeacherMainProfileScreen,
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
        Profile: StudentMainProfileScreen,
        ScheduleLessions: ScheduleLessionsScreen,
        SearchTeacher: SearchTeacher
      },
      {
        tabBarComponent: FlexibleTabBarComponent
      }
    ),
    TeacherMenu: createBottomTabNavigator(
      {
        //  Message: MessageScreen,

        Profile: createStackNavigator(
          {
            TeacherProfile: {
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
          },
          {
            navigationOptions: {
              title: "פרופיל",
              tabBarIcon: <FontAwesome name="th-list" size={20} />
            }
          }
        ),
        Review: TeacherReviewScreen,
        ScheduleLessions: TeacherScheduleLessionsScreen
      },
      {
        tabBarComponent: FlexibleTabBarComponent
      }
    )
  },

  {
    initialRouteName: "Welcome"
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
