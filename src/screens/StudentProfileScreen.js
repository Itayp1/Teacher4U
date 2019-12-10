import React, { useEffect, useState } from "react";

import { View, StyleSheet, Button } from "react-native";
import { Header, Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import StudentLoginForm from "../components/StudentLoginForm";
import DetailsFrorm from "../components/DetailsFrorm";
import api from "../api/api";
import SignOut from "../components/SignOutButton";
import Spacer from "../components/Spacer";

const printDetails = async (obj, navigation) => {};

const StudentProfileScreen = ({ navigation }) => {
  const [name, setname] = useState("הכנס את השם");
  const [lastname, setlastname] = useState({});
  const [phone, setphone] = useState({});
  const [age, setage] = useState({});
  const [city, setcity] = useState({});
  const [gender, setgender] = useState({});
  const [userprofile, setuserprofile] = useState({});
  const details = [
    { title: "שם פרטי", input: name, set: setname },
    { title: "שם משפחה", input: "הכנס את השם", set: setlastname },

    { title: "מס טלפון", input: "מס טלפון", set: setphone },
    { title: "תאריך לידה", input: "תאריך לידה", set: setage },
    { title: "עיר", input: "עיר", set: setcity },
    { title: "מין", input: "זכר או נקבה", set: setgender }
  ];

  useEffect(() => {
    console.log("start");
    const fetchApi = async () => {
      const response = await api.get("/api/information/student").catch(err => {
        console.log(err);
      });

      if (response) {
        setname("undifind");
        setlastname(response.data.phone || "undifind");
        setphone(response.data.age || "undifind");
        setAge(response.data.ciry || "undifind");
        setgender(response.data.gender || "undifind");
      }
      //  console.log(response.data);
    };
    fetchApi();
  }, []);

  return (
    <View style={styles.main}>
      <Header
        style={styles.Header}
        centerComponent={{
          text: "פרופיל ",
          style: styles.HeadercenterComponent
        }}
      />
      <View>
        <Input
          label={details[0].title}
          placeholder={details[0].input}
          onChangeText={details[0].set}
          errorStyle={{ color: "red" }}
          errorMessage=""
        />
        <Input
          label={details[1].title}
          placeholder={details[1].input}
          onChangeText={details[1].set}
          errorStyle={{ color: "red" }}
          errorMessage=""
        />
        <Input
          label={details[2].title}
          placeholder={details[2].input}
          onChangeText={details[2].set}
          errorStyle={{ color: "red" }}
          errorMessage=""
        />
        <Input
          label={details[3].title}
          placeholder={details[3].input}
          onChangeText={details[3].set}
          errorStyle={{ color: "red" }}
          errorMessage=""
        />
        <Input
          label={details[4].title}
          placeholder={details[4].input}
          onChangeText={details[4].set}
          errorStyle={{ color: "red" }}
          errorMessage=""
        />
        <Input
          label={details[5].title}
          placeholder={details[5].input}
          onChangeText={details[5].set}
          errorStyle={{ color: "red" }}
          errorMessage=""
        />
      </View>

      <Button title="שמור" style={{ size: 15 }} onPress={() => {}} />
      <Spacer />
      <SignOut style={styles.button} />
    </View>
  );
};

StudentProfileScreen.navigationOptions = {
  title: "פרופיל",
  tabBarIcon: <FontAwesome name="gear" size={20} />
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20
  },
  main: {
    backgroundColor: "#D3E8FF",
    flex: 1
  },
  HeadercenterComponent: {
    fontSize: 25,
    color: "white"
  }
});

export default StudentProfileScreen;
