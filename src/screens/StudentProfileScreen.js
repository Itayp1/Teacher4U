import React, { useEffect, useState } from "react";

import { View, StyleSheet, Button } from "react-native";
import { Header, Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import StudentLoginForm from "../components/StudentLoginForm";
import DetailsFrorm from "../components/DetailsFrorm";
import api from "../api/api";
import SignOut from "../components/SignOutButton";
import Spacer from "../components/Spacer";
import { AsyncStorage } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const StudentProfileScreen = ({ navigation }) => {
  const [name, setname] = useState("הכנס את השם");
  const [lastname, setlastname] = useState("הכנס את השם");
  const [phone, setphone] = useState("מס טלפון");
  const [age, setage] = useState("תאריך לידה");
  const [city, setcity] = useState("עיר");
  const [gender, setgender] = useState("זכר או נקבה");
  const [isvisable, setisvisable] = useState(true);

  console.log(isvisable);

  const [userprofile, setuserprofile] = useState({});
  const details = [
    { title: "שם פרטי", input: name, set: setname },
    { title: "שם משפחה", input: "הכנס את השם", set: setlastname },

    { title: "מס טלפון", input: "מס טלפון", set: setphone },
    { title: "תאריך לידה", input: "תאריך לידה", set: setage },
    { title: "עיר", input: "עיר", set: setcity },
    { title: "מין", input: "זכר או נקבה", set: setgender }
  ];
  const updateDetails = async obj => {
    setisvisable(true)
    const response = await api.put("/api/information/student", obj);
    console.log(response.data);
    setisvisable(false)

  };

  useEffect(() => {
    console.log("start");
    const fetchApi = async () => {
      try {
        const response = await api.get("/api/information/student");
        setname(response.data.name);
        setlastname(response.data.lastname);
        setphone(response.data.phone);
        setage(response.data.age);
        setcity(response.data.city);
        setgender(response.data.gender);

        setisvisable(false);
      } catch (error) {
        console.log(error);
      }

    };
    fetchApi();
  }, []);

  return (
    <View style={styles.main}>
      <Spinner
        visible={isvisable}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
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
          value={name}
          onChangeText={text => {
            setname(text);
          }}
          errorStyle={{ color: "red" }}
          errorMessage=""
        />
        <Input
          label={details[1].title}
          value={lastname}
          onChangeText={text => {
            setlastname(text);
          }}
          errorStyle={{ color: "red" }}
          errorMessage=""
        />
        <Input
          label={details[2].title}
          value={phone}
          onChangeText={text => {
            setphone(text);
          }}
          errorStyle={{ color: "red" }}
          errorMessage=""
        />
        <Input
          label={details[3].title}
          value={age}
          onChangeText={text => {
            setage(text);
          }}
          errorStyle={{ color: "red" }}
          errorMessage=""
        />
        <Input
          label={details[4].title}
          value={city.toString()}
          onChangeText={async text => {
            setcity(text);
          }}
          errorStyle={{ color: "red" }}
          errorMessage=""
        />
        <Input
          label={details[5].title}
          value={gender}
          onChangeText={text => {
            setgender(text);
          }}
          errorStyle={{ color: "red" }}
          errorMessage=""
        />
      </View>

      <Button
        title="שמור"
        style={{ size: 15 }}
        onPress={() => {
          updateDetails({
            name,
            lastname,
            age,
            phone,
            city,
            gender,
            email: "asdasdsa",
            profile: "student"
          });
        }}
      />
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
  },
  spinnerTextStyle: {
    color: "#FFF"
  }
});

export default StudentProfileScreen;
