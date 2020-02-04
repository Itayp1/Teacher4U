import React, { Component, useState } from "react";
import { Button, Text, Overlay } from "react-native-elements";
import { CustomPicker } from "react-native-custom-picker";
import PickerModal from "react-native-picker-modal-view";
import cities from "../../../config/cities.json";
import moment from "moment";

import {
  Alert,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Modal
} from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Input,
  Picker,
  Label,
  View
} from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomMultiPicker from "react-native-multiple-select-list";
import MultiSelect from "react-native-multiple-select";
const cities1 = cities.map(city => {
  const tmp = {};
  tmp.Name = city.name;
  tmp.Value = city.value;
  tmp.Code = city.id;
  tmp.Id = city.id;

  return tmp;
});
const list = [
  {
    Id: "סמל_ישוב",
    Name: "שם_ישוב",
    english_name: "שם_ישוב_לועזי",
    semel_napa: "סמל_נפה",
    shem_napa: "שם_נפה",
    semel_lishkat_mana: "סמל_לשכת_מנא",
    lishka: "לשכה",
    semel_moatza_ezorit: "סמל_מועצה_איזורית",
    shem_moaatza: "שם_מועצה",
    Value: "שם_ישוב"
  },
  {
    Name: "תל אביב",
    Value: "תל אביב",
    Code: "AX",
    Id: 1
  },
  {
    Name: "Albania",
    Value: "Albania",
    Code: "AL",
    Id: 2
  },
  {
    Name: "Algeria",
    Value: "Algeria",
    Code: "DZ",
    Id: 3
  },
  {
    Name: "American Samoa",
    Value: "American Samoa",
    Code: "AS",
    Id: 4
  },
  {
    Name: "AndorrA",
    Value: "AndorrA",
    Code: "AD",
    Id: 5
  },
  {
    Name: "Angola",
    Value: "Angola",
    Code: "AO",
    Id: 6
  },
  {
    Name: "Anguilla",
    Value: "Anguilla",
    Code: "AI",
    Id: 7
  }
];
const options = [
  {
    color: "#2660A4",
    label: "One",
    value: 1
  },
  {
    color: "#FF6B35",
    label: "Two",
    value: 2
  },
  {
    color: "#FFBC42",
    label: "Three",
    value: 3
  },
  {
    color: "#AD343E",
    label: "Four",
    value: 4
  },
  {
    color: "#051C2B",
    label: "Five",
    value: 5
  }
];
const userList = {
  "879": "Tom",
  "124": "Michael",
  "125": "Christin",
  hhh: "Tom",
  "127": "Michael",
  "128": "Christin",
  "129": "Tom",
  "130": "Michael",
  "131": "Christin"
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
      selectedItem: {},
      nameError: false,
      phoneError: false,
      phone: "",
      input: "שם פרטי",
      selected2: undefined,
      gender: "זכר",
      selectedItems: [],
      OverlayDisplay: false,
      datePickerTitle: "תאריך לידה",
      cities1,
      ModalVidsble: false
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
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };
  validatePhone(Field) {
    LegalChars = new RegExp("^[0-9]+$"); //Note that this one allows space

    // Then use it

    if (!LegalChars.test(Field)) {
      this.setState({ phoneError: true });
    } else {
      this.setState({ phoneError: false, phone: Field });
    }
  }

  selected(selected) {
    this.setState({
      selectedItem: selected
    });
  }
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
                title={this.state.datePickerTitle}
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
                  this.setState({ DateTimePickerVisable: false });
                  this.setState({
                    datePickerTitle: moment(date).format("DD/MM/YYYY")
                  });
                }}
                onCancel={() => {}}
              />
            </View>
            <Button
              title="עיר"
              onPress={() => this.setState({ OverlayDisplay: true })}
            />
            {/* <ScrollView>
              <KeyboardAvoidingView style={styles.container} behavior={null}> */}
            <Modal visible={this.state.OverlayDisplay} transparent>
              <View
                style={{
                  backgroundColor: "blue",
                  margin: 20,
                  marginTop: 40,
                  borderRadius: 20
                }}
              >
                <CustomMultiPicker
                  options={cities.map(city => city.name)}
                  search={true} // should show search bar?
                  multiple={true} //
                  placeholder={"Search"}
                  placeholderTextColor={"#757575"}
                  returnValue={"label"} // label or value
                  callback={res => {}} // callback, array of selected items
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
                <Button
                  title={"exist"}
                  style={{ marginTop: 60, flex: 1 }}
                  onPress={() => this.setState({ OverlayDisplay: false })}
                />
              </View>
            </Modal>

            {/* </KeyboardAvoidingView>
            </ScrollView> */}
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <CustomPicker
                placeholder={"Please select your favorite item..."}
                options={options}
                getLabel={item => item.label}
                fieldTemplate={this.renderField}
                optionTemplate={this.renderOption}
                headerTemplate={this.renderHeader}
                footerTemplate={this.renderFooter}
                onValueChange={value => {
                  Alert.alert(
                    "Selected Item",
                    value ? JSON.stringify(value) : "No item were selected!"
                  );
                }}
              />
            </View>

            <PickerModal
              renderSelectView={(disabled, selected, showModal) => (
                <Button
                  disabled={disabled}
                  title={"עיר מגורים"}
                  onPress={showModal}
                />
              )}
              onSelected={selected => {
                const list = this.state.cities1.map(city => {
                  if (
                    selected.Name === city.Name &&
                    selected.Name.toString().includes(" נבחר ")
                  ) {
                    city.Name = city.Value;
                  } else if (selected.Name === city.Name) {
                    city.Name = selected.Name + " נבחר ";
                  }
                  return city;
                });

                this.setState({ cities1: list });
              }}
              onClosed={() => {}}
              onBackButtonPressed={() => {}}
              items={this.state.cities1}
              sortingLanguage={"tr"}
              showToTopButton={true}
              selected={}
              showAlphabeticalIndex={true}
              autoGenerateAlphabeticalIndex={true}
              selectPlaceholderText={"Choose one..."}
              onEndReached={() => {}}
              searchPlaceholderText={"Search..."}
              requireSelection={false}
              autoSort={false}
            />
            <Button
              title="DSfsdfds"
              onPress={() => this.setState({ ModalVidsble: true })}
            />
            <Modal visible={this.state.ModalVidsble}>
              <MultiSelect
                hideTags
                items={cities}
                uniqueKey="id"
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={this.state.selectedItems}
                selectText="Pick Items"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={text => {}}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: "#CCC" }}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
              />

              {/* <View>{this.multiSelect.getSelectedItemsExt(selectedItems)}</View> */}
            </Modal>
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
