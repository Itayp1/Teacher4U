const users = [
  {
    name: "brynn",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
  }
];
import React from "react";
import { View, Text, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";

// implemented without image with header
export default card = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row"
        }}
      >
        <Card title="שיעורים">
          <Text>{"שיעורים"}</Text>
        </Card>
        <Card title="צפיות">
          <Text>{"users.name"}</Text>
        </Card>
        <Card title="דירוג">
          <Text>{"users.name"}</Text>
        </Card>
      </View>
    </View>
  );
};
