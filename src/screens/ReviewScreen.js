import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { ListItem, Header, Rating } from "react-native-elements";
import { FontAwesome, AirbnbRating } from "@expo/vector-icons";

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
  return (
    <View style={styles.main}>
      <Header
        style={styles.Header}
        centerComponent={{
          text: "ביקורת",
          style: styles.HeadercenterComponent
        }}
      />
      <View>
        {list.map((l, i) => (
          <ListItem
            key={i}
            leftAvatar={{ source: { uri: l.avatar_url } }}
            title={l.name}
            subtitle={l.subtitle}
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
        startingValue={2.5}
      />
    </View>
  );
};

ReviewScreen.navigationOptions = {
  title: "מערכת שעות",
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
  }
});

ReviewScreen.navigationOptions = {
  title: "ביקורות",
  tabBarIcon: <FontAwesome name="gear" size={20} />
};

export default ReviewScreen;
