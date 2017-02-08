import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image
} from 'react-native';
import {
  ListItem
} from 'react-native-elements';

export default class Account extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../img/doge.jpg')}
            style={styles.avatar}/>
          <Text style={styles.title}>Bob Clinton</Text>
        </View>
        <View style={styles.content}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    height: 200,
    backgroundColor: 'gray'
  },
  content: {
    flex: 1,
    height: 500,
    backgroundColor: '#242628'
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 37,
    marginTop: 75,
    marginLeft: 75
  },
  title: {
    fontSize: 20,
    marginLeft: 180,
    marginTop: -50,
    color: 'white'
  },
  titleContainer: {
    marginTop: 75,
    marginLeft: 75,
  }
});
