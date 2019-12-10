import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Picker,
  AsyncStorage
} from "react-native";
import { Text, Button, Input, label } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from "react-navigation";
import { ListItem } from "react-native-elements";
import loginApi from "../api/Login";
import api from "../api/api";

import { Context } from "../context/AuthContext";

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  }
];

const printDetails = async (obj, state, navigation) => {
  try {
    console.log("acess " + state.access_token);
    response = await loginApi.post("/api/registration/student", obj, {
      headers: {
        Platform: "google",
        access_token: state.access_token
      }
    });

    try {
      await AsyncStorage.setItem("token", response.data);

      navigation.navigate("StudentMenu");
    } catch (error) {
      // Error saving data
      console.log(error);
    }

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
const StudentLoginForm = ({ navigation, profile }) => {
  const { state, student_signup, clearErrorMessage } = useContext(Context);

  // const { state } = useContext(Contect);

  const [name, setname] = useState({});
  const [lastname, setlastname] = useState({});
  const [phone, setphone] = useState({});
  const [age, setage] = useState({});
  const [city, setcity] = useState({});
  const [gender, setgender] = useState({});
  const [userprofile, setuserprofile] = useState({});

  let test;
  const details = [
    { title: "שם פרטי", input: "הכנס את השם", set: setname },
    { title: "שם משפחה", input: "הכנס את השם", set: setlastname },

    { title: "מס טלפון", input: "מס טלפון", set: setphone },
    { title: "תאריך לידה", input: "תאריך לידה", set: setage },
    { title: "עיר", input: "עיר", set: setcity },
    { title: "מין", input: "זכר או נקבה", set: setgender }
  ];

  return (
    <View>
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

      <Button
        title="שמור"
        style={{ size: 15 }}
        onPress={() =>
          printDetails(
            {
              name,
              lastname,
              age,
              phone,
              city,
              gender,
              profile: "student"
            },
            state,
            navigation
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    paddingHorizontal: 5,
    margin: 5
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5
  }
});

export default withNavigation(StudentLoginForm);
