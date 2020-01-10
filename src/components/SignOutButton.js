import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";

import { withNavigation } from "react-navigation";
const SignOutButton = ({ navigation }) => {
  return (
    <>
      <Button
        title="Sign Out"
        onPress={() => {
          AsyncStorage.removeItem("token");
          navigation.navigate("loginFlow");
        }}
        //style={styles.button}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default withNavigation(SignOutButton);
