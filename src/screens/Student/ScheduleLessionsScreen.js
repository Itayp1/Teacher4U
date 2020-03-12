import { ListItem } from "react-native-elements";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";
import { Text, Header, Input } from "react-native-elements";
import api from "../../api/api";
import { connect } from "react-redux";
import TimeTableStatus from "../../components/TimeTableStatus";
import AddReview from "../../components/addReview";
import { Feather } from "@expo/vector-icons";
import { studentFetch } from "../../actions";
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
class ScheduleLessionsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timeTable: this.props.timeTable, refreshing: false };
  }

  onRefresh = () => {
    React.useCallback(() => {
      this.setState({ refreshing: true });
      this.state.studentFetch();
      wait(1000).then(() => this.setState({ refreshing: false }));
    }, [this.state.refreshing]);
  };
  componentDidUpdate(prevProps) {
    if (this.props.timeTable.length != prevProps.timeTable.length) {
      this.setState({ timeTable: this.props.timeTable });
    }
  }
  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.state.onRefresh}
          />
        }
      >
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
                      <>
                        <AddReview
                          hasReview={l.hasReview}
                          tableId={l.id}
                          teacherEmail={l.email}
                          studentName={l.studentName}
                          cource={l.cource}
                        />
                        <TimeTableStatus
                          status={l.status}
                          tableId={l.id}
                          edit={false}
                        />
                      </>
                    }
                    title={(l.name || l.teacherName) + "   " + `${l.cource}`}
                    subtitle={`בשעה ${l.time}:00 בתאריך ${l.date}`}
                    bottomDivider
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
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
    backgroundColor: "white",
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
