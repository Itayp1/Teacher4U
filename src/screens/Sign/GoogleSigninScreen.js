import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-elements";

const GoogleSignin = () => {
  return (
    <Image
      style={styles.image}
      source={require("../../icons/SignInGoogle.png")}
    />
  );
};

const styles = StyleSheet.create({
  // main: { flex: 1, marginLeft: 15, marginBottom: 40 },
  image: { width: "100%", height: 50, resizeMode: "contain" }
});

export default GoogleSignin;
