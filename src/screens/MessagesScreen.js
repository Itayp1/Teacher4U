import React from "react";
import { AsyncStorage } from "react-native";

import { View, StyleSheet, Image, Text } from "react-native";
import { Picker, Header } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

const MessagesScreen = ({ navigation }) => {
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
      {/* <Picker selectedValue={test} onValueChange={test}>
        <Picker.Item label="Steve" value="steve" />
        <Picker.Item label="Ellen" value="ellen" />
        <Picker.Item label="Maria" value="maria" />
      </Picker> */}
    </View>
  );
};

MessagesScreen.navigationOptions = {
  title: "הודעות",
  tabBarIcon: <FontAwesome name="gear" size={20} />
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#D3E8FF",
    flex: 1
  },
  HeadercenterComponent: {
    fontSize: 25,
    color: "white"
  }
});

export default MessagesScreen;
