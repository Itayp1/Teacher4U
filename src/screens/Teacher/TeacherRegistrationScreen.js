import React from "react";
import { View, StyleSheet, Image } from "react-native";
import DetailsFrorm from "../../components/DetailsFrorm";
import StudentLoginForm from "../../components/StudentLoginForm";

const RegistrationScreen = ({ navigation }) => {
  //const profile = navigation.getParam("profile");

  return (
    <View>
      <StudentLoginForm />
    </View>
  );
};
const styles = StyleSheet.create({});

export default RegistrationScreen;
