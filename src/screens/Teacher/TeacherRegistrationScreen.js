import React, { Component, useContext } from "react";
import { Button } from "react-native-elements";
import cities from "../../../config/cities.json";
import listOfcources from "../../../config/professions.json";
import days from "../../../config/days.json";
import moment from "moment";
import MultiSelect from "../../components/MultiSelect";
import FormSearchInput from "../../components/FormSearchInput";
import { StyleSheet, TextInput, Text } from "react-native";
import { Container, Form, Content, Picker, Label, View } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import loginApi from "../../api/api";
import { connect } from "react-redux";
import { teacherFetch } from "../../actions";
import Spinner from "react-native-loading-spinner-overlay";

function UselessTextInput(props) {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}

class FormExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      fullname: this.props.Teacher.name || "eee",
      phone: this.props.Teacher.phone || "",
      priceAtStudent: this.props.Teacher.priceAtStudent || "",
      price: this.props.Teacher.price || "",
      gender: this.props.Teacher.gender || "זכר",
      city: this.props.Teacher.city || "",
      cityisVisible: false,
      courses: this.props.Teacher.courses || [],
      coursesisVisible: false,
      studyCities: this.props.Teacher.studyCities || [],
      studyCitiesVisable: false,
      university:
        this.props.Teacher.university || "שם המוסד בו למדה או השגלה רלוונטית",
      generalDescription: this.props.Teacher.generalDescription || "",
      priceValidation: false,
      availablesDays: this.props.Teacher.availablesDays || [],
      availablesDaysIsVisiable: false,
      avaiablesHours: this.props.Teacher.avaiablesHours || [],
      avaiablesHoursisVisible: false,
      datePickerTitle: this.props.Teacher.age || "תאריך לידה",
      DateTimePickerVisable: false,
      DateTimePicker: this.props.age || ""
    };
  }

  printDetails = async (obj, access_token) => {
    try {
      this.setState({ spinner: true });
      response = await loginApi.post("/api/registration/teacher", obj, {
        headers: {
          Platform: "google",
          access_token: access_token
        }
      });

      await AsyncStorage.setItem("token", response.data.jwt);
      this.setState({ spinner: false });

      this.props.navigation.navigate("TeacherMenu");
    } catch (error) {
      console.log(error);
    }
  };

  updateDetails = async obj => {
    try {
      this.setState({ spinner: true });

      const response = await loginApi.put(
        "/api/information/update/teacher",
        obj
      );
      this.setState({ spinner: false });
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
            <FormSearchInput
              title={"מחיר אצל מורה"}
              input={"מחיר"}
              initializeValue={this.state.price.toString()}
              validationType={"number"}
              inputValue={input => {
                this.setState({ price: input });
              }}
            />
            <FormSearchInput
              title={"מחיר אצל סטודנט"}
              input={"מחיר"}
              initializeValue={this.state.priceAtStudent.toString()}
              validationType={"number"}
              inputValue={input => {
                this.setState({ priceAtStudent: input });
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
            <FormSearchInput
              title={"מוסד /  השכלה"}
              input={this.state.university}
              validationType={"text"}
              inputValue={input => {
                this.setState({ university: input });
              }}
            />
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
            <View style={styles.elementSpaces}>
              <Button
                //    style={{ top: 200 }}
                title="ערי לימוד"
                onPress={() => this.setState({ studyCitiesVisable: true })}
              />

              <MultiSelect
                isVisible={this.state.studyCitiesVisable}
                setIsVisible={() =>
                  this.setState({ studyCitiesVisable: false })
                }
                initializeValue={this.state.studyCities}
                list={cities}
                selectedItems={selected =>
                  this.setState({ studyCities: selected })
                }
                showList={true}
              />
            </View>
            <View style={styles.elementSpaces}>
              <Button
                //          style={{ top: 200 }}
                title="מקצועות לימוד"
                onPress={() => this.setState({ coursesisVisible: true })}
              />

              <MultiSelect
                isVisible={this.state.coursesisVisible}
                setIsVisible={() => this.setState({ coursesisVisible: false })}
                initializeValue={this.state.courses}
                list={listOfcources}
                selectedItems={selected => this.setState({ courses: selected })}
                showList={true}
              />
            </View>
            <View style={styles.elementSpaces}>
              <Button
                title="ימים פנויים בשבוע ללימוד"
                onPress={() =>
                  this.setState({ availablesDaysIsVisiable: true })
                }
              />

              <MultiSelect
                isVisible={this.state.availablesDaysIsVisiable}
                setIsVisible={() =>
                  this.setState({ availablesDaysIsVisiable: false })
                }
                initializeValue={this.state.availablesDays}
                list={days}
                selectedItems={selected =>
                  this.setState({ availablesDays: selected })
                }
                showList={true}
              />
            </View>
            <View style={styles.elementSpaces}>
              <Button
                title="שעות פעילות"
                onPress={() => this.setState({ avaiablesHoursisVisible: true })}
              />

              <MultiSelect
                isVisible={this.state.avaiablesHoursisVisible}
                setIsVisible={() =>
                  this.setState({ avaiablesHoursisVisible: false })
                }
                initializeValue={this.state.avaiablesHours}
                list={Array.from(Array(24).keys()).map(day => {
                  return {
                    name: day.toString(),
                    id: day.toString()
                  };
                })}
                selectedItems={selected =>
                  this.setState({ avaiablesHours: selected })
                }
                showList={true}
              />
            </View>
            <View style={styles.elementSpaces}>
              <Text>יש להכניס תיאור קצר</Text>
              <View
                style={{
                  backgroundColor: "white",
                  marginTop: 5,
                  borderBottomColor: "#000000",
                  borderWidth: 1
                }}
              >
                <UselessTextInput
                  multiline
                  numberOfLines={4}
                  onChangeText={text => {
                    this.setState({ generalDescription: text });
                  }}
                  value={this.state.generalDescription}
                />
              </View>
            </View>
            <Button
              title="שמור"
              style={{ size: 15 }}
              onPress={() => {
                const obj = {
                  fullName: this.state.fullname,
                  phone: this.state.phone,
                  priceAtStudent: this.state.priceAtStudent,
                  price: this.state.price,
                  gender: this.state.gender,
                  city: this.state.city,
                  courses: this.state.courses,
                  studyCities: this.state.studyCities,
                  university: this.state.university,
                  generalDescription: this.state.generalDescription,
                  availablesDays: this.state.availablesDays,
                  avaiablesHours: this.state.avaiablesHours,
                  age: this.state.datePickerTitle,
                  pic: "",
                  rating: 0,
                  profile: "teacher"
                };

                if (!this.props.Teacher.name) {
                  this.printDetails(
                    obj,
                    this.props.navigation.getParam("access_token")
                  );
                } else {
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
  const { Teacher } = state;

  return { Teacher };
};

export default connect(mapStateToProps, {
  teacherFetch
})(FormExample);
