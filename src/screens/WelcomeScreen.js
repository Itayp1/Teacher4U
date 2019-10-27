import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
//import { Text } from "react-native-elements";

const WelcomeScreen = ({ navigation }) => {
  setTimeout(() => {
    navigation.navigate("Signin");
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
