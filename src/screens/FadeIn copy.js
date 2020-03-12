import React, { useState, useEffect } from "react";
import { Animated, StyleSheet, View, Image } from "react-native";

const FadeInView = props => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [fadeAnim2] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(0),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 3000
        })
      ]),
      {
        iterations: 10
      }
    ).start();
  }, []);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim // Bind opacity to animated value
      }}
    >
      <Image style={styles.image} source={require("../../icons/logo.png")} />
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <FadeInView style={styles.main}>
      <Image style={styles.image} source={require("../../icons/logo.png")} />
    </FadeInView>
  );
};
const styles = StyleSheet.create({
  main: { flex: 1, marginBottom: 40, alignItems: "center" },
  image: { width: 350, height: 350, resizeMode: "contain" }
});
