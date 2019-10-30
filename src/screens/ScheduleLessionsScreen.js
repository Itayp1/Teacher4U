import { ListItem } from "react-native-elements";
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Header, Input } from "react-native-elements";

import { FontAwesome } from "@expo/vector-icons";
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

const SearchTeacherScreen = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <Header
        style={styles.Header}
        centerComponent={{
          text: "מערכת שעות ",
          style: styles.HeadercenterComponent
        }}
      />

      <View>
        {list.map((l, i) => (
          <ListItem
            key={i}
            leftAvatar={{ source: { uri: l.avatar_url } }}
            rightIcon={i == "0" ? { name: "cancel" } : null}
            title={l.name}
            subtitle={l.subtitle}
            bottomDivider
          />
        ))}
      </View>
    </View>
  );
};

SearchTeacherScreen.navigationOptions = {
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

export default SearchTeacherScreen;
