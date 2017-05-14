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
  TabBarIOS,
} from 'react-native';

const firebase = require('firebase');


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions';

import Login from './Login';
import Signup from './Signup';

import Icon from 'react-native-vector-icons/FontAwesome'

class TopLevelContainer extends Component {

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
      selectedTab:'homeTab',
    }
  }

  render() {
    return (
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
      )
  }

  renderScene(route, navigator) {
    var routeId = route.id;
    switch(route.id){
      case 'SignupPage':
        return (
          <Signup
            navigator={navigator}
            {...this.props}
          />
        );
      case 'LoginPage':
        return (
          <Login
            navigator={navigator}
            {...this.props} />
        );
      case 'MainAppContainer':
        return (
          <MainAppContainer
            topLevelNavigator={navigator}
          ></MainAppContainer>
        )
    }
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(ActionCreators,dispatch);
}

export default connect(() => {return {}},mapDispatchToProps)(TopLevelContainer);
