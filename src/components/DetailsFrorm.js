import React, { useState, useContext } from "react";
import { View, StyleSheet, FlatList, TextInput, Picker } from "react-native";
import { Text, Button, Input, label } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from "react-navigation";
import { ListItem } from "react-native-elements";
import loginApi from "../api/Login";

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

const printDetails = async (obj, state) => {
  try {
    response = await loginApi.post("/api/registration/student", obj, {
      headers: {
        Platform: "google",
        access_token: state.access_token
      }
    });
  } catch (error) {}
};
const DetailsFrorm = ({ navigation, profile }) => {
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
      <FlatList
        data={details}
        keyExtractor={result => result.title}
        renderItem={({ item }) => {
          return (
            <View>
              <Input
                label={item.title}
                placeholder={item.input}
                onChangeText={item.set}
                errorStyle={{ color: "red" }}
                errorMessage=""
              />
            </View>
          );
        }}
      />
      <Picker selectedValue={test} onValueChange={test}>
        <Picker.Item label="Steve" value="steve" />
        <Picker.Item label="Ellen" value="ellen" />
        <Picker.Item label="Maria" value="maria" />
      </Picker>
      <Button
        title="שמור"
        style={{ size: 15 }}
        //        onPress={() => navigation.navigate(profile)}

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
            state
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

export default withNavigation(DetailsFrorm);
