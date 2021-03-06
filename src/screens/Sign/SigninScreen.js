import React from "react";
import { View, StyleSheet, Image, Button, Platform } from "react-native";
import { Text } from "react-native-elements";

import { withNavigation } from "react-navigation";
import GoogleButton from "./GoogleSigninScreen";
import FacebookButton from "./FacebookSigninScreen";

const SigninScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text h2 style={{ marginBottom: 100 }}>
        התחבר למערכת
      </Text>
      <GoogleButton />
      {/* <FacebookButton /> */}
    </View>
  );
};
SigninScreen.navigationOptions = {
  title: "Teacher4U ",
  headerStyle: {
    backgroundColor: "#2E9AFE"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold"
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  header: {
    fontSize: 25
  }
});
export default withNavigation(SigninScreen);
