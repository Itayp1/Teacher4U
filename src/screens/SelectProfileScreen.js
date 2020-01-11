import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { Text } from "react-native-elements";

const SelectProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <Image style={styles.logo} source={require("../../icons/logo.png")} />

      <View style={styles.images}>
        <View>
          <Text style={styles.text}>תלמיד</Text>
          <TouchableOpacity
            style={styles.circle}
            onPress={() =>
              navigation.navigate("StudentRegistration", {
                profile: "StudentMenu"
              })
            }
          >
            <Image
              style={styles.image}
              source={require("../../icons/student.png")}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.text}>מורה</Text>
          <TouchableOpacity
            style={styles.circle}
            onPress={() =>
              navigation.navigate("TeacherRegistration", {
                profile: "TeacherMenu"
              })
            }
          >
            <Image
              style={styles.image}
              source={require("../../icons/teacher.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

SelectProfileScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "#6C8EB1",
    borderRadius: 100,
    width: 170,
    height: 170
  },
  text: {
    fontSize: 35,
    textAlign: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#D3E8FF",
    justifyContent: "flex-start"
  },
  logo: { width: 350, height: 350, resizeMode: "contain", bottom: 70 },
  images: {
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 70
  },

  image: { width: 150, height: 150, resizeMode: "contain" }
});

export default SelectProfileScreen;
