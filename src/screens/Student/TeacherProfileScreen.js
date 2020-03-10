import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { getReviews, selectTeacher } from "./../../actions/";
import { Button, Card, Text, Divider } from "react-native-elements";
import { Feather } from "@expo/vector-icons";

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
      phone,
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
      phone,
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
      <Image
        style={styles.avatar}
        source={require("../../../icons/Student_transperncy_.png")}
      />
    );
  };
  render() {
    return (
      <View style={styles.view}>
        <Text h1 style={{ textAlign: "center" }}>
          {this.state.fullName}
        </Text>
        {this.srcpic()}
        <Text h4 style={styles.text}>
          {"מוסד לימודים : " + this.state.university}
        </Text>

        <View style={styles.cards}>
          <Button
            title="קבע שיעור"
            type="outline"
            containerStyle={{ margin: 15, width: 150 }}
            onPress={() => {
              this.props.navigation.navigate("Calender");
            }}
          />
          <Button
            containerStyle={{ margin: 15, width: 150 }}
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

        <View style={styles.cards}>
          <Card title={`שיעור בבית התלמיד`}>
            <Text style={styles.text}>{this.state.price + " ₪"}</Text>
          </Card>
          <Card title="שיעור בבית המורה">
            <Text style={styles.text}>{this.state.priceAtStudent + " ₪"}</Text>
          </Card>
        </View>
        <TouchableOpacity
          style={{ marginTop: 30 }}
          onPress={() => {
            Linking.openURL(`tel:${this.state.phone}`);
          }}
        >
          <Feather name="phone-call" size={50} />
          <Text>צור קשר</Text>
        </TouchableOpacity>
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
    resizeMode: "contain",
    // position: "absolute",
    marginTop: 10
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
