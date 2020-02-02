import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Overlay, Text, ButtonGroup, Button } from "react-native-elements";
import { connect } from "react-redux";
import { changeStatus } from "../actions/index";
import moment from "moment";
const agreementStatus = ["accepted", "canceled", "awating"];

const validateDate = (lessonDateDate, id) => {
  let isValid = false;
  lessonDateDate.timeTable.forEach(obj => {
    if (obj.id == id) {
      isValid = true;
      const timeInISo = moment(obj.date, "DD-MM-YYYY").toISOString();
      isValid =
        moment(timeInISo).diff(moment().toISOString(), "m") > 0 ? true : false;
    }
  });

  return isValid;
};

const AgreementPopup = ({
  popUpVisible,
  setPopUpVisible,
  tableId,
  currentSelectedItem,
  changeStatus,
  timeTable
}) => {
  //const [overlayIsVisible, SetOverlayIsVisible] = useState(popUpVisible);
  const [selectedIndex, SetSelectedIndex] = useState(currentSelectedItem);

  return (
    <Overlay
      isVisible={popUpVisible}
      windowBackgroundColor="rgba(255, 255, 255, .5)"
      overlayBackgroundColor="white"
      width={300}
      height={250}
      onBackdropPress={() => setPopUpVisible(false)}
      borderRadius={10}
    >
      <View>
        <Text h4 style={{ textAlign: "center", marginBottom: 37 }}>
          עדכון סטטוס שיעור
        </Text>

        <ButtonGroup
          onPress={index => SetSelectedIndex(index)}
          selectedIndex={selectedIndex}
          buttons={["מאושר", "מבוטל", "ממתין לאישור"]}
          containerStyle={{ height: 100 }}
        />
        <Button
          title="שמירה"
          type="clear"
          onPress={async () => {
            if (!validateDate(timeTable, tableId)) {
              Alert.alert(
                "פעולה לא חוקית",
                "אין אפשרות לשנות שיעור שזמנו עבר",
                [{ text: "OK" }],
                {
                  cancelable: true
                }
              );
              setPopUpVisible(false);
            } else {
              await changeStatus(tableId, agreementStatus[selectedIndex]);
              setPopUpVisible(false);
            }
          }}
        />
      </View>
    </Overlay>
  );
};

const mapStateToProps = state => {
  const { TimeTable: timeTable } = state;
  return { timeTable };
};

// export default AgreementPopup;
export default connect(mapStateToProps, {
  changeStatus
})(AgreementPopup);

// {
//   this.state.visible && (
//     <Overlay isVisible>
//       <Text>Hello from Overlay!</Text>
//     </Overlay>
//   );
// }

// <Overlay
//   isVisible={this.state.isVisible}
//   windowBackgroundColor="rgba(255, 255, 255, .5)"
//   overlayBackgroundColor="red"
//   width="auto"
//   height="auto"
// >
//   <Text>Hello from Overlay!</Text>
// </Overlay>;

// <Overlay
//   isVisible={this.state.isVisible}
//   onBackdropPress={() => this.setState({ isVisible: false })}
// >
//   <Text>Hello from Overlay!</Text>
// </Overlay>;
