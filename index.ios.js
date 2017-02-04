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


import AppContainer from './app/containers/AppContainer';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware,combineReducers,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './app/reducers'

import Login from './Login';
import Splash from './Splash';
import Signup from './Signup';
import Main from './Main';
import EventPage from './EventPage';
import AddEventPage from './AddEventPage';
import EventDetailsPage from './EventDetailsPage';
import Scanner from './mainPages/Scanner';
import AttendeeProfilePage from './AttendeeProfilePage'
import ResumeViewPage from './ResumeViewPage'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState){
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );
  return createStore(reducer,initialState,enhancer);
}

const store = configureStore({});

const App = () => (
  <Provider  store={store}>
    <AppContainer />
  </Provider>
)

AppRegistry.registerComponent('AwesomeProject', () => App);
