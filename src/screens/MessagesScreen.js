import React, { useState } from "react";
import cities from "../../config/cities.json";
import AgreementPopup from "../components/AgreementPopup";

import { View, StyleSheet, Image, Text } from "react-native";
import { Picker, Header, Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import MultiSelect from "../components/MultiSelect";
import MultiSelectResult from "../components/MultiSelectResult";

const MessagesScreen = ({ navigation }) => {
  const [visable, setvsable] = useState(false);
  const [term, seterm] = useState("");
  const [cityList, setcityList] = useState([]);

  return (
    <View style={styles.main}>
      <Header
        style={styles.Header}
        centerComponent={{
          text: "הודעות",
          style: styles.HeadercenterComponent
        }}
      />
      <Text>דגכגדכגדכדגכגד</Text>
      <Text>דגכגדכגדכדגכגד</Text>
      <Text>דגכגדכגדכדגכגד</Text>
      {/* <AgreementPopup visable={} currentSelectedItem={} /> */}
      <Button
        title={"קביעת סטטוס שיעור"}
        onPress={() => {
          setvsable(!visable);
        }}
      />
      <MultiSelect
        isVisible={visable}
        setvsable={setvsable}
        list={cities}
        selectedItems={setcityList}
      />
      <MultiSelectResult list={cityList} />
    </View>
  );
};

MessagesScreen.navigationOptions = {
  title: "הודעות",
  tabBarIcon: <FontAwesome name="gear" size={20} />
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    flex: 1
  },
  HeadercenterComponent: {
    fontSize: 25,
    color: "white"
  }
});

export default MessagesScreen;
