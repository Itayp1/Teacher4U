import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { AsyncStorage } from "react-native";
import { Icon } from "react-native-elements";

import { withNavigation } from "react-navigation";
const SignOutIcon = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          AsyncStorage.removeItem("token");
          navigation.navigate("Welcome");
        }}
      >
        <Icon name="log-out" type="feather" color="#00aced" size={50} />
        <Text>התנתק מהמערכת</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default withNavigation(SignOutIcon);
