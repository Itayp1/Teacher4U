import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button, Platform } from "react-native";
import * as Google from "expo-google-app-auth";
import { withNavigation } from "react-navigation";
const signInWithGoogleAsync = async navigation => {
  console.log(Platform.OS);
  try {
    const config = {
      behaviar: "web",
      scopes: ["profile", "email"]
    };
    Platform.OS === "ios"
      ? (config.iosClientId =
          "879750377002-iv2ka9ht149lc6l7h40i74hq8jsd16ib.apps.googleusercontent.com")
      : (config.androidClientId =
          "879750377002-sj5g0pq3k0kvu4n9ebljh8qchcq2l50s.apps.googleusercontent.com");

    const result = await Google.logInAsync(config);
    if (result.type === "success") {
      navigation.navigate("SelectProfile");
      navigation0dismiss();
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    console.log(e);

    return { error: true };
  }
};

const SigninScreen = ({ navigation }) => {
  console.log(navigation);
  const [details, setDetails] = useState({
    signedIn: false,
    name: "",
    photoUrl: ""
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In With Google</Text>
      <Button
        title="Sign in with Google"
        onPress={() => {
          signInWithGoogleAsync(navigation);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
});
export default withNavigation(SigninScreen);
