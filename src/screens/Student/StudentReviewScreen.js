import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { ListItem, Header, Rating } from "react-native-elements";
import api from "../../api/api";
import Spinner from "react-native-loading-spinner-overlay";

const ReviewScreen = ({ navigation }) => {
  const [reviewList, setReviewList] = useState([]);
  const [ratingSum, setRatingSum] = useState(0);
  const [isvisable, setisvisable] = useState(true);

  const email = navigation.getParam("email");
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await api.get(`/api/rating/${email}`);

        const { rating } = response.data.reduce(
          (pre, next) => {
            return { rating: +pre.rating + +next.rating };
          },
          { rating: 0 }
        );
        setRatingSum(rating / response.data.length);
        setReviewList(response.data);
        setisvisable(false);
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

      <ScrollView>
        {reviewList.map((l, i) => (
          <ListItem
            key={i}
            // leftAvatar={{ source: { uri: l.avatar_url } }}
            title={l.studentName}
            subtitle={l.review}
            bottomDivider
          />
        ))}
      </ScrollView>
      <Rating
        ratingCount={5}
        imageSize={60}
        readonly
        startingValue={ratingSum}
        style={{ margin: 30 }}
      />
    </View>
  );
};

ReviewScreen.navigationOptions = {
  title: "ביקורות ",
  headerStyle: {
    backgroundColor: "#2E9AFE"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold"
  }
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

export default ReviewScreen;
