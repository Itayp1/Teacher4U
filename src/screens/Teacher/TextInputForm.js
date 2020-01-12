import React, { Component, useState } from "react";
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
export class TextInputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      label: props.label,

      input: props.input
    };
  }

  render() {
    return (
      <View>
        <Label>{this.state.label}</Label>
        <Input
          style={{ borderWidth: 1, borderRadius: 15 }}
          placeholder={this.state.input}
          error={"#d50000"}
          onChangeText={err => console.log(err)}
        />
        {this.state.error == true ? <Text>יש להכניס אותיות בלבד</Text> : null}
      </View>
    );
  }
}

//{this.state.error == true ? <Text>יש להכניס אותיות בלבד</Text> : null}
const styles = StyleSheet.create({
  spacer: {
    margin: 15
  }
});
