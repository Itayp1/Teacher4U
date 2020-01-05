import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { ListItem, Header, Rating } from "react-native-elements";
import { FontAwesome, AirbnbRating } from "@expo/vector-icons";
import api from "../api/api";
import Spinner from "react-native-loading-spinner-overlay";

const list = [
  {
    name: "דריו בורזיו",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "בשעה 10:10 בתאריך 25.10.2019"
  },
  {
    name: "ליאור לביא",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "בשעה 10:10 בתאריך 25.10.2019"
  }
];

const ReviewScreen = ({ navigation }) => {
  const [reviewList, setReviewList] = useState([]);
  const [ratingSum, setRatingSum] = useState(0);
  const [isvisable, setisvisable] = useState(true);

  const email = navigation.getParam("email");
  console.log(email);
  useEffect(() => {
    console.log("start ReviewScreen");
    const fetchApi = async () => {
      console.log("in use effect");

      try {
        const response = await api.get(`/api/rating/${email}`);
        console.log(response.data);

        const { rating } = response.data.reduce(
          (pre, next) => {
            return { rating: +pre.rating + +next.rating };
          },
          { rating: 0 }
        );
        console.log(rating);
        setRatingSum(rating / response.data.length);
        setReviewList(response.data);
        setisvisable(false);
        //   console.log(response.data.timeTable);
      } catch (error) {
        console.log("in error");
        console.log(error);
      }
    };
    fetchApi();
  }, []);

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
        {reviewList.map((l, i) => (
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
        startingValue={ratingSum}
      />
    </View>
  );
};

ReviewScreen.navigationOptions = {
  title: "ביקורות",
  tabBarIcon: <FontAwesome name="gear" size={20} />
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

ReviewScreen.navigationOptions = {
  title: "ביקורות",
  tabBarIcon: <FontAwesome name="gear" size={20} />
};

export default ReviewScreen;
