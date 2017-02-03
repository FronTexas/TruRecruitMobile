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

export default class Splash extends Component {

  _handlePress() {
    Alert.alert('Button has been pressed');
  }

  render(){
    return (
      <View style={styles.container}>
        <Image source={require('./img/scanner.png')} style={styles.picture}/>
        
        <View
        >
          <FormLabel>Email</FormLabel>
          <FormInput></FormInput>

          <FormLabel>Password</FormLabel>
          <FormInput></FormInput>
        </View>

        <View
          style={{paddingBottom:15,justifyContent:'center',alignItems:'center'}}
        >
           <Button
            containerStyle={styles.loginButton}
            style={{fontSize: 18, color: '#f9fafc',alignSelf:'center'}}
            onPress={this.gotoEvent.bind(this)}>
            Log in
        </Button>
        </View>

        <View style={{flexDirection:'row','justifyContent':'center'}}>
          <View style={{'flexDirection':'row'}}>
            <Text style={{color:"#FFF"}}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => this.props.navigator.push({
                id:'SignupPage'
              })}
            >
              <Text style={{fontWeight:'bold',marginLeft:5,color:'#1DBB96'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
       
      </View>
    );
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    width: 300,
    height: 300,
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
