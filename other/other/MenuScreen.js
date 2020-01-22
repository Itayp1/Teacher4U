import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <Text>Work</Text>
      <Text>Work</Text>

      <Text>Work</Text>

      <Text>Work</Text>
    </View>
  );
};

MenuScreen.navigationOptions = {
  title: "MenuScreen",
  tabBarIcon: <FontAwesome name="gear" size={20} />
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#D3E8FF",
    flex: 1
  }
});

export default MenuScreen;
