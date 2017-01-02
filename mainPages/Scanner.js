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
import Icon from 'react-native-vector-icons/Ionicons';

export default class Scanner extends Component {

  _goToAttendeeProfilePage(){
    this.props.navigator.push({
      id:"AttendeeProfilePage",
      name:"Attendee Profile Page"
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          onBarCodeRead={this.gotoSplash.bind(this)}>
          <View style={styles.arrow_back_area}>
            <Icon name="ios-arrow-back" size={30} style={styles.arrowBack}></Icon>
            <Text style={styles.backText}>Back</Text>
          </View>
          <View style={styles.scan_and_instruction}>
            <Image  source={require('../img/scanner.png')} style={styles.scan}/>
            <Text onPress={this._goToAttendeeProfilePage.bind(this)} style={styles.instruction}>Place the QR code at the center of the icon</Text>
          </View>
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
  },
  arrow_back_area:{
    flex:1,
    padding:20,
    flexDirection:'row',
    alignItems:'center'
  },
  backText:{color:"#FFF",marginLeft:10,fontSize:20},
  arrowBack:{
    color:"#FFF"
  },
  scan_and_instruction:{
    flex: 9,
    justifyContent:'center',
    alignItems:'center',
    marginTop:150
  },
  scan: {
    width: 250,
    height: 250,
    marginBottom:20
  },
  instruction:{
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 200
  }
});
