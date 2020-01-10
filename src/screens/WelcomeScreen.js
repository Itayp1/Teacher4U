import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { AsyncStorage } from "react-native";
import api from "../api/api";

//import { Text } from "react-native-elements";

const WelcomeScreen = ({ navigation }) => {
  setTimeout(async () => {
    try {
      const response = await api.get("/api/login/verifyToken");
      console.log(response.data.profile === "student");
      if (response.data.profile === "student") {
        navigation.navigate("StudentMenu");
      } else if (response.data.profile === "teacher") {
        navigation.navigate("TeacherMenu");
      } else {
        navigation.navigate("loginFlow");
      }
    } catch (error) {
      console.log(error);
      navigation.navigate("loginFlow");
    }
  }, 2000);
  return (
    <View style={styles.main}>
      <Image style={styles.image} source={require("../../icons/logo.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, marginLeft: 15, marginBottom: 40 },
  image: { width: 350, height: 350, resizeMode: "contain" }
});

export default WelcomeScreen;
