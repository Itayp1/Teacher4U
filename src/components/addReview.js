import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { Overlay, AirbnbRating, Text } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { Rating } from "react-native-ratings";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { addStudentReview } from "../actions/index";
addReview = ({
  tableId,
  hasReview,
  teacherEmail,
  addStudentReview,
  studentName
}) => {
  const [isVisible, SetisVisible] = useState(false);
  const [textInput, setTextInput] = useState("יש לרשום כאן ביקורת");
  const [rating, setRating] = useState(5);
  const [spinerVisable, SetspinerVisable] = useState(false);

  const ratingCompleted = rate => {
    console.log("Rating is: " + rating);
    setRating(rate);
  };
  if (hasReview) {
    return <View></View>;
  }
  return (
    <TouchableOpacity
      style={{ marginRight: 10, bottom: 5 }}
      onPress={() => SetisVisible(true)}
    >
      <Spinner
        visible={spinerVisable}
        textContent={"Saving Picture..."}
        textStyle={styles.spinnerTextStyle}
      />
      <Text>הוספת ביקורת</Text>
      <View style={{ right: 30 }}>
        <FontAwesome name="star" size={20} />
      </View>
      <Overlay
        borderRadius={15}
        height={300}
        isVisible={isVisible}
        onBackdropPress={() => SetisVisible(false)}
      >
        <View>
          <AirbnbRating
            count={5}
            reviews={["גרוע", "חובבן", "בסדר", "טוב", "מצויין"]}
            defaultRating={5}
            size={40}
            onFinishRating={ratingCompleted}
          />
          <Text
            h4
            h4Style={{ textAlign: "center", marginBottom: 20, marginTop: 20 }}
          >
            רשום מטה את הביקורת
          </Text>

          <TextInput
            editable
            maxLength={60}
            style={{
              textAlign: "right",
              height: 60,
              borderColor: "gray",
              borderWidth: 1
            }}
            multiline
            numberOfLines={4}
            onChangeText={text => {
              setTextInput(text);
            }}
            value={textInput}
          />
          <Button
            title={"שמור"}
            type="clear"
            onPress={async () => {
              SetspinerVisable(true);
              await addStudentReview(
                rating,
                textInput,
                tableId,
                teacherEmail,
                studentName
              );
              SetisVisible(false);
              SetspinerVisable(false);
              Alert.alert("דירוג ", "הדירוג התווסף בהצלחה");
            }}
            buttonStyle={{ marginTop: 20 }}
          />
        </View>
      </Overlay>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF"
  }
});
const mapStateToProps = state => state;

StyleSheet.create({});
export default connect(mapStateToProps, { addStudentReview })(
  withNavigation(addReview)
);
