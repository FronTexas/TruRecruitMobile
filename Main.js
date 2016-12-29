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
          titleStyle={[styles.titleStyle]}
          selectedTitleStyle={[styles.titleSelected, {marginTop: -3, marginBottom: 7}]}
          selected={selectedTab === 'feed'}
          title={selectedTab === 'feed' ? 'FEED' : null}
          renderIcon={() => <Icon name='format-list-bulleted' size={26} />}
          renderSelectedIcon={() => <Icon name='format-list-bulleted' size={26} />}
          onPress={() => this.changeTab('feed')}>
          <Feed navigator={navigator} />
        </Tab>
        <Tab
          titleStyle={[styles.titleStyle, {marginTop: -1}]}
          selectedTitleStyle={[styles.titleSelected, {marginTop: -3, marginBottom: 7}]}
          selected={selectedTab === 'scanner'}
          title={selectedTab === 'scanner' ? 'SCANNER' : null}
          renderIcon={() => <Icon style={{paddingBottom: 4}} name='camera' size={26} />}
          renderSelectedIcon={() => <Icon name='camera' size={26} />}
          onPress={() => this.changeTab('scanner')}>
          <Scanner navigator={navigator}/>
        </Tab>
        <Tab
          titleStyle={[styles.titleStyle, {marginTop: -1}]}
          selectedTitleStyle={[styles.titleSelected, {marginTop: -3, marginBottom: 7}]}
          selected={selectedTab === 'account'}
          title={selectedTab === 'account' ? 'ACCOUNT' : null}
          renderIcon={() => <Icon style={{paddingBottom: 4}} name='account-circle' size={26} />}
          renderSelectedIcon={() => <Icon name='account-circle' size={26} />}
          onPress={() => this.changeTab('account')}>
          <Account navigator={navigator}/>
        </Tab>
      </Tabs>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {

  },
  titleSelected: {

  }
});
