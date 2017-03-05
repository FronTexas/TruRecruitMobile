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


class Splash extends Component {

  _handlePress() {
    Alert.alert('Button has been pressed');
  }
    
  _handleLoginPress(){
    this.props.login({
      email:'forfron@gmail.com',
      password:'trurecruitlit'
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={{flex:0.6,justifyContent:'center'}}>
          <Image source={require('./img/scanner.png')} style={styles.picture}/>
        </View>
        
        <View id="inputFields" style={{flex:0.4}}>
          <View>
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
              onPress={this._handleLoginPress.bind(this)}>
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
      </View>
    );
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