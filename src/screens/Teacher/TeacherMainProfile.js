import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { teacherFetch } from "../../actions";
import Spinner from "react-native-loading-spinner-overlay";
import SignOutIcon from "../../components/SignOutIcon";
import { Card, Icon, Header, Text } from "react-native-elements";
import SelectPic from "../../components/SelectPic";
import Constants from "expo-constants";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
class TeacherMainProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: this.props.fullName,
      views: this.props.views,
      ratingAverage: this.props.ratingAverage,
      TimeTable: this.props.TimeTable,
      sumOfLessons: this.props.sumOfLessons,
      visable: false,
      pic: this.props.pic,
      refreshing: false
    };
  }

  onRefresh = () => {
    React.useCallback(() => {
      this.setState({ refreshing: true });
      this.state.teacherFetch();
      wait(1000).then(() => this.setState({ refreshing: false }));
    }, [this.state.refreshing]);
  };

  componentDidMount() {
    this.props.teacherFetch();
  }

  componentDidUpdate() {
    if (
      this.props.views != this.state.views ||
      this.props.sumOfLessons != this.state.sumOfLessons ||
      this.props.ratingAverage != this.state.ratingAverage ||
      this.props.ratingAverage != this.state.ratingAverage ||
      this.props.pic != this.state.pic
    ) {
      this.setState({
        views: this.props.views,
        sumOfLessons: this.props.sumOfLessons,
        ratingAverage: this.props.ratingAverage,
        fullName: this.props.fullName,
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
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.state.onRefresh}
          />
        }
      >
        <View style={styles.view}>
          <Spinner
            visible={this.props.fullName == undefined}
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
            <Text h1 style={{ textAlign: "center", marginTop: 10 }}>
              {this.props.fullName}
            </Text>
            <SelectPic
              isVisable={this.state.visable}
              profile="teacher"
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
            }}
          >
            <Icon name="edit" type="feather" color="#00aced" size={50} />
            <Text>עדכון פרטים</Text>
          </TouchableOpacity>
          <SignOutIcon />
        </View>
      </ScrollView>
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
    alignSelf: "center"
    // position: "absolute",
  },
  HeadercenterComponent: {
    fontSize: 25,
    color: "white"
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingTop: 40
  },
  scrollView: {
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  const { Rating, Teacher, TimeTable, Picture: pic } = state;

  const { rating } = Rating.reduce(
    (pre, next) => {
      return { rating: +pre.rating + +next.rating };
    },
    { rating: 0 }
  );

  const ratingAverage =
    rating == 0 ? "0" : parseInt(rating / Rating.length).toString();
  const views = Teacher.views || 0;
  const sumOfLessons = TimeTable.timeTable ? TimeTable.timeTable.length : 0;
  const { fullName } = Teacher;

  return {
    ratingAverage,
    views,
    TimeTable,
    sumOfLessons,
    Teacher,
    fullName,
    pic
  };
};

export default connect(mapStateToProps, {
  teacherFetch
})(TeacherMainProfile);
