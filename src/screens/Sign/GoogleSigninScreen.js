import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
import { Text } from "react-native-elements";
import * as Google from "expo-google-app-auth";
import { withNavigation } from "react-navigation";
import api from "../../api/api";
import { AsyncStorage } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const signInWithGoogleAsync = async (navigation, setIsVisable) => {
  try {
    const config = {
      behaviar: "web",
      scopes: ["profile", "email"],
      access_type: "offline"
    };
    if (Platform.OS === "ios") {
      config.iosClientId =
        "879750377002-iv2ka9ht149lc6l7h40i74hq8jsd16ib.apps.googleusercontent.com";
    } else {
      config.androidClientId =
        "879750377002-0s7l05kifet0gn767dedp2pdkheq3qb9.apps.googleusercontent.com";
      config.androidStandaloneAppClientId =
        "879750377002-0s7l05kifet0gn767dedp2pdkheq3qb9.apps.googleusercontent.com";
    }
    // "879750377002-sj5g0pq3k0kvu4n9ebljh8qchcq2l50s.apps.googleusercontent.com");
    const result = await Google.logInAsync(config);
    if (result.type === "success") {
      const response = await api.get("/api/login", {
        headers: {
          access_token: result.accessToken,
          platform: "google"
        }
      });

      AsyncStorage.setItem("token", response.data.jwt);
      setIsVisable(false);
      if (response.data.profile === "student") {
        navigation.navigate("StudentMenu");
      } else if (response.data.profile === "teacher") {
        navigation.navigate("TeacherMenu");
      } else {
        navigation.navigate("SelectProfile", {
          access_token: result.accessToken,
          platform: "google"
        });
      }
      // login("google", result.accessToken);
      // navigation0dismiss();
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    Alert.alert("Selected Item", e.toString());

    console.log("error in catch");
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
  const [isVisable, setIsVisable] = useState(false);
  return (
    <>
      <Spinner
        visible={isVisable}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      <TouchableOpacity
        onPress={() => {
          setIsVisable(true);
          signInWithGoogleAsync(navigation, setIsVisable);
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
  },
  spinnerTextStyle: {
    color: "#FFF"
  }
});

export default withNavigation(GoogleSignin);
