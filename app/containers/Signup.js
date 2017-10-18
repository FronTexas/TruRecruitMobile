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
  AlertIOS,
  Dimensions,
  findNodeHandle,
  ActivityIndicator
} from 'react-native';
import {
  FormInput,
  FormLabel
} from 'react-native-elements';
import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


class Signup extends Component {

  constructor(props){
    super(props);
    this.state = {
      email:'',
      firstName:'',
      lastName:'',
      company:'',
      password:'',
      confirmedPassword:'',
      isEmailValid:true,
      isPasswordValid:true,
      isPasswordIdentical:true,
      isEmailFieldPristine:true,
      isPasswordFieldPristine:true,
      isConfirmPasswordFieldPristine:true
    }
  }

  _handleSignUpPress() {

    var {email,firstName,lastName,company,password,confirmedPassword} = this.state;
    var proceed = true;
    if (!this.validateEmail(email)) {
      this.setState({isEmailValid:false});
      proceed = false;
    }
    if (!this.validatePassword(password)) {
      this.setState({isPasswordValid:false}) 
      proceed = false;
    }
    if (password != confirmedPassword) {
      this.setState({isPasswordIdentical:false}) 
      proceed = false
    }

    if(!proceed){
      return;
    }

    this.setState({isWaitingForSignUpProccess:true})
    this.props.createNewUser(this.state);

    // This is for Dev
    // this.props.login({
    //   email:'forfron@gmail.com',
    //   password: 'password123'
    // })
  }

  componentDidMount(){
    this.props.hideTabBar(true);
  }

