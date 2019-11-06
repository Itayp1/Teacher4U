import React, { useState } from "react";
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

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc."
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui"
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

LocaleConfig.defaultLocale = "fr";
date = new Date();
const CalanderScreen = ({ navigation }) => {
  const [popo, setPopo] = useState("2019-11-21");
  const [visable, setVisable] = useState(false);
  const [update, setupdate] = useState(false);

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
        <Modal isVisible={true}>
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
              navigation.navigate("StudentMenu");
            }}
          />
        </Modal>
      ) : null}
      <Calendar
        // Collection of dates that have to be marked. Default = {}
        minDate={date}
        displayLoadingIndicator
        // Handler which gets executed on day press. Default = undefined
        onDayPress={({ dateString }) => {
          setPopo(dateString);
          setVisable(true);
          console.log("ppp");
        }}
        hideExtraDays={true}
        markedDates={{
          [popo]: { selected: true, marked: true, selectedColor: "white" },
          "2019-11-08": { marked: true },
          "2019-11-10": { marked: true, dotColor: "red", activeOpacity: 0 },
          "2019-11-11": { disabled: true, disableTouchEvent: true }
        }}
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
