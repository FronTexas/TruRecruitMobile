import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  View,
  StyleSheet,
  Platform,
  Navigator
} from 'react-native';
import {
  Tabs,
  Tab,
  Icon
} from 'react-native-elements';
import Scanner from './mainPages/Scanner';
import Feed from './mainPages/Feed';
import Account from './mainPages/Account';
import EventPage from './EventPage'
import EventDetailsPage from './EventDetailsPage';
import AttendeeProfilePage from './AttendeeProfilePage'
import IconIon from 'react-native-vector-icons/Ionicons';


export default class Login extends Component {
  constructor () {
    super()
    this.state = {
      selectedTab: 'feed'
    }
    this.changeTab = this.changeTab.bind(this)
  }

  changeTab (selectedTab) {
    this.setState({
      selectedTab
    })
  }

  render() {
    const { selectedTab } = this.state
    return (
      <Tabs hidesTabTouch>
        <Tab
          titleStyle={{marginTop:-5,color:"#bdc3c7"}}
          selectedTitleStyle={{marginTop:-5,color:"#1DBB96"}}
          selected={selectedTab === 'feed'}
          title={'Feed'}
          renderIcon={() => <IconIon name='ios-list' size={35} style={{color:"#bdc3c7"}} />}
          renderSelectedIcon={() => <IconIon name='ios-list' size={35} style={{color:"#1DBB96"}}/>}
          onPress={() => this.changeTab('feed')}>

          <Navigator 
            initialRoute={{id:"EventPage",name:"Event Page"}}
            renderScene={this.renderScene.bind(this)}
            configureScene={(route) => {
                if (route.sceneConfig) {
                  return route.sceneConfig;
                }
                return Navigator.SceneConfigs.FloatFromRight;
              }}
            ></Navigator>
        </Tab>
        <Tab
          titleStyle={{marginTop:-5,color:"#bdc3c7"}}
          selectedTitleStyle={{color:"#1DBB96",marginTop:-5}}
          selected={selectedTab === 'account'}
          title={'Account'}
          renderIcon={() => <IconIon name='ios-person' size={35} style={{color:"#bdc3c7"}}/>}
          renderSelectedIcon={() => <IconIon name='ios-person' style={{color:"#1DBB96"}} size={35} />}
          onPress={() => this.changeTab('account')}>
          <Account navigator={navigator}/>
        </Tab>
      </Tabs>
    );
  }

  renderScene(route, navigator) {
    var routeId = route.id;

    if (routeId === 'EventPage') {
      return (
         <EventPage
          navigator={navigator}
          something="something"
          style={{backgroundColor:"#1DBB96"}}></EventPage>
      )
    }

    if (routeId === 'EventDetailsPage') {
      return (
         <EventDetailsPage
            navigator={navigator}
            event={route.event}/>
      )
    } 

    if (routeId === 'ScannerPage'){
      return(
        <Scanner
          navigator={navigator
        }></Scanner>
      )
    }

    if(routeId === 'AttendeeProfilePage'){
      return(
        <AttendeeProfilePage
          navigator={navigator}>
        </AttendeeProfilePage>
      )
    }   
  }
}

const styles = StyleSheet.create({
  titleStyle: {
  },
  titleSelected: {
    color:"#1DBB96"}
});
