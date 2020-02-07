import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Header } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import StudentLoginForm from "../components/StudentLoginForm";
import DetailsFrorm from "../components/DetailsFrorm";

import SignOut from "../components/SignOutButton";
import Spacer from "../components/Spacer";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <Header
        style={styles.Header}
        centerComponent={{
          text: "פרופיל ",
          style: styles.HeadercenterComponent
        }}
      />
      <DetailsFrorm />
      <Spacer />
      <SignOut style={styles.button} />
    </View>
  );
};

ProfileScreen.navigationOptions = {
  title: "פרופיל",
  tabBarIcon: <FontAwesome name="gear" size={20} />
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20
  },
  main: {
    backgroundColor: "white",
    flex: 1
  },
  HeadercenterComponent: {
    fontSize: 25,
    color: "white"
  }
});

export default ProfileScreen;
