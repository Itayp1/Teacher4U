import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";
import { LoginButton } from "react-native-fbsdk";

const FacebookSignin = () => {
  return <LoginButton />;
};

const styles = StyleSheet.create({
  button: { backgroundColor: "blue" },
  main: { flex: 1, marginLeft: 15, marginBottom: 40 },
  image: { width: "80%", height: 50, resizeMode: "contain" }
});

export default FacebookSignin;
