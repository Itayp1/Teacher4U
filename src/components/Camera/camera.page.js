import React from "react";
import { Camera } from "expo-camera";
import { View, Text } from "react-native";
import * as Permissions from "expo-permissions";
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import { savePicture } from "../../actions";
import styles from "./styles";
import Toolbar from "./toolbar.component";
import Gallery from "./gallery.component";
import * as ImageManipulator from "expo-image-manipulator";

class CameraPage extends React.Component {
  camera = null;

  state = {
    isVisable: false,
    captures: [],
    capturing: null,
    hasCameraPermission: null,
    cameraType: Camera.Constants.Type.front,
    flashMode: Camera.Constants.FlashMode.off
  };

  setFlashMode = flashMode => this.setState({ flashMode });
  setCameraType = cameraType => this.setState({ cameraType });
  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    this.setState({
      isVisable: true
    });
    const photoData = await this.camera.takePictureAsync({
      quality: 0,
      base64: false
    });

    const imageFile = await ImageManipulator.manipulateAsync(
      photoData.uri,
      [{ resize: { width: 200, height: 200 } }],
      { base64: true }
    );

    this.setState({
      capturing: false,
      captures: [photoData, ...this.state.captures]
    });
    this.props.savePicture(imageFile.base64);
    this.setState({
      isVisable: false
    });
    const profile = this.props.navigation.getParam("profile");

    profile == "teacher"
      ? this.props.navigation.navigate("TeacherMenu")
      : this.props.navigation.navigate("StudentMenu");
  };

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync();
    this.setState({
      capturing: false,
      captures: [videoData, ...this.state.captures]
    });
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const hasCameraPermission = camera.status === "granted";

    this.setState({ hasCameraPermission });
  }

  render() {
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
      captures
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <React.Fragment>
        <View>
          <Spinner
            visible={this.state.isVisable}
            textContent={"Saving Picture..."}
            textStyle={styles.spinnerTextStyle}
          />

          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={styles.preview}
            ref={camera => (this.camera = camera)}
          />
        </View>

        {captures.length > 0 && <Gallery captures={captures} />}

        <Toolbar
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
        />
      </React.Fragment>
    );
  }
}

export default connect(null, {
  savePicture
})(CameraPage);
