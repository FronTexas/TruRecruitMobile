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
import BackButton from '.././BackButton'

export default class Scanner extends Component {

  _goToAttendeeProfilePage(){
    this.props.navigator.push({
      id:"AttendeeProfilePage",
      name:"Attendee Profile Page",
      attendee:{
        attendee_name:"Fahran Kamili",
        attendee_summary:"Graduating May 2017"
      }
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

          <View style={styles.arrowBackArea_and_EventTitle}>
            <View style={styles.arrowBackArea}>
              <BackButton navigator={this.props.navigator} style={styles.arrowBack}></BackButton>
            </View>
            <Text style={[styles.textShadow,styles.eventTitle]}>{this.props.eventTitle}</Text>
          </View>
          <View style={styles.scan_and_instruction}>
            <Image  source={require('../img/scanner.png')} style={styles.scan}/>
            <Text onPress={this._goToAttendeeProfilePage.bind(this)} style={[styles.textShadow,styles.instruction]}>Hold your camera up to a TR code</Text>
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
  textShadow:{
    shadowOffset:{
          width:0,
          height:0
        },
        shadowColor:'black',
        shadowOpacity:0.5
  },
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
  },
  arrowBackArea_and_EventTitle:{
    flex:1,
    padding:20,
    flexDirection:'column',
  },
  arrowBackArea:{
    flexDirection:'row',
    alignItems:'center'
  },
  backText:{
    color:"#FFF",
    marginLeft:10,
    fontSize:20
  },
  arrowBack:{
    color:"#FFF"
  },
  eventTitle:{
    color:"#FFF",
    fontSize:30,
    fontWeight:'bold',
    marginTop:20,
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
