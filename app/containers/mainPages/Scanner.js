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
import _ from 'lodash';

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
      qrReadAlready:false,
      attendeeID:'-KdrTZY6gyfFa64ZKMys'
    };
  }

  _handleBarcodeReadFake(){
    this._goToAttendeeProfilePage('-KdrTZY6gyfFa64ZKMys');
  }

  _handleBarcodeRead(attendeeID){
    this._goToAttendeeProfilePage(attendeeID);
  }

  _goToAttendeeProfilePage(attendeeID){
    if(!this.state.qrReadAlready){
      this.setState({qrReadAlready:true})

      toggleScannerPagesQRReadAlready = () => {
        this.state.qrReadAlready = false;
      }

      this.props.navigatorWrapper(false).push({
          id:"AttendeeProfilePage",
          name:"Attendee Profile Page",
          attendeeID,
          toggleScannerPagesQRReadAlready,
          prevPageHasTabBar: false
        })
    }
  }

  render() {
    var {eventTitle} = this.props.event;
    var fontSize = 30;
    if(eventTitle.length > 12){
      fontSize = Math.ceil(400 / eventTitle.length);
    }
    var title = <Text style={[styles.textShadow,{fontSize,fontWeight:'bold',color:'#FFF'}]}>{eventTitle}</Text>


    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          onBarCodeRead={(qrObject) => this._handleBarcodeRead(qrObject.data)}
          barcodeTypes={['qr']}
          >
          <View id="arrowBackArea_and_EventTitle" style={{
                                                    padding:20,
                                                    flexDirection:'row',
                                                    justifyContent:'center'
                                                  }}>
              <View>
                {title}
              </View>
          </View>
          <View style={styles.scan_and_instruction}>
            <Image  source={require('../img/scanner.png')} style={styles.scan}/>
            <Text onPress={this._handleBarcodeReadFake.bind(this)} style={[styles.textShadow,styles.instruction]}>Place the QR code in the middle of TruRecruit Logo</Text>
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
                  onPress={()=>{
                    var attendees = this.props.attendees; 
                    if (this.state.attendee){
                      attendees.unshift(
                        this.state.attendee
                      )
                    }
                    this.props.navigatorWrapper(false).pop();
                  }}
                >
                  <Text id="done_text" style={[styles.textShadow,{color:"#FFF",fontSize:30,fontWeight:"600"}]}>Done</Text>
                </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }

  gotoSplash() {
    this.props.navigatorWrapper(true).push({
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
