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
  View
} from 'react-native';

import Login from './Login';
import Splash from './Splash';
import Signup from './Signup';
import Main from './Main';
import EventPage from './EventPage';
import EventDetailsPage from './EventDetailsPage';

class AwesomeProject extends Component {
  render() {
    return (
      <Navigator
          initialRoute={{id: 'EventPage', name: 'Index'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
      )
  }

  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'SplashPage') {
      return (
        <Splash
          navigator={navigator} />
      );
    }
    if (routeId === 'SignupPage') {
      return (
        <Signup
          navigator={navigator} />
      );
    }
    if (routeId === 'LoginPage') {
      return (
        <Login
          navigator={navigator} />
      );
    }
    if (routeId === 'MainPage') {
      return (
        <Main
          navigator={navigator} />
      )
    }

    if (routeId === 'EventPage') {
      return (
         <EventPage
          navigator={navigator}
          something="something"></EventPage>
      )
    }

    if (routeId === 'EventDetailsPage') {
      return (
        // <View>
        //   <Text>{route.event.eventTitle}</Text>
        //   <Text>{route.event.eventDate}</Text>
        // </View>
         <EventDetailsPage
            navigator={navigator}
            event={route.event}/>
      )
    }    
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
