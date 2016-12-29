import React, { Component } from 'react';
import { Text, ListView, StyleSheet, View } from 'react-native';
import {
  List,
  ListItem
} from 'react-native-elements';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
];

export default class Feed extends Component {

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}></View>
        <Text style={styles.label}>Recently Scanned</Text>
        <List>
        {
          list.map((l, i) => (
            <ListItem
              roundAvatar
              avatar={{ uri: l.avatar_url }}
              key={i}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))
        }
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242628',
  },
  label: {
    fontSize: 14,
    paddingTop: 15,
    color: 'white'
  },
  topBar: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#ededed',
  },
});
