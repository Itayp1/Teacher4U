import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import AgreementPopup from "./AgreementPopup";

const iconPerStatus = (status, tableId) => {
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [currnetStatus, setCurrnetStatus] = useState(status);

  let statusIcon;
  switch (status) {
    case "awating":
      statusIcon = (
        <TouchableOpacity
          onPress={() => {
            setPopUpVisible(true);
          }}
        >
          <AgreementPopup
            popUpVisible={popUpVisible}
            setPopUpVisible={setPopUpVisible}
            currentSelectedItem={2}
            tableId={tableId}
          />
          <Text>ממתין לאישור</Text>
          <Icon name="loader" type="feather" color="#00aced" size={30} />
        </TouchableOpacity>
      );
      break;
    case "accepted":
      statusIcon = (
        <TouchableOpacity
          onPress={() => {
            setPopUpVisible(true);
          }}
        >
          <AgreementPopup
            popUpVisible={popUpVisible}
            setPopUpVisible={setPopUpVisible}
            currentSelectedItem={0}
            tableId={tableId}
          />
          <Icon name="check" type="feather" color="#00aced" size={30} />
        </TouchableOpacity>
      );
      break;
    case "canceled":
      statusIcon = (
        <TouchableOpacity
          onPress={() => {
            setPopUpVisible(true);
          }}
        >
          <AgreementPopup
            popUpVisible={popUpVisible}
            setPopUpVisible={setPopUpVisible}
            currentSelectedItem={1}
            tableId={tableId}
          />
          <Icon name="cancel" type="MaterialIcons" color="red" size={30} />
        </TouchableOpacity>
      );

      break;
    default:
      break;
  }
  return statusIcon;
};
const TimeTableStatus = ({ status, tableId }) => {
  return <View>{iconPerStatus(status, tableId)}</View>;
};

const styles = StyleSheet.create({});

export default TimeTableStatus;
