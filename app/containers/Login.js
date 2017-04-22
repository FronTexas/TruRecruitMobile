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
  ScrollView,
  Dimensions,
  findNodeHandle
} from 'react-native';


import{
  FormLabel,FormInput
} from 'react-native-elements';

import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      email:"",
      password:""
    }
  }
  _handlePress() {
    Alert.alert('Button has been pressed');
  }
    
  _handleLoginPress(){
    // pass: trurecruitlit
    this.props.login({
      email:this.state.email,
      password: this.state.password
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

  inputFocused(ref) {
    var refs = {
      "emailField" : this.emailField,
      "passwordField": this.passwordField
    }
    setTimeout(()=>{
      let scrollResponder = this.loginPageScrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(refs[ref]),
        true
      )
    },50)
  }
  render(){
    return (
      <LinearGradient
        colors={['#00a170','#03d2b9']}
        style={{
          flex:1
        }}
      >
      <ScrollView 
        id="LoginPageScrollView"
        ref={(component) => this.loginPageScrollView = component}
      >
        <View id="LoginPageMainContainer">
          <View
            id="LogoArea"
            style={{
              height:Dimensions.get('window').height * 0.45,
              justifyContent: 'center',
            }}
          >
            <Image 
              source={require('./img/trurecruit_text_logo.png')}
              style={{
                width:200,
                resizeMode: 'contain',
                alignSelf:'center'
              }}
              ></Image>
          </View>

          <View
            id="LoginBoxArea"
            style={[{
              height:Dimensions.get('window').height * 0.45,
              paddingTop:10,
              paddingBottom:10,
              paddingRight:30,
              paddingLeft:30,
            }]}
          >
            <View
              id="LoginBox"
              style={[{
                          backgroundColor:"white",
                          flex:1,
                          borderRadius:10
                        },styles.shadow]}
            >
                <View
                  id="LoginField"
                  style={{
                    flex:0.7,
                  }}
                >
                  <FormLabel>Email</FormLabel>
                  <FormInput 
                    textInputRef={(component) => this.emailField = component}
                    placeholder="jsmith@example.com" 
                    returnKeyType='next'
                    onFocus={this.inputFocused.bind(this,"emailField")}
                    onSubmitEditing={() => {this.passwordField.focus()}}
                    onChangeText={(text) => this.setState({email:text})}
                    ></FormInput>

                  <FormLabel>Password</FormLabel>
                  <FormInput 
                    textInputRef={(component) => this.passwordField = component} 
                    secureTextEntry={true} placeholder="Enter Password" 
                    onFocus={this.inputFocused.bind(this,"passwordField")}
                    returnKeyType='done'
                    onChangeText={(text) => this.setState({password:text})}></FormInput>
                </View>
                <View
                  id="LoginButtonArea"
                  style={{
                    flex:0.3,
                    paddingLeft:50,
                    paddingRight:50,
                    paddingTop:25,
                    paddingBottom:25,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex:1,
                    }}
                    onPress={() => this._handleLoginPress()}
                  >
                    <View
                      id="LoginButton"
                      style={
                        [{
                          flex:1,
                          justifyContent:'center',
                          borderRadius:15,
                          backgroundColor:"#03d2b9"
                        },styles.shadow]}
                    >
                      <Text 
                        id="LoginText"
                        style={{
                          color:"white",
                          fontSize:20,
                          alignSelf:'center',
                          fontWeight:'bold'
                        }}
                      >
                        Login
                      </Text>
                    </View>
                  </TouchableOpacity>
                  
                </View>            
            </View>
            
          </View>

          <View
            id="SignUpQueueArea"
            style={{
              flex:Dimensions.get('window').height * 0.05,
              justifyContent:'center'
            }}
          >
            <View 
              style={{
                flexDirection:'row',
                alignSelf:'center'
              }}
            >
              <Text style={{color:'white'}}>Don't have an account?</Text>
              <TouchableOpacity
                onPress={this.gotoSignup.bind(this)}
              >
                  <Text style={{fontWeight:'bold',color:'white',marginLeft:5}}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      </LinearGradient>
    );
  }

  
}

const styles = StyleSheet.create({
  shadow: {
   shadowOffset:{
      width:0,
      height:0
    },
  shadowColor:'black',
  shadowOpacity:0.2
  },
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
