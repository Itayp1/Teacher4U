import React from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Text } from "react-native-elements";
import api from "../api/api";
import LottieView from "lottie-react-native";

//import { Text } from "react-native-elements";

const loginMethod = async navigation => {
  try {
    const response = await api.get("/api/login/verifyToken");
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
};
const WelcomeScreen = ({ navigation }) => {
  loginMethod(navigation);
  return (
    <>
      <Text h1 style={{ textAlign: "center", marginTop: 20 }}>
        Loading
      </Text>

      <LottieView
        source={require("../icons/196-material-wave-loading.json")}
        autoPlay
        loop
      />
    </>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, marginBottom: 40, alignItems: "center" },
  image: { width: 350, height: 350, resizeMode: "contain" }
});

export default WelcomeScreen;
