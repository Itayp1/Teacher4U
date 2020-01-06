import React, { useState, useEffect } from "react";
import moment from "moment";

import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Picker, Text } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { LocaleConfig } from "react-native-calendars";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Modal from "react-native-modal";
import AwesomeAlert from "react-native-awesome-alerts";

const dayNames = [
  { Sunday: 1 },
  { Monday: 2 },
  { Tuesday: 3 },
  { Wednesday: 4 },
  { Thursday: 5 },
  { Friday: 6 },
  { Saturday: 7 }
];
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

const days = {
  sunday: [
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
    "20:00"
  ],
  monday: ["23:00", "13:00"]
};
const availablesDays = [1, 2, 4];

LocaleConfig.defaultLocale = "en";
const getMonthsArray = (yyyy, mm, availablesDays, tmp) => {
  yyyy = yyyy.length == 4 ? yyyy : `20${yyyy}`;
  mm = mm.toString().length > 1 ? mm : `0${mm}`;
  // console.log("months is " + mm);
  // console.log("currentDate :" + tmp);

  const nextDay = Array.from(
    new Array(new Date(yyyy, mm, 0).getDate()),
    (x, i) => `${yyyy}-${mm}-${i + 1 < 10 ? `0${i + 1}` : i + 1}`
  );

  const result = nextDay.reduce((c, v, i) => {
    i = i.toString().split("").length < 2 && i <= 8 ? `0${i + 1}` : i + 1;

    return Object.assign(c, {
      [v]:
        availablesDays.includes(moment(`${2020}-${mm}-${i}`).day()) == true
          ? { disabled: false }
          : { disabled: true }
    });
  }, {});

  return result;
};

const CalanderScreen = ({ navigation }) => {
  console.log(moment().format("YYYY"));
  const [visable, setVisable] = useState(false);
  const [visableOk, setVisableOK] = useState(false);

  const [update, setupdate] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthList, setMonthsList] = useState(
    getMonthsArray(
      moment().format("YYYY"),

      moment().format("MM"),

      availablesDays,
      currentDate
    )
  );

  return (
    <View style={styles.main}>
      <Modal isVisible={visable} onBackdropPress={() => setVisable(false)}>
        <ScrollView style={{ backgroundColor: "white", borderRadius: 90 }}>
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            {" "}
            בחר שעה לשיעור
          </Text>
          <FlatList
            data={days.sunday}
            keyExtractor={houer => houer}
            renderItem={({ item }) => {
              return (
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      setVisable(false);
                      setupdate(true);
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
                      {item}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </ScrollView>
      </Modal>

      {update === true ? (
        <Modal isVisible={visableOk}>
          <AwesomeAlert
            show={"BasicAwesomeAlert"}
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
              console.log("pppppp");
              setVisableOK(false);
              navigation.navigate("Signin");
            }}
          />
        </Modal>
      ) : null}
      <Calendar
        onMonthChange={month => {
          console.log("set corrent date ");
          setCurrentDate(month.dateString);
          console.log(currentDate);
          setMonthsList(
            getMonthsArray(month.year.toString(), month.month, availablesDays)
          );
        }}
        // Collection of dates that have to be marked. Default = {}
        current={currentDate}
        minDate={currentDate}
        //  displayLoadingIndicator
        // Handler which gets executed on day press. Default = undefined
        onDayPress={({ dateString }) => {
          setPopo(dateString);
          setVisable(true);
          console.log("ppp");
        }}
        hideExtraDays={true}
        markedDates={monthList}
      />
    </View>
  );
};

// CalanderScreen.navigationOptions = {
//   title: "לוח שנה",
//   tabBarIcon: <FontAwesome name="gear" size={20} />
// };

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#D3E8FF",
    flex: 1,
    marginTop: 100
  },
  HeadercenterComponent: {
    fontSize: 25,
    color: "white"
  }
});

export default CalanderScreen;
