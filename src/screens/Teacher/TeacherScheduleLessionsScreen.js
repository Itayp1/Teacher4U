import { ListItem } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, Header, Input, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import TimeTableStatus from "../../components/TimeTableStatus";

const TeacherScheduleLessionsScreen = ({ navigation, timeTable }) => {
  return (
    <View style={styles.main}>
      <Header
        style={styles.Header}
        centerComponent={{
          text: "מערכת שעות ",
          style: styles.HeadercenterComponent
        }}
      />

      <View>
        {timeTable.map((l, i) => (
          <View key={i}>
            <ListItem
              key={i}
              //     leftAvatar={{ source: { uri: l.avatar_url } }}
              rightElement={
                <TimeTableStatus status={l.status} tableId={l.id} />
              }
              title={l.name}
              subtitle={`בשעה ${l.time}:00 בתאריך ${l.date}`}
              bottomDivider
            />
          </View>
        ))}
      </View>
    </View>
  );
};

TeacherScheduleLessionsScreen.navigationOptions = {
  title: "מערכת שעות",
  tabBarIcon: <FontAwesome name="calendar" size={20} />
};

const styles = StyleSheet.create({
  main: {
    // marginTop: 10,
    backgroundColor: "#D3E8FF",
    flex: 1
  },
  Header: {
    backgroundColor: "#6C8EB1"
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15
  },
  HeadercenterComponent: {
    fontSize: 25,
    color: "white"
  }
});

const mapStateToProps = state => {
  const {
    TimeTable: { timeTable }
  } = state;
  return { timeTable };
};

export default connect(mapStateToProps, {})(TeacherScheduleLessionsScreen);
