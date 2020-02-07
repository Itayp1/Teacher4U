import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import { ListItem, Header, Rating } from "react-native-elements";
import { FontAwesome, Feather } from "@expo/vector-icons";
import api from "../../api/api";
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import { teacherFetch } from "../../actions";

const TeacherReviewScreen = ({ navigation, reviews, ratingAverage }) => {
  const [isvisable, setisvisable] = useState(false);
  return (
    <View style={styles.main}>
      <Spinner
        visible={isvisable}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      <Header
        style={styles.Header}
        centerComponent={{
          text: "ביקורת",
          style: styles.HeadercenterComponent
        }}
      />
      <View style={{ marginBottom: 20 }}>
        <ScrollView>
          {reviews.map((l, i) => (
            <ListItem
              key={i}
              //  leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.studentName}
              subtitle={l.review}
              bottomDivider
            />
          ))}
        </ScrollView>
      </View>
      <Rating
        ratingCount={5}
        imageSize={60}
        readonly
        startingValue={ratingAverage}
      />
    </View>
  );
};

TeacherReviewScreen.navigationOptions = {
  title: "ביקורות",
  tabBarIcon: <Feather name="list" size={20} />
};

const styles = StyleSheet.create({
  main: {
    // marginTop: 10,
    // backgroundColor: "white",
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
  },
  spinnerTextStyle: {
    color: "#FFF"
  }
});

const mapStateToProps = state => {
  const { Rating } = state;

  const { rating } = Rating.reduce(
    (pre, next) => {
      return { rating: +pre.rating + +next.rating };
    },
    { rating: 0 }
  );
  const ratingAverage = rating / Rating.length;
  return { reviews: Rating, ratingAverage };
};

export default connect(mapStateToProps, { teacherFetch })(TeacherReviewScreen);
