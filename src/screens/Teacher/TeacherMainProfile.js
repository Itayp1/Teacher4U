import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import { Card, Icon, Header, Text } from "react-native-elements";

export default class TeacherMAinProfile extends React.Component {
  render() {
    return (
      <View style={styles.view}>
        <Header
          style={styles.Header}
          centerComponent={{
            text: "פרופיל ",
            style: styles.HeadercenterComponent
          }}
        />
        <View>
          <Text h1 style={{ textAlign: "center" }}>
            איתי פרץ
          </Text>
          <Image style={styles.avatar} source={require("./avatar6.png")} />
        </View>
        <View style={styles.cards}>
          <Card title={`סה"כ שיעורים`}>
            <Text>{"שיעורים"}</Text>
          </Card>
          <Card title="צפיות">
            <Text>{"users.name"}</Text>
          </Card>
          <Card title="דירוג">
            <Text>{"users.name"}</Text>
          </Card>
        </View>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => {
            this.props.navigation.navigate("TeacherRegistrationProfile");
            console.log("clicked");
          }}
        >
          <Icon name="edit" type="feather" color="#00aced" size={50} />
          <Text>עדכון פרטים</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center"
  },
  cards: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    // borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    // position: "absolute",
    marginTop: 60
  },
  HeadercenterComponent: {
    fontSize: 25,
    color: "white"
  }
});
