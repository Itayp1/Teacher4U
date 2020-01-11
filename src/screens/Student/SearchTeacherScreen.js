import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity
} from "react-native";

//import { Button } from "react-native-elements";
import { Text, Header } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import SearchInput from "../../components/SearchInput";
import cities from "../../../config/cities.json";
import professions from "../../../config/professions.json";
import api from "../../api/api";

const SearchTeacherScreen = ({ navigation }) => {
  const [city, setCity] = useState(0);
  const [profession, setProfession] = useState(0);

  const fetchApi = async () => {
    console.log("fetchApi");
    console.log(city.name, profession.name);
    try {
      const response = await api.get(`/api/searchTeacher`, {
        params: {
          city: city.name,
          course: profession.name
        }
      });

      console.log(response.data);
      navigation.navigate("TeacherList", {
        teachetList: response.data,
        profession
      });
      // setLessonsList(response.data.timeTable);
      //   console.log(response.data.timeTable);
      // console.log(lessonsList);
    } catch (error) {
      console.log("in error");
      console.log(error);
    }
  };

  console.log(profession.name);
  return (
    <View style={styles.container}>
      <Header
        style={styles.Header}
        centerComponent={{
          text: "חיפוש מורה",
          style: styles.HeadercenterComponent
        }}
      />

      <Text style={styles.text}>מקצוע</Text>
      <SearchInput
        title="לחץ כאן לבחירת מקצוע"
        inputText="לחץ כאן לבחירת מקצוע"
        label={profession.name}
        data={professions}
        onSelect={name => {
          console.log("clicked ");
          setProfession(name);
        }}
      />
      <Text style={styles.text}>עיר</Text>
      <SearchInput
        title="לחץ כאן לבחירת אזור"
        inputText="לחץ כאן לבחירת אזור"
        label={city.name}
        data={cities}
        onSelect={name => {
          console.log("clicked ");
          setCity(name);
        }}
      />
      <TouchableOpacity style={styles.button}>
        <Button title="המשך" onPress={() => fetchApi()} />
      </TouchableOpacity>
    </View>
  );
};
SearchTeacherScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D3E8FF",
    flex: 1,
    marginTop: 10
  },
  button: {
    marginTop: 100,
    width: "50%",
    alignSelf: "center"
    // marginLeft: 50,
    // marginRight: 50
  },
  text: {
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10
  },
  searchInput: {
    marginLeft: 100,
    marginRight: 100
  },
  HeadercenterComponent: {
    fontSize: 25,
    color: "white"
  },
  Header: {
    backgroundColor: "#6C8EB1"
  }
});

export default SearchTeacherScreen;