  componentWillReceiveProps(nextProps){
    var {user,failedSignupMessage} = nextProps;

    if (failedSignupMessage){
      this.setState({isWaitingForSignUpProccess:false})
      this.setState({signUpFailureMessage: failedSignupMessage})
    }

    if(user) {
      this.setState({isWaitingForSignUpProccess:false})
      this.setState({signUpFailureMessage:null})
      this.props.changeIsLoginMode(false);
      this.props.navigatorWrapper(false).push({
        id:'LoginPage'
      })
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.length>0 && re.test(email);
  }

  validatePassword(password){
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return re.test(password);
  }

  render() {

    var signUpFailureMessage = this.state.signUpFailureMessage ? 
      <Text
        style={{color:"red",marginLeft:20,marginTop:10}}
      >{this.state.signUpFailureMessage}</Text> : <View></View>

    var emailValidationMessage = !this.state.isEmailValid ? 
      <Text
        style={{color:"red",marginLeft:20,marginTop:10}}
      >Email is invalid</Text> : <View></View>

    var passwordRequirementMessageString = "Password must be minimum 8 characters and at least have 1 Alphabet and 1 Number"
    var passwordValidationMessage = !this.state.isPasswordValid ? 
      <Text
        style={{color:"red",marginLeft:20,marginTop:10}}
      >{passwordRequirementMessageString}</Text> : <View></View>

    var passwordIdenticalValidationMessage = !this.state.isPasswordIdentical ? 
      <Text
        style={{color:"red",marginLeft:20,marginTop:10}}
      >Password does not match</Text> : <View></View> 

    var signUpButtonContent = this.state.isWaitingForSignUpProccess ?  
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
            style={{
              color:"white",
              alignSelf:'center',
              fontSize:20,
              fontWeight:'bold'
            }}
          >Sign Up</Text>
    return (
    <LinearGradient
        colors={['#00a170','#03d2b9']}
        style={{
          flex:1
        }}
      >
        <KeyboardAwareScrollView
          ref={(component) => this.signUpPageScrollView = component}
        >
          <View 
          style={{
            paddingTop:100,
            paddingBottom:20,
            paddingLeft:20,
            paddingRight:20
          }}>
            <View
              id="SignUpBox"
              style={[{
                  flex:1,
                  backgroundColor:'white',
                  borderRadius:25,
                },styles.shadow]}
            >
                <View
                  id="SignUpField"
                  style={{
                    paddingTop:45
                  }}
                >
                  <FormLabel>Email</FormLabel>
                  <FormInput 
                    textInputRef={(component) => this.emailField = component}
                    placeholder="Put your email address"
                    returnKeyType="next"
                    keyboardType="email-address"
                    onSubmitEditing={() => {this.firstNameField.focus()}}
                    onChangeText={(email)=>{
                      this.setState({email})
                      this.setState({isEmailValid: !this.state.isEmailFieldPristine && this.validateEmail(email) ? true : this.state.isEmailValid})
                    }}
                    onBlur={()=> {
                      this.setState({isEmailFieldPristine:false})
                      this.setState({isEmailValid: this.validateEmail(this.state.email) ? true : false})
                    }}
                    ></FormInput>
                  {emailValidationMessage}

                  <FormLabel>First Name</FormLabel>
                  <FormInput 
                    textInputRef={(component) => this.firstNameField = component}
                    placeholder="First Name"
                    returnKeyType="next"
                    onSubmitEditing={() => {this.lastNameField.focus()}}
                    onChangeText={(firstName)=>{
                      this.setState({firstName})
                    }}
                    ></FormInput>

                  <FormLabel>Last Name</FormLabel>
                  <FormInput 
                    textInputRef={(component) => this.lastNameField = component}
                    placeholder="Last Name"
                    returnKeyType="next"
                    onSubmitEditing={() => {this.companyField.focus()}}
                    onChangeText={(lastName)=>{
                      this.setState({lastName})
                    }}
                    ></FormInput>

                  <FormLabel>Company</FormLabel>
                  <FormInput 
                    textInputRef={(component) => this.companyField = component}
                    placeholder="Company where you work"
                    returnKeyType="next"
                    onSubmitEditing={() => {this.passwordField.focus()}}
                    onChangeText={(company)=>{
                      this.setState({company})
                    }}
                    ></FormInput>

                  <FormLabel>Password</FormLabel>
                  <FormInput 
                    textInputRef={(component) => this.passwordField = component}
                    placeholder="Put your password"
                    returnKeyType="next"
                    onSubmitEditing={() => {this.confirmPasswordField.focus()}}
                    onChangeText={(password) => {
                      this.setState({password})
                      this.setState({isPasswordValid: !this.state.isPasswordFieldPristine && this.validatePassword(password) ? true : this.state.isPasswordValid})
                      this.setState({isPasswordIdentical: !this.state.isPasswordFieldPristine && password == this.state.confirmedPassword ? true : this.state.isPasswordIdentical})
                    }}
                    onBlur={()=> {
                      this.setState({isPasswordFieldPristine:false})
                      this.setState({isPasswordValid: this.validatePassword(this.state.password)})
                      this.setState({isPasswordIdentical: !this.state.isConfirmPasswordFieldPristine && this.state.password == this.state.confirmedPassword ? true : this.state.isPasswordIdentical})
                    }}
                    secureTextEntry={true} 
                    ></FormInput>
                  {passwordValidationMessage}

                  <FormLabel>Confirm Password</FormLabel>
                  <FormInput
                    textInputRef={(component) => this.confirmPasswordField = component}
                    placeholder="Confirm your password"
                    returnKeyType="done"
                    onChangeText={(confirmedPassword)=> 
                      {
                        this.setState({confirmedPassword})
                        this.setState({isPasswordIdentical: !this.state.isConfirmPasswordFieldPristine && this.state.password == confirmedPassword ? true : this.state.isPasswordIdentical})
                      }
                    }
                    onBlur={()=> {
                      this.setState({isConfirmPasswordFieldPristine:false})
                      this.setState({isPasswordIdentical: this.state.password == this.state.confirmedPassword ? true : false})
                    }}
                    secureTextEntry={true} 
                  ></FormInput>
                   {passwordIdenticalValidationMessage}
                </View>
                <View
                  id="SignUpButtonArea"
                  style={{
                    paddingTop:20,
                    paddingBottom:20,
                    paddingLeft:50,
                    paddingRight:50,
                    justifyContent:'center'
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height:60
                    }}
                    onPress={()=>{
                      this._handleSignUpPress();
                    }}
                  >
                    <View
                      style={[{
                                flex:1,
                                backgroundColor:'#03d2b9',
                                borderRadius:15,
                                justifyContent:'center'
                              },styles.shadow]}>
                      {signUpButtonContent}
                    </View>
                  </TouchableOpacity>
                  {signUpFailureMessage}
                </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View
              id="BackButtonArea"
              style={{
                height: Dimensions.get('window').height * 0.3,
                position:'absolute',
                top:35,
                paddingLeft:20
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigatorWrapper(true).pop()}
              >
                  <Icon name="ios-arrow-back" size={50} color="#FFF"/>
              </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  gotoSplash() {
    this.props.navigator(true).push({
      id: 'SplashPage',
      name: 'Splash Page',
    });
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
  var {user,failedSignupMessage} = state;
  return {
    user,
    failedSignupMessage
  }
}

export default connect(mapStateToProps)(Signup)
