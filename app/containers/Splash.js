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
  TouchableOpacity,
  AsyncStorage
} from 'react-native';


import{
  FormLabel,FormInput
} from 'react-native-elements';

import {connect} from 'react-redux';


class Splash extends Component {

  _handlePress() {
    Alert.alert('Button has been pressed');
  }

  componentDidMount(){
    AsyncStorage.getItem('user').then(
      userJson => {
        if(userJson){
          let user = JSON.parse(userJson);
          this.props.setUser(user);
          this.gotoEvent();
          return;
        }
        this.gotoLogin();
      }
    )
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={{flex:1,justifyContent:'center'}}>
          <Image source={require('./img/scanner.png')} style={styles.picture}/>
        </View>
      </View>
    );
  }

  gotoEvent() {
    this.props.navigatorWrapper(false).push({
      id: 'EventPage',
      name: 'Login',
    });
  }

  gotoLogin(){
    this.props.navigator.push({
      id:'LoginPage'
    })
  }

  gotoSignup() {
    this.props.navigator.push({
      id: 'SignupPage',
      name: 'Sign Up',
    });
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

export default connect(mapStateToProps)(Splash);