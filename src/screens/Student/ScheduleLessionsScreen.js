import { ListItem } from "react-native-elements";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Text, Header, Input } from "react-native-elements";
import api from "../../api/api";
import { connect } from "react-redux";
import TimeTableStatus from "../../components/TimeTableStatus";

import { Feather } from "@expo/vector-icons";
import { render } from "react-dom";

class ScheduleLessionsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timeTable: this.props.timeTable };
  }
  componentDidUpdate(prevProps) {
    if (this.props.timeTable.length != prevProps.timeTable.length) {
      this.setState({ timeTable: this.props.timeTable });
    }
  }
  render() {
    return (
      <View style={styles.main}>
        <Header
          style={styles.Header}
          centerComponent={{
            text: "מערכת שעות ",
            style: styles.HeadercenterComponent
          }}
        />
        <ScrollView>
          <View>
            {this.state.timeTable.map((l, i) => (
              <TouchableOpacity key={i}>
                <ListItem
                  key={i}
                  //     leftAvatar={{ source: { uri: l.avatar_url } }}
                  rightElement={
                    <TimeTableStatus status={l.status} tableId={l.id} />
                  }
                  title={l.name || l.teacherName}
                  subtitle={`בשעה ${l.time}:00 בתאריך ${l.date}`}
                  bottomDivider
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

ScheduleLessionsScreen.navigationOptions = {
  title: "מערכת שעות",
  tabBarIcon: <Feather name="list" size={20} />
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

// export default ScheduleLessionsScreen;

const mapStateToProps = state => {
  const {
    TimeTable: { timeTable }
  } = state;

  return { timeTable };
};

export default connect(mapStateToProps, {})(ScheduleLessionsScreen);
