import React from "react";
import { Text } from "react-native-elements";
import { StyleSheet } from "react-native";
import { Input, Label, View, Right } from "native-base";

class FormSearchInput extends React.Component {
  state = { inputValidation: false, errorText: "", finish: false };
  validateText = Field => {
    const LegalChars = new RegExp("^[a-zA-Z-\u0590-\u05FF ]+$"); //Note that this one allows space

    // Then use it

    if (!LegalChars.test(Field)) {
      this.setState({
        inputValidation: true,
        errorText: "יש להכניס אותיות בלבד"
      });
    } else {
      this.setState({ inputValidation: false, inputValidation: Field });
    }
  };

  validatePhone = Field => {
    const LegalChars = new RegExp("^[0-9]+$"); //Note that this one allows space
    if (!LegalChars.test(Field)) {
      this.setState({
        inputValidation: true,
        errorText: "יש להכניס מספרים בלבד"
      });
    } else if (Field.toString().split("").length != 10) {
      this.setState({
        inputValidation: true,
        errorText: "יש להכניס מספר טלפון עד 10 תווים"
      });
    } else {
      this.setState({ inputValidation: false, phone: Field });
    }
  };
  validateNumber = Field => {
    const LegalChars = new RegExp("^[0-9]+$"); //Note that this one allows space
    if (!LegalChars.test(Field)) {
      this.setState({
        inputValidation: true,
        errorText: "יש להכניס מספרים בלבד"
      });
    } else {
      this.setState({ inputValidation: false, phone: Field });
    }
  };
  validate = (validationType, term) => {
    switch (validationType) {
      case "phoneNumber":
        this.validatePhone(term);
        // code block
        break;
      case "text":
        this.validateText(term);
        // code block
        break;
      case "number":
        this.validateNumber(term);
        // code block
        break;
      default:
      // code block
    }
  };
  render() {
    const {
      title,
      input,
      validationType,
      inputValue,
      initializeValue
    } = this.props;

    return (
      <View style={styles.elementSpaces}>
        <Label>{title}</Label>
        <Input
          value={initializeValue}
          style={{ borderWidth: 1, borderRadius: 15, textAlign: "right" }}
          placeholder={input}
          error={"#d50000"}
          onChangeText={term => {
            this.setState({ finish: false });
            this.validate(validationType, term);
            inputValue(term);
          }}
          onEndEditing={() => {
            this.setState({ finish: true });
          }}
        />
        {this.state.inputValidation == true ? (
          <Text style={{ color: "red" }}>{this.state.errorText}</Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    marginTop: 30,
    backgroundColor: "white",
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
  }
});

export default FormSearchInput;
