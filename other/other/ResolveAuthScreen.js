import React, { useEffect } from "react";
import { AsyncStorage } from "react-native";
import { View, StyleSheet, Button } from "react-native";
import jwt from "react-native-pure-jwt";

const ResolveAuthScreen = ({ navigation }) => {
  const ResolveAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      jwt.decode("token", "secret", {
        skipValidation: true
      });
    } catch (error) {}
  };

  useEffect(() => {
    ResolveAuth();
  }, []);

  return <View></View>;
};

export default ResolveAuthScreen;
