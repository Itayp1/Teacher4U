const users = [
  {
    name: "brynn",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
  }
];

import { View, Text, Image, Div } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";

// implemented without image with header
export default Cards = () => {
  return (
    <Div>
      <Card title="CARD WITH DIVIDER">
        {users.map((u, i) => {
          return (
            <View key={i} style={styles.user}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: u.avatar }}
              />
              <Text style={styles.name}>{u.name}</Text>
            </View>
          );
        })}
      </Card>
      // implemented without image without header, using ListItem component
      <Card containerStyle={{ padding: 0 }}>
        {users.map((u, i) => {
          return (
            <ListItem
              key={i}
              roundAvatar
              title={u.name}
              avatar={{ uri: u.avatar }}
            />
          );
        })}
      </Card>
      // implemented with Text and Button as children
      <Card title="HELLO WORLD">
        <Text style={{ marginBottom: 10 }}>
          The idea with React Native Elements is more about component structure
          than actual design.
        </Text>
        <Button
          icon={<Icon name="code" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="VIEW NOW"
        />
      </Card>
    </Div>
  );
};
