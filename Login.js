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
  TouchableHighlight,
  StatusBar
} from 'react-native';
import {
  FormInput,
  FormLabel,
  Icon
} from 'react-native-elements';

export default class Login extends Component {

  _handlePress() {
    Alert.alert("Button has been pressed");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <TouchableHighlight
            onPress={this.gotoSplash.bind(this)}>
            <View style={styles.close}>
              <Icon name='close'/>
            </View>
          </TouchableHighlight>
        </View>
        <FormLabel>Username</FormLabel>
        <FormInput
          focus
          containerStyle={styles.form}
          />
        <FormLabel>Password</FormLabel>
        <FormInput
          containerStyle={styles.form}
          />
        <Button
          containerStyle={styles.loginButton}
          style={{fontSize: 20, color: '#f9fafc'}}
          onPress={this.gotoMain.bind(this)}>
          Log in
        </Button>
      </View>
    );
  }

  gotoMain() {
    this.props.navigator.push({
      id: 'MainPage',
      name: 'Main Page',
    });
  }

  gotoSplash() {
    this.props.navigator.push({
      id: 'SplashPage',
      name: 'Splash Page',
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
  loginButton: {
    marginTop: 20,
    padding:10,
    height:45,
    width:300,
    overflow:'hidden',
    borderRadius:45,
    backgroundColor: '#00d4aa',
  },
  form: {
    height: 40,
    width: 350,
    backgroundColor: 'white',
    borderBottomWidth: 3,
    borderColor: 'yellow'
  },
  nav: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#ededed',
  },
  close: {
    flex: 1,
    right: 170,
    marginTop: 20,
    marginLeft: 10
  }
});
