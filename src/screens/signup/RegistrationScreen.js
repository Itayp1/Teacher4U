import React from "react";
import { View, StyleSheet, Image } from "react-native";
import DetailsFrorm from "../../components/DetailsFrorm";

const RegistrationScreen = ({ navigation }) => {
  const profile = navigation.getParam("profile");
  console.log(profile);
  return (
    <View>
      <DetailsFrorm profile={profile} />
    </View>
  );
};
const styles = StyleSheet.create({});

export default RegistrationScreen;
