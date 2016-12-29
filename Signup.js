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
  TouchableOpacity
} from 'react-native';
import {
  FormInput,
  FormLabel,
  Icon
} from 'react-native-elements';

export default class Signup extends Component {

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
          containerStyle={styles.form}
          />
        <FormLabel>Email</FormLabel>
        <FormInput
          containerStyle={styles.form}
          />
        <FormLabel>Password</FormLabel>
        <FormInput
          containerStyle={styles.form}
          />
        <FormLabel>Confirm Password</FormLabel>
        <FormInput
          containerStyle={styles.form}
          />
        <Button
          containerStyle={styles.button}
          style={{fontSize: 17, color: '#f9fafc'}}
          onPress={() => this._handlePress()}>
          Sign Up
        </Button>
      </View>
    );
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
  button: {
    marginTop: 20,
    padding:7,
    height:45,
    width:300,
    overflow:'hidden',
    borderRadius:45,
    borderColor: '#00d4aa',
    borderWidth: 4
  },
  form: {
    height: 40,
    width: 300,
    backgroundColor: 'white',
    borderBottomWidth: 3,
    borderColor: 'yellow'
  },
  nav: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#ededed',
  },
  header: {
    fontSize: 20,
    marginTop: 15,
    marginLeft: 50,
    color: '#00d4aa'
  },
  close: {
    flex: 1,
    right: 170,
    marginTop: 20,
    marginLeft: 10
  }
});
