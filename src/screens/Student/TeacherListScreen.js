import { ListItem } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { Text, Header, Input } from "react-native-elements";
import { connect } from "react-redux";
import { selectTeacher } from "../../actions/StudentProfile";

const notExist = navigation => {
  navigation.goBack();
  Alert.alert("חיפוש מורים", "לא נמצאו תוצאות");
};
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
      {teacherList.length == 0 ? notExist(navigation) : null}

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
              keyExtractor={item => item.fullName}
              key={l => l.name}
              leftAvatar={{
                source: { uri: l.pic || "https://i.imgur.com/XlQzxuT.png" }
              }}
              //   rightIcon={i == "0" ? { name: "cancel" } : null}
              title={l.fullName}
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

// export default TeacherListScreen;

const mapStateToProps = state => {
  const {
    TeacherList: { teacherList, profession }
  } = state;

  return { teacherList, profession };
};

export default connect(mapStateToProps, { selectTeacher })(TeacherListScreen);
