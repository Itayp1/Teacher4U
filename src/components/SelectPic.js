import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PhotoPickerScreen from "./PhotoPickerScreen";
import { connect } from "react-redux";
import { Overlay } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

SelectPic = ({ navigation, Picture, isVisable, close, profile }) => {
  return (
    <Overlay
      borderRadius={15}
      height={200}
      isVisible={isVisable}
      onBackdropPress={() => close()}
    >
      <View>
        <Text style={{ marginTop: 10, textAlign: "center" }}>
          הוספת תמונת פרופיל
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20
          }}
        >
          <PhotoPickerScreen close={close} click={false} />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("camera", { profile });
              close();
            }}
          >
            <AntDesign name="camerao" size={50} />
          </TouchableOpacity>
        </View>
        <Button
          title={"חזרה"}
          type="clear"
          onPress={close}
          buttonStyle={{ marginTop: 20 }}
        />
      </View>
    </Overlay>
  );
};

const mapStateToProps = state => {
  const { Picture } = state;
  return { Picture };
};

StyleSheet.create({
  overlay: {}
});
export default connect(mapStateToProps, {})(withNavigation(SelectPic));
