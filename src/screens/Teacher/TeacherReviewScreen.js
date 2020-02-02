import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { ListItem, Header, Rating } from "react-native-elements";
import { FontAwesome, AirbnbRating } from "@expo/vector-icons";
import api from "../../api/api";
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import { teacherFetch } from "../../actions";

const TeacherReviewScreen = ({ navigation, reviews, ratingAverage }) => {
  const [ratingSum, setRatingSum] = useState(0);
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
      <View>
        {reviews.map((l, i) => (
          <ListItem
            key={i}
            //  leftAvatar={{ source: { uri: l.avatar_url } }}
            title={l.studentName}
            subtitle={l.review}
            bottomDivider
          />
        ))}
      </View>
      <Rating
        ratingCount={5}
        imageSize={60}
        showRating
        ratingBackgroundColor="#D3E8FF"
        readonly
        startingValue={ratingAverage}
      />
    </View>
  );
};

TeacherReviewScreen.navigationOptions = {
  title: "ביקורות",
  tabBarIcon: <FontAwesome name="star" size={20} />
};

const styles = StyleSheet.create({
  main: {
    // marginTop: 10,
    backgroundColor: "#D3E8FF",
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

TeacherReviewScreen.navigationOptions = {
  title: "ביקורות",
  tabBarIcon: <FontAwesome name="gear" size={20} />
};

const mapStateToProps = state => {
  const { Rating } = state;

  const { rating } = Rating.reduce(
    (pre, next) => {
      return { rating: +pre.rating + +next.rating };
    },
    { rating: 0 }
  );
  const ratingAverage = rating;
  return { reviews: Rating, ratingAverage };
};

export default connect(mapStateToProps, { teacherFetch })(TeacherReviewScreen);
