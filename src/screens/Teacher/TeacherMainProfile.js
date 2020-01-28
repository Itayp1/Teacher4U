import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { teacherFetch } from "../../actions";

import { Card, Icon, Header, Text } from "react-native-elements";

class TeacherMainProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      views: this.props.views,
      ratingAverage: this.props.ratingAverage,
      TimeTable: this.props.TimeTable,
      sumOfLessons: this.props.sumOfLessons
    };
  }

  componentDidMount() {
    this.props.teacherFetch();
  }

  componentDidUpdate() {
    console.log("get new props");
    if (
      this.props.views != this.state.views ||
      this.props.sumOfLessons != this.state.sumOfLessons ||
      this.props.ratingAverage != this.state.ratingAverage
    ) {
      console.log(`${this.props.views} ${this.state.views}`);
      this.setState({
        views: this.props.views,
        sumOfLessons: this.props.sumOfLessons,
        ratingAverage: this.props.ratingAverage,
        name: this.props.name
      });
    }
  }
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
          <Card title="צפיות">
            <Text style={styles.text}>{this.state.views}</Text>
          </Card>
          <Card title="דירוג">
            <Text style={styles.text}>{this.state.ratingAverage}</Text>
          </Card>
        </View>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => {
            this.props.navigation.navigate("TeacherRegistrationProfile", {
              teacherProfile: this.props.Teacher
            });
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
  const { Rating, Teacher, TimeTable } = state;

  const { rating } = Rating.reduce(
    (pre, next) => {
      return { rating: +pre.rating + +next.rating };
    },
    { rating: 0 }
  );
  const ratingAverage = rating.toString();
  const views = Teacher.views || 0;
  const sumOfLessons = TimeTable.timeTable ? TimeTable.timeTable.length : 0;
  const name = Teacher.name;
  return { ratingAverage, views, TimeTable, sumOfLessons, Teacher, name };
};

export default connect(mapStateToProps, {
  teacherFetch
})(TeacherMainProfile);
