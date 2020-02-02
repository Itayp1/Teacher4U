import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

const TeacherProfileScreen = ({ navigation, SelectedTeacher }) => {
  const {
    avatar_url,
    name,
    generalDescription,
    courses,
    email,
    avaiablesHours,
    availablesDays,
    profession
  } = SelectedTeacher;
  const TeacherProfile = { name, email, availablesDays, profession };
  const coursesList = courses.reduce((pre, cur) => pre + cur + "-", "-");

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{ uri: avatar_url }} />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.info}>{coursesList}</Text>
          <Text style={styles.description}>{generalDescription}</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("Review", { email })}
          >
            <Text>ביקורות</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              navigation.navigate("Calender", {
                TeacherProfile
              });
            }}
          >
            <Text>קבע שיעור</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  }
});

// export default TeacherProfileScreen;

const mapStateToProps = state => {
  const { SelectedTeacher } = state;

  return { SelectedTeacher };
};

export default connect(mapStateToProps, {})(TeacherProfileScreen);
