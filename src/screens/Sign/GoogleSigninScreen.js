import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform
} from "react-native";
import { Text } from "react-native-elements";
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
      // navigation0dismiss();
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    console.log(e);

    return { error: true };
  }
};

const GoogleSignin = ({ navigation }) => {
  const [details, setDetails] = useState({
    signedIn: false,
    name: "",
    photoUrl: ""
  });
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          signInWithGoogleAsync(navigation);
          console.log("clicked");
        }}
      >
        <Image
          style={styles.image}
          source={require("../../icons/SignInGoogle.png")}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  // main: { flex: 1, marginLeft: 15, marginBottom: 40 },
  image: {
    resizeMode: "contain",
    width: 350
  },
  header: {
    fontSize: 25
  }
});

export default withNavigation(GoogleSignin);
