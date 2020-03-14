import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { apointmentLesson } from "../../actions/index";
import { Text, Divider } from "react-native-elements";
import { LocaleConfig } from "react-native-calendars";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import AwesomeAlert from "react-native-awesome-alerts";
import moment from "moment";
import api from "../../api/api";

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  monthNamesShort: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  dayNamesShort: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
  today: "Today"
};

LocaleConfig.defaultLocale = "en";

const getAvaiablehours = async (email, date, setAvailablesHouers) => {
  const response = await api.get("/api/lessons/getavaiabletime", {
    params: {
      email,
      date
    }
  });
  setAvailablesHouers(response.data.avaiables);
};
const getMonthsArray = (yyyy, mm, availablesDaystonum) => {
  const days = {
    ראשון: "1",
    שני: "2",
    שלישי: "3",
    רביעי: "4",
    חמישי: "5",
    שישי: "6",
    שבת: "7"
  };
  const availablesDays = availablesDaystonum.map(day => days[day]);
  yyyy = yyyy.length == 4 ? yyyy : `20${yyyy}`;
  mm = mm.toString().length > 1 ? mm : `0${mm}`;

  const nextDay = Array.from(
    new Array(new Date(yyyy, mm, 0).getDate()),
    (x, i) => `${yyyy}-${mm}-${i + 1 < 10 ? `0${i + 1}` : i + 1}`
  );

  const result = nextDay.reduce((c, v, i) => {
    i = i.toString().split("").length < 2 && i <= 8 ? `0${i + 1}` : i + 1;

    return Object.assign(c, {
      [v]:
        availablesDays.includes(
          (moment(`${2020}-${mm}-${i}`).day() + 1).toString()
        ) == true
          ? { disabled: false }
          : { disabled: true, disableTouchEvent: true }
    });
  }, {});

  return result;
};

const CalanderScreen = ({
  navigation,
  SelectedTeacher,
  apointmentLesson,
  Student
}) => {
  const {
    fullName: teacherfullName,
    email,
    availablesDays,
    profession,
    avaiablesHours
  } = SelectedTeacher;

  const num2time = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00"
  ];
  const { fullName: studentName, email: studentEmail } = Student;
  const [visableOk, setVisableOK] = useState(false);
  const [selectetDate, setSelectetDate] = useState({});
  const [availablesHouers, setAvailablesHouers] = useState([]);

  const [visable, setVisable] = useState(false);
  const [update, setupdate] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthList, setMonthsList] = useState(
    getMonthsArray(
      moment().format("YYYY"),

      moment().format("MM"),
      availablesDays,
      currentDate

      // new Date().getFullYear().toString().substring(2, month.year.length),
      // new Date().getMonth(),
    )
  );

  return (
    <View style={styles.main}>
      <Modal
        isVisible={visable}
        onBackdropPress={() => setVisable(false)}
        transparent={true}
        animationType="slide"
        onBackButtonPress={() => {
          setVisable(false);
        }}
      >
        <ScrollView style={{ backgroundColor: "white", borderRadius: 90 }}>
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            {" "}
            בחר שעה לשיעור
          </Text>
          <FlatList
            data={availablesHouers}
            keyExtractor={(key, i) => i.toString()}
            renderItem={({ item }) => {
              return (
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        Alert.alert(
                          "האם אתה מאשר את קביעת השיעור",
                          `מורה: ${teacherfullName}\nמקצוע: ${profession.name}\nתאריך: ${selectetDate}   `,
                          [
                            {
                              text: "מאשר",
                              onPress: () => {
                                apointmentLesson(
                                  studentName,
                                  studentEmail,
                                  teacherfullName,
                                  email,
                                  profession.name,
                                  selectetDate,
                                  item
                                );
                                setVisableOK(true);
                              }
                            },

                            {
                              text: "לא מאשר"
                            }
                          ],
                          { cancelable: false }
                        );

                        // setVisable(false);
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    <Text
                      style={{
                        backgroundColor: "white",
                        justifyContent: "space-around",
                        margin: 8,
                        fontSize: 20
                      }}
                    >
                      {num2time[item]}
                    </Text>
                    <Divider style={{ backgroundColor: "blue" }} />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </ScrollView>
      </Modal>
      <Modal isVisible={visableOk}>
        <AwesomeAlert
          show={true}
          showProgress={false}
          title="השיעור נקבע בהצלחה"
          message="למעבר לתפריט הראשי לחץ המשך"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="המשך"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {}}
          onConfirmPressed={() => {
            try {
              setVisableOK(false);
              setVisable(false);
              navigation.popToTop();
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </Modal>

      <Calendar
        onMonthChange={month => {
          setCurrentDate(month.dateString);
          setMonthsList(
            getMonthsArray(
              month.year.toString(),
              month.month,
              availablesDays,
              currentDate
            )
          );
        }}
        // Collection of dates that have to be marked. Default = {}
        current={currentDate}
        minDate={new Date()}
        //  displayLoadingIndicator
        // Handler which gets executed on day press. Default = undefined
        onDayPress={async ({ dateString }) => {
          try {
            await getAvaiablehours(email, dateString, setAvailablesHouers);
            setSelectetDate(dateString);
            setVisable(true);
          } catch (error) {
            console.log(error);
          }
        }}
        hideExtraDays={true}
        markedDates={monthList}
      />
    </View>
  );
};

CalanderScreen.navigationOptions = {
  title: "לוח שנה ",
  headerStyle: {
    backgroundColor: "#2E9AFE"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold"
  }
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    flex: 1,
    marginTop: 100
  },
  HeadercenterComponent: {
    fontSize: 25,
    color: "white"
  }
});

// export default CalanderScreen;

const mapStateToProps = state => {
  const { SelectedTeacher, Student } = state;

  return { SelectedTeacher, Student };
};

export default connect(mapStateToProps, { apointmentLesson })(CalanderScreen);
