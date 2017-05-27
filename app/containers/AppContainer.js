/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Text,
  View,
  AsyncStorage,
} from 'react-native';

import {
  Tabs,
  Tab,
  Icon
} from 'react-native-elements';

const firebase = require('firebase');


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions';

import Login from './Login';
import Signup from './Signup';
import EventPage from './EventPage';
import AddEventPage from './AddEventPage';
import EventDetailsPage from './EventDetailsPage';
import Scanner from './mainPages/Scanner';
import AttendeeProfilePage from './AttendeeProfilePage'
import ResumeViewPage from './ResumeViewPage';
import RecruiterProfilePage from './RecruiterProfilePage';

class AppContainer extends Component {

  constructor(props){
    super(props);
    var config = {
      apiKey: "AIzaSyCOwfUwf2-GqcacgkBopnwXb8-HG5Km7hY",
      authDomain: "trurecruit-dd63b.firebaseapp.com",
      databaseURL: "https://trurecruit-dd63b.firebaseio.com",
      storageBucket: "trurecruit-dd63b.appspot.com",
      messagingSenderId: "117008567602"
    };
    firebase.initializeApp(config);
    this.props.setFirebaseRef(firebase);
    this.state = {
      selectedTab:'home',
      hideTabBar:false,
      isLoginMode: true
    }
  }

  render() {
    let tabBarStyle = {};
    let sceneStyle = {};
    if (this.state.hideTabBar) {
      tabBarStyle.height = 0;
      tabBarStyle.overflow = 'hidden';
      sceneStyle.paddingBottom = 0;
    }
        
    var toRender = this.state.isLoginMode ? 
    <Navigator
        initialRoute={{id:'LoginPage', name: 'Index'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight; 
          }
        } 
      />
    : 
    <Tabs hidesTabTouch tabBarStyle={tabBarStyle} sceneStyle={sceneStyle}>
        <Tab
          titleStyle={{fontWeight: 'bold' , fontSize: 10, }}
          selectedTitleStyle={{color:'#1DBB96'}}
          selected={this.state.selectedTab === 'home'}
          title='HOME'
          renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='home' size={30} />}
          renderSelectedIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#1DBB96'} name='home' size={30} />}
          onPress={() => this.setState({selectedTab:'home'})}>
          <Navigator
            initialRoute={{id:'EventPage', name: 'Index'}}
            renderScene={this.renderScene.bind(this)}
            configureScene={(route) => {
                if (route.sceneConfig) {
                  return route.sceneConfig;
                }
                return Navigator.SceneConfigs.FloatFromRight; 
              }
            } 
          />
        </Tab>
        <Tab
          titleStyle={{fontWeight: 'bold' , fontSize: 10, }}
          selectedTitleStyle={{color:'#1DBB96'}}
          selected={this.state.selectedTab === 'profile'}
          title='PROFILE'
          renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='account-circle' size={30} />}
          renderSelectedIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#1DBB96'} name='account-circle' size={30} />}
          onPress={() => this.setState({selectedTab:'profile'})}>
          <RecruiterProfilePage
            {...this.props}
            changeIsLoginMode={this.changeIsLoginMode.bind(this)}
            hideTabBar={this.hideTabBar.bind(this)}
          ></RecruiterProfilePage>
        </Tab>
    </Tabs>

    return toRender;
  }

  hideTabBar(val){
    this.setState({hideTabBar:val})
  }

  changeIsLoginMode(loginMode){
    this.setState({isLoginMode:loginMode})
    if(!loginMode){
      this.setState({selectedTab:'home'})
    }
  }

  renderScene(route, navigator) {
    const navigatorWrapper = (hideTabBar) => {
            const isHideTabBar = hideTabBar ? true : false; 
            return navigator;
    }

    var routeId = route.id;
    if (routeId === 'SplashPage') {
      return (
        <Splash
          navigatorWrapper={navigatorWrapper}
          {...this.props} />
      );
    }
    if (routeId === 'SignupPage') {
      return (
        <Signup
          navigatorWrapper={navigatorWrapper}
          {...this.props}
          hideTabBar={this.hideTabBar.bind(this)}
           />
      );
    }
    if (routeId === 'LoginPage') {
      return (
        <Login
          navigatorWrapper={navigatorWrapper}
          {...this.props}
          hideTabBar={this.hideTabBar.bind(this)}
          changeIsLoginMode={this.changeIsLoginMode.bind(this)}/>
      );
    }

    if (routeId === 'EventPage') {
      return (
         <EventPage
          navigatorWrapper={navigatorWrapper}
          events={route.events}
          {...this.props}
          hideTabBar={this.hideTabBar.bind(this)}></EventPage>
      )
    }

    if (routeId === 'AddEventPage'){
      return(
        <AddEventPage
          navigatorWrapper = {navigatorWrapper}          
          {...this.props}
          hideTabBar={this.hideTabBar.bind(this)}
        ></AddEventPage>
      )
    } 

    if (routeId === 'EventDetailsPage') {
      return (
         <EventDetailsPage
            navigatorWrapper={navigatorWrapper}
            {...this.props}
            hideTabBar={this.hideTabBar.bind(this)}/>
      )
    } 

    if (routeId === 'ScannerPage'){
      return(
        <Scanner
          navigatorWrapper = {navigatorWrapper}
          event={route.event}
          {...this.props}
          hideTabBar={this.hideTabBar.bind(this)}
          ></Scanner>
      )
    }

    if(routeId === 'AttendeeProfilePage'){
      return(
        <AttendeeProfilePage
          navigatorWrapper={navigatorWrapper}
          {...this.props}
          {...route}
          hideTabBar={this.hideTabBar.bind(this)}
        >
        </AttendeeProfilePage>
      )
    }   

    if(routeId == 'ResumeViewPage'){
      return(
      <ResumeViewPage
          navigatorWrapper={navigatorWrapper}
          {...this.props}
          hideTabBar={this.hideTabBar.bind(this)}>
        </ResumeViewPage>
      )
    }
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(ActionCreators,dispatch);
}

export default connect(() => {return {}},mapDispatchToProps)(AppContainer);
