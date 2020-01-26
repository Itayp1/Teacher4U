import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";

export default class Choseepic extends React.Component() {
  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === "granted" });
  }

  render() {
    const { hasPermission } = this.state;
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.cameraType}></Camera>
        </View>
      );
    }
  }
}
