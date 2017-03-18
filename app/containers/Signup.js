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
  TouchableOpacity,
  AlertIOS
} from 'react-native';
import {
  FormInput,
  FormLabel,
  Icon
} from 'react-native-elements';
import {connect} from 'react-redux';

class Signup extends Component {

  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:'',
      confirmedPassword:''
    }
  }

  componentWillReceiveProps(nextProps){
    var {user} = nextProps;
    if(user) {
      this.props.navigator.push({
          id: 'EventPage',
          name: 'Login',
        });
    }
  }

  _handlePress() {
    // var {email,password,confirmedPassword} = this.state;

    // const validateEmail =(email) =>{
    //       var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   return email.length>0 && re.test(email);
    // }

    // const validatePassword = (password,confirmedPassword) =>{
    //   return password.length > 0 && confirmedPassword.length>0 && password == confirmedPassword
    // }

    // if (!validateEmail(email)){
    //   AlertIOS.alert('Email is invalid')
    //   return
    // }

    // if(!validatePassword(password,confirmedPassword)){
    //   AlertIOS.alert(`Password does not match the confirm password`)
    //   return
    // }

    var email = "fahran.kamili@utexas.edu";
    var password = "password"

    this.props.createNewUser(email,password);
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
        <FormLabel>Email</FormLabel>
        <FormInput
          containerStyle={styles.form}
          onChangeText={(email)=>{
            this.setState({email})
          }}
          />
        <FormLabel>Password</FormLabel>
        <FormInput
          containerStyle={styles.form}
          onChangeText={(password)=>{
            this.setState({password})
          }}
          secureTextEntry={true}
          />
        <FormLabel>Confirm Password</FormLabel>
        <FormInput
          containerStyle={styles.form}
          onChangeText={(confirmedPassword)=>{
            this.setState({confirmedPassword})
          }}
          secureTextEntry={true}
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

function mapStateToProps(state){
  var {user} = state;
  return {
    user
  }
}

export default connect(mapStateToProps)(Signup)
