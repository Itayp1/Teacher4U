import React from "react";
import { View, StyleSheet, FlatList, TextInput, Picker } from "react-native";
import { Text, Button, Input, label } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from "react-navigation";

import { ListItem } from "react-native-elements";

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

const DetailsFrorm = ({ navigation, profile }) => {
  let test;
  const details = [
    { title: "שם מלא", input: "הכנס את השם" },
    { title: "מס טלפון", input: "הכנס שם משפחה" },
    { title: "תאריך לידה", input: "הכנס שם משפחה" },
    { title: "עיר", input: "הכנס שם משפחה" },
    { title: "מין", input: "זכר או נקבה" }
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
                placeholder={item.inpu}
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
        onPress={() => navigation.navigate(profile)}
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
