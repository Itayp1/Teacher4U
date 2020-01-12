import React, { Component, useState } from "react";
import { Button, Text, Overlay } from "react-native-elements";

import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Icon,
  InputGroup,
  Picker,
  Label,
  View
} from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomMultiPicker from "react-native-multiple-select-list";

const userList = {
  "123": "Tom",
  "124": "Michael",
  "125": "Christin"
};

items = [
  {
    id: "92iijs7yta",
    name: "Ondo"
  },
  {
    id: "a0s0a8ssbsd",
    name: "Ogun"
  },
  {
    id: "16hbajsabsd",
    name: "Calabar"
  },
  {
    id: "nahs75a5sg",
    name: "Lagos"
  },
  {
    id: "667atsas",
    name: "Maiduguri"
  },
  {
    id: "hsyasajs",
    name: "Anambra"
  },
  {
    id: "djsjudksjd",
    name: "Benue"
  },
  {
    id: "sdhyaysdj",
    name: "Kaduna"
  },
  {
    id: "suudydjsjd",
    name: "Abuja"
  }
];
export default class FormExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      DateTimePickerVisable: false,
      DateTimePicker: "",

      nameError: false,
      phoneError: false,
      phone: "",
      input: "שם פרטי",
      selected2: undefined,
      gender: "זכר",
      selectedItems: [],
      OverlayDisplay: false
    };
  }
  onValueChange(value) {
    this.setState({
      selected2: value
    });
  }
  validateText(Field) {
    LegalChars = new RegExp("^[a-zA-Z-\u0590-\u05FF ]+$"); //Note that this one allows space

    // Then use it

    if (!LegalChars.test(Field)) {
      this.setState({ nameError: true });
    } else {
      this.setState({ nameError: false, name: Field });
    }
  }

  validatePhone(Field) {
    LegalChars = new RegExp("^[0-9]+$"); //Note that this one allows space

    // Then use it

    if (!LegalChars.test(Field)) {
      this.setState({ phoneError: true });
    } else {
      this.setState({ phoneError: false, phone: Field });
    }
  }
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };
  render() {
    return (
      <Container style={styles.main}>
        <Content>
          <Form style={styles.title}>
            <View>
              <Label>שם מלא</Label>
              <Input
                style={{ borderWidth: 1, borderRadius: 15 }}
                placeholder={this.state.input}
                error={"#d50000"}
                onChangeText={err => this.validateText(err)}
              />
              {this.state.nameError == true ? (
                <Text style={{ color: "red" }}>יש להכניס אותיות בלבד</Text>
              ) : null}
            </View>
            <View>
              <Label>טלפון</Label>
              <Input
                style={{ borderWidth: 1, borderRadius: 15 }}
                placeholder={"מס טלפון"}
                error={"#d50000"}
                onChangeText={err => this.validatePhone(err)}
              />
              {this.state.phoneError == true ? (
                <Text style={{ color: "red" }}>יש להכניס מספרים בלבד</Text>
              ) : null}
            </View>
            <View>
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
                <Picker.Item label="זכר" value="male" />
                <Picker.Item label="נקבה" value="female" />
              </Picker>
            </View>
            <View>
              <Button
                style={{ borderRadius: 100 }}
                title={"תאריך לידה"}
                onPress={() => {
                  this.setState({ DateTimePickerVisable: true });
                }}
              />
              <DateTimePickerModal
                isVisible={this.state.DateTimePickerVisable}
                mode="date"
                onConfirm={res => {
                  const date = new Date(res);
                  this.setState({ DateTimePicker: date.getFullYear() });
                }}
                onCancel={() => {}}
              />
            </View>
            <Button
              title="עיר"
              onPress={() => this.setState({ OverlayDisplay: true })}
            />
            <Overlay isVisible={this.state.OverlayDisplay}>
              <View>
                <CustomMultiPicker
                  options={userList}
                  search={true} // should show search bar?
                  multiple={true} //
                  placeholder={"Search"}
                  placeholderTextColor={"#757575"}
                  returnValue={"label"} // label or value
                  callback={res => {
                    console.log(res);
                    this.setState({ OverlayDisplay: false });
                  }} // callback, array of selected items
                  rowBackgroundColor={"#eee"}
                  rowHeight={40}
                  rowRadius={5}
                  iconColor={"#00a2dd"}
                  iconSize={30}
                  selectedIconName={"md-checkmark-circle"}
                  unselectedIconName={"md-checkmark-circle"}
                  scrollViewHeight={130}
                  selected={[]} // list of options which are selected by default
                />
              </View>
            </Overlay>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    marginTop: 30,
    backgroundColor: "white",
    flex: 1
  },
  title: {
    marginRight: 20,
    marginLeft: 20
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ddd"
  }
});
