import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { studentFetch } from "../../actions";
import Spinner from "react-native-loading-spinner-overlay";
import SignOutIcon from "../../components/SignOutIcon";
import { Card, Icon, Header, Text } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import SelectPic from "../../components/SelectPic";

class StudentMainProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      TimeTable: this.props.TimeTable,
      sumOfLessons: this.props.sumOfLessons,
      pic: this.props.pic,
      visable: false
    };
  }

  componentDidMount() {
    this.props.studentFetch();
  }

  componentDidUpdate() {
    if (
      this.props.sumOfLessons != this.state.sumOfLessons ||
      this.props.pic != this.state.pic
    ) {
      this.setState({
        sumOfLessons: this.props.sumOfLessons,
        name: this.props.name,
        pic: this.props.pic
      });
    }
  }
  render() {
    const srcpic =
      this.props.pic != "" ? (
        <Image style={styles.avatar} source={{ uri: this.props.pic }} />
      ) : (
        <Image style={styles.avatar} source={require("./avatar6.png")} />
      );
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
          <SelectPic
            isVisable={this.state.visable}
            close={() => this.setState({ visable: false })}
          />
          <TouchableOpacity onPress={() => this.setState({ visable: true })}>
            {srcpic}
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
            this.props.navigation.navigate("studnetDetails");
            //   teacherProfile: this.props.Teacher
            // });
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
  const { Student, TimeTable, Picture: pic } = state;

  const sumOfLessons = TimeTable.timeTable ? TimeTable.timeTable.length : 0;
  const name = Student.fullName;
  return { TimeTable, sumOfLessons, Student, name, pic };
};

export default connect(mapStateToProps, {
  studentFetch
})(StudentMainProfile);
