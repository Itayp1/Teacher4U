import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";

export default MultiSelect = ({ list }) => {
  return (
    <View style={styles.container}>
      {Array.isArray(list) ? (
        <FlatList
          horizontal
          data={list}
          keyExtractor={(result, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  margin: 5,
                  backgroundColor: "#F0EEEE",
                  borderRadius: 10
                }}
              >
                <Text style={{ fontSize: 15 }}> {item}</Text>
              </View>
            );
          }}
        />
      ) : (
        <View
          style={{
            margin: 5,
            backgroundColor: "#F0EEEE",
            borderRadius: 10
          }}
        >
          <Text style={{ fontSize: 15 }}> {list}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    alignItems: "center"
  }
});
