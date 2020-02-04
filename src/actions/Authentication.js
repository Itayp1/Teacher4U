import api from "../api/api";
import * as Google from "expo-google-app-auth";
import { AsyncStorage } from "react-native";
import {
  
} from "./types";




const signInWithGoogle = (Platform)=>{
    try {
        const config = {
          behaviar: "web",
          scopes: ["profile", "email"],
          access_type: "offline"
        };
        Platform.OS === "ios"
          ? (config.iosClientId =
              "879750377002-iv2ka9ht149lc6l7h40i74hq8jsd16ib.apps.googleusercontent.com")
          : (config.androidClientId =
              "563900462069-ab0rdude70kol3fvkj9rh4vgcl37nhgi.apps.googleusercontent.com");
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
 
    
        return { error: true };
      }

}