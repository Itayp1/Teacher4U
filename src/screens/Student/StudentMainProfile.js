import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { studentFetch } from "../../actions";
import Spinner from "react-native-loading-spinner-overlay";
import SignOutIcon from "../../components/SignOutIcon";
import { Card, Icon, Header, Text } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

class StudentMainProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      TimeTable: this.props.TimeTable,
      sumOfLessons: this.props.sumOfLessons
    };
  }

  componentDidMount() {
    this.props.studentFetch();
  }

  componentDidUpdate() {
    // console.log("get new props");
    if (this.props.sumOfLessons != this.state.sumOfLessons) {
      // console.log(`${this.props.views} ${this.state.views}`);
      this.setState({
        sumOfLessons: this.props.sumOfLessons,
        name: this.props.name
      });
    }
  }
  render() {
    return (
      <View style={styles.view}>
        <Spinner
          visible={this.props.name == undefined}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <Header
          style={styles.Header}
          centerComponent={{
            text: "פרופיל ",
            style: styles.HeadercenterComponent
          }}
        />
        <View>
          <Text h1 style={{ textAlign: "center", marginTop: 30 }}>
            {this.props.name}
          </Text>
          <TouchableOpacity>
            <Image style={styles.avatar} source={require("./avatar6.png")} />
          </TouchableOpacity>
        </View>
        <View style={styles.cards}>
          <Card title={`סה"כ שיעורים`}>
            <Text style={styles.text}>{this.state.sumOfLessons}</Text>
          </Card>
        </View>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => {
            // this.props.navigation.navigate("TeacherRegistrationProfile", {
            //   teacherProfile: this.props.Teacher
            // });
            // console.log("clicked");
          }}
        >
          <Icon name="edit" type="feather" color="#00aced" size={50} />
          <Text>עדכון פרטים</Text>
        </TouchableOpacity>
        <SignOutIcon />
      </View>
    );
  }
}
StudentMainProfile.navigationOptions = {
  title: "פרופיל",
  tabBarIcon: <AntDesign name="profile" size={20} />
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
  const { Student, TimeTable } = state;

  const sumOfLessons = TimeTable.timeTable ? TimeTable.timeTable.length : 0;
  const name = Student.name;
  return { TimeTable, sumOfLessons, Student, name };
};

export default connect(mapStateToProps, {
  studentFetch
})(StudentMainProfile);
