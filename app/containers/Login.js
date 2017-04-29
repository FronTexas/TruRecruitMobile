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
  Dimensions,
  findNodeHandle,
  ActivityIndicator
} from 'react-native';


import{
  FormLabel,FormInput
} from 'react-native-elements';

import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      email:"",
      password:"",
      isWaitingForLoginProccess:false,
      isEmailValid:true,
      isPasswordValid:true,
      isEmailFieldPristine:true,
      isPasswordFieldPristine:true
    }
  }
     
  _handleLoginPress(){
    // const {email,password} = this.state;
    // var proceed = true;
    // if (!this.validateEmail(email)) {
    //   this.setState({isEmailValid:false}) 
    //   proceed = false;
    // }
    // if (!this.validatePassword(password)) {
    //   this.setState({isPasswordValid:false}) 
    //   proceed = false;
    // }

    // if(!proceed){
    //   return;
    // }

    // this.setState({isWaitingForLoginProccess:true})
    // this.props.login({
    //   email:this.state.email,
    //   password: this.state.password
    // })

    // This login cred is just for dev
    this.props.login({
      email:'fahran.kamili@utexas.edu',
      password: 'trurecruitlit'
    })
  }

  componentWillMount(){
    // this.props.removeLoggedInUser();
  }

  componentWillReceiveProps(nextProps){
    const {user,loginError} = nextProps;
    
    if(loginError){
      this.setState({isWaitingForLoginProccess:false})
      this.setState({loginError})
      return;
    }

    if(user){
      this.setState({isWaitingForLoginProccess:false})
      this.setState({loginError:null})
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

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.length>0 && re.test(email);
  }

  validatePassword(password){
    return password.length > 0;
  }

  render(){
    var loginErrorMessageText = this.state.loginError ? 
      <Text
        style={{color:"red",marginLeft:20,marginTop:10}}
      >{this.state.loginError.message}</Text> : <View></View>

    var emailValidationMessage = !this.state.isEmailValid ? 
      <Text
        style={{color:"red",marginLeft:20,marginTop:10}}
      >Email is invalid</Text> : <View></View>

    var passwordValidationMessage = !this.state.isPasswordValid ? 
      <Text
        style={{color:"red",marginLeft:20,marginTop:10}}
      >Password Cannot be empty</Text> : <View></View>
    var loginButtonContent = this.state.isWaitingForLoginProccess ?  
      <ActivityIndicator
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex:1,
              }}
              size="small"
              color="white"
          >
        </ActivityIndicator> : 
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

    return (
      <LinearGradient
        colors={['#00a170','#03d2b9']}
        style={{
          flex:1
        }}
      >
      <KeyboardAwareScrollView
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
                >
                  <FormLabel>Email</FormLabel>
                  <FormInput 
                    textInputRef={(component) => this.emailField = component}
                    placeholder="jsmith@example.com" 
                    returnKeyType='next'
                    onSubmitEditing={() => {this.passwordField.focus()}}
                    onChangeText={(email) => {
                      this.setState({email})
                      this.setState({isEmailValid: !this.state.isEmailFieldPristine && this.validateEmail(email) ? true : this.state.isEmailValid})
                    }}
                    keyboardType="email-address"
                    onBlur={()=> {
                      this.setState({isEmailFieldPristine:false})
                      this.setState({isEmailValid: this.validateEmail(this.state.email) ? true : false})
                    }}
                    ></FormInput>
                    {emailValidationMessage}

                  <FormLabel>Password</FormLabel>
                  <FormInput 
                    textInputRef={(component) => this.passwordField = component} 
                    secureTextEntry={true} 
                    placeholder="Enter Password" 
                    returnKeyType='done'
                    onChangeText={(password) => {
                      this.setState({password})
                      this.setState({isPasswordValid: !this.state.isPasswordFieldPristine && this.validatePassword(password) ? true : this.state.isPasswordValid})
                    }}
                    onBlur={()=> {
                      this.setState({isPasswordFieldPristine:false})
                      this.setState({isPasswordValid: this.validatePassword(this.state.password) ? true : false})
                    }}
                    ></FormInput>
                    {passwordValidationMessage}
                    {loginErrorMessageText}
                </View>
                <View
                  id="LoginButtonArea"
                  style={{
                    paddingLeft:50,
                    paddingRight:50,
                    paddingTop:40,
                    paddingBottom:25,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height:60,
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
                      {loginButtonContent}
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
      </KeyboardAwareScrollView>
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
  const {user,loginError} = state;
  return {
     user,
     loginError
  }
}

export default connect(mapStateToProps)(Login);
