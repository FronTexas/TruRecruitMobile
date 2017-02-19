import { combineReducers } from 'redux';
import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

import * as eventsReducer from './events';
import * as attendeesReducer from './attendees';
import * as recruiterReducer from './recruiter';
import * as firebaseReducer from './firebaseRef';

export default combineReducers(Object.assign(
  eventsReducer,
  attendeesReducer,
  recruiterReducer,
  firebaseReducer
));
