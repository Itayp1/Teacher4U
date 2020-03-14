import { ListItem } from "react-native-elements";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView
} from "react-native";
import { Text, Header, Input, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import TimeTableStatus from "../../components/TimeTableStatus";
import { teacherFetch } from "../../actions";
import Constants from "expo-constants";
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const TeacherScheduleLessionsScreen = ({
  navigation,
  timeTable,
  teacherFetch
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    teacherFetch();
    wait(1000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <View style={styles.main}>
      <Header
        style={styles.Header}
        centerComponent={{
          text: "מערכת שעות ",
          style: styles.HeadercenterComponent
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          {timeTable.map((l, i) => (
            <View key={i}>
              <ListItem
                key={i}
                //     leftAvatar={{ source: { uri: l.avatar_url } }}
                rightElement={
                  <TimeTableStatus status={l.status} tableId={l.id} />
                }
                title={l.name + "   " + `${l.cource}`}
                subtitle={`בשעה ${l.time}:00 בתאריך ${l.date}`}
                bottomDivider
              />
            </View>
          ))}
        </View>
      </ScrollView>
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
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  scrollView: {
    flex: 1,
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  const {
    TimeTable: { timeTable }
  } = state;
  return { timeTable };
};

export default connect(mapStateToProps, { teacherFetch })(
  TeacherScheduleLessionsScreen
);
