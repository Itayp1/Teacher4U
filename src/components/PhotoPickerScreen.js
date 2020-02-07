import * as React from "react";
import { Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import { savePicture } from "../actions";
import { AntDesign } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

class ImagePickerExample extends React.Component {
  state = {
    image: null,
    isVisable: false
  };

  render() {
    let { image } = this.state;
    //     {image && (
    //       <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
    //     )}
    //   </View>

    return (
      <>
        <Spinner
          visible={this.state.isVisable}
          textContent={"Saving Picture..."}
          textStyle={styles.spinnerTextStyle}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.close();
            this._pickImage();
          }}
        >
          <AntDesign name="picture" size={50} />
        </TouchableOpacity>
      </>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    this.setState({ isVisable: true });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,

      aspect: [3, 3],
      quality: 0.1
    });

    this.props.savePicture(result.base64);
    this.setState({ isVisable: false });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF"
  }
});

export default connect(null, {
  savePicture
})(ImagePickerExample);
