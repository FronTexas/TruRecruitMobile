import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Alert,
  Navigator
} from 'react-native';

export default class Splash extends Component {

  _handlePress() {
    Alert.alert('Button has been pressed');
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)} />
    );
  }

  renderScene(route, navigator) {
    return (
      <View style={styles.container}>
        <Image source={require('./img/scanner.png')} style={styles.picture}/>
        <Button
          containerStyle={styles.loginButton}
          style={{fontSize: 18, color: '#f9fafc'}}
          onPress={this.gotoLogin.bind(this)}>
          Log in
        </Button>
        <Button
          containerStyle={styles.button}
          style={{fontSize: 18, color: '#f9fafc'}}
          onPress={this.gotoSignup.bind(this)}>
          Sign Up
        </Button>
      </View>
    );
  }

  gotoLogin() {
    this.props.navigator.push({
      id: 'LoginPage',
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
    alignItems: 'center',
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
    width: 170,
    height: 170,
    marginBottom: 200,
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
