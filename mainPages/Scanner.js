import React, { Component } from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  Image,
  Alert,
  Navigator,
  TouchableOpacity
} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from '.././BackButton'

const monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

export default class Scanner extends Component {

  constructor(props){
    super(props);
    this.state ={
      qrReadAlready:false
    };
  }

  _goToAttendeeProfilePage(){
    handleAttendeePop = function(attendee) {
      formatDay = function(day){
            if (day % 10 == 1)
              return day + "st"
            if (day % 10 == 2)
              return day + "nd"
            if (day % 10 == 3)
              return day + "rd"
            return day + "th"
          }
      formatDate = function(date){
        var day = formatDay(date.getDate());
        var month = monthNames[date.getMonth()];
        var year = date.getFullYear();
        var hour = date.getHours();
        var meridiem = hour >= 12 ? "PM" : "AM";
        var minutes = ("" + date.getMinutes()).length == 1 ? ("0" + date.getMinutes()) : "" + date.getMinutes();
        currentTime = ((hour + 11) % 12 + 1) + ":" + minutes + meridiem;
        return currentTime + " " + month + " " + day + " " + year
      }
      attendee.scanned = formatDate(new Date())
      this.setState({qrReadAlready:false,attendee:attendee})
    }

    if(!this.state.qrReadAlready){
      this.setState({qrReadAlready:true})
        this.props.navigator.push({
      id:"AttendeeProfilePage",
      name:"Attendee Profile Page",
      attendee: {
        name: 'Fahran Kamili',
        summary: 'Graduating May 2017',
      },
      onAttendeePop: handleAttendeePop.bind(this)
    })
    }

  
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          onBarCodeRead={this._goToAttendeeProfilePage.bind(this)}
          barcodeTypes={['qr']}
          >
          <View id="arrowBackArea_and_EventTitle" style={{
                                                    padding:20,
                                                    flexDirection:'row',
                                                    justifyContent:'center'
                                                  }}>
              <View>
                <Text style={[styles.textShadow,{fontSize:30,fontWeight:'bold',color:'#FFF'}]}>{this.props.event.eventTitle}</Text>
              </View>
          </View>
          <View style={styles.scan_and_instruction}>
            <Image  source={require('../img/scanner.png')} style={styles.scan}/>
            <Text onPress={this._goToAttendeeProfilePage.bind(this)} style={[styles.textShadow,styles.instruction]}>Hold your camera up to a TR code</Text>
          </View>
          <View 
              id="done_text_area"
              style={{
                  flexDirection:'row',
                  justifyContent:'center',
                  padding:20
                }}
              >
              <TouchableOpacity
                >
                  <Text id="done_text" style={[styles.textShadow,{color:"#FFF",fontSize:30,fontWeight:"600"}]}>Done</Text>
                </TouchableOpacity>
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
