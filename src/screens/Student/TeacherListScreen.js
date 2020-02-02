import { ListItem } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, Header, Input } from "react-native-elements";
import { connect } from "react-redux";
import { selectTeacher } from "../../actions/StudentProfile";
const TeacherListScreen = ({
  navigation,
  teacherList,
  profession,
  selectTeacher
}) => {
  // const [teacherList, setTeacherList] = useState([]);
  // const teacherList = navigation.getParam("teachetList");
  // const profession = navigation.getParam("profession");

  return (
    <View style={styles.main}>
      <Header
        style={styles.Header}
        centerComponent={{
          text: "רשימת מורים",
          style: styles.HeadercenterComponent
        }}
      />

      <View>
        {teacherList.map((l, i) => (
          <TouchableOpacity
            onPress={() => {
              l.profession = profession;
              selectTeacher(l);
              navigation.navigate("TeacherProfile");
            }}
            key={i}
          >
            <ListItem
              keyExtractor={item => item.name}
              key={l => l.name}
              //   leftAvatar={{ source: { uri: l.avatar_url } }}
              //   rightIcon={i == "0" ? { name: "cancel" } : null}
              title={l.name}
              subtitle={l.generalDescription}
              bottomDivider
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

TeacherListScreen.navigationOptions = {
  header: null
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

// export default TeacherListScreen;

const mapStateToProps = state => {
  const {
    TeacherList: { teacherList, profession }
  } = state;

  return { teacherList, profession };
};

export default connect(mapStateToProps, { selectTeacher })(TeacherListScreen);
