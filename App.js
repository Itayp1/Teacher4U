import React from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
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

import TeacherReviewScreen from "./src/screens/Teacher/TeacherReviewScreen";
import TeacherScheduleLessionsScreen from "./src/screens/Teacher/TeacherScheduleLessionsScreen";
import StudentMainProfileScreen from "./src/screens/Student/StudentMainProfile";
import ScheduleLessionsScreen from "./src/screens/Student/ScheduleLessionsScreen";
// import StudentProfileScreen from "./src/screens/Student/StudentProfileScreen";
import TeacherProfileScreen from "./src/screens/Student/TeacherProfileScreen";
import TeacherMainProfileScreen from "./src/screens/Teacher/TeacherMainProfile";
import SearchTeacherScreen from "./src/screens/Student/SearchTeacherScreen";
import TeacherListScreen from "./src/screens/Student/TeacherListScreen";
import CalendarScreen from "./src/screens/Student/CalendarScreen";
import StudentReviewScreen from "./src/screens/Student/StudentReviewScreen";
// import Cards from "./src/screens/Teacher/card";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./src/reducers";
import cameraScreen from "./src/components/Camera/camera.page";
import PhotoPickerScreen from "./src/components/PhotoPickerScreen";
import SelectPicScreen from "./src/components/SelectPic";
import ChoseepicScreen from "./src/components/Choseepic";
import addReviewScreen from "./src/components/addReview";

const SearchTeacher = createStackNavigator({
  SearchTeachers: SearchTeacherScreen,
  TeacherList: TeacherListScreen,
  TeacherProfile: TeacherProfileScreen,
  StudentReview: StudentReviewScreen,
  Calender: CalendarScreen
});
SearchTeacher.navigationOptions = {
  title: "חיפוש מורה",
  tabBarIcon: <Feather name="search" size={20} />
};

const switchNavigator = createSwitchNavigator(
  {
    Welcome: WelcomeScreen,
    addReview: addReviewScreen,
    PhotoPicker: PhotoPickerScreen,
    camera: cameraScreen,
    SelectPic: SelectPicScreen,
    Choseepic: ChoseepicScreen,
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
        Profile: createStackNavigator(
          {
            studentProfile: {
              screen: StudentMainProfileScreen,
              navigationOptions: {
                header: null
              }
            },
            studnetDetails: {
              screen: StudentRegistrationScreen,
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
