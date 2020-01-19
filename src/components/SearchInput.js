import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import RNPicker from "rn-modal-picker";

const SearchInput = ({ onSelect, data, title, inputText, label }) => {
  const _selectedValue = (index, item) => {};

  return (
    <RNPicker
      dataSource={data}
      dummyDataSource={data}
      defaultValue={false}
      pickerTitle={title}
      showSearchBar={true}
      disablePicker={false}
      changeAnimation={"none"}
      searchBarPlaceHolder={"לחץ כאן לחיפוש"}
      showPickerTitle={true}
      searchBarContainerStyle={Styles.searchBarContainerStyle}
      pickerStyle={Styles.pickerStyle}
      selectedLabel={label}
      placeHolderLabel={inputText}
      selectLabelTextStyle={Styles.selectLabelTextStyle}
      placeHolderTextStyle={Styles.placeHolderTextStyle}
      dropDownImageStyle={Styles.dropDownImageStyle}
      // dropDownImage={require("../icons/ic_drop_down.png")}
      selectedValue={(index, name) => onSelect(name)}
    />
  );
};

const Styles = StyleSheet.create({
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    textAlign: "center",

    marginRight: 10
  },

  selectLabelTextStyle: {
    color: "#000",
    //textAlign: "right",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  placeHolderTextStyle: {
    color: "black",
    padding: 10,
    //   textAlign: "center",
    width: "99%",
    flexDirection: "row"
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center"
  },

  pickerStyle: {
    marginLeft: 18,
    elevation: 3,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1
    },
    borderWidth: 1,
    shadowRadius: 10,
    backgroundColor: "#D3E8FF",
    shadowColor: "#d3d3d3",
    borderRadius: 5,
    flexDirection: "row"
  }
});

export default SearchInput;
