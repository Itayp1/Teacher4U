import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getReviews, selectTeacher } from "./../../actions/";
import { Button, Header, Text } from "react-native-elements";

class TeacherProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    const {
      fullName,
      email,
      courses,
      generalDescription,
      university,
      priceAtStudent,
      price,
      pic
    } = this.props.SelectedTeacher;
    this.state = {
      fullName,
      email,
      courses,
      generalDescription,
      university,
      priceAtStudent,
      price,
      pic
    };
  }
  srcpic = () => {
    return this.props.SelectedTeacher.pic != "" ? (
      <Image
        style={styles.avatar}
        source={{ uri: this.props.SelectedTeacher.pic }}
      />
    ) : (
      <Image style={styles.avatar} source={require("./avatar6.png")} />
    );
  };
  render() {
    return (
      <View style={styles.view}>
        <View>
          <Text h1 style={{ textAlign: "center", marginTop: 10 }}>
            {this.state.fullName}
          </Text>
          {this.srcpic()}

          <Button
            title="קבע שיעור"
            type="outline"
            containerStyle={{ margin: 40 }}
            onPress={() => {
              this.props.navigation.navigate("Calender");
            }}
          />

          <Button
            title="הצג ביקורות"
            type="outline"
            onPress={() => {
              this.props.getReviews(this.state.email);
              this.props.navigation.navigate("StudentReview", {
                email: this.state.email
              });
            }}
          />
        </View>
      </View>
    );
  }
}

TeacherProfileScreen.navigationOptions = {
  title: "פרופיל",
  headerStyle: {
    backgroundColor: "#2E9AFE"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold"
  }
};
const styles = StyleSheet.create({
  view: {
    alignItems: "center"
  },
  text: {
    textAlign: "center"
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
    marginTop: 35
  },
  HeadercenterComponent: {
    fontSize: 25,
    color: "white"
  }
});

const mapStateToProps = state => {
  const { SelectedTeacher } = state;
  return { SelectedTeacher };
};

export default connect(mapStateToProps, { getReviews })(TeacherProfileScreen);
