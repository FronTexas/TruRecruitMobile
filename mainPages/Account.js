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
        <Image source={require('https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg')}
        <ListItem
          roundAvatar
          hideChevron
          containerStyle={styles.titleContainer}
          avatarStyle={styles.avatar}
          titleStyle={styles.title}
          underlayColor={'black'}
          avatar={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }}
          title={'Bob Clinton'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#242628',
  },
  avatar: {
    width: 75,
    height: 75
  },
  title: {
    fontSize: 20,
    paddingLeft: 20,
    color: 'white'
  },
  titleContainer: {
    marginTop: 75,
    marginLeft: 75,
  }
});
