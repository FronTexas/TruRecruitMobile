import React, { Component } from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  Image,
  Alert,
  Navigator
} from 'react-native';
import Camera from 'react-native-camera';

export default class Scanner extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          onBarCodeRead={this.gotoSplash.bind(this)}>
          <Image source={require('../img/scanner.png')} style={styles.scan}/>
        </Camera>
      </View>
    );
  }

  gotoSplash() {
    this.props.navigator.push({
      id: 'SplashPage',
      name: 'Splash Page',
    });
  }

  qrAlert = () => {
    this.camera.capture()
      .then((data) => Alert.alert(data))
      .catch(err => Alert.alert(err));
  }

  takePicture = () => {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  scan: {
    width: 350,
    height: 350,
    marginBottom: 200,
    justifyContent: 'center'
  }
});
