import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-elements";
//import { LoginButton } from "react-native-fbsdk";

const FacebookSignin = () => {
  return (
    <>
      <TouchableOpacity>
        <Image
          style={styles.image}
          source={require("../../icons/SigninFacebook.png")}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: { backgroundColor: "blue" },
  main: { flex: 1, marginLeft: 15, marginBottom: 40 },
  image: { resizeMode: "contain", width: 350 },
  header: {
    fontSize: 25
  }
});

export default FacebookSignin;
