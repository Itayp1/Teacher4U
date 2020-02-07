import React, { Component, useContext } from "react";
import { Button } from "react-native-elements";
import cities from "../../../config/cities.json";
import moment from "moment";
import MultiSelect from "../../components/MultiSelect";
import FormSearchInput from "../../components/FormSearchInput";
import { StyleSheet, Alert, Text } from "react-native";
import { Container, Form, Content, Picker, Label, View } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import loginApi from "../../api/api";
import { connect } from "react-redux";
import { studentUpdate } from "../../actions";
import Spinner from "react-native-loading-spinner-overlay";
import { AsyncStorage } from "react-native";
import FormValidation from "../../hooks/StudentFormsValidation";
class StudentRegistrationScreenNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      fullname: this.props.fullName || "שם מלא",
      phone: this.props.phone || "",
      gender: this.props.gender || "זכר",
      city: this.props.city || "",
      cityisVisible: false,
      datePickerTitle: this.props.age || "תאריך לידה",
      DateTimePickerVisable: false,
      DateTimePicker: this.props.age || "",
      inputValidationError: ""
    };
  }

  printDetails = async (obj, access_token) => {
    try {
      this.setState({ spinner: true });
      response = await loginApi.post("/api/registration/student", obj, {
        headers: {
          Platform: "google",
          access_token: access_token
        }
      });

      await AsyncStorage.setItem("token", response.data.jwt);
      this.setState({ spinner: false });

      this.props.navigation.navigate("StudentMenu");
    } catch (error) {
      console.log(error);
    }
  };

  updateDetails = async obj => {
    try {
      this.setState({ spinner: true });

      const response = await loginApi.put("/api/information/student", obj);
      this.setState({ spinner: false });
      this.props.studentUpdate(obj);
      this.props.navigation.pop(1);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container style={styles.main}>
        <Content>
          <Spinner
            visible={this.state.spinner}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
          />
          <Form style={styles.title}>
            <FormSearchInput
              title={"שם מלא"}
              input={"שם מלא"}
              initializeValue={this.state.fullname}
              validationType={"text"}
              inputValue={input => {
                this.setState({ fullname: input });
              }}
            />
            <FormSearchInput
              title={"מס טלפון"}
              input={"מס טלפון"}
              initializeValue={this.state.phone}
              validationType={"phoneNumber"}
              inputValue={input => {
                this.setState({ phone: input });
              }}
            />

            <View style={styles.elementSpaces}>
              <Label>מין</Label>
              <Picker
                selectedValue={this.state.gender}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ gender: itemValue })
                }
                style={{
                  borderColor: "black",
                  borderWidth: 1
                }}
              >
                <Picker.Item label="זכר" value="זכר" />
                <Picker.Item label="נקבה" value="נקבה" />
              </Picker>
            </View>

            <View style={styles.elementSpaces}>
              <DateTimePickerModal
                isVisible={this.state.DateTimePickerVisable}
                mode="date"
                onConfirm={res => {
                  const date = new Date(res);
                  this.setState({ DateTimePickerVisable: false });
                  this.setState({
                    datePickerTitle: moment(date).format("DD/MM/YYYY")
                  });
                }}
                onCancel={() => {}}
              />
              <Button
                style={{ borderRadius: 100 }}
                title={this.state.datePickerTitle}
                onPress={() => {
                  this.setState({ DateTimePickerVisable: true });
                }}
              />
            </View>
            <View style={styles.elementSpaces}>
              <Button
                //    style={{ top: 200 }}
                title="עיר"
                onPress={() => this.setState({ cityisVisible: true })}
              />
              <MultiSelect
                isVisible={this.state.cityisVisible}
                setIsVisible={() => this.setState({ cityisVisible: false })}
                list={cities}
                selectedItems={selected => {
                  this.setState({ city: selected });
                }}
                initializeValue={this.state.city}
                showList={true}
                singleSelect={true}
              />
            </View>

            <Button
              title="שמור"
              buttonStyle={{ marginTop: 5 }}
              onPress={() => {
                const obj = {
                  fullName: this.state.fullname,
                  phone: this.state.phone,
                  city: this.state.city,
                  gender: this.state.gender,
                  age: this.state.datePickerTitle,
                  pic: "",
                  profile: "student"
                };

                if (
                  FormValidation(
                    obj.fullName,
                    obj.phone,
                    obj.city,
                    obj.datePickerTitle
                  )
                ) {
                  Alert.alert("שיאה בנתונים ", "יש לתקן את השדות עם השגיאות");
                } else if (!this.props.fullName) {
                  this.printDetails(
                    obj,
                    this.props.navigation.getParam("access_token")
                  );
                } else {
                  console.log("this.state.inputValidationError");

                  console.log(this.state.inputValidationError);
                  this.updateDetails(obj);
                }
              }}
            />
          </Form>
        </Content>
      </Container>
    );
  }
}
StudentRegistrationScreenNew.navigationOptions = {
  title: "עדכון פרטים ",
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
    marginTop: 30,
    backgroundColor: "#D3E8FF",
    flex: 1
  },
  elementSpaces: {
    marginTop: 5
  },
  title: {
    marginRight: 20,
    marginLeft: 20
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#ddd"
  },
  spinnerTextStyle: {
    color: "#FFF"
  }
});

const mapStateToProps = state => {
  const {
    Student: { age, city, fullName, gender, phone, profile }
  } = state;

  return { age, city, fullName, gender, phone, profile };
};

export default connect(mapStateToProps, {
  studentUpdate
})(StudentRegistrationScreenNew);
