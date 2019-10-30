import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SearchTeacherScreen = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <Text>Work</Text>
      <Text>Work</Text>

      <Text>Work</Text>

      <Text>Work</Text>
      <Text>Work</Text>
      <Text>Work</Text>
      <Text>Work</Text>
    </View>
  );
};

SearchTeacherScreen.navigationOptions = {
  title: "חיפוש מורה",
  tabBarIcon: <FontAwesome name="gear" size={20} />
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#6C8EB1",
    flex: 1
  }
});

export default SearchTeacherScreen;
