import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Alert,
  Navigator,
  TouchableOpacity
} from 'react-native';


import{
  FormLabel,FormInput
} from 'react-native-elements';

import {connect} from 'react-redux';


class Login extends Component {

  _handlePress() {
    Alert.alert('Button has been pressed');
  }
    
  _handleLoginPress(){
    this.props.login({
      email:'forfron@gmail.com',
      password:'trurecruitlit'
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user){
      this.gotoEvent(); 
    }
  }

  gotoEvent() {
    this.props.navigator.push({
      id: 'EventPage',
      name: 'Login',
    });
  }



  gotoSignup() {
    this.props.navigator.push({
      id: 'SignupPage',
      name: 'Sign Up',
    });
  }

  render(){
    return (
      <View>
        
      </View>
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242628',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
    color: '#f9fafc'
  },
  instructions: {
    textAlign: 'center',
    color: '#f9fafc',
    height: 40,
    marginBottom: 15
  },
  picture: {
    width: 200,
    height: 200,
    alignSelf:'center'
  },
  button: {
    marginTop: 30,
    padding:7,
    height:45,
    width:240,
    overflow:'hidden',
    borderRadius:45,
    borderColor: '#00d4aa',
    borderWidth: 4
  },
  loginButton: {
    marginTop: 20,
    padding:10,
    height:45,
    width:240,
    overflow:'hidden',
    borderRadius:45,
    backgroundColor: '#00d4aa',
  }
});

function mapStateToProps(state){
  return {
     user: state.user
  }
}

export default connect(mapStateToProps)(Login);